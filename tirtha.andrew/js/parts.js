
const makeAnimalList = templater(o=>`
<li class="animal-list-item">
   <a href="#animal-profile-page" class="js-animal-jump" data-id="${o.id}">
      <div class="animal-list-image"><img src="${o.img}" alt=""></div>
      <div class="animal-list-body">
         <div class="animal-list-name">${o.name}</div>
         <div class="animal-list-breed">Breed: ${o.breed}</div>
         <div class="animal-list-color">Color: ${o.color}</div>
      </div>
   </a>
</li>
`);


const makeUserProfilePage = o => `
<div data-role="main" class="overscroll">

              
         <div class="text-center">
             <img src="${o.img}" alt="" class="user-profile-image">
             <a href="#user-edit-photo-page" class="edit-icon">
             <img src="images/icons/pencil.svg" class="icon"></a>
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
               </div



            
            </div>
         </div>
`;


const makeAnimalProfileDescription = o => `

 <br>
<div class="animal-profile-title">Breed:</div>
<div class="card profile">
<div class="animal-profile-breed ">${o.breed}</div>
</div>
<div class="animal-profile-title">Color:</div>
<div class="card profile">
<div class="animal-profile-color ">${o.color}</div>
</div>
`;





const makeAnimalPopupBody = o => `
<div class="display-flex js-animal-jump noclick-children" data-id="${o.id}">
   <div class="animal-list-image"><img src="${o.img}" alt=""></div>
   <div>
      <h2>${o.name}</h2>
      <div>${o.breed}</div>
      <div>${o.color}</div>
   </div>
</div>
`;



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


const makeAnimalForm = (animal,namespace = "animal-add") => {
return `
${FormControlInput({
   namespace,
   name:"name",
   displayname:"Name",
   type:"text",
   placeholder:"Type a Name",
   value:animal.name,
})}
${FormControlInput({
   namespace,
   name:"breed",
   displayname:"Breed",
   type:"text",
   placeholder:"Type a Breed",
   value:animal.breed,
})}
${FormControlInput({
   namespace,
   name:"color",
   displayname:"Color",
   type:"text",
   placeholder:"Type a Color",
   value:animal.color,
})}
${FormControlTextarea({
   namespace,
   name:"description",
   displayname:"Description",
   placeholder:"Type a Description",
   value:animal.description,
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






const makeAnimalListSet = (animals, target="#list-page .animal-list") => {
   $(".filter-bar").html(makeFilterList(animals));
   $(target).html(makeAnimalList(animals));
}

const capitalize = s => (s[0]||"").toUpperCase()+s.slice(1);

const filterList = (animals,breed) => {
   let a = [...(new Set(animals.map(o=>o[breed])))];
   return templater(o=>o?`<span data-filter="${breed}" data-value="${o}">${capitalize(o)}</span>`:'')(a);
}

const makeFilterList = (animals) => {
   return `
   <span data-filter="breed" data-value="">All</span>
   |
   ${filterList(animals,'breed')}
   |
   ${filterList(animals,'color')}
   `;
}