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

const SPREAD_ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "Error_1",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Error_2",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "saveAsset",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "saveERC20",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "recipients",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        }
      ],
      "name": "spreadAsset",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "recipients",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        }
      ],
      "name": "spreadERC20",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "recipients",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        }
      ],
      "name": "spreadERC20Simple",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
