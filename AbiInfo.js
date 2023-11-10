const erc20ABI=["function decimals() external view returns (uint8)"]

const routerABI=["function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)"]

module.exports={
    erc20ABI,routerABI
}