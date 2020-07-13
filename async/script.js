randDelay = (task) => 
    new Promise(
        (resolve, reject) => {
            console.log(`${task} started!`)
            if (task === 'p3') {
                setTimeout(console.log, 100, `${task} rejected`)
                setTimeout(reject, 100, `${task} rejected`)
                return
            }
            let rand = Math.random() * 10000;
            setTimeout(console.log, rand, `${task} done!`)
            setTimeout(resolve, rand, `${task} done!`)
        }
    )

async function main() {

    promise = randDelay('p0')
    console.log(promise)
    await promise
    console.log(promise)
    
    promises = []

    promises.push(randDelay('p1'))
    promises.push(randDelay('p2'))
    promises.push(randDelay('p3'))
    promises.push(randDelay('p4'))

    console.log(promises)

    promises = promises.map(p => p.catch(() => undefined))
    
    Promise.all(promises)
    .then(pAll => {
        console.log('All done!')
        console.log(pAll)
    }).catch(e => console.log(`Catch ${e}`))

}

main()