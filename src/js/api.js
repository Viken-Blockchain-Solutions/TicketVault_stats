let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// tv is short for TicketVault
let tv13 = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 0,
    "method": "alchemy_getAssetTransfers",
    "params": [
    {
        "fromBlock": "0xdb3bf3",
        "toAddress": "0xe7ab1839cd96d34d38552944cc79570ce8d098d3",
        "contractAddresses": [
        "0x08ba718F288c3b12B01146816bef9FA03cC635bc"
        ],
        "excludeZeroValue": false,
        "category": [
        "erc20"
        ]
    }
    ]
});

// tv is short for TicketVault
let tv26 = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 0,
    "method": "alchemy_getAssetTransfers",
    "params": [
    {
        "fromBlock": "0xdb3bfc",
        "toAddress": "0x1ED3181B9E5D8C93452C0AF7081502398e8610a2",
        "contractAddresses": [
        "0x08ba718F288c3b12B01146816bef9FA03cC635bc"
        ],
        "excludeZeroValue": false,
        "category": [
        "erc20"
        ]
    }
    ]
});

// tv is short for TicketVault
let tv52 = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 0,
    "method": "alchemy_getAssetTransfers",
    "params": [
    {
        "fromBlock": "0xdb3a84",
        "toAddress": "0x3a01C5F9acDeaeAD1e9ac4706489132dF25dc2e9",
        "contractAddresses": [
        "0x08ba718F288c3b12B01146816bef9FA03cC635bc"
        ],
        "excludeZeroValue": false,
        "category": [
        "erc20"
        ]
    }
    ]
});

 /*    
fetch("https://eth-mainnet.alchemyapi.io/v2/IsNndtJbkjgBEfaIkp5cF_zcGZ2eqVUd", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
 */

const getStakeholders = async (raw) => {
    let address = "";
    let max = 0;
    let stakeholders = 0;
    
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'  
    }
    
    try {
        const alchemyapi = "https://eth-mainnet.alchemyapi.io/v2/IsNndtJbkjgBEfaIkp5cF_zcGZ2eqVUd";
        const res = await fetch(alchemyapi, requestOptions);
        let data = await res.json();
        let dict = new Object();
    
        // Get the address and stake amount of stakeholders.
        for (let i = 0; i < data['result'].transfers.length; i++) {
            let from = data['result'].transfers[i].from;                
            let value = data['result'].transfers[i].value;
            if (dict[from]) dict[from] += value;
            dict[from] = value;
        } 

        // Find the highest stake amount.
        for (const [key, value] of Object.entries(dict)) {
            if (value > max) {
                address = key;
                max = value;
            }
            // add 1 to stakeholders.
            stakeholders++
        }
        return ([address, max, stakeholders]);
    
    } catch (err) {
        console.error(err);
    }
}