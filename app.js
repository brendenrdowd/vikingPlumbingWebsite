const express = require("express"),
    dotenv = require('dotenv').config(),
    app = express(),
    nodemailer = require('nodemailer'),
    port = 8000,
    bP = require("body-parser"),
    path = require("path"),
    session = require("express-session");

app.use(bP.urlencoded());
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: process.env.SESSION_PW }));

if (result.error) {
    throw result.error
}

//routing
app.get('/', function (req, res) {
    res.render('index');
});

app.post('/appointment', function (req, res) {
    req.session.error = [];
    // if(req.body.email != [A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}){
    //     req.session.error.push("Please enter a valid email");
    // }
    if(req.body.confirm != req.body.email){
        req.session.error.push("Emails do not match");
    }
    if(req.body.problem.length < 10){
        req.session.error.push("Please include more information about your problem");
    }
    if(req.body.first_name.length < 2 || req.body.last_name.length < 2){
        req.session.error.push("Please enter a name");
    }
    if(req.session.error.length > 0){
        res.redirect('#error')
    }else{
        
        let mailOpts, smtpTrans;
        smtpTrans = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ADMIN_UN,
                pass: process.env.ADMIN_PW
            }
        });
        mailOpts = {
            from: req.body.first_name + ' &lt;' + req.body.email + '&gt;',
            to: 'brenden.dowd@yahoo.com', //business email
            subject: 'New message from contact form at vikingplumbing.com', //domain name
            text: `${req.body.first_name} ${req.body.last_name} at (${req.body.email}) says: ${req.body.problem}`
        };
        smtpTrans.sendMail(mailOpts, function (error, response) {
            if (error) {
                req.session.error.push("Internal Service Error");
                console.log("error:",error);
                // res.redirect('/appointment#error');
                return
            }
            else {
                req.session.error = [];
                // res.redirect('/#success');
                return
            }
        });
    }
});

app.listen(port, function () {
    console.log("listening on ",port)
});