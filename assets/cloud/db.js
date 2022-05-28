

loadVaults = async () => {
    let data = await getStats();
    console.log(data);
    await defineNewObject(data[0][1]);
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