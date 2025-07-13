#!/bin/bash
# Script to migrate FontAwesome icon names to Material Icons

echo "🔄 Migrating FontAwesome icons to Material Icons..."
echo "================================================"

# Define icon mappings
declare -A icon_map=(
  ["arrow-right"]="arrow_forward"
  ["check"]="check"
  ["check-circle"]="check_circle"
  ["close"]="close"
  ["cog"]="settings"
  ["envelope"]="mail"
  ["exclamation-triangle"]="warning"
  ["heart"]="favorite"
  ["home"]="home"
  ["menu"]="menu"
  ["settings"]="settings"
  ["star"]="star"
  ["tag"]="label"
  ["times-circle"]="cancel"
  ["user"]="person"
  ["x"]="close"
  ["xmark"]="close"
)

# Files to search (excluding node_modules and build directories)
find_files() {
  find . \
    -type f \
    \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/.turbo/*" \
    -not -path "*/dist/*" \
    -not -path "*/build/*" \
    -not -path "*/.next/*" \
    -not -path "*/coverage/*"
}

# Count total replacements
total_replacements=0

# Perform replacements
echo "📝 Processing files..."
for old_icon in "${!icon_map[@]}"; do
  new_icon="${icon_map[$old_icon]}"
  
  # Count occurrences
  count=$(find_files | xargs grep -l "icon=\"$old_icon\"" 2>/dev/null | wc -l)
  count2=$(find_files | xargs grep -l "name=\"$old_icon\"" 2>/dev/null | wc -l)
  count3=$(find_files | xargs grep -l "Icon=\"$old_icon\"" 2>/dev/null | wc -l)
  total_count=$((count + count2 + count3))
  
  if [ $total_count -gt 0 ]; then
    echo "  ✓ Replacing '$old_icon' → '$new_icon' ($total_count files)"
    
    # Replace in icon props
    find_files | xargs sed -i '' "s/icon=\"$old_icon\"/icon=\"$new_icon\"/g" 2>/dev/null
    find_files | xargs sed -i '' "s/leftIcon=\"$old_icon\"/leftIcon=\"$new_icon\"/g" 2>/dev/null
    find_files | xargs sed -i '' "s/rightIcon=\"$old_icon\"/rightIcon=\"$new_icon\"/g" 2>/dev/null
    
    # Replace in Icon component name prop
    find_files | xargs sed -i '' "s/name=\"$old_icon\"/name=\"$new_icon\"/g" 2>/dev/null
    
    # Replace in test files
    find_files | xargs sed -i '' "s/Icon=\"$old_icon\"/Icon=\"$new_icon\"/g" 2>/dev/null
    
    total_replacements=$((total_replacements + total_count))
  fi
done

echo ""
echo "✅ Migration complete!"
echo "📊 Total files updated: $total_replacements"
echo ""
echo "⚠️  Please review the changes and run:"
echo "   pnpm lint"
echo "   pnpm test"
echo ""
echo "📝 Note: Some icon names might need manual adjustment if they don't have direct Material Icons equivalents."