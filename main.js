let inputArea = document.getElementById("task-input");

let taskButton = document.getElementById("add-task");
let taskTaps = document.querySelectorAll(".task-tap div");
taskButton.addEventListener("click", addTask);
taskButton.addEventListener("click", removeTask);
let horizontalTaps = document.querySelectorAll(".task-tap div");

let horizontalUnderline=document.getElementById("under-line")


horizontalTaps.forEach(menu=>menu.addEventListener("click",(e)=>horizontalIndicator(e)))
function horizontalIndicator(e){
    horizontalUnderline.style.left=e.currentTarget.offsetLeft +"px";
    horizontalUnderline.style.width=e.currentTarget.offsetWidth +"px";
    horizontalUnderline.style.top=
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight +"px";
}
    

inputArea.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

let taskList = [];
let filterList = [];
let mode = "all";

for (i = 0; i < taskTaps.length; i++) {
  taskTaps[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function removeTask() {
  inputArea.value = "";
}

function addTask() {
  
  let taskValue = inputArea.value
  if(taskValue == ""){
    return alert("할일을 입력하세요")
    ;
  }
  let task = {
    isComplete: false,
    taskContent: taskValue,
    id: randomID(),
  };
  taskList.push(task);
  console.log(taskList);

  inputArea.value = "";

  render();
}

function render() {
  let resultHTML = "";
  let list = [];

  if (mode == "all") {
    list = taskList;
  } else if (mode == "ing" || mode == "done") {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === false) {
      resultHTML += ` <div id="task-list"><div class="task">${list[i].taskContent}</div>
    <div class="button-box">
    <button onclick="checkButton('${list[i].id}')"><i class="fa fa-check"></i></button>
    <button onclick="deleteButton('${list[i].id}')"><i class="fa fa-trash"></i></button>
  </div></div>`;
    } else if (list[i].isComplete === true) {
      resultHTML += `<div id="task-list"> <div class="task done-line">${list[i].taskContent}</div>
    <div class="button-box">
    <button onclick="checkButton('${list[i].id}')"><i class="fa fa-check" style="color: #999999;"></i></button>
    <button onclick="deleteButton('${list[i].id}')"><i class="fa fa-trash"></i></button>
  </div></div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function filter(event) {
  if(event){
    mode = event.target.id;
  }
  filterList = [];
 

  if (mode == "all") {
    render();
  } else if (mode == "ing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
        
      }
    }render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
        
      }
    }render();
  }
}

function checkButton(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteButton(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function randomID() {
  return "id" + Math.random().toString(36).substr(2, 9);
}

