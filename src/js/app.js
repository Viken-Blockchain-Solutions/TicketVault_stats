import { getTotalValueStats } from './vaults/helpers.js';
//import { timespan } from './vaults/utils.js';

(async () => {
    let  web3Provider = await Moralis.enableWeb3();
    let user = await web3Provider.send("eth_requestAccounts", []);
    console.log(user);

    let result = await getTotalValueStats();

    document.getElementById("output_totstaked").innerHTML = result['total_shares'];
    document.getElementById("output_totrewards").innerHTML = result['total_rewards'];

})();