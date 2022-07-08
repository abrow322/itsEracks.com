
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
        $(".scrolltop:hidden")
            .stop(true, true)
            .fadeIn();
    } else {
        $(".scrolltop")
            .stop(true, true)
            .fadeOut();
    }

    // Make sticky header
    if ($(this).scrollTop() > 158) {
        $(".nav-section").addClass("sticky");
    } else {
        $(".nav-section").removeClass("sticky");
    }
});

//Highlights the current page on the navbar
function highlightPage() {
    var page_href = window.location.href.split("/").pop();
    var page_name = page_href.substring(0, page_href.indexOf("."));
    document.getElementById(page_name).style.background = "#eaeaea";
}

//Functions to show and hide text over images
function showImageName(text) {
    document.getElementById("company-image-text").innerHTML= text;
}
function hideImageName() {
    document.getElementById("company-image-text").innerHTML = "";
}

//Automatically fills subject box with beat # when directed from previews page
$(function () {
    var beat_number = window.location.href.split('beat').pop();
    switch (String(beat_number)) {
        case "1":
            $("#contact_subject").val("Halloween");
            break;
        case "2":
            $("#contact_subject").val("Hisoka");
            break;
        case "3":
            $("#contact_subject").val("Love Hurts");
            break;
        case "4":
            $("#contact_subject").val("Inspire Me");
            break;
        case "5":
            $("#contact_subject").val("STOOPID");
            break;
        case "6":
            $("#contact_subject").val("Horizon");
            break;
        default:
            break;
    }
});

//Dialog JavaScript UI Widgit https://jqueryui.com/dialog/
if(window.location.href.split('/').pop() == 'contact.html') {
    $(function () {
        $("#dialog-text").show()
        $( "#dialog" ).dialog();
    });
}
