# PostCSS Variables

[POSTCSS](https://www.npmjs.com/package/postcss) plugin to extend variables usage within your CSS files.
This is useful when you need to share CSS variables with JS without a middle man JSON file.


## Install
```
npm install postcss-variables --save-dev
```

```javascript
import CSSVars from 'postcss-variables';

{ 
    'loader': 'postcss-loader', // (see: https://www.npmjs.com/package/postcss-loader)
    'options': {
        'plugins': [
            CSSVars()
        ]
    }
}
```

## Usage

Define variables in a :root selector.
```pcss
:root {
    --padding: 10px;
    --color: #fff;
    --align: center;
}

Use variables in CSS selectors using the var() method.
```css
.some-selector {
    color: var(--color);
    padding: var(--padding);
    text-align: var(--center);
}
```
