// Database initialization script
// Run this after setting up your Supabase project

const { createClient } = require('@supabase/supabase-js');

// Replace with your Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eozonxkvtuwvfaacqjum.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvem9ueGt2dHV3dmZhYWNxanVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNDUxNTcsImV4cCI6MjA3NjkyMTE1N30.7aW_lLTZ_TCODOR2qCMWjs_-TvWJE-tw47HP8gksLbU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function initDatabase() {
  console.log('🚀 Initializing CareBuild SMA Database...');
  
  try {
    // Test connection
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      console.log('\n📋 Please follow these steps:');
      console.log('1. Go to your Supabase dashboard');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Copy and paste the contents of supabase-schema.sql');
      console.log('4. Run the SQL script');
      console.log('5. Create a storage bucket called "carebuild-files"');
      console.log('6. Set the bucket to public');
      return;
    }

    console.log('✅ Database connection successful!');
    console.log('✅ Database is ready for CareBuild SMA');
    console.log('\n🎉 You can now start using the application!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

initDatabase();

