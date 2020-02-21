# Hosting Instructions

There will be multiple steps to hosting this on the web, I'll walk you through all of it. 

We have multiple things to configure. We'll need Heroku (for hosting it on the internet), Mailgun (for handling emails), and godaddy (or some other domain name purchasing site).

There are two ways to do this, one, I walk you through everything and you can do it all yourself with what I've provided, or two, you create a couple accounts and put in your billing information, and I transfer ownership of the current heroku project, hosted at https://tranquil-waters-99328.herokuapp.com/, to you and skip alot of the details. 

## Heroku

Let's start with Heroku, this is the foundation for everything, you'll need to create an account at [Heroku.com](https://www.signup.heroku.com). 
Then you'll need to look at the [pricing plans](https://www.heroku.com/pricing), you might be ok with the hobby package for $7 a month but I would recommend the standard professional package for 25+ a month (depending on usage)because of the risk of running a slow website. 

You won't need to worry about the postgres, redis or apache pricing options as we're not using any of those. 

Once you've added your plan you can contact me and I can push the code to your heroku, or you can install the herokuCLI and do it yourself by following the instrcutions, or I can just transfer ownership. 

Assuming I'm not transfering ownership, once you add the project to your dashboard and the code is deployed, youll want to add the 'Mailgun' addon, which can be found by going to the resource tab of your project and looking for the installed-add ons panel, and then click on 'configure Add-ons'.

## Mailgun
Next, we need to create a [Mailgun](https://www.mailgun.com/plans-and-pricing/) account. Mailgun is going to handle our email bridge. When the client types an email into the form on our webpage, your mailgun account will deliver that to your business email. I recommend using or creating a google email as thats what the code is configured for and their encryption is top notch. We'll need to hold on to this account. This 'should' be a free account, but you can look at the pricing options and weigh your needs. 

## .ENV file
Which brings us to the the env file. You won't need to create an .env file yourself, as you can enter this straight into heroku, but this is a general overview of what will be going on. This is going to be your central store for all your data you don't want to post on the internet. There will be a list of KEYS, you will need to provide your values, as follows:

| Key        | Value           |
| ------------- |:-------------:|
| ADMIN_UN      | this is username of the mailgun account |
| ADMIN_PW      | this is the password the mailgun account |
| COMPANY_EMAIL | This is the email in which you want to recive new appointment requests     |

the last two key (SESSION_PW, and recaptcha_API) I will email you as they are specific codes.

Since we are being hosted you don't need a local .env file, instead, you can plug these key-value pairs into heroku directly. Under the setting tab there will be a panel call "Config Vars" and a button to "Reveal Config Vars". Vars are your variables, your secret keys. I will be emailing you a picture and breakdown of this part if you elect not to have heroku ownership transferred, however you will still have to plug in your Mailgun email and password. There will be a list of MAIL_GUN keys, they may autofil from your add-on, or you'll have to find them. I can help you with this over the phone. 

## Domain Name
Next, if you haven't already, you'll need to purchase a domain name, you can do this through a variety of sites like [Domain.com](https://www.domain.com), [bluehost.com](https://www.bluehost.com), [HostGator.com](https://www.hostgator.com), or [godaddy.com](https://www.godaddy.com). Once you have a domain registered you should be able to attach the heroku URL (something like: "https://tranquil-waters-99328.herokuapp.com/") to your domain name.

Also, back on heroku, you'll want to update your domains under the setting tab of your project. 

Quick note, the captcha is waiting on a domain to be registered to, I'll get into that next. 

## reCaptcha
Finally, you need to go to Google's [reCaptcha](https://www.google.com/recaptcha/intro/v3.html#) website and register. Once you've registered you need to assign this domain to the reCaptcha. This is very specific. The code is already embedded so you won't need to worry about that, but you wil get an "API KEY" and you'll need to pass that to the CONFIG VARS on your heroku. 



