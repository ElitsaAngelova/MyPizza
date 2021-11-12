var products = ["доматен сос", "моцарела", "шунка", "бекон", "гъби", "царевица", "пилешко филе", "бейби спанак", "маслини", "ананас", "кисели краставици", "чушки"];

(function() {
    var container = document.getElementsByClassName("products")[0];

    var heading = document.createElement("div");
    heading.className = "header";
    heading.innerHTML = "ПРОДУКТИ";

    container.appendChild(heading);

    for (var i = 0; i < products.length; i++) {
        var product = document.createElement("div");
        product.className = "row product product-" + (i + 1);

        var name = document.createElement("div");
        name.className = "col-md-8 name"
        name.innerHTML = products[i];

        var del = document.createElement("div");
        del.className = "col-md-4 text-right";

        var deleteImg = document.createElement("img");
        deleteImg.className = "deleteImg";
        deleteImg.src = "images/delete.svg";
        createAddButton(deleteImg, i + 1);

        del.appendChild(deleteImg);

        product.appendChild(name);
        product.appendChild(del);

        container.appendChild(product);
    }
})();

function createAddButton(element, id) {
    element.onclick = function() {
        var product = document.getElementsByClassName("product-" + id)[0];

        product.parentNode.removeChild(product);

        var message = document.getElementsByClassName("messageRed")[0];
        message.style.display = "block";

        hideMessage(message);
    }
}

function addProduct(event) {
    event.preventDefault();

    var prodName = document.getElementById("productName").value;

    products.push(prodName);

    var container = document.getElementsByClassName("products")[0];

    var product = document.createElement("div");
    product.className = "row product product-" + products.length;

    var name = document.createElement("div");
    name.className = "col-md-8 name"
    name.innerHTML = prodName;

    var del = document.createElement("div");
    del.className = "col-md-4 text-right";

    var deleteImg = document.createElement("img");
    deleteImg.className = "deleteImg";
    deleteImg.src = "images/delete.svg";
    createAddButton(deleteImg, products.length);

    del.appendChild(deleteImg);

    product.appendChild(name);
    product.appendChild(del);

    container.appendChild(product);

    var message = document.getElementsByClassName("message")[0];
    message.style.display = "block";

    hideMessage(message);
}

function hideMessage(message) {
    setTimeout(function() {
        message.style.display = 'none';
    }, 4000);
}