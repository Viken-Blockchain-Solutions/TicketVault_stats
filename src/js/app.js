import { getTotalVaultStats } from './vaults/helpers.js';
//import { timespan } from './vaults/utils.js';

(async () => {
    const stats = await getTotalVaultStats();
    console.log(stats);
    document.getElementById("output_totstaked").innerHTML = stats[0];
    document.getElementById("output_totrewards").innerHTML = stats[1];
    document.getElementById("output_totvalue").innerHTML = stats[2];
})();