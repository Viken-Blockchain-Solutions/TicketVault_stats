let deposits;
(async () => {
    //const stats = await Moralis.Cloud.run('vaultStats');
    deposits = await Moralis.Cloud.run('depositEvents');
    console.log(deposits);
    
})();