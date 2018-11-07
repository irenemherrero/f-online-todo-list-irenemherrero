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

//Add task button functionality

const addButton = document.querySelector('.add-button');
const modalBackground = document.querySelector('.container-modal');
const modalWindow = document.querySelector('.container-modal-window');

function handleHideModal(){
    modalBackground.classList.add('hidden');
    modalWindow.classList.add('hidden');
}
function handleAddTask(){
    //logic adding tasks
    handleHideModal();
}



addButton.addEventListener('click', handleAddTask);

//Open modal button functionality

const openModalButton = document.querySelector('.container-footer-button');

function handleOpenModal(){
    modalBackground.classList.remove('hidden');
    modalWindow.classList.remove('hidden');
}

openModalButton.addEventListener('click', handleOpenModal);
