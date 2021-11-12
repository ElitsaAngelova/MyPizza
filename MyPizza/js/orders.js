var orders = [
    [7, "Пеперони - 2 броя", "София, ул. Кирил и Методий 21, етаж - 5", "неизпълнена"],
    [6, "Италианска - 1 брой", "София, ул. Поп Богомил 40, етаж - 2", "неизпълнена"],
    [5, "Маргарита - 1 брой, Хавай - 1 брой", "София, ул. Тинтява 17", "неизпълнена"],
    [4, "Формаджи - 5 броя", "София, ул. Козлодуй 9, етаж - 3", "изпълнена"],
    [3, "Пеперони - 1 брой", "София, ул. Бузлуджа 76", "изпълнена"],
    [2, "Хавай - 2 броя", "София, ул. Криволак 50, етаж - 8", "изпълнена"],
    [1, "Маргарита - 3 броя", "София, ул. Медовина 5", "изпълнена"]
];

(function() {
    var container = document.getElementsByClassName("orders")[0];

    var header = document.createElement("div");
    header.className = "row header";

    var idHeader = document.createElement("div");
    idHeader.className = "col-md-2";
    idHeader.innerHTML = "НОМЕР НА ПОРЪЧКА";

    var orderHeader = document.createElement("div");
    orderHeader.className = "countHeader col-md-3";
    orderHeader.innerHTML = "ПОРЪЧКА";

    var addrHeader = document.createElement("div");
    addrHeader.className = "col-md-5";
    addrHeader.innerHTML = "АДРЕС";

    var statusHeader = document.createElement("div");
    statusHeader.className = "col-md-2";
    statusHeader.innerHTML = "СТАТУС";

    header.appendChild(idHeader);
    header.appendChild(orderHeader);
    header.appendChild(addrHeader);
    header.appendChild(statusHeader);

    container.appendChild(header);

    for (var i = 0; i < orders.length; i++) {
        var order = orders[i];

        var id = document.createElement("div");
        id.className = "col-md-2";
        id.innerHTML = order[0];

        var ordText = document.createElement("div");
        ordText.className = "col-md-3";
        ordText.innerHTML = order[1];

        var addr = document.createElement("div");
        addr.className = "col-md-5";
        addr.innerHTML = order[2];

        var status = document.createElement("div");
        status.className = "col-md-2";
        status.innerHTML = order[3];

        var ord = document.createElement("div");
        ord.className = "row order-" + (i + 1);

        ord.appendChild(id);
        ord.appendChild(ordText);
        ord.appendChild(addr);
        ord.appendChild(status);

        container.appendChild(ord);
    }

    document.getElementsByClassName("ordersPad")[0].style.height = orders.length * 45 + 90 + "px";
})();