document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const profileSection = document.getElementById("profile-section");
    const authSelection = document.getElementById("auth-selection");
    const loginContainer = document.getElementById("login-container");
    const signupContainer = document.getElementById("signup-container");
    const donationForm = document.getElementById("donation-form");

    
    function showLogin() {
        authSelection.style.display = "none";
        loginContainer.style.display = "block";
        signupContainer.style.display = "none";
    }

   
    function showSignup() {
        authSelection.style.display = "none";
        signupContainer.style.display = "block";
        loginContainer.style.display = "none";
    }

    
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let name = document.getElementById("signup-name").value;
            let email = document.getElementById("signup-email").value;
            let password = document.getElementById("signup-password").value;

            if (localStorage.getItem(email)) {
                alert("This email is already registered! Please log in.");
                showLogin();
                return;
            }

            let userData = { name, email, password };
            localStorage.setItem(email, JSON.stringify(userData));
            localStorage.setItem("loggedInUser", email);

            alert("Account created successfully! Redirecting...");
            showProfile();
        });
    }

    
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = document.getElementById("login-email").value;
            let password = document.getElementById("login-password").value;

            let storedUser = localStorage.getItem(email);

            if (!storedUser) {
                alert("No account found. Please sign up first.");
                showSignup();
                return;
            }

            let userData = JSON.parse(storedUser);

            if (userData.password !== password) {
                alert("Incorrect password. Try again.");
                return;
            }

            localStorage.setItem("loggedInUser", email);
            showProfile();
        });
    }

    
    function showProfile() {
        let loggedInUser = localStorage.getItem("loggedInUser");

        if (loggedInUser) {
            let userData = JSON.parse(localStorage.getItem(loggedInUser));

            authSelection.style.display = "none";
            loginContainer.style.display = "none";
            signupContainer.style.display = "none";

            profileSection.style.display = "block";
            document.getElementById("user-name").textContent = userData.name;
            document.getElementById("user-email").textContent = userData.email;

            if (donationForm) {
                donationForm.style.display = "block";
            }
        }
    }

  
    if (donationForm) {
        donationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            
            const foodName = document.getElementById("food-name").value;
            const mealType = document.querySelector('input[name="meal-type"]:checked')?.value;
            const category = document.getElementById("food-category").value;
            const quantity = document.getElementById("quantity").value;
            const email = document.getElementById("donor-email").value;
            const phone = document.getElementById("phone").value;
            const district = document.getElementById("district").value;
            const address = document.getElementById("address").value;

            const donationData = {
                foodName,
                mealType,
                category,
                quantity,
                email,
                phone,
                district,
                address,
                date: new Date().toLocaleString()
            };

           
            const userEmail = localStorage.getItem("loggedInUser");
            let donationsKey = `donations_${userEmail}`;
            let existingDonations = JSON.parse(localStorage.getItem(donationsKey)) || [];
            existingDonations.push(donationData);
            localStorage.setItem(donationsKey, JSON.stringify(existingDonations));

            
            const oldSummary = document.getElementById("donation-summary");
            if (oldSummary) oldSummary.remove();

           
            const summarySection = document.createElement("section");
            summarySection.id = "donation-summary";
            summarySection.innerHTML = `
                <h3>📝 Donation Summary</h3>
                <ul>
                    <div><strong>Food Name:</strong> ${foodName}</div>
                    <div><strong>Meal Type:</strong> ${mealType}</div>
                    <div><strong>Category:</strong> ${category}</div>
                    <div><strong>Quantity:</strong> ${quantity} per person</div>
                    <div><strong>Email:</strong> ${email}</div>
                    <div><strong>Phone:</strong> ${phone}</div>
                    <div><strong>District:</strong> ${district}</div>
                    <div><strong>Address:</strong> ${address}</div>
                    <div><strong>Date:</strong> ${donationData.date}</div>
                </ul>
            `;
            summarySection.style.border = "2px solid green";
            summarySection.style.padding = "15px";
            summarySection.style.marginTop = "20px";
            summarySection.style.backgroundColor = "#f1fff1";

            donationForm.insertAdjacentElement("afterend", summarySection);

            alert("Donation submitted successfully! Thank you for your contribution.");
            donationForm.reset();
        });
    }

    
    function logout() {
        localStorage.removeItem("loggedInUser");
        profileSection.style.display = "none";
        donationForm.style.display = "none";
        const summary = document.getElementById("donation-summary");
        if (summary) summary.remove();
        authSelection.style.display = "block";
    }

   
    if (localStorage.getItem("loggedInUser")) {
        showProfile();
    }

   
    window.showLogin = showLogin;
    window.showSignup = showSignup;
    window.logout = logout;
});
