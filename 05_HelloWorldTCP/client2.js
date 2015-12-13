var net = require('net');

var client = new net.Socket();

client.connect(23123, "127.0.0.1", function() {
    console.log('CONNECTED');
    client.write('hhhi');
});

client.on('data', function (data) {
    data = data.toString();
    if (data === 'BROADCAST') {
        client.write('ACK BROADCAST 40');
    }
    else if (data === 'TESTRADIO')
        client.write('ACK RADIO ');
    else if (data === 'GETVRMS')
        client.write('ACK VRMS 50 200');
    else if (data === 'GETIRMS')
        client.write('ACK IRMS 300');
    else if (data === 'GETACEN')
        client.write('ACK ACEN 200');
    console.log("Received " + data);
});

// Add a 'close' event handler for the client socket
client.on('close', function () {
    console.log('Connection closed');
});
