import os
import re

def add_twitter_card_to_file(file_path, week_number):
    """Add Twitter Card meta tags to a week page"""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Find the position after og:url tag
    og_url_pattern = r'<meta property="og:url" content="[^"]*">'
    match = re.search(og_url_pattern, content)

    if match:
        # Prepare Twitter Card tags
        twitter_card = f'''
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="{week_number} Week{'s' if week_number != 1 else ''} From Today – Date Calculator">
    <meta name="twitter:description" content="Calculate what date it will be {week_number} week{'s' if week_number != 1 else ''} from today. Perfect for planning and scheduling.">'''

        # Insert Twitter Card tags after og:url
        insert_pos = match.end()
        new_content = content[:insert_pos] + twitter_card + content[insert_pos:]

        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)

        print(f"Added Twitter Card to {os.path.basename(file_path)}")
    else:
        print(f"Could not find og:url tag in {os.path.basename(file_path)}")

# Process all week pages
pages_dir = "pages"
for filename in os.listdir(pages_dir):
    if filename.endswith(".html"):
        # Extract week number from filename
        week_match = re.match(r'(\d+)-weeks-from-today\.html', filename)
        if week_match:
            week_number = int(week_match.group(1))
            file_path = os.path.join(pages_dir, filename)
            add_twitter_card_to_file(file_path, week_number)