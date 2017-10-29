const fs = require('fs')

html = ''

const MAX_ITEMS = 50

function generateTodo(i) {
    if (i > MAX_ITEMS) {
        return ''
    }

    return `
        <div id="todo-${i}" class="todo">
            <input type="checkbox" class="created-checkbox" id="created-checkbox-${i}" ${i <= 2 ? ' checked': ''} />

            <input type="checkbox" class="deleted-checkbox" id="deleted-checkbox-${i}" />
            <input type="checkbox" class="done-checkbox" id="done-checkbox-${i}" ${i <= 1 ? ' checked': ''} />
            <label for="done-checkbox-${i}" class="mark-done-checkbox-label"></label>
            <label for="done-checkbox-${i}" class="mark-undone-checkbox-label"></label>
            <input required type="text" value="${ {1: 'Build Todo CSS', 2: 'Eat cookies'}[i] || ''}" class="todo-input" placeholder="What needs to be done?"/>
            <label for="created-checkbox-${i}" class="created-checkbox-label">Add</label>
            <label for="deleted-checkbox-${i}" class="deleted-checkbox-label">×</label>
            <div class="items-left-counter-helper"></div>
            ${generateTodo(i + 1)}
        </div>
    `
}

html += `<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
		<title>Todo CSS</title>
        <link rel="stylesheet" href="./todomvc-app.css" />
        <link rel="stylesheet" href="./todo.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <div id="/completed" class="completed-filter">
            <div id="/active" class="active-filter">
                <section class="todoapp">
                    <header class="header">
                        <h1>todos</h1>
                    </header>
                    ${generateTodo(0)}
                    <footer class="footer" style="display: block;">
            			<span class="todo-count"><strong id="items-left"></strong> items left</span>
            			<ul class="filters">
            				<li>
            					<a class="filter-all" href="#/">All</a>
            				</li>
            				<li>
            					<a class="filter-active" href="#/active">Active</a>
            				</li>
            				<li>
            					<a class="filter-completed" href="#/completed">Completed</a>
            				</li>
            			</ul>
            		</footer>
                </section>
                <div style="line-height: 18px;background: #fafafa;border: 1px solid #eaeaea;padding: 15px;">
                    <p style="margin-top: 0">
                        This is a todo app built without using JavaScript. It works by using pre-rendered HTML,
                        the ~ combinator, CSS counters, and the :checked and :target pseudo selectors.

                    </p>
                    <p style="margin-bottom: 0">
                        <a href="https://github.com/mattzeunert/CSS-Todo-App">TodoCSS</a> on Github. Styles based on <a href="http://todomvc.com/">TodoMVC</a>.
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>`

fs.writeFileSync('index.html', html);
