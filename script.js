const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const completed = document.querySelector("#completed");

let tasks = document.querySelectorAll(".task");

function addingDragEvents(task){
    task.addEventListener("dragenter", (e)=>{
        e.preventDefault();
        
        task.classList.add("on-hover");
    }); 

    task.addEventListener("dragleave" , (e)=>{
        e.preventDefault();
        task.classList.remove("on-hover");
    })
}

addingDragEvents(todo);
addingDragEvents(progress);
addingDragEvents(completed);