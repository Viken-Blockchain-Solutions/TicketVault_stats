/// @notice This file contains the different smart-contract addresses.

/// erc20 token address.
/// @notuce Creates an object of erc20 -> network - address.
const token_addresses = {
    cent: {
        eth: "0x08ba718F288c3b12B01146816bef9FA03cC635bc",
        bsc: "0xB9b41dA7FA895b093b95340a3379383Bba36735E",
        polygon: "0x7b9c2d37fc0B45A5Ec022D2023F18685FdA832e7"
    }
}

/// Deployed ethereum vaults.
/// @notice Creates an object of month -> timespan -> vault_address.
const eth_addresses = {
    april: [
        "0xe7ab1839cd96d34d38552944cc79570ce8d098d3",
        "0x1ED3181B9E5D8C93452C0AF7081502398e8610a2",
        "0x3a01C5F9acDeaeAD1e9ac4706489132dF25dc2e9"
    ],
    may: [
        "0x0e0bf317e139ae3988d15cfc063c056197e2849a",
        "0xB3cf4a60dC6fd90eD66c96A9d4b18F2f753a8E34",
        "0x892E2F4D2B4B8DC930933dc3974E43F89B2eB797"
    ]
}

/// Deployed binance vaults.
/// @notice Creates an object of month -> timespan -> vault_address.
const bsc_addresses = {
    april: [
        "",
        "",
        ""
    ],
    may: [
        "0x6c13824078C5d0255e54CCD2460bAC0B13f2b38e",
        "0x31597c64f04a723823F96A1654417eb6A1c50885",
        "0xE7ab1839Cd96D34D38552944CC79570Ce8D098D3"
    ]
 }

 export {eth_addresses, bsc_addresses};