const fs = require('fs')

html = '<h1>CSS Todo App</h1>'
css = `
#todo-1 {
    position: relative;
    padding-top: 40px;
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
        #add-checkbox-${i}:not(:checked) ~ #add-checkbox-label-${i} {
            position: absolute;
            top: 0;
            left: 200px;
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
            border: 1px solid #777;
            width: 15px;
            height: 15px;
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
            <input type="text" value="todo ${i}" id="todo-input-${i}" class="todo-input"/>
            <label for="add-checkbox-${i}" class="add-checkbox-label" id="add-checkbox-label-${i}">Add ${i}</label>
            <input type="checkbox" id="done-checkbox-${i}"/>
            <label for="done-checkbox-${i}" id="mark-done-checkbox-label-${i}">&nbsp;</label>
            <label for="done-checkbox-${i}" id="mark-undone-checkbox-label-${i}">&#x2713;</label>
            ${generateTodo(i + 1)}
        </div>
    `


}

html += generateTodo(1)
html += `<style>${css}</style>`

fs.writeFileSync('todo.html', html);
