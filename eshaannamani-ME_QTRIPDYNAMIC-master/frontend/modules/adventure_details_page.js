import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  
  const params = new URLSearchParams(search);
  return params.get('adventure');


  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let promise=await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let data=await promise.json();
    console.log(data);
    return data;
  }catch(err){
    return null;
  }


  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let h1Ele=document.getElementById("adventure-name");
  h1Ele.textContent=adventure.name;
  let pEle=document.getElementById("adventure-subtitle");
  pEle.textContent=adventure.subtitle;
  let imgEle=document.getElementById("photo-gallery");
  adventure.images.forEach((img)=>{
    let divEle  =document.createElement("div");
    divEle.innerHTML=`<img src=${img} alt="image" class="activity-card-image"/>`;
    imgEle.appendChild(divEle);
  });
  let divEle1=document.getElementById("adventure-content");
  divEle1.textContent=adventure.content;
  }

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let imgEle=document.getElementById("photo-gallery");
  imgEle.innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
  let diEle=document.getElementsByClassName("carousel-inner")[0];
  console.log(document.getElementsByClassName("carouselExampleIndicators").innerHTML);
  console.log(diEle);
  let firstdiv=document.createElement("div");
  firstdiv.setAttribute("class","carousel-item active");
  firstdiv.innerHTML=`<img src=${images[0]} class="d-block w-100" alt="image">`;
  diEle.appendChild(firstdiv);
  for(let i=1;i<images.length;i++){
    let divEle1=document.createElement("div");
    divEle1.setAttribute("class","carousel-item");
    divEle1.innerHTML=`<img src=${images[i]} class="d-block w-100" alt="image">`;
    diEle.append(divEle1);
  }

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
  if(adventure.available==true){
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-available").style.display="none";
    document.getElementById("reservation-panel-sold-out").style.display="block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totEle=document.getElementById("reservation-cost");
  totEle.textContent=adventure.costPerHead*persons;
  return null;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form=document.getElementById("myForm");
  
  const makeRequest = async (postObject) => {
    const url = `${config.backendEndpoint}/reservations/new`;
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(postObject),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((response) => response.json());
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      name: form.elements["name"].value,
      date: form.elements["date"].value,
      person: form.elements["person"].value,
      adventure: adventure.id
    };
    makeRequest(data).then((res) => console.log(res));
  });
  if(adventure.reserved==true) {
    alert("Success!");
    location.reload();
  } 
  else{
    alert("Failed!");
  }
    
  console.log(adventure);
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved==true){
    document.getElementById("reserved-banner").style.display="block";
  }
  else{
    document.getElementById("reserved-banner").style.display="none";
  }


}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
