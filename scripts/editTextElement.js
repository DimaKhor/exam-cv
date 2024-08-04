export function editText(element, section) {
    element.contentEditable = true;
    element.focus();

    if (section) {
        section.classList.add("editing");
    }

    function saveChanges() {
        const newText = element.textContent;
        const localStorageKey = element.dataset.localStorageKey;

        localStorage.setItem(localStorageKey, newText);

        if (section) {
            section.classList.add("animated-edit");

            setTimeout(() => {
                section.classList.remove("animated-edit");
            }, 1000);

            section.classList.remove("editing");
        }

        element.contentEditable = false;
        element.removeEventListener("blur", saveChanges);
        element.removeEventListener("keydown", handleKeydown);
    }

    function handleKeydown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            element.blur();
        }
    }

    element.addEventListener("blur", saveChanges);
    element.addEventListener("keydown", handleKeydown);
}
