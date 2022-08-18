import { getNetworkData, getAssets, networkSwitch } from "./utils.js";

let selectedChain = document.querySelector("#selectedChain");
let token;

// checks the current user
const checkUser = async () => {
  let user = Moralis.User.current();
  
  if(user) {
    let account = user.get("ethAddress");
    console.log("if statement: ", account)
    setCurrentUser(account);
  }
  else {
    removeDisconnected();
    let account = await login();
    console.log("else statement: ", account)
    setCurrentUser(account);
  }
}

/* Authentication code */
async function login() {
  let account;
  await Moralis.authenticate({
    signingMessage: "Welcome to Spread Dapp. Connect to spread assets!",
  })
  .then(user => {
    account = user.get("ethAddress");
    console.log("logged in account:", account);
  })
  return account;
}

async function signOut() {
  await Moralis.User.logOut();
  removeDisconnected();
}

// Set current logged in user
async function setCurrentUser(account) {
  let userAddress = document.getElementById("userAddress");

  let networkData = await getNetworkData();
  let network = await networkData[0];
  let data = await networkData[1];
  
  await getAssets(network, data);
  
  // listens to changed account in metamask
  Moralis.onAccountChanged(async (changedAccount) => {
    let networkData = await getNetworkData();
    let network = await networkData[0];
    let data = await networkData[1];
    
    await login();
    await getAssets(network, data);
    userAddress.innerHTML = changedAccount;
  });
  userAddress.style.display = "block";
  userAddress.innerHTML = account;
  
  document.getElementById("btn-login").style.display = "none";
  document.getElementById("btn-logout").style.display = "block";
}

// Remove user that has disconnected
function removeDisconnected() {
  let userAddress = document.getElementById("userAddress");
  
  userAddress.style.display = "none";
  
  document.getElementById("btn-login").style.display = "block";
  document.getElementById("btn-logout").style.display = "none";
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = signOut;

// event listeners, 
// listens when user selects chain in front-end
selectedChain.addEventListener("change", async (event) => {
  let chain = event.target.value;
  await networkSwitch(chain);

  let networkData = await getNetworkData();
  await getAssets(networkData[0], networkData[1]);
});

// listens when user selects a token in front-end
selectAssets.addEventListener("change", (event) => token = event.target.value);

checkUser();

export { token }
