
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
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

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'  
    };
        
    fetch("https://eth-mainnet.alchemyapi.io/v2/IsNndtJbkjgBEfaIkp5cF_zcGZ2eqVUd", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));





    const getStakerholders = async () => {
        try {
            const alchemyapi = "https://eth-mainnet.alchemyapi.io/v2/IsNndtJbkjgBEfaIkp5cF_zcGZ2eqVUd";
            const res = await fetch(alchemyapi, requestOptions);
            var data = await res.json();
            var dict = {};
        
            for (let i = 0; i < data['result'].transfers.length; i++) {
                let from = data['result'].transfers[i].from;                
                let value = data['result'].transfers[i].value;
                if (dict[from]) dict[from] += value;
                dict[from] = value;
            } 
            
            console.log(dict);

        } catch (err) {
            console.error(err);
        }

    }