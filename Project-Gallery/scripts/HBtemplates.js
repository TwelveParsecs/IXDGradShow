Handlebars.registerHelper("counter", function (index){
    return index + 1;
});

// var jsonData = "https://twelveparsecs.github.io/IXDGradShow/Project-Gallery/json/ixd_projects.json";
var jsonData = "json/ixd_projects_3.json";

// var jsonData = "json/ixd_projects_2.json";

// asynchronous call
$.getJSON(jsonData, function(json) {
console.log("called");
    var template = $('#gallery').html();
    var templateScript = Handlebars.compile(template);

    // randomize project order
    var shuffledArray = shuffle(json["projects"]);

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



function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}
