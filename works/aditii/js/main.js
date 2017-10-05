$(function () {
    var menuIsOpened = false;

    $(window).on("resize", function () {
        if (!menuIsOpened && $(window).width() > "768") {
            showMenu();
        } else if (menuIsOpened && $(window).width() < "768") {
            hideMenu();
        }
    });

    $(".mobile-menu-icon").on("click", function () {
        if (!menuIsOpened) {
            showMenu();
        } else {
            hideMenu();
        }
    });
    
    $("nav a").on("click", function () {
        if ($(window).width() <= "768") {
            hideMenu();
        }
    });

    function showMenu() {
        $("nav ul").css("display", "flex");
        menuIsOpened = true;
    }

    function hideMenu() {
        $("nav ul").css("display", "none");
        menuIsOpened = false;
    }

});