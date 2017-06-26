/**
 * Created by Admin on 6/23/2017.
 */
window.onload = function () { // on page load, fill fields with tasks from localstorage
    var done = document.getElementById('done');
    var todo = document.getElementById('todo');
    if(typeof localStorage.done!='undefined'){
        done.innerHTML = localStorage.done
        var checkbox = done.getElementsByTagName('input');
        for(var i=0;i<checkbox.length;i++){
            checkbox[i].checked = true;
        }
    }else{
        done.innerHTML =''
    }
    typeof localStorage.todo!='undefined' ? todo.innerHTML = localStorage.todo : todo.innerHTML ='';
};
document.body.addEventListener('click', function(event) { // add event listeners for several conditions, bot dynamically loaded content and already loaded content
    var parent = event.target.parentNode; // parent of clicked element
    if(hasClass(event.target,'edit')){ // if clicked button is edit button, enable editing
        var textElement = parent.querySelector('p');
        textElement.setAttribute("contenteditable", true);
        textElement.focus();
    }
    if (hasClass(event.target,'delete')) { // if clicked button is delete button, delete task
        parent.remove();
        saveStorage();
    }
    if (hasClass(event.target,'sortTodo')) { // if clicked button is sort button for todo tasks
        var icon = event.target.querySelector('i');
        if(hasClass(icon,'fa-sort-alpha-asc')){
            sortTasks('todo',false);
            icon.classList.remove('fa-sort-alpha-asc');
            icon.className += ' fa-sort-alpha-desc'
        } else if(hasClass(icon,'fa-sort-alpha-desc')){
            sortTasks('todo',true);
            icon.classList.remove('fa-sort-alpha-desc');
            icon.className += ' fa-sort-alpha-asc'
        }
    }
    if (hasClass(event.target,'sortDone')) { // if clicked button is sort button for todo tasks
        var icon = event.target.querySelector('i');
        if(hasClass(icon,'fa-sort-alpha-asc')){
            sortTasks('done',false);
            icon.classList.remove('fa-sort-alpha-asc');
            icon.className += ' fa-sort-alpha-desc'
        } else if(hasClass(icon,'fa-sort-alpha-desc')){
            sortTasks('done',true);
            icon.classList.remove('fa-sort-alpha-desc');
            icon.className += ' fa-sort-alpha-asc'
        }
    }
    if (event.target.type == 'checkbox') { // if checkbox has changed, move task
        moveTask(event.target.checked,event.target.parentNode);
    }
    if(event.target.id == 'new'){  // if add task is clicked, add it
        if(parent.querySelector('input').value.replace(/ /g,'') == ''){
            alert('task can not be blank');
            return false;
        }
        var taskList = document.getElementById('todo');
        var task = parent.querySelector('input').value;
        parent.querySelector('input').value = '';
        var li = document.createElement('li');
        li.innerHTML =  '<input type="checkbox"><p class="taskText"><strong>'+ task+'</strong></p><button class="edit btn" title="Edit" class="edit"><i class="fa fa-pencil-square-o"></i></button>' +
            '<button class=" delete btn" title="Delete" class="delete"><i class="fa fa-trash-o"></i></button>';
        taskList.appendChild(li);
        saveStorage();
    }
});

document.body.addEventListener('focusout', function(event) { // when done task editing, disable editing
    if(hasClass(event.target,'taskText') && event.target.contentEditable == 'true'){
        event.target.contentEditable = 'false';
        saveStorage()
    }
});

function moveTask(checked,task) { // if checkbox is checked, add to completed list, else add to ToDo list
    if(checked == true){
        task.querySelector('input').checked = true;
        var done = document.getElementById('done');
        done.appendChild(task);
        console.log(done);
        saveStorage()
    } else{
        task.querySelector('input').checked = false;
        var todo = document.getElementById('todo');
        todo.appendChild(task);
        saveStorage()
    }
}
function hasClass(elem, className) { // check if element has specified class or not
    return elem.className.split(' ').indexOf(className) > -1;
}
function saveStorage() { // save in storage
    var done = document.getElementById('done');
    var todo = document.getElementById('todo');
    localStorage.done = done.innerHTML;
    localStorage.todo = todo.innerHTML;
}

function sortTasks(ul, sortDescending) { // sort ul li elements, depending on 2nd passed argument, sort descending
    ul = document.getElementById(ul);
    var tasks = ul.getElementsByTagName("li");
    var vals = [];
    for(var i = 0, l = tasks.length; i < l; i++){
        vals.push(tasks[i].innerHTML);
    }
    vals.sort();
    if(sortDescending){
        vals.reverse();
    }
    for( i = 0, l = tasks.length; i < l; i++){
        tasks[i].innerHTML = vals[i];
    }
    saveStorage();
}