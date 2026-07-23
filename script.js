const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ---------------- CREATE TASK ----------------

function createTask(task) {

    const li = document.createElement("li");
    li.classList.add("task");

    li.innerHTML = `
        <input type="checkbox">

        <span>${task}</span>

        <button class="edit-btn">✏️</button>

        <button class="delete-btn">🗑️</button>
    `;

    const deleteBtn = li.querySelector(".delete-btn");
    const editBtn = li.querySelector(".edit-btn");
    const checkbox = li.querySelector("input");
    const taskText = li.querySelector("span");

    // Edit Task
    editBtn.addEventListener("click", function () {

        const newTask = prompt(
            "Edit your task:",
            taskText.textContent
        );

        if (newTask !== null && newTask.trim() !== "") {

            taskText.textContent = newTask;

            const index = tasks.indexOf(task);

            if (index !== -1) {
                tasks[index] = newTask;
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }

        }

    });

    // Delete Task
    deleteBtn.addEventListener("click", function () {

        li.remove();

        const index = tasks.indexOf(task);

        if (index !== -1) {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

    });

    // Complete Task
    checkbox.addEventListener("change", function () {

        li.classList.toggle("completed");

    });

    taskList.appendChild(li);

}

// ---------------- ADD TASK ----------------

addBtn.addEventListener("click", function () {

    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push(taskInput.value);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    createTask(taskInput.value);

    taskInput.value = "";

});

// ---------------- LOAD SAVED TASKS ----------------

tasks.forEach(function (task) {

    createTask(task);

});