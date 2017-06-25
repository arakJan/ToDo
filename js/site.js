/**
 * Created by Admin on 6/23/2017.
 */
document.body.addEventListener('click', function(event) {
    var parent = event.target.parentNode;
    if(event.target.classList[0]== 'edit'){
        var textElement = parent.querySelector('p');
        textElement.setAttribute("contenteditable", true);
        textElement.focus();
    };
    if (event.target.classList[0] === 'delete') {
        parent.remove();
    }
    if (event.target.type == 'checkbox') {
        moveTask(event.target.checked,event.target.parentNode);
    }
    if(event.target.id == 'new'){
        console.log(event.target);
        var taskList = document.getElementById('incomplete-tasks');
        var task = parent.querySelector('input').value;
        var li = document.createElement('li');
        li.innerHTML =  '<input type="checkbox" ><p><em>'+ task+'</em></p><button class="edit">Edit</button><button class="delete">Delete</button>'
        taskList.appendChild(li)
    }
});

function moveTask(checked,task) {
    if(checked == true){
        var completed = document.getElementById('completed-tasks');
        completed.appendChild(task)
    } else{
        var incomplete = document.getElementById('incomplete-tasks');
        incomplete.appendChild(task)
    }
}

