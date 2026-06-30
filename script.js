let inputbox=document.getElementsByClassName("section")[0];
let input=document.getElementById("input");
let addbtn=document.getElementById("btn");
let taskbox=document.getElementsByClassName("main")[0];
let done=document.getElementsByClassName("done")[0];
let progfill=document.getElementsByClassName("progress-fill")[0];
//creates tasks named array by getting info from json file
let tasks=JSON.parse(localStorage.getItem("tasks"))|| [];

//save tasks in json
function savetasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function progress(){
    done.innerHTML="";
    let count=0;
    tasks.forEach((task)=>{
     if(task.completed){
        count++;
     }
    });
    let span=document.createElement("span");
    span.innerHTML=`${count} of ${tasks.length} done`;
    done.appendChild(span);
    if(tasks.length>0){
    progfill.style.width=((count/tasks.length)*100)+"%";
    }
    progfill.style.backgroundColor="#7c3aed";
    console.log(progfill);
}

function rendertasks(){
    taskbox.innerHTML="";
  tasks.forEach((task,index) => {
    const div=document.createElement("div");
    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked=task.completed;
    checkbox.classList.add("checkbox");
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
  progress();
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
progress();