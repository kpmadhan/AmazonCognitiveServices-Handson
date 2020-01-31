var mockDB = require('./mockDB');
var util = require('./util');
var AWS = require('aws-sdk');

var frauddetector = new AWS.FraudDetector({region:'us-east-1'});



var getnamefromphno = function(phNo) { return mockDB[phNo].fullname }
var getUserAvgDurationfromphno = function(phNo) { return mockDB[phNo].avgDuration }
var getEmailfromphno = function(phNo) { return mockDB[phNo].email }
var getUserClassfromphno = function(phNo) { return mockDB[phNo].class }
var get_ip_ = function(phNo) { return util.getUniqueIPfromPh(phNo); }
var dt = new Date();
 
exports.handler = function(event, context, callback) {
console.log(JSON.stringify(event.Details))
var phNo = "+11234567890"; //defaulting any call to this number for testing purpose.
if(mockDB[event.Details.ContactData.CustomerEndpoint.Address] != undefined) { phNo = event.Details.ContactData.CustomerEndpoint.Address }


    var inputMap = {
        call_duration: String(getUserAvgDurationfromphno(phNo)),
        customer_class: getUserClassfromphno(phNo),
        email_address: getEmailfromphno(phNo),
        ip_address: get_ip_(phNo),
        event_id: event.Details.ContactData.ContactId,
        phone_number: phNo,
        contact_type: event.Details.ContactData.Channel,
        event_timestamp: `${dt.getFullYear().toString().padStart(4, '0')}/${(dt.getMonth()+1).toString().padStart(2, '0')}/${ dt.getDate().toString().padStart(2, '0')} ${dt.getHours().toString().padStart(2, '0')}:${ dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`
/*event.Details.Parameters.timestamp*/,
        billing_name: getnamefromphno(phNo)
    }

var params = {
  detectorId: 'your_detector_id', /* required */
  eventId: inputMap.event_id, /* required */
  detectorVersionId: 'detector_version',
  eventAttributes: inputMap,
};
frauddetector.getPrediction(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else   
  {
  console.log(data);   
  var resp = {}
  resp.fullname = inputMap.billing_name;
  resp.prediction = data.outcomes[0]
   callback(null, resp);
  }
});




   
}
