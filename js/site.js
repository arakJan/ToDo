/**
 * Created by Admin on 6/23/2017.
 */
$(document).ready(function () {
    $('input[type=checkbox]').change(function () {
        if(this.checked){
           var html = $(this).parent().html();
            $(this).parent().remove();
            $('#completed-tasks').append('<li>' + html +'</li>')
        }else{
            var html = $(this).parent().html();
            $(this).parent().remove();
            $('#incomplete-tasks').append('<li>' + html +'</li>')
        }
    })
})

var edit = document.getElementsByClassName('edit');
var deleted = document.getElementsByClassName('delete');
var checked = document.getElementsByClassName('in');


for(var i=0;i<edit.length;i++){
    edit[i].addEventListener('click',editContent);
}

for(var i=0;i<deleted.length;i++){
    deleted[i].addEventListener('click',deleteTask);
}


function editContent() {
    var parent = this.parentNode;
    var textElement = parent.querySelector('p');
    textElement.setAttribute("contenteditable", true);
    textElement.focus();
}

function deleteTask() {
    var parent = this.parentNode;
    parent.remove();
}





