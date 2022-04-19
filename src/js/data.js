// returns the days since start staking
function timespan() {
    const startDate = convertUnixTime(vault13Start.toNumber());
    const endDate = Date.now();

    const start = new Date(startDate)
    const end = new Date(endDate)
    let dayCount = 0
  
    while (end > start) {
      dayCount++
      start.setDate(start.getDate() + 1)
    }
  
    return dayCount
}

// converts a unix timestamp innto a date/time value 
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

// Formats a number into "en-US" currency value.
let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
  //  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// Formats a number into "en-US" number value.
let tokensFormatter = new Intl.NumberFormat('en-US', {
    // These options are needed to round to whole numbers if that's what you want.
  //  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as 2,501)
});