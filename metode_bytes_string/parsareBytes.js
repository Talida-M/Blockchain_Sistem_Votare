const ethers = require('ethers');
 async function parsareBytes(argumente){
    const bytes = argumente[0];
    const nume = ethers.decodeBytes32String(bytes);
    console.log('nume:  ', nume);
}

parsareBytes(process.argv.slice(2));