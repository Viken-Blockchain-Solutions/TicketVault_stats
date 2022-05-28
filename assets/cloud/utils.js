
// converts a unix timestamp into a date/time value 
const convertUnixTime = (time) => {
  let a = new Date(time * 1000),
      year = a.getFullYear(),
      months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      month = months[a.getMonth()],
      date = a.getDate(),
      hour = a.getHours(),
      min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
      sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  return `${month} ${date}, ${year}, ${hour}:${min}`;
} 

const sumArray = async (array) => {
  let sum = 0; 

  for (const item of array) {
    sum += item;
  }
 
  return sum;
}

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

async function get_event_data(chain, network, topic) {
  let list = [];
  for (let i = 0; i < network[i]; i++) {
    const options = {
      chain: chain,
      address: network[i],
      topic: topic,
      abi: EVENTS_ABI,
    };
    let res = await Moralis.Web3API.native.getContractEvents(options);
    list.push([options.chain, res]);
  }
  return (list);
}

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
