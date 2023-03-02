import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let promise=await fetch(`${config.backendEndpoint}/reservations/`);
    let data=await promise.json();
    // console.log(data);
    return data;
  }catch(err){
    return null;
  }
// Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  if(reservations.length==0){
    document.getElementById("reservation-table-parent").style.display="none";
    document.getElementById("no-reservation-banner").style.display="block";
  }
  else{
    document.getElementById("reservation-table-parent").style.display="block";
    document.getElementById("no-reservation-banner").style.display="none";
  }
  let tableEle=document.getElementById("reservation-table");

  reservations.forEach((reservation)=>{
    let d=new Date(reservation.date);
    const date=d.toLocaleDateString("en-IN");
    let trEle=document.createElement("tr");
    let t=new Date(reservation.time);
    const time=t.toLocaleDateString('en-In', { day: "numeric", month:"long", year:"numeric", hour:"numeric",minute:"numeric",second:"numeric"}).replace(" at",",");
    trEle.innerHTML=`
    <td>${reservation.id}</td>
    <td>${reservation.name}</td>
    <td>${reservation.adventureName}</td>
    <td>${reservation.person}</td>
    <td>${date}</td>
    <td>${reservation.price}</td>
    <td>${time}</td>
    <td id=${reservation.id}><a href=${config.backendEndpoint}/frontend/pages/adventures/detail/?adventure=${reservation.adventure}><button class="reservation-visit-button" type="submit">Visit Adventure</button></a></td>
    ` ;
    tableEle.appendChild(trEle);
  });


  
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
