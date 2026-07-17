const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const completed = document.querySelector("#completed");

let dragedEle = null;

let tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
    task.addEventListener("dragstart" , ()=>{
        dragedEle = task;
        console.log(dragedEle);
        dragedEle.style.opacity = "1";
    });

    

});

function addingDragEvents(clm){
    clm.addEventListener("dragenter", (e)=>{
        e.preventDefault();
        
        clm.classList.add("on-hover");
    }); 

    clm.addEventListener("dragleave" , (e)=>{
        e.preventDefault();
        clm.classList.remove("on-hover");
    });

    clm.addEventListener("dragover", (e)=>{
        e.preventDefault();
    })

    clm.addEventListener("drop" , (e)=>{
        e.preventDefault();
        clm.appendChild(dragedEle);
        clm.classList.remove("on-hover");
    })
}

addingDragEvents(todo);
addingDragEvents(progress);
addingDragEvents(completed);