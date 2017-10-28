const fs = require('fs')

html = ''
css = `
#todo-1 {
    position: relative;
    padding-top: 40px;
}
.todo-input {
    left: 45px;
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    position: relative;
    margin: 0;
    width: 60%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
}
.add-checkbox-label {
    position: absolute;
    top: 0;
    right: 0px;
    width: 20%;
    cursor: pointer;
}
.todo-input:not(#todo-input-1) {
    display: none;
}
.add-checkbox-label:not(#add-checkbox-label-1) {
    display: none;
}
.todo {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}

.active-filter:target .filter-active,
.completed-filter:target .filter-completed,
.completed-filter:not(:target) .active-filter:not(:target) .filter-all {
    border-color: rgba(175, 47, 47, 0.2);
}


`

const MAX_ITEMS = 5

function generateTodo(i) {
    if (i > MAX_ITEMS) {
        return ''
    }

    function getOrder(orderWithinItem) {
        if (orderWithinItem > 100) {
            throw Error('no')
        }
        return 1000 + i * 100 + orderWithinItem
    }

    css += `
        #add-checkbox-${i}:not(:checked) ~ #todo-input-${i} {
            position: absolute;
            top: 0;

        }
        #todo-input-${i} {
            order: ${getOrder(10)};
        }
        #add-checkbox-${i} {
            display: none;
        }
        #add-checkbox-${i}:checked + input {
            border: none;
        }
        #add-checkbox-${i}:checked + input {
            order: ${getOrder(2)};
        }
        #add-checkbox-${i}:checked ~ #add-checkbox-label-${i} {
            display: none !important;
        }
        #done-checkbox-${i} {
            display: none;
        }
        #mark-done-checkbox-label-${i},
        #mark-undone-checkbox-label-${i} {
            display: none;
        }
        #add-checkbox-${i}:checked ~ #done-checkbox-${i}:not(:checked) ~ #mark-done-checkbox-label-${i} {
            display: inline-block;
            order: ${getOrder(1)};
        }
        #add-checkbox-${i}:checked ~ #done-checkbox-${i}:checked ~ #mark-undone-checkbox-label-${i} {
            display: inline-block;
            order: ${getOrder(1)};
        }
        #todo-${i + 1} {
            order: ${getOrder(90)};
        }

        .active-filter:target #add-checkbox-${i}:checked ~ #done-checkbox-${i}:checked ~ #todo-input-${i},
        .active-filter:target #add-checkbox-${i}:checked ~ #done-checkbox-${i}:checked ~ #mark-done-checkbox-label-${i},
        .active-filter:target #add-checkbox-${i}:checked ~ #done-checkbox-${i}:checked ~ #mark-undone-checkbox-label-${i} {
            display: none !important;
        }

        .completed-filter:target #add-checkbox-${i}:checked ~ #done-checkbox-${i}:not(:checked) ~ #todo-input-${i},
        .completed-filter:target #add-checkbox-${i}:checked ~ #done-checkbox-${i}:not(:checked) ~ #mark-done-checkbox-label-${i},
        .completed-filter:target #add-checkbox-${i}:checked ~ #done-checkbox-${i}:not(:checked) ~ #mark-undone-checkbox-label-${i} {
            display: none !important;
        }
    `
    if (i > 1) {
        const previousI = i - 1;
        css += `
            #add-checkbox-${previousI}:checked ~ #todo-${i} > #todo-input-${i},
            #add-checkbox-${previousI}:checked ~ #todo-${i} > #add-checkbox-label-${i} {
                display: inline-block;
            }

        `
    }

    return `
        <div id="todo-${i}" class="todo">
            <input type="checkbox" id="add-checkbox-${i}" />
            <label for="add-checkbox-${i}" class="add-checkbox-label" id="add-checkbox-label-${i}">Add</label>
            <input type="checkbox" id="done-checkbox-${i}"/>
            <label for="done-checkbox-${i}" id="mark-done-checkbox-label-${i}" class="mark-done-checkbox-label"></label>
            <label for="done-checkbox-${i}" id="mark-undone-checkbox-label-${i}" class="mark-undone-checkbox-label"></label>
            <input type="text" value="todo ${i}" id="todo-input-${i}" class="todo-input" placeholder="What needs to be done?"/>
            ${generateTodo(i + 1)}
        </div>
    `


}

html += `<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="./todomvc-app.css" />
    </head>
    <body>
        <div id="/completed" class="completed-filter">
            <div id="/active" class="active-filter">
                <section class="todoapp">
                    <header class="header">
                        <h1>todos</h1>
                    </header>
                    ${generateTodo(1)}
                    <footer class="footer" style="display: block;">
            			<span class="todo-count"><strong>2</strong> items left</span>
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

                    <div>
                        Styles based on <a href="https://github.com/tastejs/todomvc/blob/master/app-spec.md">TodoMVC CSS</a>.
                    </div>
                </section>
            </div>
        </div>
    </body>
</html>`
html += `<style>${css}</style>`

fs.writeFileSync('todo.html', html);
