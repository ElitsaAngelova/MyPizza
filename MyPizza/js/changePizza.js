(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var params = { "id": id };

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'php/pizzaInfo.php', true);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function() {
        var data = JSON.parse(xhr.responseText);

        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("name").value = data["name"];
            document.getElementById("ingredients").innerHTML = data["ingredients"];
            document.getElementById("calories").value = data["calories"];
            document.getElementById("price").value = data["price"];
        }
    }

    xhr.send(JSON.stringify(params));
})();

function changePizza(event) {
    event.preventDefault();

    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    var name = document.getElementById("name").value.trim(),
        ingredients = document.getElementById("ingredients").value.trim(),
        calories = document.getElementById("calories").value.trim(),
        price = document.getElementById("price").value.trim(),
        image = document.getElementById("image").value.trim();

    var params = new FormData();
    params.append("id", JSON.stringify(id));
    params.append("name", JSON.stringify(name));
    params.append("ingredients", JSON.stringify(ingredients));
    params.append("calories", JSON.stringify(calories));
    params.append("price", JSON.stringify(price));

    if (image) {
        var file = document.querySelector('#image[type=file]').files[0];

        params.append("image", file);
    }

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'php/changePizza.php', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var path = window.location.origin + "/adminMenu.html";
            window.location.href = path;
        }
    }

    xhr.send(params);
}

function deletePizza(event) {
    event.preventDefault();

    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    var params = { "id": id }

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'php/deletePizza.php', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var path = window.location.origin + "/adminMenu.html";
            window.location.href = path;
        }
    }

    xhr.send(JSON.stringify(params));
}