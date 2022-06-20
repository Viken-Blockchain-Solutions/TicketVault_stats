// FIXME: login.
let user = Moralis.User.current();
if(!user) (Moralis.authenticate().then((user) => console.log(user)))();
// FIXME: logout.
const logOut = async () => await Moralis.User.logOut();

// Auto log in with metamask and get native assets and token balances.
(async function () {
  const web3Provider = await Moralis.enableWeb3();
  const network = await web3Provider.getNetwork();

  let response = await fetch("https://chainid.network/chains.json");
  let data = await response.json();

  await getNativeAsset(network, data);
  await getERC20Assets();

  selectAssets.addEventListener("change", (event) => token = event.target.value);
})()

async function spread() {
  const web3Provider = await Moralis.enableWeb3();
  const network = await web3Provider.getNetwork();

  if(selectAssets.value === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") sendNativeAsset(network);
  else if(selectAssets.value ===  "") {
    alert("Please select an asset to spread");
    throw "no selected asset";
  } else sendErc20(token, network);
}