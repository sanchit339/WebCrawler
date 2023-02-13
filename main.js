const {crawlPage} = require('./crawl.js')

function main(){
    if(process.argv.length < 3){
        console.log(" No website provided")
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log(" too many command line provided")
        process.exit(1)
    }
    const baseUrl = process.argv[2]

    console.log(`starting crawl of${baseUrl}`)
    crawlPage(baseUrl)
}

main()