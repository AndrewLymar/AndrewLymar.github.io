$(function() {
    $(".name").append(data.header.name);
    $(".specialization").append(data.header.specialization);   
    $.each( data.header.links, function(k, v){
       $(".profiles").append(v);  
    });
    $(".skills").append(data.header.skills);
    $(".copyright").append(data.footer.copyright);
});