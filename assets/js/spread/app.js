// FIXME: login.
let user = Moralis.User.current();
if(!user) (Moralis.authenticate().then((user) => console.log(user)))();
// FIXME: logout.
const logOut = async () => await Moralis.User.logOut();
let selectedChain = document.querySelector("#selectedChain");

// Auto log in with metamask and get native assets and token balances.
(async function () {

  let networkData = await getNetworkData();
  await getNetworkId(networkData[0], networkData[1]);
  getAssets(networkData[0], networkData[1]);

  console.log(networkData[1][103]);
})()

async function getNetworkData() {
  const web3Provider = await Moralis.enableWeb3();
  const network = await web3Provider.getNetwork();

  let response = await fetch("https://chainid.network/chains.json");
  let data = await response.json();

  return [network, data];
}

selectedChain.addEventListener("change", async (event) => {
  let chain = event.target.value;

  let networkData = await getNetworkData();
  switchNetwork(chain, networkData[0], networkData[1]);
});
selectAssets.addEventListener("change", (event) => token = event.target.value);

async function getNetworkId(network, data) {
  let chainId = await Moralis.chainId;
  
  if(chainId === "0x1") {
    document.getElementById("eth").selected = "true";
  }
  else if(chainId === "0x89") {
    document.getElementById("matic").selected = "true";
  }
}

async function spread() {
  let networkData = await getNetworkData();

  if(selectAssets.value === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") sendNativeAsset(networkData[0]);
  else if(selectAssets.value ===  "") {
    alert("Please select an asset to spread");
    throw "no selected asset";
  } else sendErc20(token, networkData[0]);
}