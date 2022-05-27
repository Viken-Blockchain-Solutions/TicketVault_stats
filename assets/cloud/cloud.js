Moralis.Cloud.define("depositEvents", async (request) => {

});
  
Moralis.Cloud.define("vaultStats", async (request) => {
    const eth = vaultAddresses[0].ethereum;
    const bsc = vaultAddresses[1].binance;

    const eth_vaults = await vaultStats('eth', eth);
    const bsc_vaults = await vaultStats('bsc', bsc);

    const eth_totals = await vaultTotals(eth_vaults);
    const bsc_totals = await vaultTotals(bsc_vaults);

    const total_reward = bsc_totals[0] + eth_totals[0];
    const total_shares = bsc_totals[1] + eth_totals[1];
    const total_tokens = total_shares + total_reward;


    return [total_reward, total_shares, getValue(total_tokens)];
});
