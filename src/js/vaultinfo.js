
// Moralis code
(async function () {
    const serverUrl = "https://ifwsu1awnie4.usemoralis.com:2053/server";
    const appId = "YtIcmLhp4q3D22UNDoJqLhFCLuAbLIXLLu5IUgCD";
    Moralis.start({ serverUrl, appId });
})()
  
async function _getTicketVaultStats() {
      
    const message_vault = `<p>Fetching TicketVault specs</p>`;
    document.getElementById("output-message").innerHTML = message_vault;
    console.log("getting TicketVault info");
  
    let user = Moralis.User.current();
    let userAddr = user.get("ethAddress");
    document.getElementById("output-message").innerHTML = userAddr;
  
    const options = { chain: 'mainnet', address: 0xe7ab1839cd96d34d38552944cc79570ce8d098d3 }
    const balances = await Moralis.Web3API.account.getTokenBalances(options);
    const CENT_TOKEN = 0x08ba718F288c3b12B01146816bef9FA03cC635bc;
  
    for (let i = 0; i < balances.length; i++) {
     if(balances[i].token_address == CENT_TOKEN){
       console.log("token Address:", balances[i].token_address);
       let centBalance = balances[i].balance / 10**18;
       console.log("TokenBalances: ", centBalance);
       document.getElementById("output-token-amount").innerHTML = centBalance;
      }
    }
  }
  
document.getElementById("btn-getErc20Balances").onclick = _getTicketVaultStats;