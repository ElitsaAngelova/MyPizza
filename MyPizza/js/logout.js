(function() {
    var userRole = getCookie("userRole");

    if (!userRole) {
        var button = document.getElementsByClassName("logout")[0];
        if (button)
            button.parentNode.removeChild(button);

        var profile = document.getElementsByClassName("profile")[0];
        if (profile)
            profile.parentNode.removeChild(profile);
    } else if (userRole == "user") {
        var button = document.getElementsByClassName("login")[0];
        if (button)
            button.parentNode.removeChild(button);
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

function logout() {
    clearCookie("userId");
    clearCookie("userRole");

    var path = window.location.origin + "/home.html";
    window.location.href = path;
}

function clearCookie(name, domain, path) {
    var domain = domain || document.domain;
    var path = path || "/";
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=" + domain + "; path=" + path;
};