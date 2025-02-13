const {writeFile} = require('fs')


const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv

//reading environment variables from .env

require('dotenv').config();


//reading the command line arguments passed with yargs

const environment = argv.environment

const isProduction = environment === 'prod'




const targetPath = isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.ts`;


const environmentFileContent = `
export const environment = {
    production: ${isProduction},
    PRODUCTS_API: "${process.env.PRODUCTS_API}",
};
`;




//Writing the content to the respective file

writeFile(targetPath, environmentFileContent, (err) => {
    if(err) {
        console.log(err);
    }

    console.log(`Wrote variables to path ${targetPath}`);

});