function openModal() {
	$(".modal_wrapper").css("display", "block");
	$(".overlay").css("display", "block");
}

function closeModal() {
	$(".modal_wrapper").css("display", "none");
	$(".overlay").css("display", "none");
}

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
    	closeModal();
    }
});