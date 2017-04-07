Handlebars.registerHelper("counter", function (index){
    return index + 1;
});

// var jsonData = "https://twelveparsecs.github.io/IXDGradShow/Project-Gallery/json/ixd_projects.json";
var jsonData = "https://twelveparsecs.github.io/IXDGradShow/Project-Gallery/json/ixd_projects_2.json";

// var jsonData = "json/ixd_projects_2.json";

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

Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});
