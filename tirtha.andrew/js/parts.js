

const makeCourseList = templater(o=>`
<li class="course-list-item">
    <a href="#course-profile-page" class="js-course-jump" data-id="${o.id}">
        <div class="course-list-image"><img src="${o.img}" alt=""></div>
            <div class="course-list-body">
                <div class="course-list-name">${o.name}</div>
                <div class="course-list-type">Type: ${o.type}</div>
            </div>
    </a>
  </li>
`);



const makeUserProfilePage = o => `
<div data-role="main" class="overscroll">
            <br>
            <div class="text-center">
                <img src="${o.img}" alt="" class="user-profile-image">
            </div>
            <div class="user-form" id="user-profile-page">

               <div class="user-profile-name ">${o.name}</div>

               <div class="user-profile-username">@${o.username}</div>

               <div class="user-info">
                  <div class="user-profile-description">
               </div>


               <div class="user-info">
                  <div class="card email">
                    <div class="user-profile-email">${o.email}</div>
                  </div>
                  <div class="card handicap">
                      <div class="user-profile-handicap">${o.handicap}</div>
                  </div>
               </div



            
            </div>
         </div>
`;



const makeCourseProfileDescription = o => `
<form class="course-form" id="course-profile">
         <p class="course-profile-title">Type</p>
         <p class="course-profile-info">${o.type}</p>
         

         <p class="course-profile-title">Description</p>
         <p class="course-profile-info">${o.description}</p> 
</form>
<hr>
`;

const makeCourseProfileRounds  = o => `
<h5>Rounds</h5>
	<form class="course-form" id="course-profile-round">
           <p class="course-profile-round-title">Date Played</p>
           <p class="course-profile-rounds">${o.date_played}</p>
           <p class="course-profile-round-title">Score</p>
           <p class="course-profile-rounds">${o.score}</p>
           <p class="course-profile-round-title">Tee</p>
           <p class="course-profile-rounds">${o.tee}</p>
    </form>
`



const FormControlInput = ({namespace,name,displayname,type,placeholder,value=""}) => {
   return `<div class="form-control">
      <label class="form-label" for="#${namespace}-${name}">${displayname}</label>
      <input data-role="none" class="form-input" type="${type}" placeholder="${placeholder}" id="${namespace}-${name}" value="${value}">
   </div>`;
}
const FormControlTextarea = ({namespace,name,displayname,placeholder,value=""}) => {
   return `<div class="form-control">
      <label class="form-label" for="#${namespace}-${name}">${displayname}</label>
      <textarea data-role="none" class="form-input" placeholder="${placeholder}" id="${namespace}-${name}">${value}</textarea>
   </div>`;
}


const makeCourseForm = (course,namespace = "course-add") => {
return `
${FormControlInput({
   namespace,
   name:"name",
   displayname:"Name",
   type:"text",
   placeholder:"Type a Name",
   value:course.name,
})}
${FormControlInput({
   namespace,
   name:"type",
   displayname:"Type",
   type:"text",
   placeholder:"Type a Type",
   value:course.type,
})}

${FormControlInput({
   namespace,
   name:"description",
   displayname:"Description",
   type:"text",
   placeholder:"Type a Description",
   value:course.description,
})}
`;
}

const makeUserForm = (user,namespace = "user-edit") => {
return `
${FormControlInput({
   namespace,
   name:"name",
   displayname:"Name",
   type:"text",
   placeholder:"Type a Name",
   value:user.name,
})}
${FormControlInput({
   namespace,
   name:"username",
   displayname:"Username",
   type:"text",
   placeholder:"Type a Username",
   value:user.username,
})}
${FormControlInput({
   namespace,
   name:"email",
   displayname:"Email",
   type:"text",
   placeholder:"Type an Email",
   value:user.email,
})}
`;
}






