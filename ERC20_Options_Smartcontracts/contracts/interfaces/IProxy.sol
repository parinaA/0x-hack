pragma solidity ^0.4.23;

interface IProxy {

    /**
     * @dev `distributeStakes` Use to settle down the excersice request of the option
     * @param _to Address of the seller
     * @param _amount Number of the assets seller want to excercised
     * @return bool success
     */
    function distributeStakes(address _to, uint256 _amount) external returns (bool success);

    /**
     * @dev withdraw the unused base token and quote token only by owner
     * @return bool success
     */
    function withdrawal() external returns (bool success);
}
