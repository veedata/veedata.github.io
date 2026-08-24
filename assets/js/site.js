---
# Concatenated at build time into ONE file so a page costs one JS request
# instead of six. Sources live in _includes/js/ — edit those, not this file.
# Every block is an IIFE that bails out when its elements aren't on the page,
# so shipping all of them everywhere is safe and still under 8 KB.
layout: null
---
{% include js/theme-toggle.js %}
{% include js/nav-island.js %}
{% include js/copy-code.js %}
{% include js/bibtex.js %}
{% include js/pub-filter.js %}
{% include js/prefetch.js %}
