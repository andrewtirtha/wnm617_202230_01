
$(() => {
   checkUserId();

   // EVENT DELEGATION
   $(document)

   .on("pagecontainerbeforeshow", function(event, ui){
         console.log(ui.toPage[0].id)

         //PAGE ROUTING
         switch(ui.toPage[0].id) {
            case "recent-page":RecentPage(); break;
            case "list-page":ListPage(); break;
            case "user-profile-page":UserProfilePage(); break;
            case "user-edit-page":UserEditPage(); break;
            case "course-profile-page":CourseProfilePage(); break;
            case "course-edit-page":CourseEditPage(); break;
            case "course-add-page":CourseAddPage(); break;

         } 
   })

      





   // FORM SUBMISSIONS
   .on("submit", "#signin-form", function(e) {
      e.preventDefault();
      checkLoginForm();
   })
  .on("submit", "#signup-form", function(e) {
      e.preventDefault();
      submitUserSignup();
   })


   // FORM SUBMISSION CLICKS
   .on("click", ".js-submit-course-add", function() {
      submitCourseAdd();
   })
   .on("click", ".js-submit-user-edit", function() {
      submitUserEdit();
   })

   // CLICKS
   .on("click", ".js-logout", function() {
      sessionStorage.removeItem("userId");
      checkUserId();
   })

    .on("click", ".js-course-jump", function(e) {
      try {
      sessionStorage.courseId = $(this).data('id');
      $.mobile.navigate("#course-profile-page");
   } catch(e) {
         throw("No id detected")
      }
   })

   .on("click",".js-course-delete", function(e) {
      submitDeleteCourse();
   })

     .on("click", ".course-profile-nav>div", function(e) {
      let id = $(this).index();
      $(this).parent()
         .next().children().eq(id)
         .addClass("active")
         .siblings().removeClass("active")
      $(this).addClass("active")
         .siblings().removeClass("active")
   })




   // ACTIVATE TOOLS
   .on("click", "[data-activate]", function() {
      let target = $(this).data("activate");
      $(target).addClass("active")
   })
   .on("click", "[data-deactivate]", function() {
      let target = $(this).data("deactivate");
      $(target).removeClass("active")
   })
   .on("click", "[data-toggle]", function() {
      let target = $(this).data("toggle");
      $(target).toggleClass("active")
   })
   .on("click", "[data-activateone]", function() {
      let target = $(this).data("activateone");
      $(target).addClass("active")
         .siblings().removeClass("active")
   })

   ;

   $("[data-template]").each(function(){
      let target = $(this).data("template");
      $(this).html($(target).html())
   });

   [,"#recent-page","#list-page","#user-profile-page"].forEach((p,i)=>{
      if(window.location.hash === p) {
         $(`.nav-icon-set li:nth-child(${i})`).addClass("active");
      }
   });

});