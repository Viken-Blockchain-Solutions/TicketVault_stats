import {getStats} from './vaults/helpers.js';
import {VIKING_ABI} from './vaults/ABI.js';
import {getVaultStats} from './compute_prices.js';

let rewardInfo, vaultInfo;
let totalVault13Shares;
let ticketvault13, ticketvault26, ticketvault52;
let _ticketvault13, _ticketvault26, _ticketvault52;
let lastRewardUpdateTimeStamp, rewardRate;
let pendingVaultRewards, claimedVaultRewards, remainingVaultRewards;
let vaultstatus, stakingPeriod, startTimestamp, stopTimestamp, totalVaultRewards, totalVaultShares;

(async function () {
    const web3Provider = await Moralis.enableWeb3();
    await web3Provider.send("eth_requestAccounts", []);

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
    ticketvault13 = new ethers.Contract(TicketVault13, ABI, web3Provider);
    ticketvault26 = new ethers.Contract(TicketVault26, ABI, web3Provider);
    ticketvault52 = new ethers.Contract(TicketVault52, ABI, web3Provider);

    _ticketvault13 = new ethers.Contract(TicketVault13, TICKET_ABI, web3Provider);
    _ticketvault26 = new ethers.Contract(TicketVault26, TICKET_ABI, web3Provider);
    _ticketvault52 = new ethers.Contract(TicketVault52, TICKET_ABI, web3Provider);

    //rewardInfo = await _ticketvault13.getRewardInfo();
    const vault13Info = await ticketvault13.vault();
    const vault26Info = await ticketvault26.vault();
    const vault52Info = await ticketvault52.vault();
   
    let totalVault13Rewards = vault13Info.totalVaultRewards;
    totalVault13Shares = vault13Info.totalVaultShares; 
    let vault13Start = vault13Info.startTimestamp;
    let vault13End = vault13Info.stopTimestamp;
    //console.log(vault13Start);
    
    const totalVault26Rewards = vault26Info.totalVaultRewards;
    const totalVault26Shares = vault26Info.totalVaultShares; 
    let vault26End = vault26Info.stopTimestamp;
    // console.log(totalVault26Rewards.toString());
    
    let totalVault52Rewards = vault52Info.totalVaultRewards;
    let totalVault52Shares = vault52Info.totalVaultShares; 
    let vault52End = vault52Info.stopTimestamp;
    // console.log(totalVault52Rewards.toString());

    getVaultStats();
})()

// supported networks by the dapp
const supportedNetworks = [
    { id: '1', name: 'Ethereum', chainId: '1', native_token: 'ETH', networkVersion: '0x1' },
    { id: '2', name: 'Polygon', chainId: '137', native_token: 'MATIC', networkVersion: '0x89' },
]

// check if current network is supported
const currentNetwork = async function () {
    const network = await web3Provider.getNetwork();
    if (supportedNetworks.some(value => value.chainId == network.chainId.toString())) {
        const result = supportedNetworks.filter(value => value.chainId == network.chainId.toString());
        return result[0];
    } else {
        console.log('network not supported');
        return ({ id: 'unknown', name: 'unknown', networkVersion: 'unknown', native_token: 'unknown', chainId: 'unknown' });
    }
}

const checkNetwork = async function () {
    
    const connected_network = currentNetwork();

    if (connected_network.id != 'unknown') {
     console.log(connected_network);
    }
}

export {totalVault13Shares};