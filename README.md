# CSS Todo App

Basic todo app functionality implemented without using JavaScript.
Instead it uses pre-rendered HTML, the ~ combinator, CSS counters, and
the :checked and :target pseudo selectors.

Styling based on [TodoMVC](http://todomvc.com/).

## What works

- Add new todo item (up to 50 items)
- Mark items as done
- Delete items
- Filter items (done/not done)
- Show number of items left to do
- Don't allow add empty items

## What doesn't work

- Persistence after page reload
- Mark all as done
- Create item by pressing enter

## Source code

`node generate.js` creates the `index.html` file. `todos.css` contains the styles.
