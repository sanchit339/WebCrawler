const { normalizeURL } = require ('./crawl.js')
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