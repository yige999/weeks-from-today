#!/usr/bin/env python3
"""
Generate a complete sitemap.xml for Weeks From Today Calculator
Includes all week pages from 1-52 weeks
"""

import os
from datetime import datetime

def generate_sitemap():
    """Generate complete sitemap with all week pages"""

    # Base URL
    base_url = "https://weeksfromtoday.com"

    # Current date for lastmod
    current_date = datetime.now().strftime("%Y-%m-%d")

    # Main pages
    main_pages = [
        {"loc": "", "priority": "1.0", "changefreq": "weekly"},
        {"loc": "faq.html", "priority": "0.8", "changefreq": "monthly"},
        {"loc": "terms.html", "priority": "0.5", "changefreq": "yearly"},
        {"loc": "pregnancy-calculator-guide.html", "priority": "0.9", "changefreq": "monthly"},
        {"loc": "project-planning-guide.html", "priority": "0.9", "changefreq": "monthly"},
    ]

    # All week pages (1-52)
    week_pages = []
    for week in range(1, 53):
        priority = "0.9" if week in [1, 2, 4, 8, 12, 24, 26, 52] else "0.8"
        week_pages.append({
            "loc": f"pages/{week}-weeks-from-today.html",
            "priority": priority,
            "changefreq": "monthly"
        })

    # Generate sitemap content
    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sitemap_content += '    <!-- Main Pages -->\n'

    # Add main pages
    for page in main_pages:
        sitemap_content += f'''    <url>
        <loc>{base_url}/{page["loc"]}</loc>
        <lastmod>{current_date}</lastmod>
        <changefreq>{page["changefreq"]}</changefreq>
        <priority>{page["priority"]}</priority>
    </url>\n'''

    sitemap_content += '\n    <!-- Week Calculation Pages (1-52) -->\n'

    # Add week pages
    for page in week_pages:
        sitemap_content += f'''    <url>
        <loc>{base_url}/{page["loc"]}</loc>
        <lastmod>{current_date}</lastmod>
        <changefreq>{page["changefreq"]}</changefreq>
        <priority>{page["priority"]}</priority>
    </url>\n'''

    sitemap_content += '</urlset>\n'

    return sitemap_content

def main():
    """Main function to generate sitemap"""
    sitemap_content = generate_sitemap()

    # Write to file
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap_content)

    print("✅ Complete sitemap.xml generated successfully!")
    print(f"📊 Total pages included: 52 week pages + 5 main pages = 57 total pages")
    print("🗓️  All week pages from 1-52 weeks are now included")

if __name__ == "__main__":
    main()