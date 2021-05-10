//Selectors
    const todoInput=document.querySelector('.todo-input');
    const todoButton=document.querySelector('.todo-button');
    const todoContainer=document.querySelector('.todo-container');
    const todoList=document.querySelector('.todo-list');
    const filterOption=document.querySelector('.filter-todo');

//Event Listeners
    document.addEventListener('DOMContentLoaded',getToDO);
    todoButton.addEventListener("click",addToDo);
    todoList.addEventListener("click",deleteCheck);
    filterOption.addEventListener("click",filterToDo);

//Functions:
    //Function:Add To List
    function addToDo(event){
        event.preventDefault(); //prevents default submission behaviour of submission
        
        //Creating <div> element to conain the <li>,<button>,<button>
        //Button 1-> Check. Button 2->Delete
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');

        //Create <li>
        const newtodo=document.createElement('li');
        newtodo.innerText=todoInput.value;
        newtodo.classList.add('todo-item');


        //Create <button>
        const checkButton=document.createElement('button');
        const deleteButton=document.createElement('button');

        checkButton.innerHTML='<i class="fas fa-check"></i>';
        checkButton.classList.add('check-btn');

        deleteButton.innerHTML='<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');


        //Append the childs to <div> 
        todoDiv.appendChild(newtodo);
        todoDiv.appendChild(checkButton);
        todoDiv.appendChild(deleteButton);
        
        //Append the <div> to <ul>
        todoList.appendChild(todoDiv);

        //Add todos to local storage
        saveToDoLocal(todoInput.value);

        //Clearing the <input> field
        todoInput.value=""; 

    }
    //Function:Check/Delete the <li>
    function deleteCheck(event){
        const item=event.target;
        if(item.classList[0]==='delete-btn'){
            item.parentElement.classList.add('fall');
            deleteLocalToDos(item.parentElement);
            item.parentElement.addEventListener('transitionend',function(target){
                    item.parentElement.remove();
            });
        }
        else if(item.classList[0]==='check-btn'){
            item.parentElement.classList.toggle('completed');
        }
        
    }
    //Function:Filter ToDoList
    function filterToDo(event){
        const todos=todoList.childNodes;
        todos.forEach(function(todo){
            switch(event.target.value){
                case "all":
                    todo.style.display='flex';
                    break;
                case "completed":
                    if(todo.classList.contains('completed')){
                        todo.style.display='flex';                
                    }
                    else{
                        todo.style.display ='none';
                    }
                    break;
                case "uncompleted":
                    if(todo.classList.contains('completed')){
                        todo.style.display='none';                
                    }
                    else{
                        todo.style.display ='flex';
                    }
                    break;
            }
        });
    }
    //Function:Saving in local storage
    function saveToDoLocal(todo){
        var todos;
        if(localStorage.getItem('todos')===null){
            todos=[];        
        }        
        else{
            todos=JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos',JSON.stringify(todos));        
    }
    //Function:Get Todo 
    function getToDO(){
        var todos;
        if(localStorage.getItem('todos')===null){
            todos=[];        
        }        
        else{
            todos=JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(function(todo){
        //Creating <div> element to conain the <li>,<button>,<button>
        //Button 1-> Check. Button 2->Delete
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');

        //Create <li>
        const newtodo=document.createElement('li');
        newtodo.innerText=todo;
        newtodo.classList.add('todo-item');


        //Create <button>
        const checkButton=document.createElement('button');
        const deleteButton=document.createElement('button');

        checkButton.innerHTML='<i class="fas fa-check"></i>';
        checkButton.classList.add('check-btn');

        deleteButton.innerHTML='<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');


        //Append the childs to <div> 
        todoDiv.appendChild(newtodo);
        todoDiv.appendChild(checkButton);
        todoDiv.appendChild(deleteButton);
        
        //Append the <div> to <ul>
        todoList.appendChild(todoDiv);
        });

    }
    //Function:Remove Local Stored ToDo's
    function deleteLocalToDos(todo){
        var todos;
        if(localStorage.getItem('todos')===null){
            todos=[];        
        }        
        else{
            todos=JSON.parse(localStorage.getItem('todos'));
        }
        
        const todoIndex=todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex),1);
        localStorage.setItem('todos',JSON.stringify(todos));
    }