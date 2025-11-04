# 🚀 CareBuild SMA - Quick Setup Guide

## ⚡ **Get Your App Running in 5 Minutes!**

### **Step 1: Set Up Supabase Database**

1. **Go to [supabase.com](https://supabase.com)**
2. **Create a new project**
3. **Copy your project URL and anon key**

### **Step 2: Run Database Schema**

1. **Go to your Supabase dashboard**
2. **Click on "SQL Editor"**
3. **Copy the entire contents of `supabase-schema.sql`**
4. **Paste it in the SQL Editor**
5. **Click "Run" to execute the script**

### **Step 3: Set Up Storage**

1. **Go to "Storage" in your Supabase dashboard**
2. **Click "Create a new bucket"**
3. **Name it: `carebuild-files`**
4. **Set it to "Public"**
5. **Click "Create bucket"**

### **Step 4: Update Environment Variables**

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Step 5: Start the Application**

```bash
npm run dev
```

### **Step 6: Test the Application**

1. **Open [http://localhost:3000](http://localhost:3000)**
2. **Click "Get Started"**
3. **Create a new account**
4. **Test the dashboard and features**

---

## 🎉 **That's It!**

Your CareBuild SMA application is now running with real Supabase integration!

### **What You Can Do Now:**

✅ **User Registration & Login** - Real authentication  
✅ **Dashboard** - Live data from database  
✅ **Projects** - Create and manage projects  
✅ **Site Reports** - Submit reports with media  
✅ **Payments** - Complete payment system  
✅ **Real-time Updates** - Live data synchronization  
✅ **File Uploads** - Secure file storage  
✅ **Mobile Responsive** - Works on all devices  

### **Next Steps:**

1. **Test all features** to make sure everything works
2. **Create test data** (projects, reports, payments)
3. **Deploy to production** when ready
4. **Set up Flutterwave** for real payments

---

## 🔧 **Troubleshooting**

### **If you see database errors:**

1. **Make sure you ran the SQL schema**
2. **Check your environment variables**
3. **Verify your Supabase project is active**

### **If authentication doesn't work:**

1. **Check your Supabase URL and key**
2. **Make sure RLS policies are enabled**
3. **Verify the database trigger is working**

### **If file uploads don't work:**

1. **Check that the storage bucket exists**
2. **Verify the bucket is set to public**
3. **Check your storage configuration**

---

## 📞 **Need Help?**

- **Check the `DEPLOYMENT.md` file** for detailed instructions
- **Review the `GO_LIVE_SUMMARY.md`** for feature overview
- **Look at the console logs** for error details

**Your CareBuild SMA app is ready to go live! 🚀**

