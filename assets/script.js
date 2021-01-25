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
    });
  }
  dataArray.map(function (name) {
    out += `
      <div class="task-container">
      <div class="task-name">${name.taskNameArray}</div> 
      <div class="task-description">${name.taskDescriptionArray}</div>
      <button onclick="taskDelete(this)">Delete</button>
      </div>`;
  });
  alert(dataArray);
  document.querySelector("#el").innerHTML = " ";

  localStorage.setItem("localData", JSON.stringify(dataArray));
  document.querySelector("#el").innerHTML = out;

  let data = new Date();

  // alert(data.getDate());

  inputTaskName.value = "";
  inputTaskDescription.value = "";
  taskBool = false;
}

function taskDelete(elem) {
  dataArray.splice(0, 1);
  alert(dataArray);
  addTask();
}
