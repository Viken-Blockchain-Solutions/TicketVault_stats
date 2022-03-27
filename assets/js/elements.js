/* // Get access to DOM elements

// radio buttons
const gridRadios = document.querySelectorAll('gridRadios');

const asset_radio = document.getElementById('radio-asset');
const token_radio = document.getElementById('radio-token');

const radio_choice = document.getElementById("radio-choice");

asset_radio.addEventListener('change', (e) => {
    if (e.target.checked) {
        let asset = spreadAsset();
        radio_choice.classList.add(asset)
    } else {
        let asset = spreadAsset();
        radio_choice.classList.remove(asset)
        
    }
})

token_radio.addEventListener('change', (target) => {
    // Append to another element:
    document.getElementById("radio-choice").appendChild(spreadTokens()); 
})


function spreadTokens() {
    // create element:
    const div = document.createElement("h4");
    div.innerHTML = "Spread Tokens";

    // Append to another element:
    document.getElementById("radio-choice").class.remove(div);
}

function spreadAsset() {
    const div = document.createElement("h4");
    div.innerHTML = "Spread Asset";

    // Append to another element:
    document.getElementById("radio-choice").appendChild(div); 

}



 */




















const addOptions = (`
<option selected>Choose a token to spread</option>
<option value="0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619">ETH</option>
<option value="0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6">BTC</option>
<option value="0x7b9c2d37fc0B45A5Ec022D2023F18685FdA832e7">CENT</option>
<option value="0xB25e20De2F2eBb4CfFD4D16a55C7B395e8a94762">REQ</option>
<option value="0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270">WMATIC</option>
`);



