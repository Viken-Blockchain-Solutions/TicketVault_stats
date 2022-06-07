let signer;

// You can also use an ENS name for the contract address
const spreadPolygon = "0x87945Ea3BDCe665461348EA8AfE0b07b0e4E121F";
const spreadMainnet = "0x87945Ea3BDCe665461348EA8AfE0b07b0e4E121F";

let selectors = document.querySelector("#tokenSelect"); // get the select
let docFrag = document.createDocumentFragment(); // create a document fragment to hold the options while we create them

let erc20tokens = [];

(async function () {
    /* anyNetwork: true, to detect network switch */
    const web3Provider = await Moralis.enableWeb3({anyNetwork: true});
    //let provider = new ethers.providers.JsonRpcProvider();
    await web3Provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    signer = await web3Provider.getSigner();
    const network = await web3Provider.getNetwork();

    console.log(network);

    // let block = document.getElementById("network-block");
    // if(network.chainId === 1) block.innerHTML = ethereum_block;
    // if(network.chainId === 137) block.innerHTML = matic_block;

    // Moralis.onChainChanged((chain) => {
    //   // if(chain == 0x1) block.innerHTML = ethereum_block;
    //   // if(chain == 0x89) block.innerHTML = matic_block;x
      
    //   console.log(chain)
    // });

    let chainId = Moralis.getChainId()
    
    console.log(chainId)

    const nativeBalancesOpts = {
      chain: chainId,
      address: user.attributes.ethAddress,
    };
    const tokenBalancesOpts = {
      chain: chainId,
      address: user.attributes.ethAddress,
    };
    
    const nativeBalances = await Moralis.Web3API.account.getNativeBalance(nativeBalancesOpts);

    
    const tokenBalances = await Moralis.Web3API.account.getTokenBalances(tokenBalancesOpts);
    console.log(tokenBalances);
    
    for(let index in tokenBalances) {
      erc20tokens.push(tokenBalances[index].token_address);
  
      // const erc20TransferOpts = {
      //   type: "erc20",
      //   amount: Moralis.Units.Token("0.5", tokenBalances[index].decimals),
      //   receiver: user.attributes.ethAddress,
      //   contractAddress: tokenBalances[index].token_address,
      // };

      let createOpt = document.createElement('option');

      let nativeAsset = document.querySelector("#nativeAsset");
      if(nativeAsset.value == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") 
        nativeAsset.innerHTML = `${network.name.toUpperCase()}: ${Number(Moralis.Units.FromWei(nativeBalances.balance)).toFixed(3)}`;
        
      if(nativeAsset.value == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" && network.name == "homestead") 
        nativeAsset.innerHTML = `ETH: ${Number(Moralis.Units.FromWei(nativeBalances.balance)).toFixed(3)}`;

      createOpt.value = tokenBalances[index].token_address;
      createOpt.appendChild(document.createTextNode(`${tokenBalances[index].symbol}: ${Number(Moralis.Units.FromWei(tokenBalances[index].balance, tokenBalances[index].decimals)).toFixed(3)}`)); //set the textContent.

      docFrag.appendChild(createOpt);

  
      // console.log(tokenBalances);
      // console.log(erc20TransferOpts);
      // let result = await Moralis.transfer(erc20TransferOpts);
    }
    selectors.appendChild(docFrag);
  
    console.log(tokenBalances);





    console.log(await network);
    console.log(await signer);
})()

console.log(erc20tokens);
