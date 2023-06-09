// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./tokens/ERC20.sol";
import "./interfaces/AggregatorV3Interface.sol";


/**
*    @title     RRUSD stablecoin. 
*    @notice    Wrap/Unwrap MATIC/RRUSD and receive MATIC/RRUSD at current USD market rate.
*    @notice    This contract is not secure. Please do not use.
**/
contract RRUSD is ERC20 {
    event inflated(uint256 amountInflated);
    event wrapped(address sender, uint256 value, uint256 output);
    event unwrapped(address sender, uint256 value, uint256 output);

    address owner;
    uint constant DECIMALS = 10**6;
    AggregatorV3Interface oracle;


    constructor(address _oracle_address) ERC20("RRUSD StableCoin", "RRUSD"){
        oracle = AggregatorV3Interface(_oracle_address);
        owner = msg.sender;
    }


    // Deposit MATIC, get RRUSD 
    function wrap() public payable {
        require(msg.value > 0, 'ERR: 0 amount');
        uint256 amount = calculate_Matic_USD(msg.value);
        _mint(msg.sender, amount);

        emit wrapped(msg.sender, msg.value, amount);
    }
    

    // Deposit RRUSD, get MATIC     
    function unwrap(uint _amount) public {
        require(balanceOf(msg.sender) >= _amount, 'ERR: Not Enough RRUSD balance');
        uint256 matic = calculate_RRUSD_Matic(_amount);
        require(address(this).balance >= matic / 10**18, ' ERR: Contract not enough balance');
        _burn(msg.sender, _amount);
        uint payment = matic / DECIMALS;
        (bool success, ) = payable(msg.sender).call{value: payment}("");
        require(success);

        emit unwrapped(msg.sender, _amount, matic);
    }


    function calculate_Matic_USD(uint256 _amount) public view returns(uint256){
        uint256 answer = uint256(getPrice());
        uint256 totalAmount = _amount * answer;
        return totalAmount;
    }


    function calculate_RRUSD_Matic(uint256 _amount) public view returns(uint256){
        uint256 answer = uint256(getPrice()); 
        require(_amount > 0, "ERR: calulate 0");
        uint256 price = (_amount * DECIMALS) / answer;
        return price;
    }


    function getPrice() public view returns( int256 roundId){
        ( , int256 answer, , ,  ) = oracle.latestRoundData();
        return answer;
    }


    // Mint tokens to an address for testing
    function inflate(address _to, uint256 _amount) external {
        if(msg.sender != owner) revert();
        _mint(_to, _amount);

        emit inflated(_amount);
    }


    function retrieveFunds() external {
        if(msg.sender != owner) revert();
        payable(owner).call{value: address(this).balance}("");
    }


    receive() external payable{
        wrap();
    }

}
