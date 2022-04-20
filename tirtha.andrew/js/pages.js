
const RecentPage = async() => {
	query({
		type:'check_signin',
		params:["user2","pass"]
	}).then(d=>{
		console.log(d)
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


const CourseProfilePage = async() => {
   let {result:courses} = await query({
      type:'course_by_id',
      params:[sessionStorage.courseId]
   })
   let [course] = courses;

 $(".course-profile-top").css({"background-image":`url(${course.img})`})
 $("#course-profile-page h1").html(course.name)
 $(".course-profile-description").html(makeCourseProfileDescription(course));
 $(".course-profile-rounds").html(makeCourseProfileRounds(course));
}



  

   // let {result:locations} = await query({
    //  type:'locations_by_animal_id',
   //   params:[sessionStorage.animalId]
  // })
  // console.log(locations)





