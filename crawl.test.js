const { normalizeURL , getUrlFromHtml } = require ('./crawl.js')
const { test , expect } = require('@jest/globals')

test('normalize_url strip protocol' , () => {
    const input = 'https://sanchit.dev/path'    // for input name function we have given empty string 
    const actual = normalizeURL(input)
    const expected = 'sanchit.dev/path'
    expect(actual).toEqual(expected)
 })

 test('normalize_url strip trailling slash' , () => {
    const input = 'https://sanchit.dev/path/'    // trailling / 
    const actual = normalizeURL(input)
    const expected = 'sanchit.dev/path'
    expect(actual).toEqual(expected)
 })


 test('normalize_url capitals' , () => {
    const input = 'https://sanchit.dev/path/'    // this is handled by the URL constructor as it knows urls are lower case / 
    const actual = normalizeURL(input)
    const expected = 'sanchit.dev/path'
    expect(actual).toEqual(expected)
 })

test('normalize_url strip http' , () => {
    const input = 'http://sanchit.dev/path/'    
    const actual = normalizeURL(input)
    const expected = 'sanchit.dev/path'
    expect(actual).toEqual(expected)
 })

 test('getUrlFromHtml absoulte  ' , () =>{
    const inputHtmlBody = `
<html>
    <body>
        <a href="https://sanchit.dev/path/">
        Click here to get to the link 
        </a>
    </body>
</html>
    `
    const inputBasrUrl = "https://sanchit.dev"
    const actual = getUrlFromHtml(inputHtmlBody , inputBasrUrl)
    const expected = ["https://sanchit.dev/path/"]
    expect(actual).toEqual(expected)
 })

 
 
 test('getUrlFromHtml both' , () =>{
    const inputHtmlBody = `
<html>
    <body>
        <a href="https://sanchit.dev/path1/">
        Click here to get to the link 
        </a>
        <a href="/path2/">
        Click here to get to the link 
        </a>
    </body>
</html>
    `
    const inputBasrUrl = "https://sanchit.dev"
    const actual = getUrlFromHtml(inputHtmlBody , inputBasrUrl)
    const expected = ["https://sanchit.dev/path1/" , "https://sanchit.dev/path2/"]
    expect(actual).toEqual(expected)
 })

 test('getUrlFromHtml invalid ' , () =>{
    const inputHtmlBody = `
<html>
    <body>
        <a href="invalid">
        Click here to get to the link 
        </a>
    </body>
</html>
    `
    const inputBasrUrl = "https://sanchit.dev"
    const actual = getUrlFromHtml(inputHtmlBody , inputBasrUrl)
    const expected = []
    expect(actual).toEqual(expected)
 })
