document.getElementById('add-task').addEventListener('click', function() {
    let taskInput = document.getElementById('task-input');
    let taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        let li = document.createElement('li');

        let taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.classList.add('task-text');

        // Create "Complete" Button
        let completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', function() {
            taskSpan.classList.toggle('completed');
        });

        // Create "Remove" Button
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('delete-btn');
        removeButton.addEventListener('click', function() {
            logRemovedTask(taskText);
            li.remove();
        });

        li.appendChild(taskSpan);
        li.appendChild(completeButton);
        li.appendChild(removeButton);
        document.getElementById('task-list').appendChild(li);
        taskInput.value = "";
    }
});

// Function to log removed tasks
function logRemovedTask(task) {
    let removedList = document.getElementById('removed-tasks');

    let removedItem = document.createElement('li');
    removedItem.textContent = task;

    removedList.appendChild(removedItem);
}
