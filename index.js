document.getElementById('add-task').addEventListener('click', function() {
    let taskInput = document.getElementById('task-input');
    let taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        let li = document.createElement('li');
        li.classList.add('task-box', 'todo'); // Default to To-Do class

        let taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.classList.add('task-text');

        // Create "In Progress" Button
        let inProgressButton = document.createElement('button');
        inProgressButton.textContent = 'In Progress';
        inProgressButton.classList.add('inprogress-btn');
        inProgressButton.addEventListener('click', function() {
            moveToInProgress(taskText, li);
        });

        // Create "Complete" Button
        let completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', function() {
            moveToCompleted(taskText, li);
        });

        // Create "Remove" Button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            removeTask(li);
        });

        // Append buttons and text to list item
        li.appendChild(taskSpan);
        li.appendChild(inProgressButton);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        document.getElementById('task-list').appendChild(li);
        taskInput.value = "";

        saveTasks(); // Save the updated tasks
    }
});


// Function to move tasks to "In Progress"
function moveToInProgress(task, taskElement) {
    let inProgressList = document.getElementById('inprogress-task-list');

    taskElement.classList.remove('todo');
    taskElement.classList.add('inprogress');

    // Remove "In Progress" button since it's already in progress
    taskElement.querySelector('.inprogress-btn').remove();

    // Ensure remove button is still available
    inProgressList.appendChild(taskElement);
    saveTasks();
}


// Function to move tasks to "Completed"
function moveToCompleted(task, taskElement) {
    let removedList = document.getElementById('removed-task-list');

    taskElement.classList.remove('inprogress');
    taskElement.classList.add('completed');

    // Remove all buttons except "Remove"
    taskElement.querySelectorAll('button').forEach(btn => {
        if (!btn.classList.contains('delete-btn')) {
            btn.remove();
        }
    });

    removedList.appendChild(taskElement);
    saveTasks();
}

// Clear completed tasks
document.getElementById('clear-removed').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all completed tasks?')) {
        document.getElementById('removed-task-list').innerHTML = "";
        saveTasks();
    }
});

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = {
        todo: Array.from(document.querySelectorAll('#task-list li span')).map(span => span.textContent),
        inProgress: Array.from(document.querySelectorAll('#inprogress-task-list li')).map(li => li.textContent),
        completed: Array.from(document.querySelectorAll('#removed-task-list li')).map(li => li.textContent),
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) return;

    tasks.todo.forEach(task => {
        let li = document.createElement('li');

        let taskSpan = document.createElement('span');
        taskSpan.textContent = task;
        taskSpan.classList.add('task-text');

        let inProgressButton = document.createElement('button');
        inProgressButton.textContent = 'In Progress';
        inProgressButton.classList.add('inprogress-btn');
        inProgressButton.addEventListener('click', function() {
            moveToInProgress(task, li);
        });

        let completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', function() {
            moveToCompleted(task, li);
        });

        li.appendChild(taskSpan);
        li.appendChild(inProgressButton);
        li.appendChild(completeButton);
        document.getElementById('task-list').appendChild(li);
    });

    tasks.inProgress.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task;

        let completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', function() {
            moveToCompleted(task, li);
        });

        li.appendChild(completeButton);
        document.getElementById('inprogress-task-list').appendChild(li);
    });

    tasks.completed.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task;
        document.getElementById('removed-task-list').appendChild(li);
    });
}
function removeTask(taskElement) {
    if (confirm("Are you sure you want to delete this task?")) {
        taskElement.remove();
        saveTasks(); // Save the updated list after deletion
    }
}


// Load tasks on page load
window.addEventListener('load', loadTasks);
