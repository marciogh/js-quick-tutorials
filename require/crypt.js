const crypt = (str) => str.split('').map(i => String.fromCharCode(i.charCodeAt(0)+1)).join('')
module.exports = crypt
