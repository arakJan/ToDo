/**
 * Created by Admin on 6/23/2017.
 */
window.onload = function () {
    var done = document.getElementById('done');
    var todo = document.getElementById('todo');
    typeof localStorage.done!='undefined' ? done.innerHTML = localStorage.done : done.innerHTML ='';
    typeof localStorage.todo!='undefined' ? todo.innerHTML = localStorage.todo : todo.innerHTML ='';
}
document.body.addEventListener('click', function(event) {
    var parent = event.target.parentNode;

    if(hasClass(event.target,'edit')){
        var textElement = parent.querySelector('p');
        textElement.setAttribute("contenteditable", true);
        textElement.focus();
    };
    if (hasClass(event.target,'delete')) {
        parent.remove();
        saveStorage();
    }
    if (event.target.type == 'checkbox') {
        moveTask(event.target.checked,event.target.parentNode);
    }
    if(event.target.id == 'new'){
        if(parent.querySelector('input').value.replace(/ /g,'') == ''){
            alert('task can not be blank');
            return false;
        }
        var taskList = document.getElementById('todo');
        var task = parent.querySelector('input').value;
        parent.querySelector('input').value = '';
        var li = document.createElement('li');
        li.innerHTML =  '<input type="checkbox" ><p class="taskText"><strong>'+ task+'</strong></p><button class="edit btn" title="Edit" class="edit"><i class="fa fa-pencil-square-o"></i></button>' +
            '<button class=" delete btn" title="Delete" class="delete"><i class="fa fa-trash-o"></i></button>'
        taskList.appendChild(li);
        saveStorage();
    }
});

document.body.addEventListener('focusout', function(event) {
    if(hasClass(event.target,'taskText') && event.target.contentEditable == 'true'){
        event.target.contentEditable = 'false';
        saveStorage()
    };
});

function moveTask(checked,task) {
    if(checked == true){
        var done = document.getElementById('done');
        done.appendChild(task);
        saveStorage()
    } else{
        var todo = document.getElementById('todo');
        todo.appendChild(task)
        saveStorage()
    }
}
function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
function saveStorage() {
    var done = document.getElementById('done');
    var todo = document.getElementById('todo');
    localStorage.done = done.innerHTML;
    localStorage.todo = todo.innerHTML;
}