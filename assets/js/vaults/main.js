import {tokensFormatter, formatter} from "./app.js";

const span_collect = `<span class="badge bg-info">Collecting</span>`;
const span_stake = `<span class="badge bg-primary">Staking</span>`;
const span_completed = `<span class="badge bg-success"><i class="bi bi-star me-1"></i>Completed</span>`;
const badge_eth = `<span class="badge bg-success"><i class="bi bi-star me-1"></i> Ethereum </span>`;
const badge_bsc = `<span class="badge bg-warning"><i class="bi bi-star me-1"></i> Binance </span>`;

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

async function loadData(data) {
    let response = data;

    let eth = await response[0];
    let bsc = await response[1];
    let price = await getPrice();
    let temp = "";
    let id = 1;

    eth.forEach((u) => {
        temp += "<tr class='mt-2'>";
        temp += `<th scope='row'><a href='#'>#${id++}</a></th>`;
        temp += `<td scope="col-auto"> ${badge_eth} </td>`;

        if (u.status == 1){
          temp += `<td scope="col-auto">${span_stake}</td>`;
        } 
        else if (u.status == 2){
          temp += `<td scope="col-auto">${span_completed}</td>`;
        } else {
          temp += `<td scope="col-auto">${span_collect}</td>`;
        } 
        
        temp += `<td scope="col-auto">${convert(u.stopTimestamp)}</td>`;
        temp += `<td scope="col-auto">${tokensFormatter.format((u.totalVaultShares / 1e18) + (u.totalVaultRewards / 1e18))} Cent</td>`;
        temp += `<td scope="col-auto">${formatter.format(((u.totalVaultShares / 1e18) + (u.totalVaultRewards / 1e18)) * price)}</td></tr>`;
    });

    bsc.forEach((u) => {
        temp += "<tr class='mt-2'>";
        temp += `<th scope='row'><a href='#'>#${id++}</a></th>`;
        temp += `<td scope="col-auto">${badge_bsc}</td>`;

        if (u.status == 1){
          temp += `<td scope="col-auto">${span_stake}</td>`;
        } 
        else if (u.status == 2){
          temp += `<td scope="col-auto">${span_completed}</td>`;
        } else {
          temp += `<td scope="col-auto">${span_collect}</td>`;
        } 

        temp += `<td scope="col-auto">${convert(u.stopTimestamp)}</td>`;
        temp += `<td scope="col-auto">${tokensFormatter.format((u.totalVaultShares / 1e18) + (u.totalVaultRewards / 1e18))} Cent</td>`;
        temp += `<td scope="col-auto">${formatter.format(((u.totalVaultShares / 1e18) + (u.totalVaultRewards / 1e18)) * price)}</td></tr>`;
    });

    document.getElementById("table-body").innerHTML = temp;
}

function convert(timestamp) {
// Unixtimestamp
var unixtimestamp = timestamp;

// Months array
var months_arr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

// Convert timestamp to milliseconds
var date = new Date(unixtimestamp * 1000);

// Year
var year = date.getFullYear();

// Month
var month = months_arr[date.getMonth()];

// Day
var day = date.getDate();

// Display date time in MM-dd-yyyy format
var convdataTime =
    month +
    "." +
    day +
    "." +
    year;

return convdataTime;
}

export { getPrice, loadData };