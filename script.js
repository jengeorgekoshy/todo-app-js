const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");
const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach(todo => addToDo(todo))
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addToDo();
});

function addToDo(todo) {
    let todoText = input.value;

    if (todoText) {
        const lItem = document.createElement('li'); //list item
        lItem.innerText = todoText;
        todosUl.appendChild(lItem);
        input.value = '';

        lItem.addEventListener('click', () => {
            lItem.classList.toggle('completed')
            updateLS()
        });

        lItem.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            lItem.remove();
            updateLS();
        })

        updateLS();
    }
}

function updateLS() {
    const liItems = document.querySelectorAll("li");
    const todos = [];

    liItems.forEach(liItem => {
        todos.push({
            text: liItem.innerText,
            completed: liItem.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}