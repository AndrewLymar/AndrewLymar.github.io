$(function() {
    $(".version").bind("click", function() {
        var path = $(location).attr('href');
        var currentPage;
        var src;
        path = path.split("/");
        currentPage = path[path.length-1].split(".");
        currentPage = currentPage[0];
        if ( $(this).hasClass("desktop") ) {
            src = "../img/works/" + currentPage + "/" + currentPage + "-desktop.jpg";
            $(".mCS_img_loaded").attr("src", src);
        }  
        if ( $(this).hasClass("tablet") ) {
            src = "../img/works/" + currentPage + "/" + currentPage + "-tablet.jpg";
            $(".mCS_img_loaded").attr("src", src);
        }  
        if ( $(this).hasClass("mobile") ) {
            src = "../img/works/" + currentPage + "/" + currentPage + "-mobile.jpg";
            $(".mCS_img_loaded").attr("src", src);
        }  
        
    });
});