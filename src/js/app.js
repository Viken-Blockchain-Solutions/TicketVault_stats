import { getTotalVaultStats, timespan } from './vaults/helpers.js';

(async () => {
    const stats = await getTotalVaultStats();
    let days = timespan(1647608215);
    
    document.getElementById("output_totstaked").innerHTML = stats[0];
    document.getElementById("output_totrewards").innerHTML = stats[1];
    document.getElementById("output_totvalue").innerHTML = stats[2];
    
    document.getElementById("output_totdays").innerHTML = days;

})();