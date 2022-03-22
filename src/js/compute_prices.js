let valOf13, valOf26, valOf52;
let vault13Shares, vault26Shares, vault52Shares;


async function getVaultStats() {
    // get vault shares
    vault13Shares = (totalVault13Shares / 1e18);
    vault26Shares = (totalVault26Shares / 1e18);
    vault52Shares = (totalVault52Shares / 1e18);

    // get total erc20 in vault
    totErc20vault13 = (totalVault13Shares.add(totalVault13Rewards) / 1e18);
    totErc20vault26 = (totalVault26Shares.add(totalVault26Rewards) / 1e18);
    totErc20vault52 = (totalVault52Shares.add(totalVault52Rewards) / 1e18);
    
    // Fiat value of vaults
    totVaults_value = await getValueOf(totErc20vault13 + totErc20vault26 + totErc20vault52);
    valOf13 = await getValueOf(totErc20vault13);
    valOf26 = await getValueOf(totErc20vault26);
    valOf52 = await getValueOf(totErc20vault52);

    addToHTML();
}

/*  
    Load an TicketVault contract address.
    @param address TicketVault address 
*/
const getValueOf = async (totStaked) => {
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

function addToHTML() {
    // THe Staked amount in vault
    document.getElementById("output_totstaked").innerHTML = (vault13Shares + vault26Shares + vault52Shares).toLocaleString();

    // The Rewards in vault
    document.getElementById("output_totrewards").innerHTML = ((totalVault13Rewards.add(totalVault26Rewards).add(totalVault52Rewards)) / 1e18).toLocaleString(0);
    
    // The total value of the Vault
    document.getElementById("output_totvalue").innerHTML = ((totVaults_value)).toLocaleString();
    
    // Add to table as data values
    document.getElementById("output_table1_value").innerHTML = valOf13.toLocaleString();
    document.getElementById("output_table2_value").innerHTML = valOf26.toLocaleString();
    document.getElementById("output_table3_value").innerHTML = valOf52.toLocaleString();

    // Add end dates as table data
    document.getElementById("output_table1_end").innerHTML = convertUnixTime(vault13End.toNumber());
    document.getElementById("output_table2_end").innerHTML = convertUnixTime(vault26End.toNumber());
    document.getElementById("output_table3_end").innerHTML = convertUnixTime(vault52End.toNumber());
}


const getDatesFrom = async (timestamp) => {
    try {
        var date = new Date(timestamp * 1000);
        return date;
    } catch (err) {
        console.log(err);
    }
}

function convertUnixTime(unix) {
    let a = new Date(unix * 1000),
        year = a.getFullYear(),
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        month = months[a.getMonth()],
        date = a.getDate(),
        hour = a.getHours(),
        min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
        sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    return `${month} ${date}, ${year}, ${hour}:${min}:${sec}`;
}