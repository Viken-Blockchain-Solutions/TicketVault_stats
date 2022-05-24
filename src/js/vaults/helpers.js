import { eth_addresses, bsc_addresses } from "./addresses.js";
import { tokensFormatter, formatter, returnVaultStats, getValueOf } from "./utils.js";

async function getTotalVaultStats() {
    let april_stats = await returnVaultStats("eth", eth_addresses["april"]);
    let may_stats = await returnVaultStats("eth", eth_addresses["may"]);
    let bsc_may_stats = await returnVaultStats("bsc", bsc_addresses["may"]);

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
        formatter.format(await getValueOf((total_shares + total_rewards)))
    ]

    return totals;
}

export { getTotalVaultStats };
