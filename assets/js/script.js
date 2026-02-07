 



    
    const contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let message = document.getElementById("message").value;

            if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
                alert("Please fill in all fields before submitting.");
                event.preventDefault();
            } else {
                alert("Thank you for contacting us! We will get back to you soon.");
            }
        });
    }

