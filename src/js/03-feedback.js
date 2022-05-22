import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};
const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormTextInput, 500));

populateTextarea();

function onFormSubmit(evt) {
    evt.preventDefault();

    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

    console.log(formData);
};

function onFormTextInput(evt) {
    formData[evt.target.name] = evt.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function populateTextarea() {
    let saveInputStorage = localStorage.getItem(STORAGE_KEY);
    // const email = JSON.parse(saveInputStorage).email;
    // const message = JSON.parse(saveInputStorage).message;

    if(saveInputStorage) {
        saveInputStorage = JSON.parse(saveInputStorage);
        Object.entries(saveInputStorage).forEach(([name, value]) => {
            refs.form.elements[name].value = value;
        });
    };
};
