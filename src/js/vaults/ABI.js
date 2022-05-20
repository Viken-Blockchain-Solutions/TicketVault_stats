/// { ABI.js } contains the ABI for the Vaults.

const _ABI = [
    "function getRewardInfo() external view returns (uint256 lastRewardUpdateTimeStamp, uint256 rewardRate, uint256 pendingVaultRewards,uint256 claimedVaultRewards, uint256 remainingVaultRewards)",
];

const TICKET_ABI = [{
    "inputs": [],
    "name": "vault",
    "outputs": [{
        "internalType": "enum TicketVault.Status",
        "name": "status",
        "type": "uint8"
    }, {
        "internalType": "uint256",
        "name": "stakingPeriod",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "startTimestamp",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "stopTimestamp",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "totalVaultShares",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "totalVaultRewards",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}];

const VIKING_ABI = [{
    "inputs": [],
    "name": "vault",
    "outputs": [{
        "internalType": "enum VikingVault.Status",
        "name": "status",
        "type": "uint8"
    }, {
        "internalType": "uint256",
        "name": "stakingPeriod",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "startTimestamp",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "stopTimestamp",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "totalVaultShares",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "totalVaultRewards",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}];

export {_ABI, VIKING_ABI, TICKET_ABI};