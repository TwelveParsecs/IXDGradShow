Handlebars.registerHelper("counter", function (index){
    return index + 1;
});

var jsonData = "https://twelveparsecs.github.io/IXDGradShow/Project-Gallery/json/ixd_projects.json";

// var jsonData = "json/ixd_projects.json";

// asynchronous call
$.getJSON(jsonData, function(json) {
    
    var template = $('#gallery').html();
    var templateScript = Handlebars.compile(template);
    var html = templateScript(json);
    $("#proj-container").append(html);

    // modal content
    var modal = $('#proj-modal').html();
    var modalScript = Handlebars.compile(modal);
    var html2 = modalScript(json);
    $("#modal").append(html2);
});
