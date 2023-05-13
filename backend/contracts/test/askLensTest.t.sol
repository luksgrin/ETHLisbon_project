pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "../src/AskLensQuestion.sol";
import "../src/AskLensThread.sol";

contract ContractBTest is Test {

    function setUp() public {
        
        // Involved addresses
        address master = vm.addr(1);
        address quevedo = vm.addr(2);
        address alice = vm.addr(3);

        // Fund these addresses
        vm.deal(master, 10 ether);
        vm.deal(quevedo, 10 ether);
        vm.deal(alice, 10 ether);
        
        // Master (us) deploys contracts
        vm.startPrank(master);

        // Deploy AskLensQuestion Contract
        AskLensQuestion askLensQuestion = new AskLensQuestion();
        console.log("AskLensQuestion Contract deployed at: ", address(askLensQuestion));

        // Deploy AskLensThread Contract
        AskLensThread askLensThread = new AskLensThread();
        console.log("AskLensThread Contract deployed at: ", address(askLensThread));
        // Set AskLensQuestion Contract as QuestionContract in AskLensThread Contract
        askLensThread.setQuestionContract(address(askLensQuestion));

        // Set AskLensThread Contract as AnswerContract in AskLensQuestion Contract
        askLensQuestion.setAnswerContract(address(askLensThread));
        vm.stopPrank();


        // Quevedo asks a question
        vm.prank(quevedo);
        askLensQuestion.mint(
            alice,
            "bafybeibgjz73qif3wl7eovwo2rnzq72fdoyorpcqpmxdyme6plaettam2e" // test ipfs hash
        );
        console.log("Quevedo asked a question");
        console.log(
            "Quevedo's balance of question: ",
            askLensQuestion.balanceOf(quevedo, 1)
        );
        console.log(
            "Alice's balance of question: ",
            askLensQuestion.balanceOf(alice, 1)
        );
        console.log(
            "Quevedo's balance of answer: ",
            askLensThread.balanceOf(quevedo, 1)
        );
        console.log(
            "Alice's balance of answer: ",
            askLensThread.balanceOf(alice, 1)
        );

        // Alice answers the question
        vm.prank(alice);
        askLensThread.mint(
            quevedo,
            1,
            "anotheripf" // test ipfs hash
        );
        console.log("Alice answered a question");
        console.log(
            "Quevedo's balance of question: ",
            askLensQuestion.balanceOf(quevedo, 1)
        );
        console.log(
            "Alice's balance of question: ",
            askLensQuestion.balanceOf(alice, 1)
        );
        console.log(
            "Quevedo's balance of answer: ",
            askLensThread.balanceOf(quevedo, 1)
        );
        console.log(
            "Alice's balance of answer: ",
            askLensThread.balanceOf(alice, 1)
        );

    }

    function testNormalSetup() external {}

}