exports.BroadcastingWrapper = (pushTypes, message) => {
    pushTypes.forEach(type => {
        switch (type) {
            case 'email':
                sendLogToEmail(message);
                break;
            case 'db':
                sendLogToDB(message);
                break;
            case 'proxy':
                sendLogToProxy(message);
                break;
            case 'nato':
                sendLogToEmail(message);
                sendLogToDB(message);
                sendLogToSMS(message);
                break;
        }
    });
}

function sendLogToEmail(message) {

}

function sendLogToDB(message) {

}

function sendLogToProxy(message) {

}