
const checkUser = () => {
  let user = Moralis.User.current();
  
  if(user){
    console.log("Logged in FLOW")
    console.log("User Account :",user.get("ethAddress"))
    console.log("about to set user address, IF USER WAS LOGGED IN AT ARRIVAL")
    let account = user.get("ethAddress");
    setCurrentUser(account);
    console.log("user address should be displayed now")
  }
  else {
    console.log("NOT logged in FLOW")
    login(user)
  }
}

fetchAssets();



/* Authentication code */
async function login() {
  await Moralis.authenticate({
    signingMessage: "Welcome to Spread Dapp. Connect to spread assets!",
  })
    .then(async = (user) => {
      console.log("inside then.")
      console.log("about to set user address, IF USER WAS NOT LOGGED IN AT ARRIVAL")
      let account = user.get("ethAddress");
      console.log("User Account :", account);
      setCurrentUser(account);
      console.log("user address should be displayed now")
    })
}

async function disconnect() {
  await Moralis.User.logOut();
  console.log("disconnected!");
}

async function setCurrentUser(account) {
  console.log("setting current user")
  let userAddress = document.getElementById("userAddress");

  userAddress.style.display = "block";
  userAddress.innerHTML = account;
  
  document.getElementById("btn-login").style.display = "none";
  document.getElementById("btn-logout").style.display = "block";
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