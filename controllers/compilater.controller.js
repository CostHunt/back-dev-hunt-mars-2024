
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function runCode (req, res){
    try{
        const {code} = req.body;
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
            code: code,
            language: 'c',
            input: '7'
        });
        var config = {
            method: 'post',
            url: 'https://codex-api.fly.dev',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };
        
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.json({res:response.data})
          })
          .catch(function (error) {
            console.log(error);
            res.json({error})
          });
    }catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        res.json({error})
      }
}

module.exports = { runCode};