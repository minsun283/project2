
let plusButton = document.getElementById("plus-btn");
let userInput = document.getElementById("user-input");
let tabs = document.querySelectorAll(".task-taps div");

let taskList = [];

plusButton.addEventListener("click", addTask);

for(i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: userInput.value,
    isComplete: false,
  };

  taskList.push(task);
  render();
}

function render() {
  let resultHtml = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHtml += `<div class="list">
    <div class="task-done">${taskList[i].taskContent}</div>
    <div>
      <button onclick="toggleComplete('${taskList[i].id}')">check</button>
      <button onclick="deleteTask('${taskList[i].id}')">delete</button>
    </div>
    </div>`;
    } else {
      resultHtml += `<div class="list">
    <div>${taskList[i].taskContent}</div>
    <div>
      <button onclick="toggleComplete('${taskList[i].id}')">check</button>
      <button onclick="deleteTask('${taskList[i].id}')">delete</button>
    </div>
    </div>`;
    }

    document.getElementById("task-board").innerHTML = resultHtml;
  }
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
          taskList.splice(i, 1);
        }
      }
  render();
  
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete; //앞에 느낌표 넣으면 현재값의 반대값

      break;
    }
  }
  render();
}
function filter(event){
    console.log("filter", event.target.id);
    if (event.target.id==="all"){
        rander()
    }else if(event.target.id==="ing"){

    }else{

    }
}


function randomIDGenerate() {
  return "id" + Math.random().toString(16).slice(2);
}
