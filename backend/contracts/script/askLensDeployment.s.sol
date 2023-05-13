// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Script.sol";
import "../src/AskLensQuestion.sol";
import "../src/AskLensThread.sol";

contract Deployment is Script {

    function run() external returns(AskLensQuestion, AskLensThread) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy AskLensQuestion Contract
        AskLensQuestion askLensQuestion = new AskLensQuestion();

        // Deploy AskLensThread Contract
        AskLensThread askLensThread = new AskLensThread();

        // Set AskLensQuestion Contract as QuestionContract in AskLensThread Contract
        askLensThread.setQuestionContract(address(askLensQuestion));

        // Set AskLensThread Contract as AnswerContract in AskLensQuestion Contract
        askLensQuestion.setAnswerContract(address(askLensThread));

        return(askLensQuestion, askLensThread);

    }
}