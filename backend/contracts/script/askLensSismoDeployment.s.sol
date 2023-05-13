// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Script.sol";
import "../src/AskLensQuestionWSismo.sol";
import "../src/AskLensThreadWSismo.sol";

contract Deployment is Script {

    function run() external returns(AskLensQuestionWSismo, AskLensThreadWSismo) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy AskLensQuestionWSismo Contract
        AskLensQuestionWSismo askLensQuestion = new AskLensQuestionWSismo();

        // Deploy AskLensThreadWSismo Contract
        AskLensThreadWSismo askLensThread = new AskLensThreadWSismo();

        // Set AskLensQuestionWSismo Contract as QuestionContract in AskLensThreadWSismo Contract
        askLensThread.setQuestionContract(address(askLensQuestion));

        // Set AskLensThreadWSismo Contract as AnswerContract in AskLensQuestionWSismo Contract
        askLensQuestion.setAnswerContract(address(askLensThread));

        return(askLensQuestion, askLensThread);

    }
}