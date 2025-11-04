#!/usr/bin/env node

/**
 * Auto-Fix Missing Imports Script
 * 
 * This script automatically adds missing Lucide React icon imports to files
 */

const fs = require('fs');
const path = require('path');

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

function fixFileImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Find the lucide-react import line
  let importLineIndex = -1;
  let importLine = '';
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('from \'lucide-react\'') || lines[i].includes('from "lucide-react"')) {
      importLineIndex = i;
      importLine = lines[i];
      break;
    }
  }
  
  if (importLineIndex === -1) {
    console.log(`⚠️  No lucide-react import found in ${filePath}`);
    return false;
  }
  
  // Extract existing imports
  const existingImports = [];
  const importMatch = importLine.match(/\{([^}]+)\}/);
  if (importMatch) {
    const imports = importMatch[1].split(',').map(imp => imp.trim());
    existingImports.push(...imports);
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
  const missing = usedIcons.filter(icon => !existingImports.includes(icon));
  
  if (missing.length === 0) {
    return false; // No missing imports
  }
  
  // Add missing imports
  const allImports = [...existingImports, ...missing].sort();
  const newImportLine = `import { ${allImports.join(', ')} } from 'lucide-react';`;
  
  // Replace the import line
  lines[importLineIndex] = newImportLine;
  
  // Write back to file
  const newContent = lines.join('\n');
  fs.writeFileSync(filePath, newContent, 'utf8');
  
  console.log(`✅ Fixed ${filePath}:`);
  console.log(`   Added: ${missing.join(', ')}`);
  
  return true;
}

function main() {
  console.log('🔧 Auto-fixing missing Lucide React icon imports...\n');
  
  const projectRoot = path.join(__dirname, '..');
  const tsxFiles = findTsxFiles(projectRoot);
  
  let fixedCount = 0;
  
  for (const file of tsxFiles) {
    if (fixFileImports(file)) {
      fixedCount++;
    }
  }
  
  if (fixedCount > 0) {
    console.log(`\n🎉 Fixed ${fixedCount} files!`);
    console.log('\n💡 Next steps:');
    console.log('   1. Review the changes');
    console.log('   2. Test the components');
    console.log('   3. Run "npm run check-imports" to verify');
  } else {
    console.log('✅ No files needed fixing!');
  }
}

if (require.main === module) {
  main();
}

module.exports = { fixFileImports, findTsxFiles };


