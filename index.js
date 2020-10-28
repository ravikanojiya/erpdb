const express = require('express');
const jwt=require('jsonwebtoken');
const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");

const bodyParser = require('body-parser')
const db = require('./queries')
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express()
const port = 4000;
NODE_TLS_REJECT_UNAUTHORIZED = '0';
NODE_EXTRA_CA_CERTS ='./Angular-project/erpDB/cert.pem';
const DIR = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

  }
});
let upload = multer({ storage: storage });
app.get('/uploads/:imagename', function (req, res) {
  res.sendFile(__dirname + '/uploads/' + req.params.imagename);
});
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.post('/addpos', db.addpos);
app.get('/getpos', db.getpos);
app.get('/getposbyid/:id', db.getposbyid);
app.put('/updatepos', db.updatepos);
app.delete('/deletepos/:id', db.deletepos);

app.post('/adddept', db.adddept);
app.get('/getdept', db.getdept);
app.get('/getdeptbyid/:id', db.getdeptbyid);
app.put('/updatedept', db.updatedept);
app.delete('/deletedept/:id', db.deletedept);

app.post('/addemp', db.addemp);
app.get('/getemp', db.getemp);
app.get('/getempbyid/:id', db.getempbyid);
app.post('/upload', upload.single('image'), db.upload);
app.put('/updateemp', db.updateemp);
app.delete('/deleteemp/:id', db.deleteemp);

app.post('/addstudent', db.addstudent);
app.post('/uploadstudent', upload.single('image'), db.upload);
app.get('/getstudent', db.getstudent);
app.get('/getstudentbyid/:id', db.getstudentbyid);
app.put('/updatestudent', db.updatestudent);
app.delete('/deletestudent/:id', db.deletestudent);

app.post('/adduser', db.adduser);
app.get('/getalluser', db.getalluser);
app.get('/getuserbyid/:id', db.getuserbyid);
app.put('/updateuser', db.updateuser);
app.delete('/deleteuser/:id', db.deleteuser);
app.get('/getempdetail', db.getempdetail);

app.post('/getlogin', db.getlogin);
app.post('/addcourse', db.addcourse);
app.get('/getcourses', db.getcourses);
app.get('/getcoursebyid/:id', db.getcoursebyid);
app.put('/updatecourse', db.updatecourse);
app.delete('/deletecourse/:id', db.deletecourse);

app.post('/addbatch', db.addbatch);
app.get('/getbatches', db.getbatches);
app.get('/getbatchbyid/:id', db.getbatchbyid);
app.put('/updatebatch', db.updatebatch);
app.delete('/deletebatch/:id', db.deletebatch);
app.get('/getbatchdetail', db.getbatchdetail);

app.post('/mbatchadd', db.mbatchadd);
app.get('/getmbatch', db.getmbatch);
app.get('/getmbatchbyid/:id', db.getmbatchbyid);
app.put('/updatembatch', db.updatembatch);
app.delete('/deletembatch/:id', db.deletembatch);
app.delete('/deletems/:id', db.deletems);
app.get('/getfacstudent/:id', db.getfacstudent);
app.get('/getbatchstudent/:id', db.getbatchstudent);

app.get('/getotobatch', db.getotobatch);
app.get('/getclubbatch', db.getclubbatch);
app.get('/getgenbatch', db.getgenbatch);
app.get('/getcstudent', db.getcstudent);
app.get('/getbstudent', db.getbstudent);
app.get('/getostudent', db.getostudent);
app.get('/getfacbatchbyid/:id', db.getfacbatchbyid);
app.get('/getemailstudent/:id',db.getemailstudent);

app.post('/addsession', db.addsession);
app.get('/getsessionsbyid/:id', db.getsessionsbyid);
app.get('/countclub', db.countclub);
app.get('/countgen', db.countgen);
app.get('/countoto', db.countoto);
app.get('/countallstd', db.countallstd);
app.get('/countallemp', db.countallemp);
app.get('/clubcounttody', db.clubcounttody);
app.get('/contfacbatch/:id', db.contfacbatch);
app.get('/getbatchstudentfac/:id', db.getbatchstudentfac);
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});
// NODE_TLS_REJECT_UNAUTHORIZED = '0';
// NODE_EXTRA_CA_CERTS ='./Angular-project/erpDB/cert.pem';
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.post('/sendFormData', (req, res) => {
  console.log(req.body, 'data of form');
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
      user: 'ravikanojiya45@gmail.com', // must be Gmail
      pass: 'eoki ymec xdwz pnqd'
    }
  });
  var mailOptions = {
    from: 'ravikanojiya45@gmail.com',
    to: 'req.body.email', // must be Gmail
    cc: `${req.body.fn}<${req.body.email}>`,
    subject: 'Faculty Added You in Batch',
    html: `
              <table style="width: 100%; border: none">
                <thead>
                  <tr style="background-color: grey; color: #fff;">
                    <th style="padding: 10px 0">Name</th>
                    <th style="padding: 10px 0">Faculty-Name</th>
                    <th style="padding: 10px 0">E-mail</th>
                    <th style="padding: 10px 0">studenttype</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style="text-align: center">${req.body.fn}</th>
                    <th style="text-align: center;text-transform: uppercase;">${req.body.username}</th>
                    <td style="text-align: center">${req.body.email}</td>
                    <td style="text-align: center">${req.body.studenttype}</td>
                  </tr>
                  <tr style="background-color: red;text-align: center;font-size:20px;border:1px solid black;">
                    <td colspan="3" align="center"><a href="${req.body.grplink}" style="color:white">Click here to Join Group</a><td>
                  </tr>
                </tbody>
              </table>
            `
            };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        message: 'successfuly sent!'
      })
    }
  });

});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})