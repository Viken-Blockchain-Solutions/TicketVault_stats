async function vaultStats(chain, address) {
    let list = [];
    for(let i = 0; i < address[i]; i++) {
        const options = {
            chain: chain,
            address: address[i],
            function_name: "vault",
            abi: VIKING_ABI
        }
        let res = await Moralis.Web3API.native.runContractFunction(options);
        list.push(res);
    }
    
    return list;
}

async function vaultTotals(list) {
    let shares = [];
    let rewards = [];

    for(let i = 0; i < list.length; i++) {
        let share = list[i][4];
        let reward = list[i][5];

        shares.push(share / 1e18);
        rewards.push(reward / 1e18);
    }

    let totShares = await sumArray(shares);
    let totRewards = await sumArray(rewards);

    return [totRewards,totShares];
}

/**
 * @dev method will get the Vault stats. 
 * @returns Array of Vault stats for ETH and BSC.
 */
async function getStats() {
    const eth = vaultAddresses[0].ethereum;
    const bsc = vaultAddresses[1].binance;

    const eth_vaults = await vaultStats('eth', eth);
    const bsc_vaults = await vaultStats('bsc', bsc);

    return [eth_vaults, bsc_vaults];
}

/**
 * @dev Used to calculate the "total days" value.
 * @param time The unixTimestamp. 
 * @returns dayCount.
 */
function timespan(time) {
    const startDate = convertUnixTime(time);
    const endDate = Date.now();

    const start = new Date(startDate);
    const end = new Date(endDate);
    let dayCount = 0;

    while (end > start) {
        dayCount++;
        start.setDate(start.getDate() + 1);
    }
    return dayCount;
}

// supported networks by the dapp
const supportedNetworks = [
    { id: '1', name: 'Ethereum', chainId: '1', native_token: 'ETH', networkVersion: '0x1' },
    { id: '2', name: 'Polygon', chainId: '137', native_token: 'MATIC', networkVersion: '0x89' },
]

// check if current network is supported
const currentNetwork = async function () {
    const network = await web3Provider.getNetwork();
    if (supportedNetworks.some(value => value.chainId == network.chainId.toString())) {
        const result = supportedNetworks.filter(value => value.chainId == network.chainId.toString());
        return result[0];
    } else {
        console.log('network not supported');
        return ({ id: 'unknown', name: 'unknown', networkVersion: 'unknown', native_token: 'unknown', chainId: 'unknown' });
    }
}

const checkNetwork = async function () {
    
    const connected_network = currentNetwork();

    if (connected_network.id != 'unknown') {
     console.log(connected_network);
    }
}


