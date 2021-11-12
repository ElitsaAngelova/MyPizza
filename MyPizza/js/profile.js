function saveChanges() {
    var message = document.getElementsByClassName("message")[0];
    message.style.display = "block";

    hideMessage(message);
}

function hideMessage(message) {
    setTimeout(function() {
        message.style.display = 'none';
    }, 2000);
}