type TodoList = { id: number, info: string };

var 
todos: Array<TodoList> = [], 
list: Array<string> = [], 
track_todo_id: number = 0,
update_id: number = 0;

const
addScreen: HTMLDivElement = document.querySelector(".add-screen"),
newTask: HTMLButtonElement = document.querySelector("#newTask"),
addTask: HTMLButtonElement = document.querySelector("#addTask"),
newTodo: HTMLInputElement = document.querySelector("#todo-info"),
display: HTMLDivElement = document.querySelector(".tasks"),
updateTask: HTMLDivElement = document.querySelector("#updateTask");



const showAddScreen = (): void => {
    addScreen.style.display = "block";
    updateTask.style.display = "none";
    addTask.style.display = "block";
};

const showUpdateScreen = (id):void => {
    addScreen.style.display = "block";
    updateTask.style.display = "block";
    addTask.style.display = "none";
    let index : number = todos.findIndex((obj, index) => obj.id == id)
    newTodo.value = todos[index].info
    update_id = index;

};

const hideUpdateScreen = ():void => {
    addScreen.style.display = "none";
    updateTask.style.display = "none";
    clearInputs();
};

const hideAddScreen = (): void => {
    addScreen.style.display = "none";
    updateTask.style.display = "block";
};

const addTodoList = (): void => {
    let id: number = ++track_todo_id;
    let info: string = newTodo.value;
    let todo_temp: TodoList = { id: id, info: info };
    todos.push(todo_temp); //add todo tasks to array
    migrateList(todos);
    renderTodos();
    clearInputs();
    clearList();
    hideAddScreen(); // hide screen
};

const clearInputs = (): void => {
    newTodo.value = "";
};

const clearList = (): void => {
    list = [];
};

const migrateList = (arr): void => {
    arr.forEach(task => {
        let newInfo = `
            <div class="for-each-task">
                    <div class="task-info">
                        ${task.info}
                    </div>
                    <div class="task-btn-close">
                        <span class="edit" onclick='showUpdateScreen(this.id)' id='${task.id}'>
                            <i class="fa fa-edit fa-1x"></i>
                        </span>
                        &nbsp;
                        <span class="close" onclick='trackTask(this.id)' id='${task.id }'>
                            <i class="fa fa-times fa-1x"></i>
                        </span>


                    </div>
                </div>
            `
        list.push(newInfo);
    });
};


const trackTask = (taskId): void => {
    let updatedTodos: Array<TodoList> = todos.filter( (obj) => obj.id != taskId);
    todos = updatedTodos;
    migrateList(todos);
    renderTodos();
    clearList();
    emptyTodosCheck();
};

const renderTodos = (): void => {
    display.innerHTML = ""; //intialize task lists
    // append tasks
    list.forEach(tasks => {
        display.innerHTML += tasks;
    });
};

const emptyTodosCheck = (): void => {
    if (todos.length < 1)
        display.innerHTML = "No Avilable Todo List";
};

const updateTodo = ():void => {
    todos[update_id].info = newTodo.value
    update_id = 0;
    migrateList(todos);
    hideUpdateScreen();
    renderTodos();
    clearList();
    emptyTodosCheck();
};

newTask.addEventListener("click", showAddScreen);
addTask.addEventListener("click", addTodoList);
updateTask.addEventListener("click", updateTodo);
emptyTodosCheck();