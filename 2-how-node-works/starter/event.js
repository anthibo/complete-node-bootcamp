const EventEmitter = require('events')
const http = require('http');
class Sales extends EventEmitter {
    constructor() {
        super();
    }
}
const myEmitter = new Sales();

myEmitter.on('newSale', () => {
    console.log('there was a new sale!')
}
)
myEmitter.on('newSale', () => {
    console.log('Customer name: jonas')
})
myEmitter.on('newSale', (stock, sold) => console.log(`there are now ${stock - sold} items left in stock.`))

myEmitter.emit("newSale", 9, 4);
///////////////////////////////////////
const server = http.createServer();
server.on('request', (req, res) => {
    console.log(req.url);
    res.end("req received ")
})
server.on('request', (req, res) => {

    console.log("another req 😚 ")
})
server.on('close', () => {
    console.log('Server closed');
})
server.listen(8000, () => {
    console.log('waiting for request');
})

