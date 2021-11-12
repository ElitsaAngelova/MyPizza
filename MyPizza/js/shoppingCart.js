(function() {
    var order = JSON.parse(sessionStorage.getItem('shoppingCart'));

    if (order.length > 0) {
        var userInfo = document.getElementById("userInfo");

        var userHeading = document.createElement("h2");
        userHeading.innerHTML = "ИНФОРМАЦИЯ ЗА ДОСТАВКА";

        var address = document.createElement("div");
        address.className = "group address";

        var addressImg = document.createElement("img");
        addressImg.className = "image";
        addressImg.src = "images/address.svg";

        var addressField = document.createElement("span");
        addressField.innerHTML = "ул. Тинтява 25";

        address.appendChild(addressImg);
        address.appendChild(addressField);

        var phone = document.createElement("div");
        phone.className = "group";

        var phoneInput = document.createElement("input");
        phoneInput.type = "text";
        phoneInput.className = "form-control phone";
        phoneInput.value = "0887549621";

        var phoneImg = document.createElement("img");
        phoneImg.className = "image";
        phoneImg.src = "images/phone.svg";

        phone.appendChild(phoneImg);
        phone.appendChild(phoneInput);

        var floor = document.createElement("div");
        floor.className = "group";

        var floorImg = document.createElement("img");
        floorImg.className = "image";
        floorImg.src = "images/stairs.svg";

        var floorInput = document.createElement("input");
        floorInput.type = "text";
        floorInput.className = "form-control floor";
        floorInput.value = "2";

        floor.appendChild(floorImg);
        floor.appendChild(floorInput);

        var doorbell = document.createElement("div");
        doorbell.className = "group";

        var doorbellImg = document.createElement("img");
        doorbellImg.className = "image";
        doorbellImg.src = "images/bell.svg";

        var doorbellYes = document.createElement("input");
        doorbellYes.type = "radio";
        doorbellYes.name = "doorbell";

        var value1 = document.createElement("span");
        value1.className = "value";
        value1.innerHTML = " да";

        var value2 = document.createElement("span");
        value2.className = "value";
        value2.innerHTML = " не";

        var doorbellNo = document.createElement("input");
        doorbellNo.type = "radio";
        doorbellNo.name = "doorbell";

        var hasDoorbell = false;

        if (hasDoorbell) {
            doorbellYes.checked = true;
        } else {
            doorbellNo.checked = true;
        }

        doorbell.appendChild(doorbellImg);
        doorbell.appendChild(doorbellYes);
        doorbell.appendChild(value1);
        doorbell.appendChild(doorbellNo);
        doorbell.appendChild(value2);

        var notes = document.createElement("textarea");
        notes.className = "form-control group notes";
        notes.rows = 2;
        notes.placeholder = "Коментари за доставката.";

        var button = document.createElement("button");
        button.className = "btn btn-success";
        button.innerHTML = "Завършване на поръчката";
        button.onclick = function() {
            var message = document.getElementsByClassName("message")[0];
            message.style.display = "block";

            hideMessage(message);
        }

        userInfo.appendChild(userHeading);
        userInfo.appendChild(address);
        userInfo.appendChild(phone);
        userInfo.appendChild(floor);
        userInfo.appendChild(doorbell);
        userInfo.appendChild(notes);
        userInfo.appendChild(button);

        var orderInfo = document.getElementById("orderInfo");

        var header = document.createElement("div");
        header.className = "row header";

        var prodHeader = document.createElement("div");
        prodHeader.className = "prodHeader col-md-4";
        prodHeader.innerHTML = "ПРОДУКТ";

        var countHeader = document.createElement("div");
        countHeader.className = "countHeader col-md-4 text-center";
        countHeader.innerHTML = "КОЛИЧЕСТВО";

        var priceHeader = document.createElement("div");
        priceHeader.className = "priceHeader col-md-2 text-right";
        priceHeader.innerHTML = "ЦЕНА";

        header.appendChild(prodHeader);
        header.appendChild(countHeader);
        header.appendChild(priceHeader);

        orderInfo.appendChild(header);

        for (var i = 0; i < order.length; i++) {
            var product = order[i];

            var name = document.createElement("div");
            name.className = "productName col-md-4";
            name.innerHTML = product["name"];

            var count = document.createElement("div");
            count.className = "productCount col-md-4 text-center";

            var number = document.createElement("span");
            number.className = "number number-" + (i + 1);
            number.innerHTML = product["count"];

            var plus = document.createElement("img");
            plus.className = "addProduct";
            plus.src = "images/plus.svg";
            createAddButton(plus, (i + 1));

            var minus = document.createElement("img");
            minus.className = "removeProduct";
            minus.src = "images/minus.svg";
            createRemoveButton(minus, (i + 1));

            count.appendChild(minus);
            count.appendChild(number);
            count.appendChild(plus);

            var price = document.createElement("div");
            price.className = "productPrice col-md-2 text-right";
            price.innerHTML = product["price"] + " лв";

            var removeProd = document.createElement("div");
            removeProd.className = "removeProduct col-md-2 text-right";
            var closeIcon = document.createElement("img");
            closeIcon.src = "images/closeIcon.svg";
            closeIcon.id = "closeIcon";
            createDeleteButton(closeIcon, (i + 1));

            removeProd.appendChild(closeIcon);

            var prod = document.createElement("div");
            prod.className = "row product-" + (i + 1);

            prod.appendChild(name);
            prod.appendChild(count);
            prod.appendChild(price);
            prod.appendChild(removeProd);

            orderInfo.appendChild(prod);
        }

        var prod = document.createElement("div");
        prod.className = "row totalPrice";

        var first = document.createElement("div");
        first.className = "col-md-6";

        var totalPrice = document.createElement("div");
        totalPrice.className = "col-md-4 text-right";
        totalPrice.innerHTML = "Обща цена: 22.80 лв";

        prod.appendChild(first);
        prod.appendChild(totalPrice);
        orderInfo.appendChild(prod);
    }
})();

function createAddButton(element, id) {
    element.onclick = function() {
        var number = document.getElementsByClassName("number-" + id)[0];
        var inner = parseInt(number.innerHTML) + 1;
        number.innerHTML = inner.toString();
    }
}

function createRemoveButton(element, id) {
    element.onclick = function() {
        var number = document.getElementsByClassName("number-" + id)[0];
        var inner = parseInt(number.innerHTML) - 1;

        if (inner <= 1) {
            inner = 1;
        }

        number.innerHTML = inner.toString();
    }
}

function createDeleteButton(element, id) {
    element.onclick = function() {
        var product = document.getElementsByClassName("product-" + id)[0];
        product.parentNode.removeChild(product);

        var order = JSON.parse(sessionStorage.getItem('shoppingCart'));
        order.splice(id - 1, 1);

        sessionStorage.setItem('shoppingCart', JSON.stringify(order));
    }
}

function getCookie(name) {
    var cookiename = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(cookiename) == 0) return c.substring(cookiename.length, c.length);
    }
    return null;
}

function order() {
    var message = document.getElementsByClassName("message")[0];
    message.style.display = "block";

    hideMessage(message);
}

function hideMessage(message) {
    setTimeout(function() {
        message.style.display = 'none';

        var path = window.location.origin + "/menu.html";
        window.location.href = path;
    }, 2000);
}