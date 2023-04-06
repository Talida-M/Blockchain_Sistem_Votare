const ethers = require('ethers');

 async function bytesCreati(args){
    const nume = args[0];
    const bytes = ethers.encodeBytes32String(nume);
    console.log('bytes: : ', bytes);
}

bytesCreati(process.argv.slice(2));
