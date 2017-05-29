# Accessible DataGrid

WIP.

![](http://j4p.us/1d00151e3y1L/Screen%20Shot%202017-05-29%20at%2011.30.31%20AM.png)

## Demo
[Try the demo](http://a11y-datagrid.markup.tips/).

## Screencast
[Watch the 4min screencast](https://vimeo.com/219314498) on Vimeo.

## Goals
 - Accessible Data Grid
    - Keyboard
    - Screen Reader
      - ARIA
      - `.visually-hidden` text
    - Mobile
    - Vision
      - Low Vision
      - Contrast
        - White on Black
      - Reduced Motion

## ♿️ Accessibility Proclaimer
This project strives for WCAG Level AA success criteria in all scenarios with some accessibility preference features leaning towards Level AAA. Please [log *any* a11y issues&nbsp;here](https://github.com/jpdevries/a11y-datagrid/issues).

## REST API
A robust rest API allows the data grid to be browsed by the URL all the way down to targeting specific rows, filter, and pagination settings.

### System Settings

| Route  | HTTP Verb | Description |
| ------------- | ------------- | ------------- |
| `settings/:namespace`  | `GET`  | Retrieve a list of settings in a given namespace
| `settings/:namespace?q=foo`  | `GET`  | Search for foo in a given namespace
| `settings/:namespace/:area`  | `GET`  | Retrieve a list of settings in a given area of a given namespace
| `settings/:namespace/:area/:xtype`  | `GET`  | Retrieve a list of settings of a certain xtype in a given area of a given namespace
| `settings/:namespace/?p2`  | `GET`  | Retrieve the second page of a list of settings in a given namespace
| `settings/:namespace/?s=editedon`  | `GET`  | Retrieve a list of settings in a given namespace sorted by editedon
| `settings/:namespace/?s=editedon&d=desc`  | `GET`  | Retrieve a list of settings in a given namespace sorted by editedon in descending order
| `settings/:namespace/?p2&pp=50`  | `GET`  | Showing 50 settings per page, Retrieve the second page of a list of settings in a given namespace
| `settings/:namespace/#site_status`  | `GET`  | Retrieve a list of settings in a given namespace, set target to `#site_status`

### Resources

WIP. Support options like:
 - publishedon
 - hidden from menus
 - published
 - parent

| Route  | HTTP Verb | Description |
| ------------- | ------------- | ------------- |
| `resources/:context`  | `GET`  | Retrieve a list of resources in a given context
| `resources/:context/:template`  | `GET`  | Retrieve a list of resources of a given template in a given context
| `resources/:context/:template`  | `POST`  | Create a new resource of a given template in a given context
