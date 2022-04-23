let poly_spread, eth_spread;
let signer;
(async function () {
    const web3Provider = await Moralis.enableWeb3();
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

    Moralis.onChainChanged((chain) => {
      if(chain == 0x1) block.innerHTML = ethereum_block;
      if(chain == 0x89) block.innerHTML = matic_block;
    });

    const ABI = [
        // Spread smart-contract
        "function spreadAsset(address[] calldata recipients, uint256[] calldata values)",
        "function spreadERC20(IERC20 token, address[] calldata recipients, uint256[] calldata values)",
        "function spreadERC20Simple(IERC20 token, address[] calldata recipients, uint256[] calldata values)",
        
        // IERC20 smart-contract
        "function balanceOf(address account) external view returns (uint256)",
        "function approve(address spender, uint256 amount) external returns (bool)",

        // events
        "event Approval(address indexed owner, address indexed spender, uint256 value)"
    ];

    // You can also use an ENS name for the contract address
    const Spread_polygon = "0x87945Ea3BDCe665461348EA8AfE0b07b0e4E121F";
    const Spread_mainnet = "0x588797504F98e3680d2FebB24e72536ddab4857A";
    
    // The Contract objects.
    poly_spread = await new ethers.Contract(Spread_polygon, ABI, web3Provider);
    eth_spread =  await new ethers.Contract(Spread_mainnet, ABI, web3Provider);

    console.log('mainnet', eth_spread);
    console.log('polygon', poly_spread);
    console.log(await network);
    console.log(await signer);
})()