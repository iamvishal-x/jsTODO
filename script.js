const inputBox = document.querySelector(".inputField input"); //getting entered data from input field and putting it in a const variable inputBox
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");




inputBox.onkeyup = ()=>{ //creating function i guess
    let userData = inputBox.value; //getting user entered value in variable "userData"
    if (userData.trim() !=0){// if user values arent only spaces
        addBtn.classList.add("active"); //activate the add button
    } else{
        addBtn.classList.remove("active"); //deactivates the add button
    }
}

showTasks();

// if user clicks on the add button
addBtn.onclick = ()=>{ //when user click on plus icon button
    let userData = inputBox.value; //getting input field value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localstorage has no data
      listArr = []; //create a blank array
    }else{
      listArr = JSON.parse(getLocalStorage);  //transforming json string into a js object
    }
    listArr.push(userData); //pushing or adding new value in array
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks();//calling show tasks function
    addBtn.classList.remove("active"); //deactivates the add button

}

// function to add tasks list in ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localstorage has no data
        listArr = []; //create a blank array
    }else{
        listArr = JSON.parse(getLocalStorage);  //transforming json string into a js object
    }
    const pendingTasksNumb = document.querySelector(".pendingTasksNumb");
    pendingTasksNumb.textContent = listArr.length;
    if (listArr.length > 0){ //if array lenght greater than 0
        deleteAllBtn.classList.add("active"); //active the clear all button
    }else {
        deleteAllBtn.classList.remove("active"); //else deactivate the clear all button 

    }
    let newLiTag = ''; 
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input blank
    
}

//delete tasks function 
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    listArr = JSON.parse(getLocalStorage);  //transforming json string into a js object
    listArr.splice(index, 1); //delete or remove the particular indexed li
        // AFTER REMOVING THE LI AGAIN UPDATE THE LOCALSTORAGE 
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks();//calling show tasks function
   
}


//deleting all tasks function 
deleteAllBtn.onclick = ()=>{
    listArr = []; //empty array
    // AFTER REMOVING ALL TASKS AGAIN UPDATE THE LOCALSTORAGE 
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks();//calling show tasks function
}