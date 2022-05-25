import { 
    getTotalVaultStats,
    getTotalStakeholders,
    timespan
} from './vaults/helpers.js';

(async () => {
    const stats = await getTotalVaultStats();
    const holders = await getTotalStakeholders();
    console.log(holders);
    let days = timespan(1647608215);
    
    document.getElementById("output_totstaked").innerHTML = stats[0];
    document.getElementById("output_totrewards").innerHTML = stats[1];
    document.getElementById("output_totvalue").innerHTML = stats[2];
    
    document.getElementById("output_totdays").innerHTML = days;

})();