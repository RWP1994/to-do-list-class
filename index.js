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

        li.appendChild(taskSpan);
        li.appendChild(inProgressButton);
        li.appendChild(completeButton);
        document.getElementById('task-list').appendChild(li);
        taskInput.value = "";

        saveTasks(); // Save the updated tasks
    }
});


// Function to move tasks to "In Progress"
function moveToInProgress(task, taskElement) {
    let inProgressList = document.getElementById('inprogress-task-list');

    taskElement.classList.remove('todo'); // Remove To-Do class
    taskElement.classList.add('inprogress'); // Add In Progress class

    // Remove "In Progress" button and keep "Complete" button
    taskElement.querySelector('.inprogress-btn').remove();

    inProgressList.appendChild(taskElement);
    saveTasks(); // Save the updated tasks
}

// Function to move tasks to "Completed"
function moveToCompleted(task, taskElement) {
    let removedList = document.getElementById('removed-task-list');

    taskElement.classList.remove('inprogress'); // Remove In Progress class
    taskElement.classList.add('completed'); // Add Completed class

    // Remove all buttons once completed
    taskElement.querySelectorAll('button').forEach(btn => btn.remove());

    removedList.appendChild(taskElement);
    saveTasks(); // Save the updated tasks
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

// Load tasks on page load
window.addEventListener('load', loadTasks);
