let addrList = [];
let valueList = [];
let valsToSum = [];
let sum = 1;

const spreadPolygon = "0x87945Ea3BDCe665461348EA8AfE0b07b0e4E121F";
const spreadMainnet = "0x87945Ea3BDCe665461348EA8AfE0b07b0e4E121F";
let selectAssets = document.querySelector("#selectAssets");
let nativeAsset = document.querySelector("#nativeAsset");
let docFrag = document.createDocumentFragment();

// fetch the native balance of the address and display it in the select options element 
const getNativeAsset = async (network, data) => {
  const nativeBalances = await Moralis.Web3API.account.getNativeBalance({chain: Moralis.getChainId()});
  
  for(let index in data) {
    if(network.chainId == data[index].chainId) {
      nativeAsset.innerHTML = `${data[index].nativeCurrency.symbol}: ${Number(Moralis.Units.FromWei(nativeBalances.balance)).toFixed(4)}`;;
    }
  }
};

// get erc20 assets and display them in the select options.
const getERC20Assets = async () => {
  const tokenBalances = await Moralis.Web3API.account.getTokenBalances({chain: Moralis.getChainId()});
    
  for(let index in tokenBalances) {
    
    let newOption = document.createElement('option');
    newOption.value = tokenBalances[index].token_address;
    newOption.innerHTML = `${tokenBalances[index].symbol}: ${Number(Moralis.Units.FromWei(tokenBalances[index].balance, tokenBalances[index].decimals)).toFixed(3)}`;

    selectAssets.append(newOption);
  }
    
  selectAssets.appendChild(docFrag);
}
  

async function sendNativeAsset(network) {
  const spreadOptions = {
    functionName: "spreadAsset",
    abi: SPREAD_ABI,
    params: {
      recipients: addrList,
      values: valueList
    }
  }
  if (network.chainId === 1) await Moralis.executeFunction({msgValue: sumOf(valsToSum), contractAddress: spreadMainnet, ...spreadOptions});
  if (network.chainId === 137) await Moralis.executeFunction({msgValue: sumOf(valsToSum), contractAddress: spreadPolygon, ...spreadOptions});
}

// @notice execute method to spread ERC20 assets.
// @param token The token to spread.
async function sendErc20(token, network) {
  const spreadERC20Options = {
    functionName: "spreadERC20",
    abi: SPREAD_ABI,
    params: {
      token: token,
      recipients: addrList,
      values: valueList
     }
   }
  if (network.chainId === 1) await Moralis.executeFunction({msgValue: sumOf(valsToSum), contractAddress: spreadMainnet, ...spreadERC20Options});
  if (network.chainId === 137) await Moralis.executeFunction({msgValue: sumOf(valsToSum), contractAddress: spreadPolygon, ...spreadERC20Options});
}

//
async function networkSwitch(chain) {
  let network = await Moralis.switchNetwork(chain);
  return network;
}

/* async function addPolygonChain() {
  const chainId = 137;
  const chainName = "Polygon Mainnet";
  const currencyName = "Polygon";
  const currencySymbol = "MATIC";
  const rpcUrl = "https://polygon-rpc.com";
  const blockExplorerUrl = "https://polygonscan.com/";

  await Moralis.addNetwork(
    chainId,
    chainName,
    currencyName,
    currencySymbol,
    rpcUrl,
    blockExplorerUrl
  );
} */

function sumOf(arr) {
  let total = 0;
  for(let i = 0; i < arr.length; i++) total += arr[i];

  return total;
}

// fetch both native asset and ERC20, and return them.
async function getAssets(network, data) {
  let native = await getNativeAsset(network, data);
  let erc20 = await getERC20Assets();
  return [native, erc20];
}

function setTableValues() {
  let address = document.getElementById("input-address").value;
  let amount = document.getElementById("input-value").value;
  if((address && amount && selectAssets.value) == ("")) {
    alert('Please set all the data');
    throw "you have not set all data";
  };
  
  let newRow = document.createElement("tr");
  let newHeading = document.createElement("th");
  let newRecipient = document.createElement("td");
  let newValue = document.createElement("td");
  
  newHeading.innerHTML = sum++;
  newRecipient.innerHTML = address;
  newValue.innerHTML = amount;
  
  newRow.append(newHeading, newRecipient, newValue);
  
  document.getElementById("rows").appendChild(newRow);
  document.getElementById("input-address").value = "";
  document.getElementById("input-value").value = "";
  
  addRecieverDataToLists(address, amount);
}

function addRecieverDataToLists(account, value) {
  addrList.push(account);
  valueList.push(Moralis.Units.ETH(value));
  valsToSum.push(Number(Moralis.Units.ETH(value)));
}

// Get the nework data like network and chain data.
async function getNetworkData() {
  let web3Provider = await Moralis.enableWeb3();
  let network = await web3Provider.getNetwork();

  let response = await fetch("https://chainid.network/chains.json");
  let data = await response.json();

  return [network, data];
}

// Set the correct network ID in the select options droppdown.
async function setNetworkId() {
  let chainId = await Moralis.chainId;
  
  if(chainId === "0x1") document.getElementById("eth").selected = "true";
  else if(chainId === "0x89") document.getElementById("matic").selected = "true";
  else document.getElementById("chooseChain").selected = "true";
}


// 
async function spread() {
  let networkData = await getNetworkData();
  
  if(selectAssets.value === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") sendNativeAsset(networkData[0]);
  else if(selectAssets.value ===  "") {
    alert("Please select an asset to spread");
    throw "no selected asset";
  } else sendErc20(token, networkData[0]);
}

export { spread, setNetworkId, getNetworkData, addRecieverDataToLists, setTableValues, getAssets, sumOf, networkSwitch, }
