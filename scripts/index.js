import { addRippleEffect } from './rippleEffect.js';
import { editText } from './edit.js';
import { downloadPDF } from './downloadPDF.js';

const nameBox = document.querySelector(".name_box");
const languagesBox = document.querySelector(".languages_box");
const experienceBox = document.querySelector('.experience_box');
const toolsBox = document.querySelector(".tools_box");
const educationBox = document.querySelector(".education_box");
const interestsBox = document.querySelector(".interests_box");
const contactsBox = document.querySelector('.contacts_box');
const profileImageBox = document.querySelector('.profile-img_box');

const boxes = [nameBox, languagesBox, experienceBox, toolsBox, educationBox, interestsBox, contactsBox, profileImageBox];

//ripple effect
boxes.forEach(box => {
    if (box) {
        box.addEventListener('click', addRippleEffect);
    }
});

//загружаем сохранененные элементы
const editableElements = document.querySelectorAll(".editable");

window.addEventListener("load", () => {
    editableElements.forEach((element) => {
        const localStorageKey = element.dataset.localStorageKey;
        const savedContent = localStorage.getItem(localStorageKey);
        if (savedContent) {
            element.textContent = savedContent;
        }
    });
});

window.addEventListener("beforeunload", () => {
    editableElements.forEach((element) => {
        const localStorageKey = element.dataset.localStorageKey;
        localStorage.setItem(localStorageKey, element.textContent);
    });
});

//секция name_box
const userName = document.querySelector(".user-info_name");
const userRole = document.querySelector(".user-info_role");

userName.dataset.localStorageKey = "userName";
userRole.dataset.localStorageKey = "userRole";

userName.addEventListener("dblclick", () => editText(userName, nameBox));
userRole.addEventListener("dblclick", () => editText(userRole, nameBox));

//секция languages_box
const languageItems = document.querySelectorAll(".languages-list_item_name");

languageItems.forEach((item, index) => {
    item.dataset.localStorageKey = `languageItem_${index}`;
    item.addEventListener("dblclick", () => editText(item, languagesBox));
});

//секция experience_box
const jobItems = experienceBox.querySelectorAll('.job-list_item');

jobItems.forEach((item, index) => {
    const dateElement = item.querySelector('.job-list_item_top-bar_date');
    if (dateElement) {
        dateElement.dataset.localStorageKey = `jobItem_${index}_date`;
        dateElement.addEventListener('dblclick', () => editText(dateElement, experienceBox));
    }

    const roleElement = item.querySelector('.job-list_item_job-info_role');
    if (roleElement) {
        roleElement.dataset.localStorageKey = `jobItem_${index}_role`;
        roleElement.addEventListener('dblclick', () => editText(roleElement, experienceBox));
    }

    const aboutElement = item.querySelector('.job-list_item_job-info_about');
    if (aboutElement) {
        aboutElement.dataset.localStorageKey = `jobItem_${index}_about`;
        aboutElement.addEventListener('dblclick', () => editText(aboutElement, experienceBox));
    }

    const pointElements = item.querySelectorAll('.job-list_item_featured-points_list_item');
    pointElements.forEach((point, pointIndex) => {
        point.dataset.localStorageKey = `jobItem_${index}_point_${pointIndex}`;
        point.addEventListener('dblclick', () => editText(point, experienceBox));
    });
});

//секция tools_box
const toolsItems = toolsBox.querySelectorAll(".tools-list_item-name");

toolsItems.forEach((item, index) => {
    item.dataset.localStorageKey = `toolsItem_${index}`;
    item.addEventListener("dblclick", () => editText(item, toolsBox));
});

//секция education_box
const educationItems = educationBox.querySelectorAll(".education-list_item");

educationItems.forEach((item, index) => {
    const dateElement = item.querySelector(".education-list_item_top-bar_date");
    if (dateElement) {
        dateElement.dataset.localStorageKey = `educationItem_${index}_date`;
        dateElement.addEventListener("dblclick", () =>
            editText(dateElement, educationBox),
        );
    }

    const nameElement = item.querySelector(".education-list_item_content_name");
    if (nameElement) {
        nameElement.dataset.localStorageKey = `educationItem_${index}_name`;
        nameElement.addEventListener("dblclick", () =>
            editText(nameElement, educationBox),
        );
    }

    const hashtagElements = item.querySelectorAll(
        ".education-list_item_content_hashtag",
    );
    hashtagElements.forEach((hashtag, hashtagIndex) => {
        hashtag.dataset.localStorageKey = `educationItem_${index}_hashtag_${hashtagIndex}`;
        hashtag.addEventListener("dblclick", () => editText(hashtag, educationBox));
    });

    const schoolNameElement = item.querySelector(
        ".education-list_item_school-name",
    );
    if (schoolNameElement) {
        schoolNameElement.dataset.localStorageKey = `educationItem_${index}_school`;
        schoolNameElement.addEventListener("dblclick", () =>
            editText(schoolNameElement, educationBox),
        );
    }
});

//секция interests_box
const interestItems = interestsBox.querySelectorAll(".interests-list_item");

interestItems.forEach((item, index) => {
    item.dataset.localStorageKey = `interestItem_${index}`;
    item.addEventListener("dblclick", () => editText(item, interestsBox));
});

//секция contacts_box
const contactsEmail = contactsBox.querySelector('.contacts_email');

contactsEmail.dataset.localStorageKey = 'contactsEmail';
contactsEmail.addEventListener('dblclick', () => editText(contactsEmail, contactsBox));

document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-button');
    downloadButton.addEventListener('click', downloadPDF);
});
