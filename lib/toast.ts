import { toast } from 'sonner';

// Custom toast utility with consistent styling and functionality
export const showToast = {
  // Success notifications
  success: (message: string, description?: string) => {
    return toast.success(message, {
      description,
      duration: 3000,
      action: {
        label: 'Dismiss',
        onClick: () => toast.dismiss(),
      },
    });
  },

  // Error notifications
  error: (message: string, description?: string) => {
    return toast.error(message, {
      description,
      duration: 5000,
      action: {
        label: 'Dismiss',
        onClick: () => toast.dismiss(),
      },
    });
  },

  // Warning notifications
  warning: (message: string, description?: string) => {
    return toast.warning(message, {
      description,
      duration: 4000,
      action: {
        label: 'Dismiss',
        onClick: () => toast.dismiss(),
      },
    });
  },

  // Info notifications
  info: (message: string, description?: string) => {
    return toast.info(message, {
      description,
      duration: 4000,
      action: {
        label: 'Dismiss',
        onClick: () => toast.dismiss(),
      },
    });
  },

  // Loading notifications
  loading: (message: string, description?: string) => {
    return toast.loading(message, {
      description,
      duration: Infinity,
    });
  },

  // Promise-based notifications
  promise: <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    });
  },

  // Custom notifications with actions
  custom: (message: string, options?: {
    description?: string;
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
    onDismiss?: () => void;
    onAutoClose?: () => void;
  }) => {
    return toast(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    });
  },

  // Dismiss all toasts
  dismiss: () => {
    toast.dismiss();
  },

  // Dismiss specific toast
  dismissSpecific: (toastId: string | number) => {
    toast.dismiss(toastId);
  },
};

// Specific toast functions for common app actions
export const appToasts = {
  // Authentication
  loginSuccess: (userName: string) => {
    return showToast.success(`Welcome back, ${userName}!`, 'You have been successfully logged in.');
  },

  loginError: (error: string) => {
    return showToast.error('Login Failed', error);
  },

  signupSuccess: (userName: string) => {
    return showToast.success(`Welcome to CareBuild SMA, ${userName}!`, 'Your account has been created successfully.');
  },

  signupError: (error: string) => {
    return showToast.error('Signup Failed', error);
  },

  logoutSuccess: () => {
    return showToast.info('Logged out successfully', 'You have been logged out of your account.');
  },

  // Profile Management
  profileUpdated: () => {
    return showToast.success('Profile Updated', 'Your profile has been updated successfully.');
  },

  profileUpdateError: (error: string) => {
    return showToast.error('Profile Update Failed', error);
  },

  // Projects
  projectCreated: (projectName: string) => {
    return showToast.success('Project Created', `${projectName} has been created successfully.`);
  },

  projectUpdated: (projectName: string) => {
    return showToast.success('Project Updated', `${projectName} has been updated successfully.`);
  },

  projectDeleted: (projectName: string) => {
    return showToast.warning('Project Deleted', `${projectName} has been deleted.`);
  },

  // Site Reports
  reportSubmitted: (reportType: string) => {
    return showToast.success('Report Submitted', `Your ${reportType} report has been submitted successfully.`);
  },

  reportApproved: (projectName: string) => {
    return showToast.success('Report Approved', `Report for ${projectName} has been approved.`);
  },

  reportRejected: (projectName: string) => {
    return showToast.error('Report Rejected', `Report for ${projectName} has been rejected.`);
  },

  // Payments
  paymentSuccess: (amount: number) => {
    return showToast.success('Payment Successful', `Payment of ₦${amount.toLocaleString()} has been processed.`);
  },

  paymentFailed: (error: string) => {
    return showToast.error('Payment Failed', error);
  },

  paymentPending: (amount: number) => {
    return showToast.warning('Payment Pending', `Payment of ₦${amount.toLocaleString()} is being processed.`);
  },

  // Wallet
  fundsAdded: (amount: number) => {
    return showToast.success('Funds Added', `₦${amount.toLocaleString()} has been added to your wallet.`);
  },

  fundsWithdrawn: (amount: number) => {
    return showToast.success('Funds Withdrawn', `₦${amount.toLocaleString()} has been withdrawn from your wallet.`);
  },

  insufficientFunds: () => {
    return showToast.error('Insufficient Funds', 'You do not have enough balance for this transaction.');
  },

  // File Operations
  fileUploaded: (fileName: string) => {
    return showToast.success('File Uploaded', `${fileName} has been uploaded successfully.`);
  },

  fileUploadError: (error: string) => {
    return showToast.error('Upload Failed', error);
  },

  fileDeleted: (fileName: string) => {
    return showToast.warning('File Deleted', `${fileName} has been deleted.`);
  },

  // Notifications
  notificationReceived: (title: string) => {
    return showToast.info('New Notification', title);
  },

  // System
  dataRefreshed: () => {
    return showToast.success('Data Refreshed', 'Your data has been updated.');
  },

  networkError: () => {
    return showToast.error('Network Error', 'Please check your internet connection and try again.');
  },

  serverError: () => {
    return showToast.error('Server Error', 'Something went wrong on our end. Please try again later.');
  },

  // Form Validation
  formError: (field: string) => {
    return showToast.error('Form Error', `Please check the ${field} field.`);
  },

  requiredField: (field: string) => {
    return showToast.warning('Required Field', `${field} is required.`);
  },

  // General
  saved: () => {
    return showToast.success('Saved', 'Your changes have been saved.');
  },

  deleted: (item: string) => {
    return showToast.warning('Deleted', `${item} has been deleted.`);
  },

  copied: (item: string) => {
    return showToast.info('Copied', `${item} has been copied to clipboard.`);
  },

  // Loading states
  loading: (action: string) => {
    return showToast.loading(`${action}...`, 'Please wait while we process your request.');
  },

  // Confirmation
  confirmAction: (action: string, onConfirm: () => void) => {
    return showToast.custom(`Are you sure you want to ${action}?`, {
      duration: 10000,
      action: {
        label: 'Confirm',
        onClick: onConfirm,
      },
    });
  },
};

export default showToast;




