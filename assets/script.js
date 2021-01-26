let inputTaskName = document.getElementById("input-task-name");
let inputTaskDescription = document.getElementById("input-task-description");
let dataArray = [];

if (JSON.parse(localStorage.getItem("localData")) != null) {
  dataArray = JSON.parse(localStorage.getItem("localData"));
}
addTask();

document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addTask();
  }
});

function addTask(
  taskName = inputTaskName.value,
  taskDescription = inputTaskDescription.value
) {
  let out = "";
  if (taskName != "") {
    dataArray.push({
      taskNameArray: taskName,
      taskDescriptionArray: taskDescription,
      taskDone: "",
    });
  }
  dataArray.map(function (name, indx) {
    out += `
      <div class="task-container">
      <div class="task-name ${name.taskDone}" >${name.taskNameArray}   ${indx}</div> 
      <div class="task-description">${name.taskDescriptionArray}</div>
      <button data-indx="${indx}" class="task-button" onclick="taskDelete(this)">Delete</button>
      <button data-indx="${indx}" class="task-button l" onclick="taskChange(this)">Change</button>
      <button data-indx="${indx}" class="task-button" onclick="taskDone(this)">Done</button>
      
      </div>`;
  });
  document.querySelector("#el").innerHTML = " ";

  localStorage.setItem("localData", JSON.stringify(dataArray));
  document.querySelector("#el").innerHTML = out;

  let data = new Date();
  // alert(data.getDate());

  inputTaskName.value = "";
  inputTaskDescription.value = "";
}

function taskDelete(elem) {
  dataArray.splice(elem.dataset.indx, 1);

  addTask();
}
function taskChange(elem) {
  if (inputTaskName.value != "") {
    dataArray[elem.dataset.indx].taskNameArray = inputTaskName.value;

    inputTaskName.value = "";
    inputTaskDescription.value = "";

    addTask();
  }
}
function taskDone(elem) {
  if (dataArray[elem.dataset.indx].taskDone == "") {
    dataArray[elem.dataset.indx].taskDone = "done";
  } else {
    dataArray[elem.dataset.indx].taskDone = "";
  }
  addTask();
}
