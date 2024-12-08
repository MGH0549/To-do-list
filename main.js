let task = document.getElementById("inp");
let sub = document.getElementById("sub");
let divTasks = document.querySelector(".tasks");
// console.log(divTasks);
let arrayOfTasks = [];
getTasksFromLocalStorage();

if (localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
sub.onclick = function () {
    if (task.value !== "") {
        addTaskToArray(task.value);
        task.value = "";
   } 
}


divTasks.addEventListener("click",(e) => {
    if (e.target.classList.contains("del")) {
        deletetasksfromlocalStorage(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")) {
        toggleStateTasks(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }


})




function addTaskToArray (task) {
     
        const taskobj = {
            id: Date.now(),
            title: task,
            completed:false
        }
        arrayOfTasks.push(taskobj);
       
    addElementsToPageFrom(arrayOfTasks);
    addTasksToLocalStorage(arrayOfTasks);
};

function addElementsToPageFrom(Tasks) { 
    divTasks.innerHTML = "";

    Tasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = ("task");
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        if (task.comleted) { 
            div.className("task done");
        }

        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Deleted"));
        div.appendChild(span);
        divTasks.appendChild(div);
         
        
    })
}

function addTasksToLocalStorage(tasks) {
     window.localStorage.setItem("tasks",  JSON.stringify(tasks));
}
function getTasksFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}


function deletetasksfromlocalStorage(taskid){

    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskid);
    
    addTasksToLocalStorage(arrayOfTasks);
}
function toggleStateTasks(task) {
    for (let i = 0; i < arrayOfTasks.length; i++){
        if (arrayOfTasks[i].id == task) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addTasksToLocalStorage(arrayOfTasks);

}