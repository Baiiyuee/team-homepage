# Team Homepage Data

This directory is reserved for structured site content that can be moved out of
`index.html` and rendering scripts over time.

Current low-risk extraction:
- Student profile data is loaded from `assets/js/content-data.js`.

Suggested next content groups:
- `news.json`: conferences, activities, notices, and article links.
- `personnel.json`: faculty and postdoctoral profile sections.
- `research.json`: research directions, projects, and cooperation entries.

Keep empty fields as empty strings or empty arrays so templates can remain
stable while content is being collected.
