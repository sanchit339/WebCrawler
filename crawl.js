const {JSDOM} = require('jsdom')

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
    getUrlFromHtml
}