// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/RRUSD.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address oraclePolygon_usdc_usd = 0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7;
        address oraclePolygon_matic_usd = 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0;
        
        RRUSD rrusd = new RRUSD(oraclePolygon_matic_usd);
        
        vm.stopBroadcast();
    }
}
