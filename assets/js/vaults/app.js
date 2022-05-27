
(async () => {
    const stats = await Moralis.Cloud.run('vaultStats');
    console.log(stats[0]);
    console.log(stats[1]);
    // The Rewards in vault.
    document.getElementById("output_totrewards").innerHTML = tokensFormatter.format(stats[0]);
    document.getElementById("output_totstaked").innerHTML = tokensFormatter.format(stats[1]);
    document.getElementById("output_totvalue").innerHTML = formatter.format(stats[3] / 1e18);
})();

const tokensFormatter = new Intl.NumberFormat('en-US', {
    // These options are needed to round to whole numbers if that's what you want.
  //  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as 2,501)
});

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
  //  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});