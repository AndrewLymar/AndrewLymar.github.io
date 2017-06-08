$(function() {
    var siteScreen = $(".site-screen");
    var siteDescription = $(".site-description"); 
    setElementsOrder();
    $(window).resize(setElementsOrder);
    
    function setElementsOrder() {
        if ( $(window).width() <= '790' ) {
            siteDescription.insertBefore(siteScreen);
        } else {
            siteScreen.insertBefore(siteDescription);
        }
    } 
});