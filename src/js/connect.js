let rewardInfo, vaultInfo;
let ticketvault13, ticketvault26, ticketvault52;
let _ticketvault13, _ticketvault26, _ticketvault52;
let lastRewardUpdateTimeStamp, rewardRate;
let pendingVaultRewards, claimedVaultRewards, remainingVaultRewards;
let vaultstatus, stakingPeriod, startTimestamp, stopTimestamp, totalVaultRewards, totalVaultShares;

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
    
    const CentaurifyToken = "0x08ba718F288c3b12B01146816bef9FA03cC635bc";

    // The Contract objects.
    ticketvault13 = new ethers.Contract(TicketVault13, ABI, provider);
    ticketvault26 = new ethers.Contract(TicketVault26, ABI, provider);
    ticketvault52 = new ethers.Contract(TicketVault52, ABI, provider);

    _ticketvault13 = new ethers.Contract(TicketVault13, TICKET_ABI, provider);
    _ticketvault26 = new ethers.Contract(TicketVault26, TICKET_ABI, provider);
    _ticketvault52 = new ethers.Contract(TicketVault52, TICKET_ABI, provider);

    //rewardInfo = await _ticketvault13.getRewardInfo();
    vault13Info = await ticketvault13.vault();
    vault26Info = await ticketvault26.vault();
    vault52Info = await ticketvault52.vault();

    /* lastRewardUpdateTimeStamp = rewardInfo.lastRewardUpdateTimeStamp;
    rewardRate = rewardInfo.rewardRate;
    pendingVaultRewards = rewardInfo.pendingVaultRewards;
    claimedVaultRewards = rewardInfo.claimedVaultRewards;
    remainingVaultRewards = rewardInfo.remainingVaultRewards;

    vaultstatus = vaultInfo.status;
    stakingPeriod = vaultInfo.stakingPeriod;
    stopTimestamp = vaultInfo.stopTimestamp;
    */
   
    totalVault13Rewards = vault13Info.totalVaultRewards;
    totalVault13Shares = vault13Info.totalVaultShares; 
    vault13Start = vault13Info.startTimestamp;
    vault13End = vault13Info.stopTimestamp;
    // console.log(vault13Start);
    
    totalVault26Rewards = vault26Info.totalVaultRewards;
    totalVault26Shares = vault26Info.totalVaultShares; 
    vault26End = vault26Info.stopTimestamp;
    // console.log(totalVault26Rewards.toString());
    
    totalVault52Rewards = vault52Info.totalVaultRewards;
    totalVault52Shares = vault52Info.totalVaultShares; 
    vault52End = vault52Info.stopTimestamp;
    // console.log(totalVault52Rewards.toString());

    getVaultStats();
})()




