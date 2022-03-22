# TicketVault Staking Stats

This script will fetch spesific data from the blockchain and display it as useful stats.  

## **Notes**

_Notes of the different data to query from the smart-contrats, and notes on what to calculate and display in frontend._

## **Contract addresses**

### Ethereum network
* `0xe7ab1839cd96d34d38552944cc79570ce8d098d3` - TicketVault13
* `0x1ED3181B9E5D8C93452C0AF7081502398e8610a2` - TicketVault26
* `0x3a01C5F9acDeaeAD1e9ac4706489132dF25dc2e9` - TicketVault52

### Staked ERC20

1. `token`.  

### VaultInfo

1. `vault.totalVaultRewards`.  
2. `vault.totalVaultShares`.
3. `vault.stakingPeriod`.

### RewardInfo

1. `reward.rewardRate`.
2. `reward.pendingVaultRewards`.
3. `reward.claimedVaultRewards`.
4. `reward.remainingVaultRewards`.

## **Data and stats**

### TicketVault Stats

* Total number of contracts deployed.
* Total number of contracts live and staking.

* Total combined value of staked, in USD and EUR.
* Total combined value of rewards, in USD and EUR.

* Total days funds safe - No hack Counter 

### Deployed SubGraph
* TicketVault data
* 
```js
dadogg80@HP-Spectra-X360:/mnt/c/Users/ivoga/Documents/repos/viken-blockchain-solutions/thegraph/ticketvaults$ 
graph deploy --studio ticketvaults
✔ Version Label (e.g. v0.0.1) · v0.0.1
  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
  Skip migration: Bump mapping specVersion from 0.0.1 to 0.0.2
✔ Apply migrations
✔ Load subgraph from subgraph.yaml
  Compile data source: TicketVault => build/TicketVault/TicketVault.wasm
✔ Compile subgraph
  Copy schema file build/schema.graphql
  Write subgraph file build/TicketVault/abis/TicketVault.json
  Write subgraph manifest build/subgraph.yaml
✔ Write compiled subgraph to build/
  Add file to IPFS build/schema.graphql
                .. QmUUwWvWqVdf1P6QXVsKNg57TkdPzyo1Yt5bPEPdKzUVWQ
  Add file to IPFS build/TicketVault/abis/TicketVault.json
                .. QmNWdtncStQAZ6Fzn4tP8HQ6w6oq24t74YF3VqML7Xumi7
  Add file to IPFS build/TicketVault/TicketVault.wasm
                .. QmYQVWF2BYvATfB1YCe8KuziSJMrqyaJ2eXKcwHob6s9SG
✔ Upload subgraph to IPFS

Build completed: QmSEA2wejga997yaEcAxiLGyHYRjiwoAQjQEXXJXqXvjwH

Deployed to https://thegraph.com/studio/subgraph/ticketvaults

Subgraph endpoints:
Queries (HTTP):     https://api.studio.thegraph.com/query/23958/ticketvaults/v0.0.1
Subscriptions (WS): https://api.studio.thegraph.com/query/23958/ticketvaults/v0.0.1
```

