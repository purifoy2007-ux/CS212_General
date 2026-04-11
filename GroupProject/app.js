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
    {
        taskTitle: "Sample Task",
        taskDesc: "This is a task description",
        taskDeadline: new Date("01/01/2001"),
        taskPriority: 1
    }
]



$("#submitTask").on("click", function () {
    taskTitle = titleField.val().trim();
    taskDesc = descField.val().trim();
    taskDeadline = deadlineField.val().trim();
    taskPriority = priorityField.val().trim();
    tasks.push({
        taskTitle: taskTitle,
        taskDesc: taskDesc,
        taskDeadline: taskDeadline,
        taskPriority: taskPriority
    });
    renderTask();
});


function renderTask() {
    $("#currTasks").html(""); // clear previous 


    tasks.forEach((task, index) => { 

        let taskItem = $(`
            <div class="task" data-index="${index}"> // keeping track of data index for when needs to delete
                <h3>${task.taskTitle}</h3>
                <p>${task.taskDesc}</p>
                <p><strong>Deadline:</strong> ${task.taskDeadline}</p>
                <p><strong>Priority:</strong> ${task.taskPriority}</p>

                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `);

        taskItem.hide().fadeIn();

        $("#currTasks").append(taskItem);
    });
}

/*



function renderTask() {
    taskContainer.innerHTML += `
        <div class="card text-center col" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title mb-4">${titles[i]}</h5>

                <p class="card-text">
                    ${descriptions[i]}
                </p>

                <img src="${images[i]}" class="card-img-top">

                <p>
                    Deadline: ${deadlines[i]}
                </p>

                <p>
                    ${daysUntilDeadline(deadlines[i])}
                </p>

                <p>
                    Status: ${status}
                </p>


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

