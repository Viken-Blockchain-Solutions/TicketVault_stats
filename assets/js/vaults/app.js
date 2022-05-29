
(async () => {
  //await Moralis.Cloud.run('loadDB');
  const stats = await Moralis.Cloud.run('getVaultStats');
  const totals = await Moralis.Cloud.run('getTotals');
  //const vault = await Moralis.Cloud.run('getFirstVault');
  const days = await Moralis.Cloud.run('timespan');

  let price = await getPrice();
  let value = totals[2] * price;

  // The Rewards in vault.
  document.getElementById("output_totrewards").innerHTML = totals[0];
  // The total tokens staked in the vaults.
  document.getElementById("output_totstaked").innerHTML = totals[1];
  // The total value of tokens in vault.
  document.getElementById("output_totvalue").innerHTML = formatter.format(value);
  // Total Days staking.
  document.getElementById("output_totdays").innerHTML = days;

  console.log(`total rewards: ${totals[0]}`);
  console.log(`total staked: ${totals[1]}`);
  console.log(`total tokens: ${totals[2]}`);
  console.log(stats[0][0]);

  //console.log(vault);


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
    return data.centaurify.usd;
  } catch (err) {
    console.error(err);
  }
}