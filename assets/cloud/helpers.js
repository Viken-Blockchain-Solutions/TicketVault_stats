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

/* 
const getTotalVaultStats = async () => {    


    let april_totalVaultShares =
        Number(april_stats[0][1]["totalVaultShares"]) +
        Number(april_stats[1][1]["totalVaultShares"]) +
        Number(april_stats[2][1]["totalVaultShares"]);
    let may_totalVaultShares =
        Number(may_stats[0][1]["totalVaultShares"]) +
        Number(may_stats[1][1]["totalVaultShares"]) +
        Number(may_stats[2][1]["totalVaultShares"]);
    let bsc_may_totalVaultShares =
        Number(bsc_may_stats[0][1]["totalVaultShares"]) +
        Number(bsc_may_stats[1][1]["totalVaultShares"]) +
        Number(bsc_may_stats[2][1]["totalVaultShares"]);

    let april_totalVaultRewards =
        Number(april_stats[0][1]["totalVaultRewards"]) +
        Number(april_stats[1][1]["totalVaultRewards"]) +
        Number(april_stats[2][1]["totalVaultRewards"]);
    let may_totalVaultRewards =
        Number(may_stats[0][1]["totalVaultRewards"]) +
        Number(may_stats[1][1]["totalVaultRewards"]) +
        Number(may_stats[2][1]["totalVaultRewards"]);
    let bsc_may_totalVaultRewards =
        Number(bsc_may_stats[0][1]["totalVaultRewards"]) +
        Number(bsc_may_stats[1][1]["totalVaultRewards"]) +
        Number(bsc_may_stats[2][1]["totalVaultRewards"]);

    let total_shares = (
        april_totalVaultShares +
        may_totalVaultShares +
        bsc_may_totalVaultShares) /
        10 ** 18;
    let total_rewards = (
        april_totalVaultRewards +
        may_totalVaultRewards +
        bsc_may_totalVaultRewards) /
        10 ** 18;

    const totals = [
        tokensFormatter.format(total_shares),
        tokensFormatter.format(total_rewards),
        formatter.format(await getValue((total_shares + total_rewards)))
    ]

    return totals;
}

const getTotalStakeholders = async () => {
    for(let i = 0; i < april_deposit_events[2][1]["total"]; i++) {
        let user = await april_deposit_events[2][1]["result"][i].data.user;
        console.log(user);
    }
       /*
    let vaults = [];
    let staker = [];
    let amount = [];

     for (let i = 0; i < 10; i++){
    //return vaultAddresses[0].ethereum[0];
        const options = {
            chain: 'eth',
            address: vaultAddresses[i].ethereum[i],
            topic: '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
            abi: EVENTS_ABI,
        };
        let res = await Moralis.Web3API.native.getContractEvents(options);
    
        for (let k = 0; k < res.total; k++){
            //if(staker.indexOf(res.result[k].data['user']) != -1){ continue };	
            staker.push(res.result[k].data['user']);
            amount.push(res.result[k].data['amount']);
            let stakers = staker.length;
            vaults.push([stakers, staker, amount]);
        }
    }
    return res; 
} */

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
