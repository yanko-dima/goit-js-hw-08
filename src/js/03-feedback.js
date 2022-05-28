import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let consoleData = {};
const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormTextInput, 500));

refs.email.setAttribute("required", true);
refs.textarea.setAttribute("required", true);

populateTextarea();

function onFormTextInput(evt) {
    let formData = localStorage.getItem(STORAGE_KEY);
    refs.textarea.value = refs.textarea.value.trim();

    formData = formData ? JSON.parse(formData) : {};
    formData[evt.target.name] = evt.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function populateTextarea() {
    let saveInputStorage = localStorage.getItem(STORAGE_KEY);

    if(saveInputStorage) {
        saveInputStorage = JSON.parse(saveInputStorage);
        Object.entries(saveInputStorage).forEach(([name, value]) => {
            refs.form.elements[name].value = value;
        });
    };
};

function onFormSubmit(evt) {
    evt.preventDefault();

    consoleData.email = refs.email.value;
    consoleData.message = refs.textarea.value;

    console.table(consoleData);

    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};
