const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const completed = document.querySelector("#completed");

//first render...........
localStorage.setItem("todo" , JSON.stringify([]));
localStorage.setItem("inProgress" , JSON.stringify([]));
localStorage.setItem("completed" , JSON.stringify([]));

const renderaAll = ()=>{
    let tododata = JSON.parse(localStorage.getItem("todo"))
    let temp2 = ""; 
    tododata.forEach((ele)=>{
        var temp = `<div draggable="true" class="task">
                        <h3>${ele[0]}</h3>
                        <p>${ele[1]}</p>
                        <button>Delete</button>
                    </div>`
        temp2 = temp + temp2;
    })
    console.log(temp2);
    todo.querySelector(".bottom").innerHTML = temp2;

    let inProgData = JSON.parse(localStorage.getItem("inProgress"))
    temp2 = "";
    inProgData.forEach((ele)=>{
        var temp = `<div draggable="true" class="task">
                        <h3>${ele[0]}</h3>
                        <p>${ele[1]}</p>
                        <button>Delete</button>
                    </div>`
        temp2 = temp + temp2;
    })
    progress.querySelector(".bottom").innerHTML = temp2;


    let completedData = JSON.parse(localStorage.getItem("completed"))
    temp2 = "";
    completedData.forEach((ele)=>{
        var temp = `<div draggable="true" class="task">
                        <h3>${ele[0]}</h3>
                        <p>${ele[1]}</p>
                        <button>Delete</button>
                    </div>`
        temp2 = temp + temp2;
    })
    completed.querySelector(".bottom").innerHTML = temp2;
}
renderaAll();

// -------------------------------------------------

let dragedEle = null;

function counting(){
    let clm = document.querySelectorAll(".task-column");
    clm.forEach((cl)=>{
        cl.querySelector(".heading").querySelector("div").innerText = cl.querySelector(".bottom").childElementCount;
    });
};
counting();

const modifyCol = ()=>{
    var temp = [];
    todo.querySelectorAll(".bottom .task").forEach((ele)=>{
        temp.push([ele.querySelector("h3").innerText , ele.querySelector("p").innerText]);
    })
    localStorage.setItem("todo" , JSON.stringify(temp));
    
    var temp = [];
    progress.querySelectorAll(".bottom .task").forEach((ele)=>{
        temp.push([ele.querySelector("h3").innerText , ele.querySelector("p").innerText]);
    })
    localStorage.setItem("inProgress" , JSON.stringify(temp));
    
    var temp = [];
    completed.querySelectorAll(".bottom .task").forEach((ele)=>{
        temp.push([ele.querySelector("h3").innerText , ele.querySelector("p").innerText]);
    })
    localStorage.setItem("completed" , JSON.stringify(temp));
    
}



let tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
    task.addEventListener("dragstart" , ()=>{
        dragedEle = task;
        // console.log(dragedEle);
        dragedEle.style.opacity = "1";
    });

    task.querySelector("button").addEventListener("click" , ()=>{
        task.parentElement.removeChild(task);
        modifyCol();
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
        modifyCol();
        console.log("droped");
        

    })
}

addingDragEvents(todo);
addingDragEvents(progress);
addingDragEvents(completed);

// ADDING NEW TASKS INTO TODO----------------------


// STYLEING ADDING ELEMENT--------------------------------------

const addtask = document.querySelector("#addtask");

addtask.addEventListener("click",()=>{
    document.querySelector("#newtaskDetOut").classList.remove("hide");
})

// filling details----------

const newtaskdet = document.querySelector("#newtaskDetIn");

newtaskdet.addEventListener("submit" , (e)=>{
    e.preventDefault();
    console.dir(newtaskdet)
    console.log("broo");
    let task = newtaskdet.children[0].value;
    let disc = newtaskdet.children[1].value;

    newtaskdet.children[0].value = "";
    newtaskdet.children[1].value = "";


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
        dragedEle.style.opacity = "1";
    });
    
    out.querySelector("button").addEventListener("click" , ()=>{
        out.parentElement.removeChild(out);
        counting();
    })

    modifyCol();
    
   document.querySelector("#newtaskDetOut").classList.add("hide");
})

// Deleting all tasks

const deltask = document.querySelector("#deltask");
deltask.addEventListener("click" , ()=>{
    console.log(document.querySelectorAll(".bottom"));
    document.querySelectorAll(".bottom").forEach((ele)=>{
        ele.innerHTML = "";
    });
    modifyCol()
    counting();
})