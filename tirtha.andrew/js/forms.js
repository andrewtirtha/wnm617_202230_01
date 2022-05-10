


const submitCourseAdd = async () => {
   let name = $("#course-add-name").val();
   let type = $("#course-add-type").val();
   let description = $("#course-add-description").val();

   console.log({name,type,description});



   if(name!="" && type!="" && description!="") {
      let {id,error} = await query({
         type: 'insert_course',
         params: [sessionStorage.userId,name,type,description]
      });

      if(error) throw(error);

      sessionStorage.courseId = id;
      history.go(-1);
   } else {
      throw("Not all data present");
   }
}

const submitUserSignup = async () => {
   let name = $("signup-name").val();
   let username = $("#signup-username").val();
   let email = $("#signup-email").val();
   let handicap = $("signup-handicap").val();
   let password = $("#signup-password").val();
   let password2 = $("#signup-password2").val();

   if(password2!=password) {
      throw("Passwords don't match");
   } else
   if(username!="" && email!="" && password!="") {
      let {id,error} = await query({
         type: 'insert_user',
         params: [username,email,password]
      });

      if(error) throw(error);

      sessionStorage.userId = id;
      $.mobile.navigate("#list-page");
   } else {
      throw("Not all data present");
   }
}