const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp();

exports.advertiseRequest = functions.database.ref('/requests/{category}/{pushId}')
  .onCreate((snapshot,conext)=>{
    console.log('parameter', context.params)
  })
