function addPizza(event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim(),
        ingredients = document.getElementById("ingredients").value.trim(),
        calories = document.getElementById("calories").value.trim(),
        price = document.getElementById("price").value.trim();

    var file = document.querySelector('#image[type=file]').files[0];

    var errors = [];

    if (!name) {
        errors.push(["nameError", "Моля, въведете име на пицата!"]);
    }

    if (!ingredients) {
        errors.push(["ingredientsError", "Моля, въведете съставки!"]);
    }

    if (!calories) {
        errors.push(["caloriesError", "Моля, въведете калории!"]);
    }

    if (!price) {
        errors.push(["priceError", "Моля, въведете цена!"]);
    }

    if (errors.length == 0) {
        var params = new FormData();
        params.append("file", file);
        params.append("name", JSON.stringify(name));
        params.append("ingredients", JSON.stringify(ingredients));
        params.append("calories", JSON.stringify(calories));
        params.append("price", JSON.stringify(price));

        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'php/addPizza.php');

        xhr.onreadystatechange = function() {
            var data = JSON.parse(xhr.responseText);

            if (xhr.readyState == 4 && xhr.status == 201) {
                var path = window.location.origin + "/adminMenu.html";
                window.location.href = path;
            } else if (xhr.status == 400) {
                var error = document.getElementById("generalError");

                error.innerHTML = data["error_description"];
            }
        }

        xhr.send(params);
    } else {
        var errorFields = document.getElementsByClassName("error");

        for (var i = 0; i < errorFields.length; i++) {
            errorFields[i].innerHTML = "";
        }

        for (var i = 0; i < errors.length; i++) {
            var element = document.getElementById(errors[i][0]);

            element.innerHTML = errors[i][1];
        }
    }
}