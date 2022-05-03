let signer;

// You can also use an ENS name for the contract address
const spreadPolygon = "0x87945Ea3BDCe665461348EA8AfE0b07b0e4E121F";
const spreadMainnet = "0x588797504F98e3680d2FebB24e72536ddab4857A";
const spreadRopsten = "0x2DF4402B278c737253EB1E0F7834014B19a53A65";

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

    let block = document.getElementById("network-block");
    if(network.chainId === 1) block.innerHTML = ethereum_block;
    if(network.chainId === 137) block.innerHTML = matic_block;
    if(network.chainId === 3) block.innerHTML = ropsten_block;

    Moralis.onChainChanged((chain) => {
      if(chain == 0x1) block.innerHTML = ethereum_block;
      if(chain == 0x89) block.innerHTML = matic_block;
      if(chain == 0x3) block.innerHTML = ropsten_block;
      console.log(chain)
    });

    console.log(await network);
    console.log(await signer);
})()