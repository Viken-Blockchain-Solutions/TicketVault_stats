
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
        "function vault()",
    ];
    
    // You can also use an ENS name for the contract address
    const TicketVault13 = "0xe7ab1839cd96d34d38552944cc79570ce8d098d3";
    const TicketVault26 = "0x1ED3181B9E5D8C93452C0AF7081502398e8610a2";
    const TicketVault52 = "0x3a01C5F9acDeaeAD1e9ac4706489132dF25dc2e9";
  
    // The Contract objects.
    var ticketvault13 = new ethers.Contract(TicketVault13, TICKET_ABI, provider);
    var ticketvault26 = new ethers.Contract(TicketVault26, TICKET_ABI, provider);
    var ticketvault52 = new ethers.Contract(TicketVault52, TICKET_ABI, provider);
    
    console.log(`
        TicketVault13:    ${ticketvault13.address},
        TicketVault26:    ${ticketvault26.address},
        TicketVault52:    ${ticketvault52.address}
    `);

    let rewardInfo = await ticketvault13.getRewardInfo();

    console.log(rewardInfo.rewardRate.toString());
    console.log(rewardInfo.pendingVaultRewards.toString());
    console.log(rewardInfo.claimedVaultRewards.toString());
    console.log(rewardInfo.remainingVaultRewards.toString());
    
  })()

