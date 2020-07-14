function doSomething(task) {
    return new Promise((resolve, reject) => {
            const randDelay = Math.random() * 10000
            console.log(`${task} started, it will take ${randDelay}!`)
            if (task === 't1') {
                reject(`${task} always fail`)
                return;
            }
            setTimeout(console.log, randDelay, `${task} done from promise`)
            const data = {
                'taskName': task,
                'status': 'done',
            }
            setTimeout(resolve, randDelay, data)
        }
    )
}

async function main() {
    const t1 = doSomething('t1')
    const t2 = doSomething('t2')
    Promise.all([t1, t2]).then(r =>
        console.log(`SUCCESS: ${r}`)
    ).catch(e =>
        console.log(`ERROR: ${e}`)
    )
}

main()