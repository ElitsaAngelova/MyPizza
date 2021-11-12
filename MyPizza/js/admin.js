(function() {
    var userRole = getCookie("userRole");

    if (userRole == "user") {
        var path = window.location.origin + "/menu.html";
        window.location.href = path;
    } else if (userRole != "admin") {
        var path = window.location.origin + "/login.html";
        window.location.href = path;
    }
})();

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