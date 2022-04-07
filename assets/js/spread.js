
var poly_spread, eth_spread;
var signer;
(async function () {

    provider = new ethers.providers.Web3Provider(window.ethereum);
    //let provider = new ethers.providers.JsonRpcProvider();
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    signer = await provider.getSigner();
    const network = await provider.getNetwork(); 

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
    poly_spread = await new ethers.Contract(Spread_polygon, ABI, provider);
    eth_spread =  await new ethers.Contract(Spread_mainnet, ABI, provider);

    
    console.log('mainnet', eth_spread);
    console.log('polygon', poly_spread);
    console.log(await network, signer);

})()
