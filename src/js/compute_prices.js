
async function getStats() {
    vaultShares = (totalVaultShares / 1e18).toFixed(0);
    value = (totalVaultShares.add(totalVaultRewards) / 1e18);
    staked_value = await getValueOf(value);
    
    // THe Staked amount in vault
    document.getElementById("output_staked").innerHTML = (vaultShares).toLocaleString();

    // The Rewards in vault
    document.getElementById("output_rewards").innerHTML = (totalVaultRewards / 1e18).toLocaleString();

    // The total value of the Vault
    document.getElementById("output_value").innerHTML = (staked_value).toLocaleString();
    
}


/*  
    Load an TicketVault contract address.
    @param address TicketVault address 
    @response: amount, stake_address, type 
*/const getValueOf = async (totStaked) => {
    try {
        console.log(totStaked);
        const urlPriceUSD = "https://api.coingecko.com/api/v3/simple/price?ids=centaurify&vs_currencies=usd";
        const res = await fetch(urlPriceUSD);
        console.log(res.ok);
        const data = await res.json();

        _value_usd_price = (totStaked * data.centaurify.usd);
        return _value_usd_price;

    } catch (err) {
        console.error(err);
    }

}

