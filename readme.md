> Create adaptive CSS? It's fast and easy! With smart-grid!

## Install

```
$ npm i smart-grid --save-dev
```
##### smart-grid 2.0.0 is in beta! You can use stable version 1.1.0
## Usage

```js
var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'less', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        }
        /* 
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./path-to-your-folder', settings);
```

## Why? How does it work?

We set JS array with settings and get LESS, SCSS, SASS or Stylus file with Smart Grid.

### And what?

The fact that the standard bootstrap grid, makes us write a lot of classes in html, that spoils the structure of the code.

In the proposed version, we do not touch at all the classes in the html code, but only add the mixins to the existing selectors.

### Sample. We write
LESS
```less
.items{
    .row-flex();
    .md(justify-content, center);

    .item{
        .col();
        .size(3);
        .size-md(5);
        .size-xs(10);
    }
}
```
OR SCSS
```scss
.items{
    @include row-flex();
    @include md(justify-content, center);

    .item{
        @include col();
        @include size(3);
        @include size-md(5);
        @include size-xs(10);
    }
}
```
OR SASS
```sass
.items
    +row-flex()
    +md(justify-content, center)

    .item
        +col()
        +size(3)
        +size-md(5)
        +size-xs(10)
```
OR Stylus
```stylus
.items
    row-flex()
    md(justify-content, center)

    .item
        col()
        size(3)
        size-md(5)
        size-xs(10)
```
### And we get big CSS

```css
.items {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
}
@media screen and (max-width: 992px) {
    .items {
        justify-content: center;
    }
}
.items .item {
    box-sizing: border-box;
    margin-left: 15px;
    margin-right: 15px;
    word-wrap: break-word;
    width: calc(100% / 12 * 3 - 30px);
}
@media screen and (max-width: 992px) {
    .items .item {
        width: calc(100% / 12 * 5 - 30px);
    }
}
@media screen and (max-width: 576px) {
    .items .item {
        width: calc(100% / 12 * 10 - 30px);
    }
}
```

It's nice! But it's generate a lot of media queries.

### But after use group-css-media-queries get the same code written by hand.

```css
.items {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
}
.items .item {
    box-sizing: border-box;
    margin-left: 15px;
    margin-right: 15px;
    word-wrap: break-word;
    width: calc(100% / 12 * 3 - 30px);
}
@media screen and (max-width: 992px) {
    .items {
        justify-content: center;
    }
    .items .item {
        width: calc(100% / 12 * 5 - 30px);
    }
}
@media screen and (max-width: 576px) {
    .items .item {
        width: calc(100% / 12 * 10 - 30px);
    }
}
```

### So, ideal CSS scheme

1. Smart Grid generate libruary for LESS, SCSS, SASS or Stylus
2. We used mixins to write code quickly
3. And finaly, we used:
    - group-css-media-queries
    - autoprefixer
    - clean-css