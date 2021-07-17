const fs = require('fs');

//Solution 1 
const server = require('http').createServer();
server.on('request', (req, res) => {
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data)
    // })
    // Solution 2: Streams
    // const readable = fs.createReadStream('test-file.txt')
    // readable.on('data', chunck => {
    //     res.write(chunck);
    // })
    // readable.on('end', () => {
    //     res.end()
    // }
    // )
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('file not found')
    // })
    ///////// Solution 3 
    const readable = fs.createReadStream('test-file.txt')
    readable.pipe(res)
    // readableSource.pipe(writeableDest)


})

server.listen(8000, () => {
    console.log('Listening...');
})