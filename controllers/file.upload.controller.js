const admin = require('firebase-admin');
const serviceAccount = require('../costmedia-769c0-firebase-adminsdk-h9zx2-669f0a0877.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://costmedia-769c0.appspot.com',
});

function upload(req, res) 
{
  try {
    const bucket = admin.storage().bucket();
    req.files.map((file)=>{
      const imageBuffer = file.buffer;
      const imageName = file.originalname;
      const Ufile = bucket.file(imageName);
      Ufile.save(imageBuffer);
    })
    res.send({
      status: "200",
      message: "Files uploaded succesfully"
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image.');
  }
};

async function get_url(req, res){
    try{
      const storage = admin.storage().bucket();
      const file = storage.file(req.query.filename)
      const url = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2025'
      })
      res.send({
        status: 200,
        url: url[0]
      })
    } catch(e){
      res.status(500).send("error")
    }
}

function download(req, res){
  try{
  
    const storage = admin.storage().bucket();
      const file = storage.file(req.query.filename)
      file.download({
        destination: req.query.filename
      }).then(()=>{
        res.send({
          status: 200,
          message: "Downloaded succesfully"
        })
      })

  } catch{
    res.status(500).send("error")
  }
}

module.exports = { upload, get_url, download };