var mockDB = require('./mockDB');

var result = function result(phNo, timeStamp) {
    var dt = new Date();
    var resp = mockDB[phNo]
    resp.timestamp = `${dt.getFullYear().toString().padStart(4, '0')}/${(dt.getMonth()+1).toString().padStart(2, '0')}/${ dt.getDate().toString().padStart(2, '0')} ${dt.getHours().toString().padStart(2, '0')}:${ dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`

    return resp
}

exports.handler = function(event, context, callback) {
    
var phNo = "+11234567890"
if(mockDB[event.Details.ContactData.CustomerEndpoint.Address] != undefined) { phNo = event.Details.ContactData.CustomerEndpoint.Address }

    callback(null, result(phNo, 'demo'));
}