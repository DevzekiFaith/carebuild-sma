#!/usr/bin/env node

/**
 * Import Checker Script
 * 
 * This script checks for missing Lucide React icon imports in the codebase
 * to prevent runtime errors like "ReferenceError: IconName is not defined"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Common Lucide React icons used in the project
const COMMON_ICONS = [
  'Building2', 'Shield', 'Users', 'TrendingUp', 'ArrowRight', 'Star', 'CheckCircle',
  'Play', 'Sparkles', 'Zap', 'Award', 'Globe', 'Heart', 'Target', 'BarChart3',
  'Camera', 'Video', 'FileText', 'Clock', 'MapPin', 'Phone', 'Mail', 'ChevronRight',
  'ArrowUpRight', 'X', 'Menu', 'AlertCircle', 'User', 'Mail', 'Phone', 'MapPin',
  'Briefcase', 'GraduationCap', 'Calendar', 'CreditCard', 'ArrowLeft', 'Lock',
  'Loader2', 'Eye', 'EyeOff', 'RefreshCw', 'Plus', 'Edit', 'Trash2', 'Filter',
  'Search', 'Navigation', 'Timer', 'Activity', 'CalendarDays', 'MapPinIcon',
  'MoreHorizontal', 'Settings', 'Bell', 'CheckCircle2', 'Circle', 'Info',
  'Wallet', 'Banknote', 'Download', 'Eye', 'XCircle', 'TrendingDown'
];

function findTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findTsxFiles(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function checkFileForMissingImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const importLine = lines.find(line => 
    line.includes('from \'lucide-react\'') || 
    line.includes('from "lucide-react"')
  );
  
  if (!importLine) return { file: filePath, missing: [], hasLucideImport: false };
  
  // Extract imported icons
  const importedIcons = [];
  const importMatch = importLine.match(/\{([^}]+)\}/);
  if (importMatch) {
    const imports = importMatch[1].split(',').map(imp => imp.trim());
    importedIcons.push(...imports);
  }
  
  // Find used icons in the file
  const usedIcons = [];
  for (const icon of COMMON_ICONS) {
    const regex = new RegExp(`<${icon}\\s+className=|<${icon}>`, 'g');
    if (regex.test(content)) {
      usedIcons.push(icon);
    }
  }
  
  // Find missing imports
  const missing = usedIcons.filter(icon => !importedIcons.includes(icon));
  
  return {
    file: filePath,
    missing,
    hasLucideImport: true,
    importedIcons,
    usedIcons
  };
}

function main() {
  console.log('🔍 Checking for missing Lucide React icon imports...\n');
  
  const projectRoot = path.join(__dirname, '..');
  const tsxFiles = findTsxFiles(projectRoot);
  
  let hasErrors = false;
  const results = [];
  
  for (const file of tsxFiles) {
    const result = checkFileForMissingImports(file);
    if (result.missing.length > 0) {
      hasErrors = true;
      results.push(result);
    }
  }
  
  if (hasErrors) {
    console.log('❌ Found missing icon imports:\n');
    
    for (const result of results) {
      console.log(`📁 ${path.relative(projectRoot, result.file)}`);
      console.log(`   Missing: ${result.missing.join(', ')}`);
      console.log(`   Used: ${result.usedIcons.join(', ')}`);
      console.log(`   Imported: ${result.importedIcons.join(', ')}\n`);
    }
    
    console.log('💡 To fix these issues:');
    console.log('   1. Add the missing icons to the import statement');
    console.log('   2. Make sure the import is from \'lucide-react\'');
    console.log('   3. Run this script again to verify the fix\n');
    
    process.exit(1);
  } else {
    console.log('✅ All icon imports are correct!');
    console.log(`   Checked ${tsxFiles.length} files`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkFileForMissingImports, findTsxFiles };



