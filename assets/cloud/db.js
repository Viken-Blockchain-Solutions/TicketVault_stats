

loadVaults = async () => {
    let data = await getStats();
    for(let i = 0; i < data[0].length; i++) {
        await defineNewObject(data[0][i]);
    }
    for (let i = 0; i < data[1].length; i++) {
        await defineNewObject(data[1][i]);
    }
} 

defineNewObject = async (data) => {

    const VikingVault = Moralis.Object.extend('Viking_Vault');
    const vault = new VikingVault();
    vault.set("status", data[0]);
    vault.set("stakingPeriod", data[1]);
    vault.set("startTimestamp", data[2]);
    vault.set("stopTimestamp", data[3]);
    vault.set("totalVaultShares", data[4]);
    vault.set("totalVaultReward", data[5]);

    await vault.save();
}

getFirstVault = async () => {
    const query = new Moralis.Query('VikingVault');
    const vault = query.first();
    return vault;
}