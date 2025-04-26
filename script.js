const inputBox = document.getElementById("input-box");
const deadlineBox = document.getElementById("deadline-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === '') {
    alert("You Must Write Something!..");
    return;
  }
  if (inputBox.value.length > 100) {
    alert("Task too long! Please keep it under 100 characters.");
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = inputBox.value;

  if (deadlineBox.value) {
    const deadline = new Date(deadlineBox.value);
    const now = new Date();
    const timeLeft = Math.max(deadline - now, 0);
    const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

    const deadlineInfo = document.createElement("small");
    deadlineInfo.innerText = `Deadline: ${daysLeft}d ${hoursLeft}h left`;
    li.appendChild(deadlineInfo);
  }

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  listContainer.insertBefore(li, listContainer.firstChild);

  inputBox.value = '';
  deadlineBox.value = '';
  saveData();
}

listContainer.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    if(e.target.classList.contains("checked")){
      listContainer.appendChild(e.target);
    } else {
      listContainer.insertBefore(e.target, listContainer.firstChild);
    }
    saveData();
  }
  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();