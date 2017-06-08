$(function() {
    var menuIsOpened = false;
    var nav = $("nav");

    $(document).on("scroll", onScroll);
    $("a[href^='#']").on("click", scrollTo);
    $(window).on("resize", function() {
        if (!menuIsOpened && $(window).width() > "830") {
            showMenu();
        }
        else if (menuIsOpened && $(window).width() < "830") {
            hideMenu();
        }
    });
    $(".mobile-menu").on("click", function() {
        if (!menuIsOpened) {
            showMenu();
        } else {
            hideMenu();
        }
    });
    $("nav a").on("click", function() {
        if ($(window).width() <= "830") {
            hideMenu();
        }
    });

    function onScroll(event) {
        var scrollPos = $(document).scrollTop();

        if (scrollPos > 0) {
            nav.addClass("active");
        } else {
            nav.removeClass("active");
        }

        $("nav a").each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $("nav ul li a").removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    }

    function scrollTo(event) {
        event.preventDefault();
        $(document).off("scroll");

        $("a").each(function () {
            $(this).removeClass("active");
        })
        $(this).addClass("active");

        var target = this.hash,
            menu = target;
        $target = $(target);
        $("html, body").stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, "swing", function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    }

    function showMenu() {
        $("nav ul").css("display", "flex");
        menuIsOpened = true;
    }
    
    function hideMenu() {
         $("nav ul").css("display", "none");
         menuIsOpened = false;
    }
    
});