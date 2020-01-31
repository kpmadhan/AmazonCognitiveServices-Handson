

var getPhNo = function (phNo) { return  `${phNo.substring(phNo.length-6, phNo.length-8)}.${phNo.substring(phNo.length-4, phNo.length-6)}.${phNo.substring(phNo.length-2, phNo.length-4)}.${phNo.substring(phNo.length, phNo.length-2)}`; }

module.exports = {'getUniqueIPfromPh':getPhNo}

