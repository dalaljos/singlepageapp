const dogbutton = document.getElementById("dogbutton");
const dogimage = document.getElementById("dogimage");
const message = document.getElementById("message");

dogbutton.addEventListener("click", function () {
    message.textContent = "Loading a dog...";
    dogbutton.disabled = true;
    dogimage.hidden = true;

    fetch("https://dog.ceo/api/breeds/image/random")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("The request failed.");
            }
            return response.json();
        })
        .then(function (data) {
            if (data.status !== "success") {
                throw new Error("A dog could not be found.");
            }
            dogimage.src = data.message;
        })
        .catch(function () {
            message.textContent = "Something went wrong. Please try again.";
            dogbutton.disabled = false;
        });
});

dogimage.addEventListener("load", function () {
    if (dogimage.src.startsWith("data:")) {
        return;
    }
    dogimage.hidden = false;
    message.textContent = "Here is your dog!";
    dogbutton.disabled = false;
});

dogimage.addEventListener("error", function () {
    message.textContent = "The picture could not load. Please try again.";
    dogbutton.disabled = false;
});
