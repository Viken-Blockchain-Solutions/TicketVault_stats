
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

    let temp = "";
    let id = 1;

    eth.forEach((u) => {
        temp += "<tr class='mt-5'>";
        temp += `<td>${id++}</td>`;
        temp += `<td>${"ETH"}</td>`;
        temp += `<td>${u.status}</td>`;
        temp += `<td>${u.stakingPeriod}</td>`;
        temp += `<td>${convert(u.startTimestamp)}</td>`;
        temp += `<td>${convert(u.stopTimestamp)}</td>`;
        temp += `<td>${(u.totalVaultShares / 1e18).toFixed(2)}</td>`;
        temp += `<td>${(u.totalVaultRewards / 1e18).toFixed(2)}</td></tr>`;
    });

    bsc.forEach((u) => {
        temp += "<tr>";
        temp += `<td>${id++} </td>`;
        temp += `<td>${"BSC"}</td>`;
        temp += `<td>${u.status}</td>`;
        temp += `<td>${u.stakingPeriod}</td>`;
        temp += `<td>${convert(u.startTimestamp)}</td>`;
        temp += `<td>${convert(u.stopTimestamp)}</td>`;
        temp += `<td>${(u.totalVaultShares / 1e18).toFixed(2)}</td>`;
        temp += `<td>${(u.totalVaultRewards / 1e18).toFixed(2)}</td></tr>`;
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

// Hours
var hours = date.getHours();

// Minutes
var minutes = "0" + date.getMinutes();

// Seconds
var seconds = "0" + date.getSeconds();

// Display date time in MM-dd-yyyy h:m:s format
var convdataTime =
    month +
    "-" +
    day +
    "-" +
    year;

return convdataTime;
}
  

export { getPrice, loadData };