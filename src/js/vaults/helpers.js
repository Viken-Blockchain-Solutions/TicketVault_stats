import { eth_addresses, bsc_addresses } from "./addresses.js";
import { deposit_topic } from "./constants.js";
import { 
    tokensFormatter,
    formatter,
    getVaultStats,
    getValue,
    get_event_data,
    convertUnixTime
} from "./utils.js";


let april_stats = await getVaultStats("eth", eth_addresses["april"]);
let may_stats = await getVaultStats("eth", eth_addresses["may"]);
let bsc_may_stats = await getVaultStats("bsc", bsc_addresses["may"]);

let april_deposit_events = await get_event_data("eth", eth_addresses["april"], deposit_topic);
console.log(april_deposit_events[2][1]["total"])

const getTotalVaultStats = async () => {    

    /**
     * Total amount of CENT staked in all VikingVaults combined.
     */
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

    /**
     * Total amount of CENT rewards in all VikingVaults combined.
     */
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
}

const timespan = (time) => {
    const startDate = convertUnixTime(time);
    const endDate = Date.now();
  
    const start = new Date(startDate)
    const end = new Date(endDate)
    let dayCount = 0
  
    while (end > start) {
      dayCount++
      start.setDate(start.getDate() + 1)
    }
    return dayCount
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

export { getTotalVaultStats, getTotalStakeholders, timespan };
