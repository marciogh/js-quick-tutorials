var f = arg1 => { console.log(`Fat arrow function ${arg1}`)}
var f2 = function(arg2) { console.log(`Normal arrow function ${arg2}`)}

f();
f2();

console.log('-----------------')

var data = [
    'apple',
    'orange',
    'pear',
]

console.log('-----------------')

data.map(f2);

console.log('-----------------')

var r = data.filter( function(item) { return item.indexOf('r') > -1 } )
console.log(r);

console.log('-----------------')

var r2 = data.filter ( item => item.indexOf('r') > -1 )
console.log(r2);

console.log('-----------------')

data.map(i => console.log('===>' + i))