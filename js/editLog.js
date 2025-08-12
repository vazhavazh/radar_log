// // GET ID FROM URL
// const urlParams = new URLSearchParams(window.location.search);
// const targetId = urlParams.get("id");

// const data = JSON.parse(localStorage.getItem("operation_log"));
// const foundEntry = data.find((entry) => entry.id === targetId);

// console.log(foundEntry);


// js/edit.js

document.addEventListener("DOMContentLoaded", () => {
    // Получение объекта из localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get("id");
    const data = JSON.parse(localStorage.getItem("operation_log"));
    const foundEntry = data.find((entry) => entry.id === targetId);

    // Если объект найден
    if (foundEntry) {
        // Заполнение формы данными
        const form = document.getElementById("edit-form");
        for (const key in foundEntry) {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = foundEntry[key];
            }
        }
    }
});