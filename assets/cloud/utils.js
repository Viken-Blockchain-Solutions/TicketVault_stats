
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

const getVaultStats = async (chain, month) => {
  let list = [];
  for (let i = 0; i < month[i]; i++) {
    const options = {
        chain: chain,
        address: month[i],
        function_name: "vault",
        abi: VIKING_ABI
    }
    let res = await Moralis.Web3API.native.runContractFunction(options);
    list.push([options.chain, res]);
  }
  return (list);
}

const sumArray = async (array) => {
  let sum = 0; 

  for (const item of array) {
    sum += item;
  }
 
  return sum;
}

const getValue = async (value) => {
  const urlPriceUSD = "https://api.coingecko.com/api/v3/simple/price?ids=centaurify&vs_currencies=usd";
  try {
      const res = await fetch(urlPriceUSD);
      const data = await res.json();
      return (value * data.centaurify.usd);
  } catch (err) {
      console.error(err);
  }
}

const get_event_data = async (chain, network, topic) => {
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
