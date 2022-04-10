
function auction() {
    timed_auction.innerHTML = `
    <div class="row mb-3">
        <label for="inputTime" class="col-sm-2 col-form-label">Timed Auction</label>
        <div class="col-sm-4">
        <input type="time" class="form-control">
        </div>
    </div>
    <div class="row mb-3">
        <label for="inputDate" class="col-sm-2 col-form-label">Set start date</label>
        <div class="col-sm-4">
        <input type="date" class="form-control">
        </div>
    </div>
`;
} 

function fixed() {
    timed_auction.innerHTML = `
    <div class="row mb-3">
        <label for="inputPrice" class="col-sm-2 col-form-label">Set Price</label>
        <div class="col-sm-4">
        <input type="text" class="form-control">
        </div>
    </div>
    `;
}




const gridRadios1 = document.querySelector("#gridRadios1").value;
const gridRadios2 = document.querySelector("#gridRadios2").value;


const timed_auction = document.getElementById("timedAuction");

