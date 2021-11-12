function login(event) {

    event.preventDefault();

    var email = document.getElementById("email").value.trim(),
        password = document.getElementById("password").value.trim();

    var errors = [];

    if (!email.length) {
        errors.push(["emailError", "Моля, въведете имейл!"]);
    } else if (!validateEmail(email)) {
        errors.push(["emailError", "Въведеният имейл не е валиден!"]);
    }

    if (!password) {
        errors.push(["passwordError", "Моля, въведете парола!"]);
    }

    if (errors.length == 0) {
        var params = { "email": email, "password": password };

        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'php/login.php', true);

        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onreadystatechange = function() {
            var data = JSON.parse(xhr.responseText);

            if (xhr.readyState == 4 && xhr.status == 200) {
                if (data["role"] == "user") {
                    var path = window.location.origin + "/menu.html";
                    window.location.href = path;
                } else {
                    var path = window.location.origin + "/orders.html";
                    window.location.href = path;
                }
            } else if (xhr.status == 400) {
                var error = document.getElementById("generalError");

                error.innerHTML = data["error_description"];
            }
        }

        xhr.send(JSON.stringify(params));
    } else {
        var errorFields = document.getElementsByClassName("error");
        var loginForm = document.getElementsByClassName("pad")[0];

        loginForm.style.height = loginForm.getBoundingClientRect().height - 25 * errorFields.length + "px";

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

        loginForm.style.height = 350 + 25 * errors.length + "px";
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}