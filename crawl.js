const {JSDOM} = require('jsdom')

async function crawlPage(currentUrl){
    console.log(`actively crawling:  ${currentUrl}`)

    try {
        const resp = await fetch(currentUrl)
        if(resp.status > 399){
            console.log(`error in fetch with status code ${resp.status} on page ${currentUrl}`)
            return
        }

        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type : ${contentType} , on page: ${currentUrl}` )
        }
        console.log(await resp.text())

    } catch (error) {
        console.log(`error in fetch: ${error.message} on page: ${currentUrl}`)
    }
}


function getUrlFromHtml ( htmlBody  ,  baseURL ){ // ( ) <-- here the input is given 
    const urls = [] // array of links present on the website
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements){
        if(linkElement.href.slice(0 , 1) === '/'){
            //relative
            try{
                const urlOBJ = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlOBJ.href)
            }catch(err){
                console.log(`error with relative url: ${err.message}`)
            }
        }else{
            // absolute 
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`error with absolute url : ${error.message}`)
            }
        }
    }
    return urls
}

function normalizeURL(urlString){
    const urlOBJ = new URL(urlString);
    const hostpath = `${urlOBJ.hostname}${urlOBJ.pathname}`
    if(hostpath.length > 0 && hostpath.slice(-1) === '/'){
        return hostpath.slice(0 , -1)
    }
    return hostpath
}

module.exports = {
    normalizeURL , 
    getUrlFromHtml , 
    crawlPage
}