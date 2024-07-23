let plusButton = document.getElementById("plus-btn");
let userInput = document.getElementById("user-input");
let tabs = document.querySelectorAll(".task-taps div");
let horizontalMenus= document.querySelectorAll(".task-taps div");


for (i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {filter(event);
  });
}
let horizontalUnderline=document.getElementById("under-line")

horizontalMenus.forEach(menu=>menu.addEventListener("click",(e)=>horizontalIndicator(e)))
function horizontalIndicator(e){
    horizontalUnderline.style.left=e.currentTarget.offsetLeft +"px";
    horizontalUnderline.style.width=e.currentTarget.offsetWidth +"px";
    horizontalUnderline.style.top=
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight +"px";
}

let mode = "all";
let taskList = [];
let filterList = [];

plusButton.addEventListener("click", addTask);
userInput.addEventListener("focus", inputReset);

function inputReset() {
  userInput.value = "";
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
  //내가 선택한 탭에 따라서 리스트를 달리보여준다.
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ing" || mode === "done") {
    list = filterList;
  }

  let resultHtml = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHtml += `<div class="list">
    <div class="task-done">${list[i].taskContent}</div>
    <div>
      <button onclick="toggleComplete('${list[i].id}')">check</button>
      <button onclick="deleteTask('${list[i].id}')">delete</button>
    </div>
    </div>`;
    } else {
      resultHtml += `<div class="list">
    <div>${list[i].taskContent}</div>
    <div>
      <button onclick="toggleComplete('${list[i].id}')">check</button>
      <button onclick="deleteTask('${list[i].id}')">delete</button>
    </div>
    </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHtml;
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

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "id" + Math.random().toString(16).slice(2);
}
