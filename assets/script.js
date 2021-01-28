let inputTaskName = document.getElementById("input-task-name");
let inputTaskDescription = document.getElementById("input-task-description");

// ---Getting data {dataArray, styleArray}
let dataArray = [];
let styleArray = [];
let dataArrayHistory = [];
localStorage.getItem("localData") != null
  ? (dataArray = JSON.parse(localStorage.getItem("localData")))
  : (dataArray = []);

localStorage.getItem("localStyle") != null
  ? (styleArray = JSON.parse(localStorage.getItem("localStyle")))
  : (styleArray = [{}]);

localStorage.getItem("localDataHistory") != null
  ? (dataArrayHistory = JSON.parse(localStorage.getItem("localDataHistory")))
  : (dataArrayHistory = []);

changeStyle();
updateTaskList();
updateTaskListHistory();

// ---Set Eventlisteners
document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    if (inputTaskName.value != "" || inputTaskDescription.value != "") {
      addTask();
    } else {
    }
  }
});

// ---Add a task
function addTask(
  taskName = inputTaskName.value,
  taskDescription = inputTaskDescription.value
) {
  if (taskName != "") {
    let timeofcreactionDate = new Date();
    dataArray.push({
      taskNameArray: taskName,
      taskDescriptionArray: taskDescription,
      taskDone: "",
      timeOfCreation: timeofcreactionDate.getDate(),
    });
  }

  updateTaskList();
  inputTaskName.value = "";
  inputTaskDescription.value = "";
}

// ---Update task list
function updateTaskList() {
  let out = "";
  dataArray.map(function (name, indx) {
    out += `
      <span class="task-container">
      <div class="task-name ${name.taskDone}" >${name.taskNameArray}</div> 
      <div class="task-description">${name.taskDescriptionArray}</div>
      <div class="control-container">
      <input class="change-input" id="change-input" data-input="${indx}"/>
      <div>
      <button data-indx="${indx}" data-array="dataArray" class="task-button btn" onclick="taskDelete(this,dataArray)">Delete</button>
      <button data-indx="${indx}" data-array="dataArray" class="task-button btn" onclick="taskChange(this,dataArray)">Change ${indx}</button>
      <button data-indx="${indx}" data-array="dataArray" class="task-button btn" onclick="taskDone(this,dataArray)">Done</button>
      </div>
      
      </div>

      </span>`;
  });
  //<span class="task-time">time created: ${name.timeOfCreation}</span>
  document.querySelector("#el").innerHTML = " ";
  localStorage.setItem("localData", JSON.stringify(dataArray));
  document.querySelector("#el").innerHTML = out;
}

function updateTaskListHistory() {
  let out = "";
  dataArrayHistory.map(function (name, indx) {
    out += `
      <div class="task-container deleted">
      <div class="task-name ${name.taskDone}" >${name.taskNameArray}   ${indx}</div> 
      <div class="task-description">${name.taskDescriptionArray}</div>
      <div class="control-container">
      <button data-indx="${indx}" data-array="dataArrayHistory" class="task-button btn" onclick="taskDelete(this, dataArrayHistory)">Delete</button>
      <button data-indx="${indx}" data-array="dataArrayHistory" class="task-button btn" onclick="taskRestore(this)">Restore</button>
      
      <span class="task-time">time created: ${name.timeOfCreation}</span>
      </div>
      </div>`;
  });
  /**<button data-indx="${indx}" data-array="dataArrayHistory" class="task-button l" onclick="taskChange(this, dataArrayHistory)">Change</button>
      <button data-indx="${indx}" data-array="dataArrayHistory" class="task-button" onclick="taskDone(this, dataArrayHistory)">Done</button> */
  document.querySelector("#history").innerHTML = " ";
  localStorage.setItem("localDataHistory", JSON.stringify(dataArrayHistory));
  document.querySelector("#history").innerHTML = out;
}

// ---Delete task
function taskDelete(elem, array) {
  let bufer = array.splice(elem.dataset.indx, 1);
  if (elem.dataset.array == "dataArray") {
    dataArrayHistory.push({
      taskNameArray: bufer[0].taskNameArray,
      taskDescriptionArray: bufer[0].taskDescriptionArray,
      taskDone: bufer[0].taskDone,
      timeOfCreation: bufer[0].timeOfCreation,
    });
  } else if (elem.dataset.array == "dataArrayHistory") {
  }

  localStorage.setItem("localDataHistory", JSON.stringify(dataArrayHistory));
  updateTaskListHistory();

  addTask();
}

// ---Change task
function taskChange(elem) {
  let inputName = document.querySelector(
    `.change-input[data-input="${elem.dataset.indx}"]`
  );
  document.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      if (inputName.value != "") {
        taskChange(elem);
      }
    }
  });

  inputName.classList.toggle("show");
  if (inputName.value != "") {
    dataArray[elem.dataset.indx].taskNameArray = inputName.value;
    inputName.value = "";
    inputTaskDescription.value = "";
    addTask();
  }
}
// ---Task Done
function taskDone(elem) {
  dataArray[elem.dataset.indx].taskDone == ""
    ? (dataArray[elem.dataset.indx].taskDone = "done")
    : (dataArray[elem.dataset.indx].taskDone = "");

  addTask();
}

function taskRestore(elem) {
  dataArray.push({
    taskNameArray: dataArrayHistory[elem.dataset.indx].taskNameArray,
    taskDescriptionArray:
      dataArrayHistory[elem.dataset.indx].taskDescriptionArray,
    taskDone: dataArrayHistory[elem.dataset.indx].taskDone,
    timeOfCreation: dataArrayHistory[elem.dataset.indx].timeOfCreation,
  });
  dataArrayHistory.splice(elem.dataset.indx);
  updateTaskList();
  updateTaskListHistory();
}

function historyTasks() {
  if (dataArrayHistory[0] == null) {
    alert("История чиста");
    document.getElementById("history").classList.remove("history");
  } else {
    document.getElementById("history").classList.toggle("history");
  }
}

// ---Show Property
function showProperty() {
  document.getElementById("property-block").classList.toggle("show-property");
}

// ---Change Style
function changeStyle() {
  document.body.classList.add(styleArray[0].backgroundC);
  document.body.classList.add(styleArray[0].taskFlex);

  let style = document.getElementsByName("style");

  for (let i = 0; i <= style.length - 1; i++) {
    if (style[i].checked == true) {
      styleArray = [
        { backgroundC: style[i].value, taskFlex: styleArray[0].taskFlex },
      ];

      document.body.classList.remove(
        "dark",
        "white",
        "blue",
        "coffe",
        "red-gradient"
      );
      document.body.classList.add(styleArray[0].backgroundC);
    }
  }

  let flex = document.getElementsByName("flex");
  for (let i = 0; i <= flex.length - 1; i++) {
    if (flex[i].checked == true) {
      styleArray = [
        { backgroundC: styleArray[0].backgroundC, taskFlex: flex[i].value },
      ];

      document.body.classList.remove("inline", "blocks");
      document.body.classList.add(styleArray[0].taskFlex);
    }
  }
  localStorage.setItem("localStyle", JSON.stringify(styleArray));
}
