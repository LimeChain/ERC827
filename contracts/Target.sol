pragma solidity ^0.4.23;

import "./Token.sol";

contract Target {

	uint256 public a;
	uint256 public b;

	address public sent;

	function setO() public {
		sent = msg.sender;
	}

	function setA(address sender, uint256 _a) public returns(bool) {
		sent = sender;

		a = Token(msg.sender).balanceOf(sender);
		b = Token(msg.sender).allowance(sender, address(this));
		Token(msg.sender).transferFrom(sender, address(this), _a);
		return true;
	}
  
}