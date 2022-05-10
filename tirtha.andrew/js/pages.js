
const RecentPage = async() => {


   let {result} = await query({
      type:'recent_course_locations',
      params:[sessionStorage.userId]
   });
   console.log(result);

   

   let valid_courses = result.reduce((r,o)=>{
      o.icon = o.img;
      if(o.lat && o.lng) r.push(o);
      return r;
   },[]);

   let map_el = await makeMap("#recent-page .map");
   makeMarkers(map_el,valid_courses)

    map_el.data("markers").forEach((m,i)=>{
      console.log(m)
      m.addListener("click",function(e){

         console.log(valid_courses[i])

         // Just Navigate
         sessionStorage.courseId = valid_courses[i].course_id;
         $.mobile.navigate("#course-profile-page");


      })
   })
}



const ListPage = async() => {
	let {result:courses} = await query({
	type:'courses_by_user_id',
	params:[sessionStorage.userId]
	})
		console.log(courses)
	$("#list-page .course-list").html(makeCourseList(courses));
	}


const UserProfilePage = async() => {
   let {result:users} = await query({
      type:'user_by_id',
      params:[sessionStorage.userId]
   })
   let [user] = users;

   console.log(user)

   $("#user-profile-page [data-role='main']").html(makeUserProfilePage(user));
}
const UserEditPage = async() => {
   let {result:users} = await query({
      type:'user_by_id',
      params:[sessionStorage.userId]
   })
   let [user] = users;

   $("#user-edit-form").html(makeUserForm(user,"user-edit"))
}



const CourseProfilePage = async() => {
   let {result:courses} = await query({
      type:'course_by_id',
      params:[sessionStorage.courseId]
   })
   let [course] = courses;

 $(".course-profile-top").css({"background-image":`url(${course.img})`})
 $("#course-profile-page h1").html(course.name)
 $(".course-profile-description").html(makeCourseProfileDescription(course));


  let {result:rounds} = await query({
      type:'rounds_by_course_id',
      params:[sessionStorage.courseId]
   })
   let [round] = rounds;

   console.log(round)

    $(".course-profile-rounds").html(makeCourseProfileRounds(round));

}

const CourseEditPage = async() => {
   let {result:courses} = await query({
      type:'course_by_id',
      params:[sessionStorage.courseId]
   })
   let [course] = courses;

   $("#course-edit-form").html(makeCourseForm(courses,"courses-edit"))
}

const CourseAddPage = async() => {
   let {result:courses} = await query({
      type:'course_by_id',
      params:[sessionStorage.courseId]
   })
   let [course] = courses;

   $("#course-add-form").html(makeCourseForm({},"course-add"))
}
