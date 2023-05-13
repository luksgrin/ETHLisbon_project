// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/RRUSD.sol";

contract ContractTest is Test {

    RRUSD rrusd;
    address user;

    function setUp() public {
        address oracle = 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0;
        rrusd = new RRUSD(oracle);

        user = makeAddr("user");
    }



    function testCalculatePrices() public {
        rrusd.calculate_Matic_USD(1);

        rrusd.calculate_RRUSD_Matic(1);
    }


    function testWrap() public {
        vm.deal(user, 10);
        vm.prank(user);
        rrusd.wrap{value: 1}();

    }

    function testUnwrap() public {
        // the exchange rate is hardcoded to:
        //  --> uint256 answer = uint256(int256(85810000)); 
        // for testing
        vm.deal(user, 10 ether);
        vm.startPrank(user);

        rrusd.wrap{value: 1 ether}();
        rrusd.wrap{value: 3 ether}();

        assertEq(address(rrusd).balance, 4 ether);
        console.log("Contract has Matic (in wei): ", address(rrusd).balance);

        uint userTokenBalance = rrusd.balanceOf(user);

        uint amount = (85810000 * 4 ether);
        assertEq(userTokenBalance, amount);

        console.log("User token balance: ", userTokenBalance);
        uint res1 = userTokenBalance / 2;

        rrusd.unwrap(res1);
        console.log("unwrapping: ", res1);
        
        rrusd.unwrap(res1);
        console.log("unwrapping: ", res1);

        assertEq(address(rrusd).balance, 0);
        console.log("");
        assertEq(rrusd.balanceOf(user), 0);



    }



}


