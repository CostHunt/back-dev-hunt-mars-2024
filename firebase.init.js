// firebaseInit.js

const admin = require('firebase-admin');
const serviceAccount = require('./costmedia-769c0-firebase-adminsdk-h9zx2-669f0a0877.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://costmedia-769c0.appspot.com',
});

// Export the initialized app
module.exports = admin;
