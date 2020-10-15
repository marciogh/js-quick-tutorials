let x = '--x value--'

{
    let x = 'asd'
    console.log('x variable inside the scope ' + x)
}

console.log('x variable outside the scope ' + x)