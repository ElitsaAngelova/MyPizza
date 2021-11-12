function register(event) {
    event.preventDefault();

    var firstName = document.getElementById("firstName").value.trim(),
        lastName = document.getElementById("lastName").value.trim(),
        email = document.getElementById("email").value.trim(),
        password = document.getElementById("password").value.trim(),
        confirmPass = document.getElementById("confirmPassword").value.trim();

    var errors = [];

    if (!email) {
        errors.push(["emailError", "Моля, въведете имейл!"]);
    } else if (!validateEmail(email)) {
        errors.push(["emailError", "Въведеният имейл не е валиден!"]);
    }

    if (!firstName) {
        errors.push(["firstNameError", "Моля, въведете име!"])
    } else if (firstName.length > 100) {
        errors.push(["firstNameError", "Невалидно име!"]);
    }

    if (!lastName) {
        errors.push(["lastNameError", "Моля, въведете фамилия!"]);
    } else if (lastName.length > 100) {
        errors.push(["lastNameError", "Невалидна фамилия!"]);
    }

    if (!password) {
        errors.push(["passwordError", "Моля, въведете парола!"]);
    } else if (password.length > 255) {
        errors.push(["passwordError", "Невалидна парола!"]);
    }

    if (!confirmPass) {
        errors.push(["confirmPasswordError", "Моля, въведете парола!"]);
    } else if (confirmPass !== password) {
        errors.push(["confirmPasswordError", "Паролите не съвпадат!"]);
    }

    if (errors.length == 0) {
        var params = { 'firstName': firstName, 'lastName': lastName, 'email': email, 'password': password, 'confirmPassword': confirmPass };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/register.php', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 201) {
                var path = window.location.origin + "/login.html";
                window.location.href = path;
            } else if (xhr.status == 400) {
                var data = JSON.parse(xhr.responseText);
                var error = document.getElementById("generalError");

                error.innerHTML = data["error_description"];
            }
        }

        xhr.send(JSON.stringify(params));
    } else {
        var errorFields = document.getElementsByClassName("error");
        var registerForm = document.getElementsByClassName("pad")[0];

        registerForm.style.height = registerForm.getBoundingClientRect().height - 25 * errorFields.length + "px";

        for (var i = 0; i < errorFields.length; i++) {
            errorFields[i].innerHTML = "";
            errorFields[i].style.display = "none";
        }

        for (var i = 0; i < errors.length; i++) {
            var element = document.getElementById(errors[i][0]);

            element.innerHTML = errors[i][1];
            element.style.marginTop = "-15px";
            element.style.display = "block";
        }

        registerForm.style.height = 430 + 25 * errors.length + "px";
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}