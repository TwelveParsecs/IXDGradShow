var projID;

function openModal() {

    // console.log(projID);
    $(".modal_wrapper").css("display", "block");
    $("#"+projID).css("display", "block");
    $(".proj-overlay").css("display", "block");
}

function closeModal() {
    $(".modal_wrapper").css("display", "none");
    $("#"+projID).css("display", "none");
    $(".proj-overlay").css("display", "none");
}

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        closeModal();
    }
});

$(document).ready(function() {

    $(document).on("click",".tile",function() {
      
        projID = $(this).data("pid");
        openModal(projID);
    });
});
