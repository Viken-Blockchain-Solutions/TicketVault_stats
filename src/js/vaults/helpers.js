import { eth_addresses, bsc_addresses } from "./addresses.js";
import { deposit_topic } from "./constants.js";
import { 
    tokensFormatter,
    formatter,
    getVaultStats,
    getValue,
    convertUnixTime
} from "./utils.js";


let april_stats = await getVaultStats("eth", eth_addresses["april"]);
let may_stats = await getVaultStats("eth", eth_addresses["may"]);
let bsc_may_stats = await getVaultStats("bsc", bsc_addresses["may"]);

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

const getStakers = async (address) => {
    let contractAddress = address;

    const options = {
    address: contractAddress,
    chain: "eth",
    topic0: deposit_topic,
    }

    const logs = await Moralis.Web3API.native.getLogsByAddress(options);
    return logs.result[0]['topic1'];
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

console.log(await getStakers(eth_addresses['april'][0]))

export { getTotalVaultStats, timespan, april_stats, may_stats, bsc_may_stats, getStakers };
