const ethers = require('ethers');
const {routerAddress,fromAddress,toAddress}=require("./AddressList");
const {erc20ABI,routerABI}=require("./AbiInfo");

const provider= new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/")
const routerInstance = new ethers.Contract(
    routerAddress,routerABI,provider
)

const quantityFetch=async(humanInput)=>{
    const token1 = new ethers.Contract(
        fromAddress,erc20ABI,provider
    );
    const token2=new ethers.Contract(
        toAddress,erc20ABI,provider
    );

    const decimal1 = await token1.decimals();
    const decimal2 = await token2.decimals();

    const amountIn = ethers.utils.parseUnits(humanInput,decimal1).toString();
    const amountsOut = await routerInstance.getAmountsOut(amountIn,[
        fromAddress,toAddress
    ])
    const humanOutput = ethers.utils.formatUnits(amountsOut[1].toString(),
    decimal2)
    console.log(humanOutput)
}

quantityFetch("100")