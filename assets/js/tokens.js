function tokens() {
    Polygon: {
        CentaurifyToken: "0x7b9c2d37fc0B45A5Ec022D2023F18685FdA832e7";
        Weth: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
        Wbtc: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
        Req: "0xB25e20De2F2eBb4CfFD4D16a55C7B395e8a94762";
        Wmatic: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
    }
}

const matic_block = `
    <div class="d-flex m-5 justify-content-center">
        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
        <img src="assets/img/icons/matic_cryptocurrency_logo_icon_131424.ico" alt="Matic Logo"></i>
        <h5 class="card-subtitle m-4 text-muted">Spread your Polygon assets across multiple accounts in one transaction.</h5>
        </div>
        </div>

        <div class="container-fluid">
        <div class="row">   
        <div class="col-lg-12">
            <div class="card p-4">
            <div class="row col-md-5 m-3">
                <label for="assets">Choose Polygon asset:</label>
                <select name="assets" id="assets" form="assets_form" required>
                <option value="MATIC">MATIC</option>
                <option value="WETH">WETH</option>
                <option value="WBTC">WBTC</option>
                <option value="DAI">DAI</option>
                <option value="CENT">CENT</option>
                </select>
            </div>
            <form class="recipient-form" id="assets_form" onsubmit="return false">
                <div class="row gy-4 m-1">
                <div class="col-md-6">
                    <input type="text" name="address" class="form-control" id="input-address" placeholder="Address" pattern="[A-Za-z0-9]{42}" title="Ethereum address" required>
                    <div id="fskey-arrow-icon" class="fskey-activator-logo fskey-icon-locked" style="top: 40px; left: 590.5px;"></div>
                </div>

                <div class="col-md-4 ">
                    <input type="text" class="form-control" name="value" id="input-value" placeholder="Amount" required>
                    <div id="fskey-user-icon" class="fskey-activator-logo fskey-icon-locked" style="top: 40px; left: 590.5px;"></div>
                </div>

                <div class="col-md-12 text-center">
                    <div class="loading" id="loading-message"></div>
                    <div class="error-message" id="error-message"></div>
                    <div class="sent-message" id="sent-message"></div>

                    <button class="btn btn-primary m-3" onclick="setValues()">Add new recipient</button>
                </div>

                </div>
            </form>
            
            </div>

        </div>


        </div>
    </div>
`

const ethereum_block = `
    <div class="d-flex m-5 justify-content-center">
        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
        <img src="assets/img/icons/eth@2x.png" alt="Ethereum Logo"></i>
        <h5 class="card-subtitle m-4 text-muted">Spread your Ethereum assets across multiple accounts in one transaction.</h5>
        </div>
        </div>

        <div class="container-fluid">
        <div class="row">
        <div class="col-lg-12">
            <div class="card p-4">
            <div class="row col-md-5 m-3">
                <label for="assets">Choose Ethereum asset:</label>
                <select name="assets" id="assets" form="assets_form" required>
                <option value="WETH">ETH</option>
                <option value="WBTC">WBTC</option>
                <option value="DAI">DAI</option>
                <option value="CENT">CENT</option>
                <option value="MATIC">MATIC</option>
                </select>
            </div>
            <form class="recipient-form" id="assets_form" onsubmit="return false">
                <div class="row gy-4 m-1">
                <div class="col-md-6">
                    <input type="text" name="address" class="form-control" id="input-address" placeholder="Address" pattern="[A-Za-z0-9]{42}" title="Ethereum address" required>
                    <div id="fskey-arrow-icon" class="fskey-activator-logo fskey-icon-locked" style="top: 40px; left: 590.5px;"></div>
                </div>

                <div class="col-md-4 ">
                    <input type="text" class="form-control" name="value" id="input-value" placeholder="Amount" required>
                    <div id="fskey-user-icon" class="fskey-activator-logo fskey-icon-locked" style="top: 40px; left: 590.5px;"></div>
                </div>

                <div class="col-md-12 text-center">
                    <div class="loading" id="loading-message"></div>
                    <div class="error-message" id="error-message"></div>
                    <div class="sent-message" id="sent-message"></div>

                    <button id="setValues" class="btn btn-primary m-3">Add new recipient</button>
                </div>

                </div>
            </form>
            
            </div>

        </div>


        </div>
    </div>
`

{/* <button class="btn btn-primary m-3" onclick="setValues()">Add new recipient</button> */}


// const ropsten_block = `
//     <div class="d-flex m-5 justify-content-center">
//         <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
//         <img src="assets/img/icons/eth@2x.png" alt="Ethereum Logo"></i>
//         <h5 class="card-subtitle m-4 text-muted">Spread your Ropsten assets across multiple accounts in one transaction.</h5>
//         </div>
//         </div>

//         <div class="container-fluid">
//         <div class="row">
//         <div class="col-lg-12">
//             <div class="card p-4">
//             <div class="row col-md-5 m-3">
//                 <label for="assets">Choose Ropsten asset:</label>
//                 <select name="assets" id="assets" form="assets_form" required>
//                 <option value="WETH">ETH</option>
//                 <option value="WBTC">WBTC</option>
//                 <option value="DAI">DAI</option>
//                 <option value="CENT">CENT</option>
//                 <option value="MATIC">MATIC</option>
//                 </select>
//             </div>
//             <form class="recipient-form" id="assets_form" onsubmit="return false">
//                 <div class="row gy-4 m-1">
//                 <div class="col-md-6">
//                     <input type="text" name="address" class="form-control" id="input-address" placeholder="Address" pattern="[A-Za-z0-9]{42}" title="Ethereum address" required>
//                     <div id="fskey-arrow-icon" class="fskey-activator-logo fskey-icon-locked" style="top: 40px; left: 590.5px;"></div>
//                 </div>

//                 <div class="col-md-4 ">
//                     <input type="text" class="form-control" name="value" id="input-value" placeholder="Amount" required>
//                     <div id="fskey-user-icon" class="fskey-activator-logo fskey-icon-locked" style="top: 40px; left: 590.5px;"></div>
//                 </div>

//                 <div class="col-md-12 text-center">
//                     <div class="loading" id="loading-message"></div>
//                     <div class="error-message" id="error-message"></div>
//                     <div class="sent-message" id="sent-message"></div>

//                     <button class="btn btn-primary m-3" onclick="setValues()">Add new recipient</button>
//                 </div>

//                 </div>
//             </form>
            
//             </div>

//         </div>


//         </div>
//     </div>
// `
