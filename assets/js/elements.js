// Get access to DOM elements
const choice = document.querySelector('choice');

// radio buttons
const asset = document.getElementById('radio-asset');
const token = document.getElementById('radio-token');

const articleSection = document.querySelector('section');

// add event listeners
asset.addEventListener('click', () => {
    console.log("working");
});

token.addEventListener('click', () => {
    const choice = startSpreading();
    console.log(choice);
    articleSection.appendChild(choice);
});


const addOptions = `
<option selected>Choose a token to spread</option>
<option value="0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619">ETH</option>
<option value="0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6">BTC</option>
<option value="0x7b9c2d37fc0B45A5Ec022D2023F18685FdA832e7">CENT</option>
<option value="0xB25e20De2F2eBb4CfFD4D16a55C7B395e8a94762">REQ</option>
<option value="0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270">WMATIC</option>
`;


// page functions.
function startSpreading() {
    let newArticle = document.createElement('label');
    let newOption = document.createElement('option', "Choose a token to spread");
    
    newArticle.appendChild(newOption);
    
    newArticle.classList.add('section');
    return newArticle;
  }