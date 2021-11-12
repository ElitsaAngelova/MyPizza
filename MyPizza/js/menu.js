(function() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'php/menu.php', true);

    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);

            if (data[0]['type'] != 'errors') {
                var menu = document.getElementsByClassName("menu")[0];

                for (var i = 0; i < data.length; i++) {
                    var pizza = document.createElement("div");
                    pizza.className = "pizza";
                    menu.appendChild(pizza);

                    var img = document.createElement("img");
                    img.className = "image";
                    img.src = "images/" + data[i]["image_url"];
                    img.alt = data[i]["name"];
                    pizza.appendChild(img);

                    var name = document.createElement("h2");
                    var text = document.createTextNode(data[i]["name"]);
                    name.appendChild(text);
                    name.className = "name";
                    pizza.appendChild(name);

                    var ingredients = document.createElement("div");
                    ingredients.className = "ingredients";
                    ingredients.innerHTML = data[i]["ingredients"];
                    pizza.appendChild(ingredients);

                    var buttonWrapper = document.createElement("div");
                    buttonWrapper.className = "buttonWrapper";
                    pizza.appendChild(buttonWrapper);

                    var button = document.createElement("button");
                    button.className = "btn btn-success";
                    button.innerHTML = "Избери";
                    buttonWrapper.appendChild(button);

                    createButton(button, data[i]["id"]);
                }
            }
        }
    }

    xhr.send();
})();

function createButton(element, id) {
    element.onclick = function() {
        var path = window.location.origin + "/pizza.html?id=" + id;
        window.location.href = path;
    };
}