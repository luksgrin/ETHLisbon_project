// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/RRUSD.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // address oraclePolygon_matic_usd = 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0;
        address mumbai_matic_usd = 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada;

        RRUSD rrusd = new RRUSD(mumbai_matic_usd);
        
        vm.stopBroadcast();
    }
}
