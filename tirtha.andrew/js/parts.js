

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
            </div></div>
            <form class="user-form" id="user-profile-page" >
               <p class="user-profile-title">Name</p>
               <p class="user-profile-info">${o.name}</p>

               <p class="user-profile-title">Username</p>
               <p class="user-profile-info">@${o.username}</p>

               <p class="user-profile-title">Email</p>
               <p class="user-profile-info">${o.email}</p>
         
               <p class="user-profile-title">Handicap</p>
               <p class="user-profile-info">${o.handicap}</p>
               <br>
               <br>
               <br>
               <div class="hotdog color">
               <a href="#" class="js-logout">Logout</a>
               </div>
            </form>
         </div>
`;



const makeCourseProfileDescription = o => `
<form class="course-form" id="course-profile" >
         <p class="course-profile-title">Type</p>
         <p class="course-profile-info">${o.type}</p>
         

         <p class="course-profile-title">Description</p>
         <p class="course-profile-info">${o.description}</p> 
</form>
<hr>
`;

const makeCourseProfileRounds  = o => `
		<form class="round-form" id="course-round">
         <h5>Rounds</h5>
           <ul class="round-list">

            <li class="round-list-item">
                  <a data-activate="#list-view-round-modal">
                     <div class="round-list-body" >
                        <h6 class="course-round-date">March 20, 2022</h6>
                     </div>
                  </a>
            </li>
            <li class="round-list-item">
               <a data-activate="#list-view-round-modal">
                     <div class="round-list-body">
                         <h6 class="course-round-date">February 24, 2022</h6>
                     </div>
               </a>
            </li>
            <li class="round-list-item">
               <a data-activate="#list-view-round-modal">
                     <div class="round-list-body">
                        <h6 class="course-round-date">December 14, 2021</h6>
                     </div>
               </a>
            </li>
          </ul>
            <br>
            <div class="hotdog color">
               <a data-activate="#addnew-round-modal">Add New Round</a>
            </div>
            </form>  
`







