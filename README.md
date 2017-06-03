# sticky-header
Vanilla JavaScript module to create a header that sticks to the top of the page while you scroll.

# Usage

HTML
```html
<body>
    <header class="sticky-header"></header>
</body>
```
JavaScript
```ecmascript 6
import StickyHeader from 'sticky-header';

new StickyHeader();
//or
new StickyHeader(options);
```

# Options
| Option   | Type                       | Default value  | Notes                                                                                     |
|----------|----------------------------|----------------|-------------------------------------------------------------------------------------------|
| header   | DOM node/CSS selector      | .sticky-header | Header which will be fixed to the top of the page                                         |
| wrapper  | DOM node/CSS selector/null | null           | Wrapper which will be scrolled and will have padding added when header is fixed           |
| autoHide | bool                       | true           | Whether to hide the header when user scrolls down and show when scrolls up or show always |
