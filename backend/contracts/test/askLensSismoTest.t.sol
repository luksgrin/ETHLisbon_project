pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "../src/AskLensQuestionWSismo.sol";
import "../src/AskLensThreadWSismo.sol";

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

        // Deploy AskLensQuestionWSismo Contract
        AskLensQuestionWSismo askLensQuestionWSismo = new AskLensQuestionWSismo();
        console.log("AskLensQuestionWSismo Contract deployed at: ", address(askLensQuestionWSismo));

        // Deploy AskLensThreadWSismo Contract
        AskLensThreadWSismo askLensThreadWSismo = new AskLensThreadWSismo();
        console.log("AskLensThreadWSismo Contract deployed at: ", address(askLensThreadWSismo));
        // Set AskLensQuestionWSismo Contract as QuestionContract in AskLensThreadWSismo Contract
        askLensThreadWSismo.setQuestionContract(address(askLensQuestionWSismo));

        // Set AskLensThreadWSismo Contract as AnswerContract in AskLensQuestionWSismo Contract
        askLensQuestionWSismo.setAnswerContract(address(askLensThreadWSismo));
        vm.stopPrank();


        // Quevedo asks a question
        vm.prank(quevedo);
        askLensQuestionWSismo.mint(
            "0x0",
            alice,
            "bafybeibgjz73qif3wl7eovwo2rnzq72fdoyorpcqpmxdyme6plaettam2e" // test ipfs hash
        );
        console.log("Quevedo asked a question");
        console.log(
            "Quevedo's balance of question: ",
            askLensQuestionWSismo.balanceOf(quevedo, 1)
        );
        console.log(
            "Alice's balance of question: ",
            askLensQuestionWSismo.balanceOf(alice, 1)
        );
        console.log(
            "Quevedo's balance of answer: ",
            askLensThreadWSismo.balanceOf(quevedo, 1)
        );
        console.log(
            "Alice's balance of answer: ",
            askLensThreadWSismo.balanceOf(alice, 1)
        );

        // Alice answers the question
        vm.prank(alice);
        askLensThreadWSismo.mint(
            "0x0",
            quevedo,
            1,
            "anotheripf" // test ipfs hash
        );
        console.log("Alice answered a question");
        console.log(
            "Quevedo's balance of question: ",
            askLensQuestionWSismo.balanceOf(quevedo, 1)
        );
        console.log(
            "Alice's balance of question: ",
            askLensQuestionWSismo.balanceOf(alice, 1)
        );
        console.log(
            "Quevedo's balance of answer: ",
            askLensThreadWSismo.balanceOf(quevedo, 1)
        );
        console.log(
            "Alice's balance of answer: ",
            askLensThreadWSismo.balanceOf(alice, 1)
        );

    }

    function testNormalSetup() external {}

}