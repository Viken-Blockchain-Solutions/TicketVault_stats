(async function () {


    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    provider = new ethers.providers.Web3Provider(window.ethereum);
    //let provider = new ethers.providers.JsonRpcProvider();
    // A Web3Provider wraps a standard Web3 provider, which is

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()

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
    

    // The Contract objects.
    const spread = new ethers.Contract(Spread_polygon, ABI, provider);
    console.log(spread);
    console.log(signer);
})()
