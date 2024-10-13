const ethers = require('ethers');
const {routerAddress,fromAddress,toAddress}=require("./AddressList");
const {erc20ABI,routerABI}=require("./AbiInfo");

const provider= new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/bsc/4b3bc3824576746830f7f8fa1d019852f6acc10bf54eecadae6a2611345ca13a")
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

quantityFetch("1850")