// assets/js/api.js

var myHeaders = new Headers();
myHeaders.append("project_id", api_key);

var payload = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

/*
    Loads the responses back into index.html. 
*/
const loadToHTML = () => {
    address_output.innerHTML = _address;
    address_amount_output.innerHTML = _address_amount.toFixed(4);
    stake_address_output.innerHTML = _stakeAddress;
    type_output.innerHTML = _type;
    active_output.innerHTML = _active;
    epoch_output.innerHTML = _active_epoch;
    total_amount_output.innerHTML = _controlled_amount.toFixed(4);
    value_usd_price_output.innerHTML = _value_usd_price.toFixed(2);
    reward_output.innerHTML = _rewards_sum.toFixed(4);  
    tot_epoch_output.innerHTML = _tot_epoch;
    
    blocks_minted_output.innerHTML = _blocks_minted;
    live_delegations_output.innerHTML = _live_delegations;
    fixed_cost_output.innerHTML = _fixed_cost.toFixed(0);
    margin_cost_output.innerHTML = _margin_cost;
    declared_pledge_output.innerHTML = _declared_pledge.toFixed(0);
    reward_account_output.innerHTML = _reward_account;
    estimated_Next_Reward_output.innerHTML = _average.toFixed(4);
    
    pool_id_output.innerHTML = _pool_id;
    homepage_output.innerHTML = _homepage;
    pool_name_output.innerHTML = _pool_name;
    pool_ticker_output.innerHTML = _pool_ticker;
    pool_description_output.innerHTML = _pool_description;
};


/*  
    Load an ADA payment address.
    @param: ADA address 
    @response: amount, stake_address, type 
*/
const loadAddressData = async (address) => {
    try {
        const url = `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`;
        const res = await fetch(url, payload);
        console.log(res.ok);
        const data = await res.json();
        console.log(data);

        
        // assign to global variables
        _address_amount = data.amount[0].quantity / 1000000;
        _stakeAddress = data.stake_address;
        _type = data.type;
        _address = address;
    
        loadStakeData(_stakeAddress);

    } catch (err) {
        console.error(err);
    }
};


/*  
    Load stake metadata.
    @param: ADA stake address
    @response:  active, active_epoch, controlled amount, rewards_sum, pool_id, address, tot_epoch. 
*/
const loadStakeData = async (_stakeAddress) => {
    try {
        const urlStakeInfo = `https://cardano-mainnet.blockfrost.io/api/v0/accounts/${_stakeAddress}`;
        const urlStakeAddresses = `https://cardano-mainnet.blockfrost.io/api/v0//accounts/${_stakeAddress}/addresses?count=100&page=1&order=asc`;
        const urlStakeHistory = `https://cardano-mainnet.blockfrost.io/api/v0/accounts/${_stakeAddress}/history`;
        const urlRewardHistory = `https://cardano-mainnet.blockfrost.io/api/v0/accounts/${_stakeAddress}/rewards`;

        var results = await Promise.all([
            fetch(urlStakeInfo, payload),
            fetch(urlStakeAddresses, payload),
            fetch(urlStakeHistory, payload),
            fetch(urlRewardHistory, payload),
        ]);

        const dataPromises = results.map( result => result.json());
        const finalData = await Promise.all(dataPromises);
        console.log(finalData);

        const resZero = () => {
            // Assign values from urlStakeInfo to global variables
            _active = finalData[0].active;
            _active_epoch = finalData[0].active_epoch;
            _controlled_amount = finalData[0].controlled_amount / 1000000;
            _rewards_sum = finalData[0].rewards_sum / 1000000;
            _pool_id = finalData[0].pool_id;    
        }
        
        const resOne = () => {
            // Assign values from urlStakeAddress to global variables
            let len = finalData[1].length - 1;
            for (let i = 0; i <= len; i++) {
                let address = finalData[1][i].address;
                let entry = document.createElement('p');
                entry.appendChild(document.createTextNode(address));
                addr.appendChild(entry);
            }
        }

        const resTwo = () => {
            // Assign values from urlStakeHistory to global variables
            _tot_epoch = finalData[2].length;
        }

        const resFour = () => {
            // Estimate Reward by calculating the average of last ten rewards
            var allPreviousRewards = finalData[3];
            var lastTenRewards = allPreviousRewards.slice(-10);
            
            let num = 0;

            for (index in lastTenRewards) {
                let amount = Number(lastTenRewards[index].amount);
                num += amount;
            }
            _average = ((num / lastTenRewards.length) / 1000000);    
        }


        resZero(), resOne(), resTwo(), resFour();
        getValueOf(Number(_controlled_amount.toFixed(2)));
        loadPoolData(_pool_id);
        
    } catch (err) {
        console.error(err);
    }
};


/*  
    Load pool metadata.
    @param: ADA pool id
    @response:   
*/
const loadPoolData = async (_pool_id) => {
    try {
        const urlPool = `https://cardano-mainnet.blockfrost.io/api/v0/pools/${_pool_id}`;
        const urlPoolData = `https://cardano-mainnet.blockfrost.io/api/v0/pools/${_pool_id}/metadata`;
        
        var results = await Promise.all([
            fetch(urlPool, payload),
            fetch(urlPoolData, payload)
        ]);

        const dataPromises = results.map( result => result.json());
        const finalData = await Promise.all(dataPromises);
        console.log(finalData);

        const pool = () => {
            // Assign values from urlPool to global variables
            _blocks_minted = finalData[0].blocks_minted;
            _live_delegations = finalData[0].live_delegators;
            _fixed_cost = finalData[0].fixed_cost/ 1000000;
            _margin_cost = finalData[0].margin_cost;
            _declared_pledge = finalData[0].declared_pledge / 1000000;
            _reward_account = finalData[0].reward_account;
            
            // urlPoolData responses
            _pool_description = finalData[1].description;
            _homepage = finalData[1].homepage;
            _pool_name = finalData[1].name;
            _pool_ticker = finalData[1].ticker;
        }
        
        pool();
        loadToHTML();
    } catch (err) {
        console.error(err);
    }
};


/*  
    Calculate the value of total Ada in wallet to USD
    @param: _controlled_amount
    @return: _value_usd_price 
*/
const getValueOf = async (_totAda) => {
    try {
        console.log(_totAda);
        const urlPriceUSD = "https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd";
        const res = await fetch(urlPriceUSD);
        console.log(res.ok);
        const data = await res.json();

        _value_usd_price = (_totAda * data.cardano.usd); 
        return _value_usd_price;
    } catch (err) {
        console.error(err);
    }

}



