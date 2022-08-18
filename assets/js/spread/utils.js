import { ABI } from "./ABI.js";
import { token } from "./app.js";

let addrList = [];
let valueList = [];
let valsToSum = [];
let sum = 1;

const spreadPolygon = "0x87945Ea3BDCe665461348EA8AfE0b07b0e4E121F";
const spreadMainnet = "0x87945Ea3BDCe665461348EA8AfE0b07b0e4E121F";

let selectAssets = document.querySelector("#selectAssets");
let nativeOption = document.createElement('option');
let erc20Option = document.createElement('option');

// Get the nework data like network and chain data.
async function getNetworkData() {
  let web3Provider = await Moralis.enableWeb3();
  let network = await web3Provider.getNetwork();
  
  let response = await fetch("https://chainid.network/chains.json");
  let data = await response.json();
  let chainId = await Moralis.chainId;

  console.log("1:", network);
  console.log("2:", data);
  
  if(chainId == "0x1") document.querySelector("#eth").selected = "true";
  else if(chainId == "0x89") document.querySelector("#matic").selected = "true";
  else document.getElementById("chooseChain").selected = "true";
  
  return [network, data];
}

// fetch the native balance of the address and display it in the select options element 
const getNativeAsset = async (network, data) => {
  const nativeBalances = await Moralis.Web3API.account.getNativeBalance({chain: Moralis.getChainId()});

  for(let index in data) {
    if(network.chainId == data[index].chainId) {
      nativeOption.value = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

      let nativeAsset = `${data[index].nativeCurrency.symbol}: ${Number(Moralis.Units.FromWei(nativeBalances.balance)).toFixed(4)}`;
      
      nativeOption.innerText = nativeAsset;
      selectAssets.appendChild(nativeOption);
    }
  }
};

// get erc20 assets and display them in the select options.
const getERC20Assets = async () => {
  let chainId = Moralis.getChainId();

  let tokenBalances = await Moralis.Web3API.account.getTokenBalances({chain: chainId});
  erc20Option.style.display = "none";
  for(let index in tokenBalances) {
    
    erc20Option.style.display = "block";
    erc20Option.value = tokenBalances[index].token_address;
    let tokenList = `${tokenBalances[index].symbol}: ${Number(Moralis.Units.FromWei(tokenBalances[index].balance, tokenBalances[index].decimals)).toFixed(4)}`;
    
    erc20Option.innerText = tokenList;
    selectAssets.appendChild(erc20Option);
  }
}

// fetch both native asset and ERC20, and return them.
async function getAssets(network, data) {
  let native = await getNativeAsset(network, data);
  let erc20 = await getERC20Assets(network);
  return [native, erc20];
}

// @notice Spreads main asset to multiple recipients with corresponding values, all in just one transaction.
// @param recipients[] An array of addresses.
// @param values[] An array of values.
async function sendNativeAsset(network) {
  const spreadOptions = {
    functionName: "spreadAsset",
    abi: ABI,
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
    abi: ABI,
    params: {
      token: token,
      recipients: addrList,
      values: valueList
    }
  }
  if (network.chainId === 1) await Moralis.executeFunction({contractAddress: spreadMainnet, ...spreadERC20Options});
  if (network.chainId === 137) await Moralis.executeFunction({contractAddress: spreadPolygon, ...spreadERC20Options});
}

// spreads native or erc20 assets
async function spread() {
  let networkData = await getNetworkData();
  
  if(selectAssets.value === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") sendNativeAsset(networkData[0]);
  else if(selectAssets.value ===  "") {
    alert("Please select an asset to spread");
    throw "no selected asset";
  } else sendErc20(token, networkData[0]);
}
document.querySelector("#spread").onclick = spread;

// switch network with to selected chain 
async function networkSwitch(chain) {
  try {
    let network = await Moralis.switchNetwork(chain);
    return network;
  } catch(err) {
    // If user does not have the polygon chain in metamask
    if(err.code !== -32002) addPolygonChain();
  }
}

// adds polygon to metamask
async function addPolygonChain() {
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
}

// sets all values in the table
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
document.querySelector("#setTableValues").onclick = setTableValues;

// adds all data to arrays
function addRecieverDataToLists(account, value) {
  addrList.push(account);
  valueList.push(Moralis.Units.ETH(value));
  valsToSum.push(Number(Moralis.Units.ETH(value)));
}

// gives the sum of an array
function sumOf(arr) {
  let total = 0;
  for(let i = 0; i < arr.length; i++) total += arr[i];

  return total;
}

export { spread, getNetworkData, addRecieverDataToLists, setTableValues, getAssets, sumOf, networkSwitch }