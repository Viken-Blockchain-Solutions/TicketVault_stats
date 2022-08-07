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
  .then(async = (user) => {
    account = user.get("ethAddress");
    console.log("logged in account:", account);
  })
  return account;
}

async function disconnect() {
  await Moralis.User.logOut();
  removeDisconnected();
}

// Set current logged in user
async function setCurrentUser(account) {
  let userAddress = document.getElementById("userAddress");
  
  await fetchAssets();
  userAddress.style.display = "block";
  userAddress.innerHTML = account;

  // listens to changed account in metamask
  Moralis.onAccountChanged((changedAccount) => {
    console.log(changedAccount);
    
    login();

    console.log("logged in user", changedAccount);
    console.log("about to fetch assets");
    fetchAssets();
    userAddress.innerHTML = changedAccount;
  });
  
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


// get native assets and token balances.
async function fetchAssets() {
  const web3Provider = await Moralis.enableWeb3();
  const network = await web3Provider.getNetwork();
  
  let response = await fetch("https://chainid.network/chains.json");
  let data = await response.json();
  
  await getNativeAsset(network, data);
  await getERC20Assets();
  
  selectAssets.addEventListener("change", (event) => token = event.target.value);
}

async function spread() {
  const web3Provider = await Moralis.enableWeb3();
  const network = await web3Provider.getNetwork();
  
  if(selectAssets.value === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") sendNativeAsset(network);
  else if(selectAssets.value ===  "") {
    alert("Please select an asset to spread");
    throw "no selected asset";
  } else sendErc20(token, network);
}

// is the user logged in or not
// if user is logged in -> display address.
// if the user is not logged in -> display login button.

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = disconnect;

checkUser();