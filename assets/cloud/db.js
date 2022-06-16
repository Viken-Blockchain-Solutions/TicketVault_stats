

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

async function getVaultStatus() {
    const Vault = Moralis.Object.extend("Viking_Vault");
    const query = new Moralis.Query(Vault);
    const results = await query.find();

    const content = document.getElementById("table_body");
    content.innerHTML = ""

    results.forEach(e => {
        const newRow = document.createElement('tr')
        newRow.body.innerHTML = `
        <th scope="row"><a href="#">#1</a></th>
        <td><a href="https://etherscan.io/address/0xe7ab1839cd96d34d38552944cc79570ce8d098d3">TicketVault13</a></td>
        <td><a href="https://centaurify.com/staking" class="text-primary">Centaurify</a></td>
        <td><a href="https://etherscan.io/address/0x08ba718F288c3b12B01146816bef9FA03cC635bc">CENT</a></td>
        <td id="output_table1_holders">${e.attributes.totalVaultReward}</td>
        <td id="output_table1_value">${e.attributes.totalVaultShares}</td>
        <td id="output_table1_end">${e.attributes.stopTimestamp}</td>
        <td><span class="badge bg-success" id="output_status">${e.attributes.status}</span></td>
        `
        content.appendChild(newRow);
    })
};

