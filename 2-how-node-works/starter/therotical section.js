const fs = require('fs')
const crypto = require('crypto')
const start = Date.now()
process.env.UV_THREADPOOL_SIZE = 1;
setTimeout(() => console.log('time 1 finished'))
setImmediate(() => console.log('Immediate 1 finished'))
setImmediate(() => console.log('Immediate 1 finished'))
process.nextTick(() => console.log('Testing some shit'))
fs.readFile('test-file.txt', () => {
    console.log('I/O finished');
    console.log('-----------------')
    setTimeout(() => console.log('time 2 finished'))
    setTimeout(() => console.log('time 3 finished'))
    setImmediate(() => console.log('Immediate 2 finished'))
    process.nextTick(() => console.log('process.nextTick'))
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    })
})
console.log('Hello from top-lvl code');