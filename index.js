document.getElementById('add-task').addEventListener('click', function() {
    let taskInput = document.getElementById('task-input');
    let taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        let li = document.createElement('li');

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
    }
});

// Function to move tasks to "In Progress"
function moveToInProgress(task, taskElement) {
    let inProgressList = document.getElementById('inprogress-task-list');

    let inProgressItem = document.createElement('li');
    inProgressItem.textContent = task;

    // Create "Complete" button for In Progress tasks
    let completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.classList.add('complete-btn');
    completeButton.addEventListener('click', function() {
        moveToCompleted(task, inProgressItem);
    });

    inProgressItem.appendChild(completeButton);
    inProgressList.appendChild(inProgressItem);

    // Remove from To-Do list
    taskElement.remove();
}

// Function to move tasks to "Completed"
function moveToCompleted(task, taskElement) {
    let removedList = document.getElementById('removed-task-list');

    let removedItem = document.createElement('li');
    removedItem.textContent = task;

    removedList.appendChild(removedItem);

    taskElement.remove();
}

// Clear completed tasks
document.getElementById('clear-removed').addEventListener('click', function() {
    document.getElementById('removed-task-list').innerHTML = "";
});
