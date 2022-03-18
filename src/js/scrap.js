(async function () {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    provider = await new ethers.providers.
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    signer = await provider.getSigner();
    signerAddress = signer.address;
    // You can also use an ENS name for the contract address
    singleStakingAddr = "0xe9c9B30cfaC255154283483D410F2250364EEe07";
    centErc20Addr = "0x938f689d828D6d105BAc52F9DE605d6C6CCa1CD1";
    
    // The StakingContract ABI
    StakingContractAbi = [
      // The methods we want to call on singlestaking smart-contract.
        'function deposit(uint256 _amount)',
        'function withdraw()',
        'function exitCollecting()',
        'function exitStaking()',
        'function addRewards(uint256 amount)',
        'function startStaking()',
        'function stopStaking()',
        'function getPendingVaultRewards()',


        // The events triggered.
        'event Deposit(address indexed user, uint256 amount)',
        'event Withdraw(address indexed user, uint256 amount, uint256 rewards)', 
        'event StakingStarted()',
        'event StakingFinished(uint256 indexed stopTimestamp)',
        
    ];

    // The ERC20Contract ABI.
    CentContractAbi = [
        // Get the approval to spend.
        'function allowance(address owner, address spender) returns (uint256)',
        'function approve(address spender, uint256 amount) returns (bool)',

        // Get the balance of an account.
        'function balanceOf(address account) returns (uint256)',
    
        // Send some of your tokens to someone else.
        "function transfer(address to, uint amount)",
    
        // The events emitted by contract.
        "event Transfer(address indexed from, address indexed to, uint amount)",
        'event Approval(address indexed owner, address indexed spender, uint256 value)'
    ];
  
    // The Contract objects.
    stakingContract = await new ethers.Contract(singleStakingAddr, StakingContractAbi, provider);
    centContract = await new ethers.Contract(centErc20Addr, CentContractAbi, provider);

    console.log("TicketVault: ", singleStakingAddr);
    console.log("CENT: ", centErc20Addr);
})()
  
// As the signer we have to approve stakingContract to spend our CENT tokens.
async function _approve() {
    let _amount = document.getElementById("input-stake-amount").value;
    const centAmount = ethers.utils.parseUnits(_amount, 18);
    console.log("Approving :", singleStakingAddr, "\namount :", centAmount.toString());
    const tx = await centContract.connect(signer).approve(singleStakingAddr, centAmount);
    const message = (`Approved: ${centAmount}`);
    console.log("Approved", tx);
    console.log(message);
    document.getElementById("output-message").innerHTML = message;
    return true;
}

// Add stake to pool.
async function _deposit() {
    let _amount = document.getElementById("input-stake-amount").value;
    const centAmount = ethers.utils.parseUnits(_amount, 18);
    console.log(centAmount.toString());

    console.log("adding stake")
    tx = await stakingContract.connect(signer).deposit(centAmount);
    console.log('addStake tx :', tx);
    await getBalance();
    const stake_message = (`Stake added: ${_amount}`);
    document.getElementById("output-message").innerHTML = stake_message;
    return true;
}

// withdraw stake from pool.
async function _withdraw() {
    console.log("withdraw");
    let _amount = document.getElementById("input-stake-amount").value;

    stakingUser = await stakingContract.connect(signer);
    // Each _centAmount has 18 decimal places
    centAmount = ethers.utils.parseUnits(_amount, 18);

    // Stake 100 CENT in stakingContract.
    let tx = await stakingUser.withdraw();
    console.log('withdrawStake tx: ', tx);
    
    await getBalance();
    return tx;
}

// emergency withdraw stake from pool (without rewards!).
async function _exitCollecting() {
    console.log("exitCollection");

    stakingUser = await stakingContract.connect(signer);
    let tx = await stakingUser.exitCollecting();

    console.log('Emergency Withdraw TX :', tx);   
    await getBalance();
    return tx;
}

// updates the pool. 
async function _getPendingRewards() {
    console.log("Updating Pool");
    const tx = await stakingContract.connect(signer).getPendingRewards();
    console.log("Pool updated: ", tx);
    const pool_message = (`Updating Pool data.`); 
    document.getElementById("output-message").innerHTML = pool_message;
}

// return the pool info. 
async function _poolInfo() {
    console.log("Getting pool info");
    const tx = await stakingContract.connect(signer).poolInfo;
    console.log("Pool info: ", tx);
    document.getElementById("table-poolInfo").innerHTML = tx;
}
/**
// return pending rewards for user.
async function _pendingCent() {
    const user = await Moralis.User.current();
    console.log("Getting pending rewards for user");
    const tx = await centContract.pendingCent(user.get('ethAddress'));
    console.log("Pool info: ", tx);
    document.getElementById("table-poolInfo").innerHTML = tx;
}   
 */