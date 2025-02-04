document.getElementById('add-task').addEventListener('click', function() {
    let taskInput = document.getElementById('task-input');
    let taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        let li = document.createElement('li');
        li.textContent = taskText;
        
        li.addEventListener('click', function() {
            this.classList.toggle('completed');
        });
        
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            li.remove();
        });
        
        li.appendChild(removeButton);
        document.getElementById('task-list').appendChild(li);
        taskInput.value = "";
    }
});