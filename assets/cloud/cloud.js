Moralis.Cloud.define("timespan", async (request) => {
    return timespan(1647608215);
});

Moralis.Cloud.define("getTotals", async (request) => {
    const eth = vaultAddresses[0].ethereum;
    const bsc = vaultAddresses[1].binance;

    const eth_vaults = await vaultStats('eth', eth);
    const bsc_vaults = await vaultStats('bsc', bsc);

    const eth_totals = await vaultTotals(eth_vaults);
    const bsc_totals = await vaultTotals(bsc_vaults);

    const total_reward = bsc_totals[0] + eth_totals[0];
    const total_shares = bsc_totals[1] + eth_totals[1];
    const total_value = (total_shares + total_reward);

    return [tokensFormatter.format(total_reward), tokensFormatter.format(total_shares), total_value];
});

Moralis.Cloud.define("getVaultStats", async (request) => {
    return await getStats();
});

Moralis.Cloud.define("loadDB", async (request) => {
    //let data = await loadVaults();
    //return data;
})

Moralis.cloud.define('getDBVault', async (request) => {
    const vault = await getFirstVault();
    return vault;
})


