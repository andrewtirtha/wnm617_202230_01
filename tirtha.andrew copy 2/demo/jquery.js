
$(()=>{
	$(".accordion dt").on("click", function() {
	//$(this).next().show();

	//$(this).next().slideToggle();

	$(this).next().slideDown()
		.siblings("dd").slideUp()


	});


	$(".tabgroup.tab").on("click", function(e){
		Let index = $(this).index();

		$(this).addClass("active")
		.siblings().removeClass("active");

		$(this).closest(".tabgroup")
		.find("content").eq(index).addClass("active")
		.siblings().removeClass("active");

	})

});