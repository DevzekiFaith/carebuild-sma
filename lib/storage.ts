import { supabase } from './supabase';

export class StorageService {
  private static bucket = 'carebuild-files';

  // Upload a file to Supabase Storage
  static async uploadFile(
    file: File, 
    path: string, 
    options?: {
      cacheControl?: string;
      contentType?: string;
      upsert?: boolean;
    }
  ) {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucket)
        .upload(path, file, {
          cacheControl: options?.cacheControl || '3600',
          upsert: options?.upsert || false,
          contentType: options?.contentType || file.type,
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Get public URL for a file
  static getPublicUrl(path: string) {
    const { data } = supabase.storage
      .from(this.bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  // Upload multiple files
  static async uploadMultipleFiles(
    files: File[],
    basePath: string,
    options?: {
      cacheControl?: string;
      upsert?: boolean;
    }
  ) {
    const uploadPromises = files.map((file, index) => {
      const fileName = `${Date.now()}-${index}-${file.name}`;
      const filePath = `${basePath}/${fileName}`;
      return this.uploadFile(file, filePath, options);
    });

    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  }

  // Delete a file
  static async deleteFile(path: string) {
    try {
      const { error } = await supabase.storage
        .from(this.bucket)
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // List files in a folder
  static async listFiles(folderPath: string) {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucket)
        .list(folderPath);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  // Get file info
  static async getFileInfo(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucket)
        .list(path.split('/').slice(0, -1).join('/'), {
          search: path.split('/').pop()
        });

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error getting file info:', error);
      throw error;
    }
  }

  // Generate signed URL for private files
  static async createSignedUrl(
    path: string,
    expiresIn: number = 3600
  ) {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucket)
        .createSignedUrl(path, expiresIn);

      if (error) throw error;
      return data.signedUrl;
    } catch (error) {
      console.error('Error creating signed URL:', error);
      throw error;
    }
  }

  // Upload site report media
  static async uploadReportMedia(
    files: File[],
    reportId: string,
    type: 'image' | 'video' | 'document'
  ) {
    const basePath = `reports/${reportId}/${type}`;
    const uploadResults = await this.uploadMultipleFiles(files, basePath);
    
    // Return file URLs
    return uploadResults.map(result => ({
      path: result.path,
      url: this.getPublicUrl(result.path),
      type
    }));
  }

  // Upload user avatar
  static async uploadAvatar(userId: string, file: File) {
    const fileExtension = file.name.split('.').pop();
    const fileName = `avatar-${userId}.${fileExtension}`;
    const path = `avatars/${fileName}`;

    const result = await this.uploadFile(file, path, {
      upsert: true,
      contentType: file.type
    });

    return {
      path: result.path,
      url: this.getPublicUrl(result.path)
    };
  }

  // Upload project documents
  static async uploadProjectDocument(
    projectId: string,
    file: File,
    documentType: string
  ) {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${documentType}-${Date.now()}.${fileExtension}`;
    const path = `projects/${projectId}/documents/${fileName}`;

    const result = await this.uploadFile(file, path);

    return {
      path: result.path,
      url: this.getPublicUrl(result.path),
      name: file.name,
      type: documentType
    };
  }

  // Upload payment receipts
  static async uploadPaymentReceipt(
    paymentId: string,
    file: File
  ) {
    const fileExtension = file.name.split('.').pop();
    const fileName = `receipt-${paymentId}.${fileExtension}`;
    const path = `payments/receipts/${fileName}`;

    const result = await this.uploadFile(file, path);

    return {
      path: result.path,
      url: this.getPublicUrl(result.path)
    };
  }

  // Get file size in human readable format
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Validate file type
  static validateFileType(
    file: File, 
    allowedTypes: string[]
  ): boolean {
    return allowedTypes.includes(file.type);
  }

  // Validate file size
  static validateFileSize(
    file: File, 
    maxSizeInMB: number
  ): boolean {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  }

  // Get file type category
  static getFileCategory(file: File): 'image' | 'video' | 'document' | 'other' {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.includes('pdf') || 
        file.type.includes('document') || 
        file.type.includes('text') ||
        file.type.includes('spreadsheet')) return 'document';
    return 'other';
  }
}

