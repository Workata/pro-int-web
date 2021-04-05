"use strict"; // Defines that JavaScript code should be executed in "strict mode"

//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const undoButton = document.querySelector('#undo-button');
const searchToDoInput = document.querySelector('#search-input');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', delteCheck)
undoButton.addEventListener('click', undoTodoDelete)
searchToDoInput.addEventListener('input', searchToDo)


//Functions

var lastDeletedToDo;

function todoInputValidated(){
    var todoContent = todoInput.value;
    if(todoContent === '' || todoContent === null)
    {
        alert("ToDo content cannot be blank!");
        return false
    }
    return true
}

function addTodo(event){
    // prevent form from submitting
    event.preventDefault(); 

    // ToDo input validation
    if(!todoInputValidated()) return;

    // Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    // Create 'done' date/time
    const doneDateTime = document.createElement('div');
    doneDateTime.innerText = "Done: -";
    doneDateTime.classList.add('done-date-time');
    todoDiv.appendChild(doneDateTime);

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Create complete-button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-square"> </i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Create delete-button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-times"> </i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //append todo div to list
    todoList.appendChild(todoDiv);

    // Clear Todo inpout value
    todoInput.value = "";
}

function delteCheck(event){
    //console.log(event.target);
    const item = event.target;
    // Delte todo
    if(item.classList[0] === 'delete-btn'){
        // Confirm if you really want to delete an element
        if (confirm("Do you really want to delete an element from a list?")) {
            const todo = item.parentElement;
            lastDeletedToDo = todo; // Remember last deleted element
            todo.remove();
        } 
    }

    // Check todo
    if(item.classList[0] === 'complete-btn'){
        // toggle 'completed' class
        const todo = item.parentElement.children[1];
        todo.classList.toggle("completed");

        const todoDateTime = item.parentElement.firstChild; // get date-time element

        // check if completed -> contains completed class
        if(todo.classList.contains("completed")){
            // insert completion date
            var currentTimestamp = new Date().toLocaleString();
            todoDateTime.innerText = currentTimestamp;
            todoDateTime.style.display = "flex";  // before was 'none'
            todoDateTime.style.textDecoration = "none";
        }
        else{
            todoDateTime.style.display = "none";
        }
    }

}

function undoTodoDelete(event){
    if(lastDeletedToDo != null)
    {
        todoList.appendChild(lastDeletedToDo);
        lastDeletedToDo = null;
    } 
}

function searchToDo(event){
    const searchByValue = searchToDoInput.value;
    const todoElements = todoList.childNodes;

    // if there is no input, view default list -> make all elements visible
    if(searchByValue === null || searchByValue === "")
    {
        todoElements.forEach(function(todo){
            todo.style.display = "flex"; // make this todo div disappear 
        });
        return;
    }

    todoElements.forEach(function(todo){
        const todoText = todo.children[1].innerText;    // second child -> list item with content
        // console.log(todoText);
        if(todoText.includes(searchByValue)){
            todo.style.display = "flex"; // make this todo div disappear 
        }
        else{
            todo.style.display = "none";
        }
    });
    // console.log(searchByValue);
}