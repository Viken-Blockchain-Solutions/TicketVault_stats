import { setNetworkId, getNetworkData, getAssets, networkSwitch } from "./utils.js";

let selectedChain = document.querySelector("#selectedChain");
let token, logOut;


// Auto log in with metamask and get native assets and token balances.
(async function () {
  await setNetworkId();

  // FIXME: login.
  let user = Moralis.User.current();
  if(!user) (Moralis.authenticate().then((user) => console.log(user)))();
  // FIXME: logout.
  logOut = async () => await Moralis.User.logOut();
  
  let networkData = await getNetworkData();
  console.log("current Network:", networkData[0])
  
  await getAssets(networkData[0], networkData[1]);
  console.log("Refreshed and got the assets for:", networkData[0]);
})()


selectedChain.addEventListener("change", async (event) => {
  let chain = event.target.value;
  console.log("changed select option to:", chain)
  
  console.log("About to sign transation to change chain:", chain)
  let swithedTo = await networkSwitch(chain);
  console.log("Transaction signed, network should switch to:", swithedTo);
  
  let networkData = await getNetworkData();
  console.log("current Network:", networkData[0])
  
  console.log("about to get assets for:", networkData[0])
  let assets = await getAssets(networkData[0], networkData[1]);
  console.log("GetAssets called and returned native assets:", assets[0] );
  console.log("GetAssets called and returned erc assets:", assets[1] );
});

selectAssets.addEventListener("change", (event) => token = event.target.value);