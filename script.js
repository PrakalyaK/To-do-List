let inputbox=document.getElementsByClassName("section")[0];
let input=document.getElementById("input");
let addbtn=document.getElementById("btn");
let taskbox=document.getElementsByClassName("main")[0];

//creates tasks named array by getting info from json file
let tasks=JSON.parse(localStorage.getItem("tasks"))|| [];

//save tasks in json
function savetasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function rendertasks(){
    taskbox.innerHTML="";
  tasks.forEach((task,index) => {
    const div=document.createElement("div");
    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked=task.completed;
    const span=document.createElement("span");
    span.innerHTML=task.text;
    if(task.completed){
        span.style.textDecoration="line-through";
    }
    const dele=document.createElement("button");
    dele.classList.add("delete-btn");
    dele.innerHTML='<i class="fa-solid fa-trash"></i>';
    dele.addEventListener("click",()=>{
        tasks.splice(index,1);
        savetasks();
        rendertasks();
    });
    checkbox.addEventListener("change",()=>{
        task.completed=checkbox.checked;
        savetasks();
        rendertasks();
    });
    taskbox.append(div);
    div.appendChild(checkbox);
    div.append(span);
    div.append(dele);
  })
}
//When I click add button 
//first push into tasks
//then save it in json file 
//show(render) to user
addbtn.addEventListener("click",()=>{
    if(input.value==""){
        return;
    }
    tasks.push({
      text:input.value,
      completed:false
    })
   savetasks();
   rendertasks();
   
   input.value="";
})
rendertasks();










/*let tasks=document.createElement("div");
let checkbox=document.createElement("input");
let deletebtn=document.createElement("button");
deletebtn.innerHTML='<i class="fa-solid fa-trash"></i>';
checkbox.type="checkbox";
tasks.appendChild(checkbox);
let p=document.createElement("span");
p.innerHTML=" Hello";
tasks.appendChild(p);
tasks.appendChild(deletebtn);
let taskbox=document.getElementsByClassName("main")[0];
taskbox.appendChild(tasks);*/