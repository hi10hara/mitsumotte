const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp();

exports.advertiseRequest = functions.database.ref('/requests/{category}/{pushId}')
  .onCreate((snapshot,context)=>{
    console.log('parameter', context.params)
  })
