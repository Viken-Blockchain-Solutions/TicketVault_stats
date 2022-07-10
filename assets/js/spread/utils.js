function sumOf(arr) {
    let total = 0;
    for(let i = 0; i < arr.length; i++) total += arr[i];
  
    return total;
}

async function getAssets(network, data) {
  await getNativeAsset(network, data);
  await getERC20Assets();
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