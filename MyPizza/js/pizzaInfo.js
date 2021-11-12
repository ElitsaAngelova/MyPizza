var shoppingCart = (function() {
    cart = [];

    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }

    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }

    var obj = {};

    obj.addItemToCart = function(name, price, count) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count += count;
                saveCart();
                return;
            }
        }

        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }

    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };

    obj.removeItemFromCart = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    obj.removeItemFromCartAll = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    obj.totalCount = function() {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    obj.listCart = function() {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    return obj;
})();

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
            var container = document.getElementsByClassName("pizzaInfo")[0];

            var image = document.createElement("img");
            image.className = "pizzaImage";
            image.src = "./images/" + data["image_url"];
            container.appendChild(image);

            var name = document.createElement("h2");
            var text = document.createTextNode(data["name"]);
            name.appendChild(text);
            name.className = "name";
            container.appendChild(name);

            var ingredients = document.createElement("div");
            ingredients.className = "ingredients";
            ingredients.innerHTML = data["ingredients"];
            container.appendChild(ingredients);

            var calories = document.createElement("div");
            calories.className = "calories";
            calories.innerHTML = "Калории: " + data["calories"];
            container.appendChild(calories);

            var price = document.createElement("div");
            price.className = "price";
            price.innerHTML = "Цена: " + data["price"];
            container.appendChild(price);
        }
    }

    xhr.send(JSON.stringify(params));
})();

function addToCart() {
    var name = document.getElementsByClassName("name")[0].innerHTML,
        price = parseFloat(document.getElementsByClassName("price")[0].innerHTML.split(" ")[1]),
        count = parseInt(document.getElementById("itemCount").innerHTML);

    shoppingCart.addItemToCart(name, price, count);

    var text = document.getElementById("basket").innerHTML;
    var index = text.indexOf('(');

    if (index == -1) {
        document.getElementById("basket").innerHTML = text + " ( " + shoppingCart.totalCount() + " )";
    } else {
        document.getElementById("basket").innerHTML = text.split('(')[0] + " ( " + shoppingCart.totalCount() + " )";
    }

    var message = document.getElementsByClassName("message")[0];
    message.style.display = "block";

    hideMessage(message);
}

function hideMessage(message) {
    setTimeout(function() {
        message.style.display = 'none';
    }, 4000);
}

function addItem() {
    var element = document.getElementById("itemCount"),
        number = parseInt(element.innerHTML) + 1;

    element.innerHTML = number.toString();
}

function removeItem() {
    var element = document.getElementById("itemCount"),
        number = parseInt(element.innerHTML) - 1;

    if (number <= 1) {
        number = 1;
    }

    element.innerHTML = number.toString();
}

function myFunction(id) {
    var ingredients = document.getElementsByClassName("ingredients")[0];
    var product = document.getElementById("myCheck" + id).innerHTML;
    var option = document.getElementById("option" + id);
    var price = document.getElementsByClassName("price")[0];

    if (option.checked) {
        ingredients.innerHTML = ingredients.innerHTML + ", " + product;

        var newPrice = (parseFloat(price.innerHTML.split(" ")[1]) + 0.2).toFixed(2);
        price.innerHTML = "Цена: " + newPrice;
    } else {
        ingredients.innerHTML = ingredients.innerHTML.replace(", " + product, "");

        var newPrice = (parseFloat(price.innerHTML.split(" ")[1]) - 0.2).toFixed(2);
        price.innerHTML = "Цена: " + newPrice;
    }
}