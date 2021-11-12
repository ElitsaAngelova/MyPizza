function myFunction() {

    var button = document.getElementById("order");
    button.disabled = false;

    button.onclick = function() {
        var message = document.getElementsByClassName("message")[0];
        message.style.display = "block";

        hideMessage(message);
    }

    var checkBox1 = document.getElementById("myCheck1");
    var checkBox2 = document.getElementById("myCheck2");
    var checkBox3 = document.getElementById("myCheck3");
    var checkBox4 = document.getElementById("myCheck4");
    var checkBox5 = document.getElementById("myCheck5");
    var checkBox6 = document.getElementById("myCheck6");
    var checkBox7 = document.getElementById("myCheck7");
    var checkBox8 = document.getElementById("myCheck8");
    var checkBox9 = document.getElementById("myCheck9");
    var checkBox10 = document.getElementById("myCheck10");
    var checkBox11 = document.getElementById("myCheck11");
    var checkBox12 = document.getElementById("myCheck12");
    var checkBox13 = document.getElementById("myCheck13");

    var text1 = document.getElementById("text1");
    var text2 = document.getElementById("text2");
    var text3 = document.getElementById("text3");
    var text4 = document.getElementById("text4");
    var text5 = document.getElementById("text5");
    var text6 = document.getElementById("text6");
    var text7 = document.getElementById("text7");
    var text8 = document.getElementById("text8");
    var text9 = document.getElementById("text9");
    var text10 = document.getElementById("text10");
    var text11 = document.getElementById("text11");
    var text12 = document.getElementById("text12");
    var text13 = document.getElementById("text13");


    if (checkBox1.checked == true) {
        text1.style.display = "block";
    } else {
        text1.style.display = "none";
    }

    if (checkBox2.checked == true) {
        text2.style.display = "block";
    } else {
        text2.style.display = "none";
    }

    if (checkBox3.checked == true) {
        text3.style.display = "block";
    } else {
        text3.style.display = "none";
    }

    if (checkBox4.checked == true) {
        text4.style.display = "block";
    } else {
        text4.style.display = "none";
    }

    if (checkBox5.checked == true) {
        text5.style.display = "block";
    } else {
        text5.style.display = "none";
    }

    if (checkBox6.checked == true) {
        text6.style.display = "block";
    } else {
        text6.style.display = "none";
    }

    if (checkBox7.checked == true) {
        text7.style.display = "block";
    } else {
        text7.style.display = "none";
    }

    if (checkBox8.checked == true) {
        text8.style.display = "block";
    } else {
        text8.style.display = "none";
    }

    if (checkBox9.checked == true) {
        text9.style.display = "block";
    } else {
        text9.style.display = "none";
    }

    if (checkBox10.checked == true) {
        text10.style.display = "block";
    } else {
        text10.style.display = "none";
    }

    if (checkBox11.checked == true) {
        text11.style.display = "block";
    } else {
        text11.style.display = "none";
    }

    if (checkBox12.checked == true) {
        text12.style.display = "block";
    } else {
        text12.style.display = "none";
    }

    if (checkBox13.checked == true) {
        text13.style.display = "block";
    } else {
        text13.style.display = "none";
    }
}

function hideMessage(message) {
    setTimeout(function() {
        message.style.display = 'none';
    }, 4000);
}