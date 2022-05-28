var todos = [], list = [], track_todo_id = 0, update_id = 0;
const addScreen = document.querySelector(".add-screen"), newTask = document.querySelector("#newTask"), addTask = document.querySelector("#addTask"), newTodo = document.querySelector("#todo-info"), display = document.querySelector(".tasks"), updateTask = document.querySelector("#updateTask");
const showAddScreen = () => {
    addScreen.style.display = "block";
    updateTask.style.display = "none";
    addTask.style.display = "block";
};
const showUpdateScreen = (id) => {
    addScreen.style.display = "block";
    updateTask.style.display = "block";
    addTask.style.display = "none";
    let index = todos.findIndex((obj, index) => obj.id == id);
    newTodo.value = todos[index].info;
    update_id = index;
};
const hideUpdateScreen = () => {
    addScreen.style.display = "none";
    updateTask.style.display = "none";
    clearInputs();
};
const hideAddScreen = () => {
    addScreen.style.display = "none";
    updateTask.style.display = "block";
};
const addTodoList = () => {
    let id = ++track_todo_id;
    let info = newTodo.value;
    let todo_temp = { id: id, info: info };
    todos.push(todo_temp); //add todo tasks to array
    migrateList(todos);
    renderTodos();
    clearInputs();
    clearList();
    hideAddScreen(); // hide screen
};
const clearInputs = () => {
    newTodo.value = "";
};
const clearList = () => {
    list = [];
};
const migrateList = (arr) => {
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
                        <span class="close" onclick='trackTask(this.id)' id='${task.id}'>
                            <i class="fa fa-times fa-1x"></i>
                        </span>


                    </div>
                </div>
            `;
        list.push(newInfo);
    });
};
const trackTask = (taskId) => {
    let updatedTodos = todos.filter((obj) => obj.id != taskId);
    todos = updatedTodos;
    migrateList(todos);
    renderTodos();
    clearList();
    emptyTodosCheck();
};
const renderTodos = () => {
    display.innerHTML = ""; //intialize task lists
    // append tasks
    list.forEach(tasks => {
        display.innerHTML += tasks;
    });
};
const emptyTodosCheck = () => {
    if (todos.length < 1)
        display.innerHTML = "No Avilable Todo List";
};
const updateTodo = () => {
    todos[update_id].info = newTodo.value;
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
