'use strict';

//Building date from header

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

let inputValue;
let counter = 0;
let tasks = [];
let tasksDone = [];

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

dayNumberContent.innerHTML = dayNumber;
dayNameContent.innerHTML = dayName;
monthAndYearContent.innerHTML = monthName + ', ' + year;

//Bring data from Local Storage and print them.

const containerTasks = document.querySelector('.container-form-list');

function printTasks(){
    containerTasks.innerHTML = '';
    if(JSON.parse(localStorage.getItem('tasks'))){
        tasks = JSON.parse(localStorage.getItem('tasks'));
        for(let i = 0; i < tasks.length; i++){
            const newTask = document.createElement('li');
            newTask.classList.add('container-form-option');
            // newTask.addEventListener('click', handleTasks);
            const newLabel = document.createElement('label');
            newLabel.classList.add('container-form-option-label');
            newLabel.setAttribute('for', counter);
            newLabel.innerHTML = tasks[i];
            const newInput = document.createElement('input');
            newInput.classList.add('container-form-option-input');
            newInput.type = 'checkbox';
            newInput.setAttribute('name', 'tasks');
            newInput.setAttribute('id', counter);
            newInput.addEventListener('change', handleTasks);
            counter ++;
            newTask.append(newLabel, newInput);
            containerTasks.appendChild(newTask);
        }
    }
}

printTasks();

//Add task button functionality

const addButton = document.querySelector('.add-button');
const modalBackground = document.querySelector('.container-modal');
const modalWindow = document.querySelector('.container-modal-window');
const inputTask = document.querySelector('.add-task-input');

function handleWritting(e){
    inputValue = e.currentTarget.value;
}

function saveInLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function handleHideModal(){
    inputTask.value='';
    modalBackground.classList.add('hidden');
    modalWindow.classList.add('hidden');
}

function handleAddTask(){
    tasks.push(inputValue);
    saveInLocalStorage();
    printTasks();
    handleHideModal();

}

addButton.addEventListener('click', handleAddTask);
inputTask.addEventListener('keypress', handleWritting);

//Open modal button functionality

const openModalButton = document.querySelector('.container-footer-button');

function handleOpenModal(){
    inputValue='';
    modalBackground.classList.remove('hidden');
    modalWindow.classList.remove('hidden');
}

openModalButton.addEventListener('click', handleOpenModal);

//Hide Window Add Task when clicking out

const outsideWindow = document.querySelector('.container-modal');

outsideWindow.addEventListener('click', handleHideModal);

//Checkbox functionality

function handleTasks(e){
    const target = e.target;
    const id = target.id;
    let parentElement = target.parentElement;
    parentElement.classList.toggle('done');
    if(target.checked === true){
        console.log(tasks[id]);
        console.log(id);
        let itemToMoveToEnd = tasks[id];
        console.log(tasks);
        tasks.splice(id, 1); 
        // (posición en la que tienen que colocarse los elementos siguientes elementos a eliminar)
        const lastPossition = tasks.length;
        tasks.splice(lastPossition, 0, itemToMoveToEnd); 
        //(posición en la que tiene que colocarse el elemento, elementos que borrar, elemento que mover)
        console.log(tasks);
    } else {
        tasks.unshift(tasks[id]); //Lleva el elemento al inicio del array
        console.log(tasks);
        printTasks();
    }
}