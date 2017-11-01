# CSS Todo App

Basic todo app functionality implemented without using JavaScript.
Instead it uses pre-rendered HTML, the ~ combinator, CSS counters, and
the :checked and :target pseudo selectors.

Styling based on [TodoMVC](http://todomvc.com/).

[Live demo](http://www.mattzeunert.com/TodoCSS/#/)  
[Blog post on how it works](http://www.mattzeunert.com/2017/10/30/javascript-free-todo-app.html)

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
