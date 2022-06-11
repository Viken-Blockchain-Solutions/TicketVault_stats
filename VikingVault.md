# Dashboard - Viking Vaults

This page will fetch spesific data from the blockchain and display it as useful stats.  

## Notes

_Notes of the different data to query from the smart-contrats, and notes on what to calculate and display in frontend._

## Contract addresses

### Ethereum network

* `0xe7ab1839cd96d34d38552944cc79570ce8d098d3` - TicketVault13
* `0x1ED3181B9E5D8C93452C0AF7081502398e8610a2` - TicketVault26
* `0x3a01C5F9acDeaeAD1e9ac4706489132dF25dc2e9` - TicketVault52
* `0x0e0bf317e139ae3988d15cfc063c056197e2849a` - VikingVault13
* `0xB3cf4a60dC6fd90eD66c96A9d4b18F2f753a8E34` - VikingVault26
* `0x892E2F4D2B4B8DC930933dc3974E43F89B2eB797` - VikingVault52

### Binance network

* `0x6c13824078C5d0255e54CCD2460bAC0B13f2b38e` - VikingVaultBSC13
* `0x31597c64f04a723823F96A1654417eb6A1c50885` - VikingVaultBSC26
* `0xE7ab1839Cd96D34D38552944CC79570Ce8D098D3` - VikingVaultBSC52

## Vaults Info

1. `vault.totalVaultRewards`.  
2. `vault.totalVaultShares`.
3. `vault.stakingPeriod`.

## Rewards Info

1. `reward.rewardRate`.
2. `reward.pendingVaultRewards`.
3. `reward.claimedVaultRewards`.
4. `reward.remainingVaultRewards`.

## Viking Vault Stats

* Total number of contracts deployed.
* Total number of contracts live and staking.
* Total combined value of staked, in USD and EUR.
* Total combined value of rewards, in USD and EUR.
* Total stakeholders.
* Total days funds safe - No hack counter.

### Deployed SubGraph

* Viking Vaults data.

```js
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
