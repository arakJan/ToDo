/**
 * Created by Admin on 6/23/2017.
 */
$(document).ready(function () {

})


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

