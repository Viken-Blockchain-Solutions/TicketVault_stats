// "./assets/js/vaults/app.js"

import { getPrice, loadData } from "./main.js";

(async () => {

  const stats = await Moralis.Cloud.run('getVaultStats');
  const totals = await Moralis.Cloud.run('getTotals');
  const days = await Moralis.Cloud.run('timespan');

  let price = await getPrice();
  let value = totals[2] * price;

  await loadData(stats);
  let eth_staker = await sumArray(stats[2][0]);
  let bsc_staker = await sumArray(stats[2][1]);

  // The Rewards in vault.
  document.getElementById("output_totrewards").innerHTML = totals[0];
  // The total tokens staked in the vaults.
  document.getElementById("output_totstaked").innerHTML = totals[1];
  // The total value of tokens in vault.
  document.getElementById("output_totvalue").innerHTML = formatter.format(value);
  document.getElementById("output_stakeholders").innerHTML = (eth_staker + bsc_staker);
  // Total Days staking.
  document.getElementById("output_totdays").innerHTML = days;
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

async function sumArray(array) {
  let sum = 0;

  for (const item of array) {
    sum += item;
  }

  return sum;
}


export {tokensFormatter, formatter}