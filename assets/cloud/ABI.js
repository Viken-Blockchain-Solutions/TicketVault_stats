/// { ABI.js } contains the ABI for the Vaults.

const EVENTS_ABI = {
    "anonymous":false,
    "inputs":[{
        "indexed":true,
        "internalType":"address",
        "name":"user",
        "type":"address"
    }, {
        "indexed":false,
        "internalType":"uint256",
        "name":"amount",
        "type":"uint256"
    }],
    "name":"Deposit",
    "type":"event"
};

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