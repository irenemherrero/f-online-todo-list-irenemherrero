'use strict';

const allMonths = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

const allDays = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
];

let newTask = {
    value: '',
    checked: false,
    index: '',
};

let tasks = [];
let date = new Date;
let dayNumber = date.getDate(); //Number of the day (0-31)
let dayOfTheWeek = date.getDay() - 1;
let month = date.getMonth();
let year = date.getFullYear();
let monthName = allMonths[month]; //Name of the month
let dayName = allDays[dayOfTheWeek]; //Name of the day
let dayNumberContent = document.querySelector('.container-header-date-numberday');
let dayNameContent = document.querySelector('.container-header-date-daymonthyear-day');
let monthAndYearContent = document.querySelector('.container-header-date-daymonthyear-monthyear');

const containerTasks = document.querySelector('.container-form-list');
const addButton = document.querySelector('.add-button');
const modalBackground = document.querySelector('.container-modal');
const modalWindow = document.querySelector('.container-modal-window');
const inputTask = document.querySelector('.add-task-input');
const openModalButton = document.querySelector('.container-footer-button');
const outsideWindow = document.querySelector('.container-modal');

//Print date on header

dayNumberContent.innerHTML = dayNumber;
dayNameContent.innerHTML = dayName;
monthAndYearContent.innerHTML = monthName + ', ' + year;

//Print tasks from Local Storage

function printTasks(){
    containerTasks.innerHTML = '';
    if(JSON.parse(localStorage.getItem('tasks'))){
        tasks = JSON.parse(localStorage.getItem('tasks'));
        for(let i = 0; i < tasks.length; i++){
            const newTask = document.createElement('li');
            newTask.classList.add('container-form-option');
            const newLabel = document.createElement('label');
            newLabel.classList.add('container-form-option-label');
            newLabel.setAttribute('for', tasks[i].index);
            newLabel.innerHTML = tasks[i].value;
            const newInput = document.createElement('input');
            newInput.classList.add('container-form-option-input');
            newInput.type = 'checkbox';
            newInput.setAttribute('name', 'tasks');
            newInput.setAttribute('id', tasks[i].index);
            newInput.addEventListener('change', handleTasks);
            if(tasks[i].checked === true){
                newTask.classList.add('done'); 
                newInput.checked = true; 
            }
            newTask.append(newLabel, newInput);
            containerTasks.appendChild(newTask);
        }
    }
}

printTasks();

//Handle creating new task

function handleWritting(e){
    newTask.value = e.currentTarget.value;
}

//Reorder index of task array

function reorderIndex(){
    tasks.map((item, index) => {
        return item.index = index;
    });
}

//Save data in Local Storage
function saveInLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Hide Modal

function handleHideModal(){
    inputTask.value='';
    modalBackground.classList.add('hidden');
    modalWindow.classList.add('hidden');
}

//Handle add task

function handleAddTask(){
    tasks.unshift(newTask);
    reorderIndex();
    saveInLocalStorage();
    printTasks();
    handleHideModal();
}

//Open modal

function handleOpenModal(){
    modalBackground.classList.remove('hidden');
    modalWindow.classList.remove('hidden');
}

//Checkbox functionality

function handleTasks(e){
    const id = e.target.id; //indice del elemento en array
    const itemToMove = tasks[id];
    if(itemToMove.checked === false){
        const lastPossition = tasks.length;
        itemToMove.checked = true;
        tasks.splice(id, 1); 
        tasks.splice(lastPossition, 0, itemToMove); 
        reorderIndex();
        saveInLocalStorage();
        printTasks();
    } else {
        itemToMove.checked = false;
        tasks.splice(id,1);
        tasks.splice(0,0,itemToMove);
        reorderIndex();
        saveInLocalStorage();
        printTasks();
    }
}

//Trigger handleAddTask function when pressing enter

function enterTrigger(e){
    if(e.keyCode === 13){
        handleAddTask();
    }
}

addButton.addEventListener('click', handleAddTask);
inputTask.addEventListener('keyup', enterTrigger);
inputTask.addEventListener('change', handleWritting);
openModalButton.addEventListener('click', handleOpenModal);
outsideWindow.addEventListener('click', handleHideModal);