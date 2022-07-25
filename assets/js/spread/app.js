(async () => {
  let user = Moralis.User.current();
  if(user){
    console.log(user.get("ethAddress"))
  }
  else {
    login();
  }
  fetchAssets();
})()

/* Authentication code */
async function login() {
    user = await Moralis.authenticate({
      signingMessage: "Sign a transaction to verify your account!",
    })
      .then(function (user) {
        //console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
      })
        
      .catch(function (error) {
        console.log(error);
      });
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
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
document.getElementById("btn-logout").onclick = logOut;
