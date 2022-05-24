import { VIKING_ABI } from './ABI.js';

// Formats a number into "en-US" number value.
let tokensFormatter = new Intl.NumberFormat('en-US', {
    // These options are needed to round to whole numbers if that's what you want.
  //  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as 2,501)
});

// Formats a number into "en-US" currency value.
let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
  //  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// converts a unix timestamp into a date/time value 
function convertUnixTime(unix) {
  let a = new Date(unix * 1000),
      year = a.getFullYear(),
      months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      month = months[a.getMonth()],
      date = a.getDate(),
      hour = a.getHours(),
      min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
      sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  return `${month} ${date}, ${year}, ${hour}:${min}`;
}

async function returnVaultStats(chain, month) {
  let list = [];
  for (let i = 0; i < month[i]; i++) {
      const options = {
          chain: chain,
          address: month[i],
          function_name: "vault",
          abi: VIKING_ABI
      }
      let res = await Moralis.Web3API.native.runContractFunction(options);
      list.push([options.chain,res]);
  }
  return (list);
}

const getValueOf = async (value) => {
  const urlPriceUSD = "https://api.coingecko.com/api/v3/simple/price?ids=centaurify&vs_currencies=usd";
  try {
      const res = await fetch(urlPriceUSD);
      const data = await res.json();
      return (value * data.centaurify.usd);
  } catch (err) {
      console.error(err);
  }
}


export { tokensFormatter, formatter, convertUnixTime, returnVaultStats, getValueOf };