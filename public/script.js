const createForm = document.querySelector("form");

createForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(createForm);
    const reqBody = Object.fromEntries(formData);

    await fetch("/new/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    });

    window.location.href = "/";
});



