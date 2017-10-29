const fs = require('fs')

html = ''
css = `
#todo-1 {
    position: relative;
    padding-top: 65px;
}
body  {
    counter-reset: items-left;
}
.todo-input {
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;

    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    position: relative;
    margin: 0;
    width: calc(100% - 40px - 120px);
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
}
.created-checkbox-label {
    position: absolute;
    top: 0;
    right: 0px;
    width: 40px;
    cursor: pointer;
    background: #d6d6d6;
    font-weight: bold;
    padding: 22px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
}
.created-checkbox-label:hover {
    background: #ddd;
}
.todo-input:not(#todo-input-1) {
    display: none;
}
.created-checkbox-label:not(#created-checkbox-label-1) {
    display: none;
}
.deleted-checkbox {
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
#items-left:before {
    content: counter(items-left);
}
.mark-done-checkbox-label {
    counter-increment: items-left;
}

.mark-done-checkbox-label,
.mark-undone-checkbox-label {
    cursor: pointer;
}

.deleted-checkbox-label {
    display: none;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	transition: color 0.2s ease-out;
    text-align: center;
    opacity: 0;
    padding-top: 12px;
    padding-bottom: 11px;
}
.mark-done-checkbox-label,
.mark-undone-checkbox-label {
    padding-top: 10px;
    padding-bottom: 9px;
}

.deleted-checkbox-label:hover {
	color: #af5b5e;
}

.deleted-checkbox-label:after {
	content: '×';
}


.deleted-checkbox-label {
    cursor: pointer;
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
        #created-checkbox-${i}:not(:checked) ~ #todo-input-${i} {
            position: absolute;
            top: 0;
            padding-left: calc(15px + 40px);
            box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);

        }

        #created-checkbox-${i}:not(:checked) ~ #todo-input-${i},
        #created-checkbox-${i}:not(:checked) ~ .created-checkbox-label {
            border-bottom: 1px solid #e6e6e6;
        }

        #todo-input-${i} {
            order: ${getOrder(10)};
        }
        #created-checkbox-${i} {
            display: none;
        }

        #created-checkbox-${i}:checked + input {
            border: none;
        }
        #created-checkbox-${i}:checked + input {
            order: ${getOrder(2)};
        }
        #created-checkbox-${i}:checked ~ #created-checkbox-label-${i} {
            display: none !important;
        }
        #done-checkbox-${i} {
            display: none;
        }
        #mark-done-checkbox-label-${i},
        #mark-undone-checkbox-label-${i} {
            display: none;
        }
        #deleted-checkbox-label-${i} {
            display: none;
        }
        #created-checkbox-${i}:checked ~ #done-checkbox-${i}:not(:checked) ~ #mark-done-checkbox-label-${i} {
            display: inline-block;
            order: ${getOrder(1)};
        }
        #created-checkbox-${i}:checked ~ #done-checkbox-${i}:checked ~ #mark-undone-checkbox-label-${i} {
            display: inline-block;
            order: ${getOrder(1)};
        }
        #todo-${i + 1} {
            order: ${getOrder(90)};
        }

        #created-checkbox-${i}:checked ~ #deleted-checkbox-label-${i} {
            display: inline-block;
            order: ${getOrder(11)}
        }

        #created-checkbox-${i}:checked ~ #deleted-checkbox-label-${i}:hover,
        #created-checkbox-${i}:checked ~ .mark-undone-checkbox-label:hover ~ #deleted-checkbox-label-${i},
        #created-checkbox-${i}:checked ~ .mark-done-checkbox-label:hover ~ #deleted-checkbox-label-${i},
        #created-checkbox-${i}:checked ~ #todo-input-${i}:hover ~ #deleted-checkbox-label-${i} {
            opacity: 1;


        }

        #deleted-checkbox-${i}:checked ~ .mark-done-checkbox-label,
        #deleted-checkbox-${i}:checked ~ .mark-undone-checkbox-label,
        #deleted-checkbox-${i}:checked ~ .deleted-checkbox-label,
        #deleted-checkbox-${i}:checked ~ #todo-input-${i} {
            display: none !important;
        }

        .active-filter:target #created-checkbox-${i}:checked ~ #done-checkbox-${i}:checked ~ #todo-input-${i},
        .active-filter:target #created-checkbox-${i}:checked ~ #done-checkbox-${i}:checked ~ #mark-done-checkbox-label-${i},
        .active-filter:target #created-checkbox-${i}:checked ~ #done-checkbox-${i}:checked ~ #mark-undone-checkbox-label-${i},
        .active-filter:target #created-checkbox-${i}:checked ~ #done-checkbox-${i}:checked ~ .deleted-checkbox-label {
            display: none !important;
        }

        .completed-filter:target #created-checkbox-${i}:checked ~ #done-checkbox-${i}:not(:checked) ~ #todo-input-${i},
        .completed-filter:target #created-checkbox-${i}:checked ~ #done-checkbox-${i}:not(:checked) ~ #mark-done-checkbox-label-${i},
        .completed-filter:target #created-checkbox-${i}:checked ~ #done-checkbox-${i}:not(:checked) ~ #mark-undone-checkbox-label-${i},
        .completed-filter:target #created-checkbox-${i}:checked ~ #done-checkbox-${i}:not(:checked) ~ .deleted-checkbox-label {
            display: none !important;
        }
    `
    if (i > 1) {
        const previousI = i - 1;
        css += `
            #created-checkbox-${previousI}:checked ~ #todo-${i} > #todo-input-${i},
            #created-checkbox-${previousI}:checked ~ #todo-${i} > #created-checkbox-label-${i} {
                display: inline-block;
            }

        `
    }

    return `
        <div id="todo-${i}" class="todo">
            <input type="checkbox" id="created-checkbox-${i}" ${i <= 2 ? ' checked': ''} />
            <label for="created-checkbox-${i}" class="created-checkbox-label" id="created-checkbox-label-${i}">Add</label>
            <input type="checkbox" class="deleted-checkbox" id="deleted-checkbox-${i}" />
            <input type="checkbox" class="done-checkbox" id="done-checkbox-${i}" ${i <= 1 ? ' checked': ''} />
            <label for="done-checkbox-${i}" id="mark-done-checkbox-label-${i}" class="mark-done-checkbox-label"></label>
            <label for="done-checkbox-${i}" id="mark-undone-checkbox-label-${i}" class="mark-undone-checkbox-label"></label>
            <input type="text" value="${ {1: 'Build Todo CSS', 2: 'Eat cookies'}[i] || ''}" id="todo-input-${i}" class="todo-input" placeholder="What needs to be done?"/>
            <label for="deleted-checkbox-${i}" id="deleted-checkbox-label-${i}" class="deleted-checkbox-label"></label>
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
                        This todo app is built using just HTML and CSS, no JavaScript. It works by using pre-rendered HTML,
                        the ~ combinator, and the :checked and :target pseudo selectors.
                    </p>
                    <p style="margin-bottom: 0">
                        Styles based on <a href="http://todomvc.com/">TodoMVC</a>.
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>`
html += `<style>${css}</style>`

fs.writeFileSync('todo.html', html);
