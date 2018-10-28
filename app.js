const express = require("express"),
    dotenv = require('dotenv').config(),
    app = express(),
    nodemailer = require('nodemailer'),
    port = process.env.PORT || 8000,
    bodyParser = require("body-parser"),
    exphbs = require('express-handlebars'),
    path = require("path"),
    session = require("express-session");


app.use(session({ secret: process.env.SESSION_PW }));

app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(`${__dirname}/public`))

//routing
app.get('/', function (req, res) {
    error =[],
    success = ""
    !req.session.error ? error = [] : error = req.session.error;
    !req.session.success ? success = '' : success = req.session.success;
    res.render('index',{error,success});
});

app.post('/appointment', function (req, res) {
    req.session.error = [];
    req.session.success = '';
    console.log('[FORM]:',req.body)
    // if(req.body.email != [A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}){
    //     req.session.error.push("Please enter a valid email");
    // }
    if(req.body.confirm != req.body.email){
        req.session.error.push("Emails do not match!");
    }
    if(req.body.email.length < 10){
        req.session.error.push("Please enter a valid email!");
    }
    if(req.body.problem.length < 10){
        req.session.error.push("Please include more information about your problem!");
    }
    if(req.body.fname.length < 2 || req.body.lname.length < 2){
        req.session.error.push("Please enter a name!");
    }
    if(req.session.error.length > 0){
        res.redirect('/#signup')
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
            from: req.body.fname + ' &lt;' + req.body.email + '&gt;',
            to: process.env.COMPANY_EMAIL, //business email
            subject: `New message from ${req.body.email} using contact form at vikingplumbing.com`, //domain name
            text: `${req.body.fname} ${req.body.lname} at (${req.body.email}) says: ${req.body.problem}`
        };
        smtpTrans.sendMail(mailOpts, function (error, response) {
            if (error) {
                req.session.error.push("Internal Service Error");
                console.log("error:",error);
                res.redirect('/#signup');
            }
            else {
                req.session.success = 'We\'ll get back to you within 3-10 business days.';
                res.redirect('/#signup');
            }
        });
    }
});

app.listen(port, function () {
    console.log("listening on ",port)
});