var output_listing = document.getElementById("output-listing");




const timed_auction = `
    <div class="row mb-4">
        <label for="inputTime" class="col-sm-4 col-form-label">Timed Auction</label>
        <div class="col-sm-4">
        <input type="time" class="form-control">
        </div>
    </div>
    <div class="row mb-3">
        <label for="inputDate" class="col-sm-4 col-form-label">Set start date</label>
        <div class="col-sm-5">
        <input type="date" class="form-control">
        </div>
    </div>
`;

const fixed_price = `
    <div class="row mb-4">
        <label for="inputPrice" class="col-sm-3 col-form-label">Set Price</label>
        <div class="col-sm-4">
        <input type="text" class="form-control">
        </div>
    </div>
`;

// display fixed pricing element
function showFixed() {
    output_listing.style.display = "block";
    output_listing.innerHTML = fixed_price;
}

// display timed auction element
function showTimed() {
    output_listing.style.display = "block";
    output_listing.innerHTML = timed_auction;
}
// display no listing options
function showNone() {
    output_listing.style.display = "none";
}

function json() {
    var input_artist = document.getElementById("input-artist").value;
    var input_collection = document.getElementById("input-collection").value;
    var input_external_url = document.getElementById("input-external-url").value;
    var input_genre = document.getElementById("input-genre").value;
    var input_asset = document.getElementById("input-asset").value;
    var input_media = document.getElementById("input-media").value;
    var input_total_supply = document.getElementById("input-total-supply").value;
    var input_description = document.getElementById("input-description").value;
    
    console.log("artist", input_artist);

    document.getElementById("output-artist").innerHTML = `"${input_artist}",`;
    document.getElementById("output-collection").innerHTML = `"${input_collection}",`;
    document.getElementById("output-external-url").innerHTML = `"${input_external_url}"`;
    document.getElementById("output-genre").innerHTML = `"${input_genre}",`;
    document.getElementById("output-asset").innerHTML = `"${input_asset}",`;
    document.getElementById("output-media").innerHTML = `"${input_media}",`;
    document.getElementById("output-description").innerHTML = `"${input_description}",`;
    document.getElementById("output-total-supply").innerHTML = `"${input_total_supply}",`;    
}
