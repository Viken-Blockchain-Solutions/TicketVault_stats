import { setNetworkId, getNetworkData, getAssets, networkSwitch } from "./utils.js";

let selectedChain = document.querySelector("#selectedChain");
let token, logOut;


// Auto log in with metamask and get native assets and token balances.
(async function () {
  await setNetworkId();

  let user = Moralis.User.current();
  if(!user) (Moralis.authenticate().then((user) => console.log(user)))();
  logOut = async () => await Moralis.User.logOut();

  await Moralis.enableWeb3();
  let networkData = await getNetworkData();
  await getAssets(networkData[0], networkData[1]);
})()

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