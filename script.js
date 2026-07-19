const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const completed = document.querySelector("#completed");

let dragedEle = null;

function counting(){
    let clm = document.querySelectorAll(".task-column");
    clm.forEach((cl)=>{
        cl.querySelector(".heading").querySelector("div").innerText = cl.querySelector(".bottom").childElementCount;
    });
};
counting();


let tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
    task.addEventListener("dragstart" , ()=>{
        dragedEle = task;
        console.log(dragedEle);
        dragedEle.style.opacity = "1";
    });

    task.querySelector("button").addEventListener("click" , ()=>{
        task.parentElement.removeChild(task);
        counting();
    })

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
        clm.querySelector(".bottom").appendChild(dragedEle);
        clm.classList.remove("on-hover");
        counting();
    })
}

addingDragEvents(todo);
addingDragEvents(progress);
addingDragEvents(completed);

// ADDING NEW TASKS INTO TODO----------------------

const addtask = document.querySelector("#addtask");
addtask.addEventListener("click" , ()=>{
    let task = prompt("enter the task Name");
    let disc = prompt("enter what you want to do.");

    let out = document.createElement("div");
    out.setAttribute("draggable" , "true");
    out.classList.add("task");

    let h3 = document.createElement("h3");
    h3.innerText = task;
    let p = document.createElement("p");
    p.innerText = disc;
    let del = document.createElement("button");
    del.innerText = "Delete";

    out.append(h3 , p , del);
    todo.querySelector(".bottom").appendChild(out);
    counting();

    out.addEventListener("dragstart" , ()=>{
        dragedEle = out;
        console.log(dragedEle);
        dragedEle.style.opacity = "1";
    });

    out.querySelector("button").addEventListener("click" , ()=>{
        out.parentElement.removeChild(out);
        counting();
    })
});