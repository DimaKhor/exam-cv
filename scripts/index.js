import { addRippleEffect } from "./rippleEffect.js";
import { editText } from "./editTextElement.js";
import { downloadPDF } from "./downloadPDF.js";

const nameBox = document.querySelector(".person-info__box");
const languagesBox = document.querySelector(".languages__box");
const experienceBox = document.querySelector(".experience__box");
const toolsBox = document.querySelector(".tools__box");
const educationBox = document.querySelector(".education__box");
const interestsBox = document.querySelector(".interests__box");
const contactsBox = document.querySelector(".contacts__box");
const profileImageBox = document.querySelector(".profile-img__box");

const boxes = [
    nameBox,
    languagesBox,
    experienceBox,
    toolsBox,
    educationBox,
    interestsBox,
    contactsBox,
    profileImageBox,
];

//ripple effect
boxes.forEach((box) => {
    if (box) {
        box.addEventListener("click", addRippleEffect);
    }
});

//загрузка сохранененных элементов
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
const userName = document.querySelector(".person-info__name");
const userRole = document.querySelector(".person-info__role");

userName.dataset.localStorageKey = "userName";
userRole.dataset.localStorageKey = "userRole";

userName.addEventListener("dblclick", () => editText(userName, nameBox));
userRole.addEventListener("dblclick", () => editText(userRole, nameBox));

//секция languages_box
const languageItems = document.querySelectorAll(".languages__name");

languageItems.forEach((item, index) => {
    item.dataset.localStorageKey = `languageItem_${index}`;
    item.addEventListener("dblclick", () => editText(item, languagesBox));
});

document.querySelectorAll(".languages__progress-bar").forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    bar.style.setProperty("--progress", progress);
});

//секция experience_box
const jobItems = experienceBox.querySelectorAll(".experience__item");

jobItems.forEach((item, index) => {
    const dateElement = item.querySelector(".experience__date");
    if (dateElement) {
        dateElement.dataset.localStorageKey = `jobItem_${index}_date`;
        dateElement.addEventListener("dblclick", () =>
            editText(dateElement, experienceBox),
        );
    }

    const roleElement = item.querySelector(".experience__role");
    if (roleElement) {
        roleElement.dataset.localStorageKey = `jobItem_${index}_role`;
        roleElement.addEventListener("dblclick", () =>
            editText(roleElement, experienceBox),
        );
    }

    const aboutElement = item.querySelector(".experience__details");
    if (aboutElement) {
        aboutElement.dataset.localStorageKey = `jobItem_${index}_about`;
        aboutElement.addEventListener("dblclick", () =>
            editText(aboutElement, experienceBox),
        );
    }

    const pointElements = item.querySelectorAll(".experience__featured-point");
    pointElements.forEach((point, pointIndex) => {
        point.dataset.localStorageKey = `jobItem_${index}_point_${pointIndex}`;
        point.addEventListener("dblclick", () => editText(point, experienceBox));
    });
});

//секция tools_box
const toolsItems = toolsBox.querySelectorAll(".tools__field");

toolsItems.forEach((item, index) => {
    item.dataset.localStorageKey = `toolsItem_${index}`;
    item.addEventListener("dblclick", () => editText(item, toolsBox));
});

//секция education_box
const educationItems = educationBox.querySelectorAll(".education__item");

educationItems.forEach((item, index) => {
    const dateElement = item.querySelector(".education__date");
    if (dateElement) {
        dateElement.dataset.localStorageKey = `educationItem_${index}_date`;
        dateElement.addEventListener("dblclick", () =>
            editText(dateElement, educationBox),
        );
    }

    const nameElement = item.querySelector(".education__item_name");
    if (nameElement) {
        nameElement.dataset.localStorageKey = `educationItem_${index}_name`;
        nameElement.addEventListener("dblclick", () =>
            editText(nameElement, educationBox),
        );
    }

    const hashtagElements = item.querySelectorAll(".education__hashtag");
    hashtagElements.forEach((hashtag, hashtagIndex) => {
        hashtag.dataset.localStorageKey = `educationItem_${index}_hashtag_${hashtagIndex}`;
        hashtag.addEventListener("dblclick", () => editText(hashtag, educationBox));
    });

    const schoolNameElement = item.querySelector(".education__school-name");
    if (schoolNameElement) {
        schoolNameElement.dataset.localStorageKey = `educationItem_${index}_school`;
        schoolNameElement.addEventListener("dblclick", () =>
            editText(schoolNameElement, educationBox),
        );
    }
});

//секция interests_box
const interestItems = interestsBox.querySelectorAll(".interests__item");

interestItems.forEach((item, index) => {
    item.dataset.localStorageKey = `interestItem_${index}`;
    item.addEventListener("dblclick", () => editText(item, interestsBox));
});

//секция contacts_box
const contactsEmail = contactsBox.querySelector(".contacts__email");

contactsEmail.dataset.localStorageKey = "contactsEmail";
contactsEmail.addEventListener("dblclick", () =>
    editText(contactsEmail, contactsBox),
);

//скачивание в pdf
document.addEventListener("DOMContentLoaded", () => {
    const downloadButton = document.getElementById("download-button");
    downloadButton.addEventListener("click", downloadPDF);
});
