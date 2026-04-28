console.log('Hello World')

const taskButton = document.getElementById("submitTask");
const taskContainer = document.getElementById("currTasks");
const titleField = $("#titleField");
const descField = $("#descField");
const deadlineField = $("#deadlineField");
const priorityField = $("#priorityField");

let taskTitle = "Task Title";
let taskDesc = "Task Description";
let taskDeadline = new Date("01/01/2001");
let taskPriority = 1;

const tasks = [
    /*
    {
        taskTitle: "Sample Task",
        taskDesc: "This is a task description",
        taskDeadline: new Date("01/01/2001"),
        taskPriority: 1
    }
    */
]

// --- NEW: Theme & Sort Listeners ---
$('#themeToggle').on('click', function() {
    $('body').toggleClass('dark-mode');
});

$('#sortDateBtn').on('click', function() {
    tasks.sort((a, b) => a.taskDeadline - b.taskDeadline);
    renderTask();
});

$("#submitTask").on("click", function () {
    // get the info from the form
    taskTitle = titleField.val().trim();
    taskDesc = descField.val().trim();
    taskDeadline = deadlineField.val();
    taskPriority = priorityField.val();

    tasks.push({
        // actually add the info to the array using the vars
        taskTitle: taskTitle,
        taskDesc: taskDesc,
        taskDeadline: new Date(taskDeadline + "T00:00:00"),
        taskPriority: taskPriority,
        completed: false // added to track pending/completed layout
    });

    renderTask();
    
    // Clear inputs after adding
    titleField.val("");
    descField.val("");
    deadlineField.val("");
    priorityField.val("");
});

// edit btn, NOT YET FINISHED
$("#currTasks").on("click", ".edit-btn", function () {
    // Logic for editing goes here
});

// NEW: Toggle completion for the Dashboard layout
$("#currTasks").on("change", ".task-checkbox", function () {
    let index = $(this).closest(".task").data("index");
    tasks[index].completed = $(this).is(':checked');
    renderTask();
});

// DELETE (with animation)
$("#currTasks").on("click", ".delete-btn", function () {
    let index = $(this).parent().data("index");
    let item = $(this).parent();

    item.slideUp(300, function () {
        //removeSkill(index, renderSkills); I'm just going to code the function in-line
        tasks.splice(index, 1); // fixes the issue with tasks appearing back
        renderTask(); 
// CURRENT BUG: adding a task after deleting one will bring the deleted back again (solved)
    });
});

function renderTask() {
    $("#currTasks").html(""); 
// clear previous
    
    // counters for the new Dashboard layout
    let pending = 0;
    let completed = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    tasks.forEach((task, index) => {
        // Track status for counters
        if (task.completed) completed++; else pending++;

        // keeping track of data index
        let status = "Ongoing";
        let isOverdue = false;
        
        let deadline = new Date(task.taskDeadline);
        deadline.setHours(0, 0, 0, 0);

        // some bugs over dates and "Due today"
        if (task.completed) {
            status = "Completed";
        } else if (deadline > today) {
            status = "Ongoing";
        } else if (deadline < today) {
            status = "Overdue"; 
// modified "Completed" to "Overdue" for pending tasks
            isOverdue = true;
        } else {
            status = "Due Today";
        }

        let taskItem = $(`
            <div class="task ${isOverdue ? 'overdue' : ''}" data-index="${index}">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <h3 style="${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${task.taskTitle}</h3>
                <p>${task.taskDesc}</p>
                <p><strong>Deadline:</strong> ${deadline.toDateString()} - <b>${status}</b></p>
                <p><strong>Priority:</strong> ${task.taskPriority}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `);

        taskItem.hide().fadeIn();
        $("#currTasks").append(taskItem);
    });

    // Update the Dashboard Layout counts
    $("#pendingCount").text(pending);
    $("#completedCount").text(completed);
    $("#totalCount").text(tasks.length);
}

/* examples from my own previous projects
function render() {
  taskContainer.innerHTML += `
  <div class="card text-center col" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title mb-4">${titles[i]}</h5>
    <p class="card-text">
      ${descriptions[i]}
    </p>
    <img src="${images[i]}" class="card-img-top">
    <p> Deadline: ${deadlines[i]} </p>
    <p> ${daysUntilDeadline(deadlines[i])} </p>
    <p> Status: ${status} </p>
  </div>
</div>
  `;
}
*/

/* example array:
const projects = [
  {
    title: "3D scan-based Animations",
    description: "I utilize 3D scanning technology to bring animations to the real world, bringing imagination to life as dragons soar across the skies of Flagstaff or Legos that come to life on NAU campus.",
    deadline: new Date("12/11/2023"),
    imageURL: "./scanner.png"
  },
  {
    title: "Pen-Pal Program",
    description: "I have been working on an app to make being pen-pals easier, with age verification and in-app translators so kids can expand their cultural horizons.",
    deadline: new Date("01/25/2027"),
    imageURL: "./penpal.jpg"
  },
  {
    title: "AR-based Learning",
    description: "I am using AR to make learning interactive!",
    deadline: new Date("04/04/2026"),
    imageURL: "./ar_app_image.jpeg"
  }
];

const project = projects[i]; //using this instead of having to do projects[i].title if that's okay
const status = project.deadline > new Date() ? "Ongoing" : (project.deadline < new Date() ? "Completed" : "Due Today");

projects.push({
    title: "3D scan-based Animations",
    description: "I utilize 3D scanning technology...",
    deadline: new Date("12/11/2023"),
    imageURL: "./scanner.png"
  });
*/


