let ticketvault13, ticketvault;

(async function () {

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    provider = new ethers.providers.Web3Provider(window.ethereum);
    //let provider = new ethers.providers.JsonRpcProvider();
    // A Web3Provider wraps a standard Web3 provider, which is
    
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    
    const TICKET_ABI = [
        "function getRewardInfo() external view returns (uint256 lastRewardUpdateTimeStamp, uint256 rewardRate, uint256 pendingVaultRewards,uint256 claimedVaultRewards, uint256 remainingVaultRewards)",
        
    ];
    const ABI = [{ "inputs": [], "name": "vault", "outputs": [{ "internalType": "enum TicketVault.Status", "name": "status", "type": "uint8" }, { "internalType": "uint256", "name": "stakingPeriod", "type": "uint256" }, { "internalType": "uint256", "name": "startTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "stopTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "totalVaultShares", "type": "uint256" }, { "internalType": "uint256", "name": "totalVaultRewards", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
    

    // You can also use an ENS name for the contract address
    const TicketVault13 = "0xe7ab1839cd96d34d38552944cc79570ce8d098d3";
    const TicketVault26 = "0x1ED3181B9E5D8C93452C0AF7081502398e8610a2";
    const TicketVault52 = "0x3a01C5F9acDeaeAD1e9ac4706489132dF25dc2e9";
  
    // The Contract objects.
    ticketvault13 = new ethers.Contract(TicketVault13, TICKET_ABI, provider);
    ticketvault = new ethers.Contract(TicketVault13, ABI, provider);
    var ticketvault26 = new ethers.Contract(TicketVault26, TICKET_ABI, provider);
    var ticketvault52 = new ethers.Contract(TicketVault52, TICKET_ABI, provider);
    
    /* const message_1 = (`${ticketvault13.address}`);
    const message_2 = (`${ticketvault26.address}`);
    const message_3 = (`${ticketvault52.address}`);

    document.getElementById("cont-1").innerHTML = message_1;
    document.getElementById("cont-2").innerHTML = message_2;
    document.getElementById("cont-3").innerHTML = message_3; */
    
    console.log(`
    ${ticketvault13.address}

        TicketVault13:    ${ticketvault13.address},
        TicketVault26:    ${ticketvault26.address},
        TicketVault52:    ${ticketvault52.address}
    `);

    let rewardInfo = await ticketvault13.getRewardInfo();
    let vaultInfo = await ticketvault.vault();

    console.log(rewardInfo.lastRewardUpdateTimeStamp.toString());
    console.log(rewardInfo.rewardRate.toString() / 1e18);
    console.log(rewardInfo.pendingVaultRewards.toLocaleString() / 1e18);
    console.log(rewardInfo.claimedVaultRewards.toLocaleString() / 1e18);
    console.log(rewardInfo.remainingVaultRewards.toLocaleString() / 1e18);
    
    console.log(vaultInfo.status);
    console.log(vaultInfo.stakingPeriod.toString());
    console.log(vaultInfo.startTimestamp.toString());
    console.log(vaultInfo.stopTimestamp.toString());
    console.log(vaultInfo.totalVaultRewards.toLocaleString() / 1e18);
    console.log((vaultInfo.totalVaultShares.toLocaleString() / 1e18).toFixed(0));
    
    getStats();
})()

async function getStats() {
    let rewardInfo = await ticketvault13.getRewardInfo();
    let vaultInfo = await ticketvault.vault();
    
    let totalVaultShares = vaultInfo.totalVaultShares;
    let vaultShares = (totalVaultShares / 1e18).toFixed(0);

    let totalVaultRewards = await vaultInfo.totalVaultRewards;
    let value = (totalVaultShares.add(totalVaultRewards));

    // THe Staked amount in vault
    document.getElementById("output_staked").innerHTML = (vaultShares).toLocaleString();

    // The Rewards in vault
    document.getElementById("output_rewards").innerHTML = (totalVaultRewards / 1e18).toLocaleString();

    // The total value of the Vault
    document.getElementById("output_value").innerHTML = ((value / 1e18).toFixed(0)).toLocaleString(
            ("en-US", { style: "currency", currency: "USD" })
        );
    
}

async function fetchPrice() {
    const URL = (`
    https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${token}&vs_currencies=usd
    `)
}

