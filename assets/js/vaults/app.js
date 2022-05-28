
(async () => {
    const totals = await Moralis.Cloud.run('getTotals');
    const days = await Moralis.Cloud.run('timespan');
    const stats = await Moralis.Cloud.run('getVaultStats');

    // The Rewards in vault.
    document.getElementById("output_totrewards").innerHTML = tokensFormatter.format(totals[0]);
    // The total tokens staked in the vaults.
    document.getElementById("output_totstaked").innerHTML = tokensFormatter.format(totals[1]);
    // The total value of tokens in vault.
    document.getElementById("output_totvalue").innerHTML = totals[3] * totals[2];
    // Total Days staking.
    document.getElementById("output_totdays").innerHTML = days;

    console.log(stats);
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

async function getPrice() {
  try {
    const urlPriceUSD = "https://api.coingecko.com/api/v3/simple/price?ids=centaurify&vs_currencies=usd";
    const res = await fetch(urlPriceUSD);
    const data = await res.json();
    console.log(data.centaurify.usd);
    return data.centaurify.usd;
  } catch (err) {
    console.error(err);
  }
}