function toggle() {
  let x = document.getElementById("div1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
let addrList = [];
let valueList = [];
let sum = 1;

function setValues() {
  let address = document.getElementById("input-address").value;
  let amount = document.getElementById("input-value").value;
  
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
  
  addToLists(address, amount);
}

function addToLists(account, value) {
  addrList.push(account);
  valueList.push(Moralis.Units.ETH(value));
  loading();
  console.log(addrList, valueList);
}

async function send() {
  const web3Provider = await Moralis.enableWeb3();
  const network = await web3Provider.getNetwork();
  if (network.chainId === 137) await Moralis.executeFunction({contractAddress: spreadPolygon, ...spreadOptions});
  if (network.chainId === 1) await Moralis.executeFunction({contractAddress: spreadMainnet, ...spreadOptions});
  if (network.chainId === 3) await Moralis.executeFunction({contractAddress: spreadRopsten, ...spreadOptions});
  sent();

  console.log(`recipients: ${addrList}`);
  console.log(`values: ${valueList}`);
}

function loading() {
  const loading_message = document.getElementById("loading-message");
  loading_message.innerHTML = "Added to spread list";
}

function sent() {
  const loading_message = document.getElementById("loading-message");
  const sent_message = document.getElementById("sent-message");
  loading_message.innerHTML = "";
  sent_message.innerHTML = "Your transaction has been sent to the network!"
}

/*
* @notice Spreads main asset to multiple recipients with corresponding values, all in just one transaction.
* @param recipients[] An array of addresses. ["address","address","address"]
* @param values[] An array of values. ["value","value","value"]
*/
const spreadOptions = {
  functionName: "spreadAsset",
  abi: ABI,
  params: {
    recipients: addrList,
    values: valueList
  }
}

const addOptions = (`
<option selected>Choose a token to spread</option>
<option value="0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619">ETH</option>
<option value="0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6">BTC</option>
<option value="0x7b9c2d37fc0B45A5Ec022D2023F18685FdA832e7">CENT</option>
<option value="0xB25e20De2F2eBb4CfFD4D16a55C7B395e8a94762">REQ</option>
<option value="0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270">WMATIC</option>
`);