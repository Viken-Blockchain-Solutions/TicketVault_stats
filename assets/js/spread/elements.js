let addrList = [];
let valueList = [];
let valsToSum = [];
let sum = 1;
let token;

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
    newOption.appendChild(document.createTextNode(`${tokenBalances[index].symbol}: ${Number(Moralis.Units.FromWei(tokenBalances[index].balance, tokenBalances[index].decimals)).toFixed(3)}`));
    
    docFrag.appendChild(newOption);
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