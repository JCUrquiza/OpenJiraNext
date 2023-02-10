import mongoose from 'mongoose';

/*
* 0 = disconnected
* 1 = connected
* 2 = conecting
* 3 = disconnecting
*/


const mongooConnection = {
    isConected: 0
}

export const connect = async() => {

    if ( mongooConnection.isConected ) {
        console.log('Ya estábamos conectados');
        return;
    }

    if ( mongoose.connections.length > 0 ) {
        mongooConnection.isConected = mongoose.connections[0].readyState;

        if ( mongooConnection.isConected === 1 ) {
            console.log('Usando conexión anterior');
            return;
        }

        await mongoose.disconnect();

    }

    await mongoose.connect(process.env.MONGO_URL || '');

    mongooConnection.isConected = 1;

    console.log('Conectado a mongoDB: ', process.env.MONGO_URL);
    
}

export const disconnect = async() => {

    if ( mongooConnection.isConected === 0 ) return;

    await mongoose.disconnect();
    console.log('Desconectando de MongoDB');

}


