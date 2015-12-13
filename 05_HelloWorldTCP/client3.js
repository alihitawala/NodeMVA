var net = require('net');

var client = new net.Socket();

client.connect(23123, "localhost", function() {
    console.log('CONNECTED');
    client.write('hello');
});

client.on('data', function (data) {
    data = data.toString().trim();
    if (data === 'BROADCAST') {
        client.write('ACK BROADCAST 2');
        setTimeout(function () {
            client.write('ACK BROADCAST 3');
        }, 200);
    }
    else if (data === 'GETVRMS 2') {
        client.write('ACK VRMS 2 20');
        //client.write('ACK VRMS 3 20');
    }
    else if (data === 'GETVRMS 3') {
        setTimeout(function () {
            client.write('ACK VRMS 3 20');
        }, 200);
    }
    else if (data === 'GETIRMS 2') {
        client.write('ACK IRMS 2 10');
        setTimeout(function () {
            client.write('ACK IRMS 3 20');
        }, 200);
    }
    else if (data === 'GETACEN 2') {
        client.write('ACK ACEN 2 30');
        setTimeout(function () {
            client.write('ACK ACEN 3 20');
        }, 200);
    }
    console.log("Received " + data);
});

// Add a 'close' event handler for the client socket
client.on('close', function () {
    console.log('Connection closed');
});
