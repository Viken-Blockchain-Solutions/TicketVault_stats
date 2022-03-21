
async function getVaultStats() {
    vault13Shares = (totalVault13Shares / 1e18);
    vault26Shares = (totalVault26Shares / 1e18);
    vault52Shares = (totalVault52Shares / 1e18);
    value13 = (totalVault13Shares.add(totalVault13Rewards) / 1e18);
    value26 = (totalVault26Shares.add(totalVault26Rewards) / 1e18);
    value52 = (totalVault52Shares.add(totalVault52Rewards) / 1e18);
    staked_value = await getValueOf(value13+value26+value52);
    val13 = await getValueOf(value13);
    val26 = await getValueOf(value26);
    val52 = await getValueOf(value52);
   
    
    // THe Staked amount in vault
    document.getElementById("output_staked").innerHTML = (vault13Shares+vault26Shares+vault52Shares).toLocaleString();
    
    // The Rewards in vault
    document.getElementById("output_rewards").innerHTML = ((totalVault13Rewards.add(totalVault26Rewards).add(totalVault52Rewards)) / 1e18).toLocaleString(0);
    
    // The total value of the Vault
    document.getElementById("output_value").innerHTML = ((staked_value)).toLocaleString();
    
    // Add as table data
    document.getElementById("output_table1").innerHTML = val13.toLocaleString();
    document.getElementById("output_table2").innerHTML = val26.toLocaleString();
    document.getElementById("output_table3").innerHTML = val52.toLocaleString();
}


/*  
    Load an TicketVault contract address.
    @param address TicketVault address 
*/const getValueOf = async (totStaked) => {
    try {
        const urlPriceUSD = "https://api.coingecko.com/api/v3/simple/price?ids=centaurify&vs_currencies=usd";
        const res = await fetch(urlPriceUSD);
        const data = await res.json();

        _value_usd_price = (totStaked * data.centaurify.usd);
        return _value_usd_price;

    } catch (err) {
        console.error(err);
    }

}

