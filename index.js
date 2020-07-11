const express = require('express');
const path = require('path');
const port = 8000;

//Database connection through mongoose
const db = require('./config/mongoose');
//Import the collection
const Contact = require('./models/contact');


const app = express();


//Setting up view engine(where the html/ejs files are rendered..sort of)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname ,'views'));
//middleware to process request 
app.use(express.urlencoded());
app.use(express.static('assets'));


//middleware1
app.use(function(req, res, next){
    req.myKey = "Something";
    console.log('middleware1 called');
    next();
});

//middelware2
app.use(function(req, res, next){
    // console.log(req);
    next();
});

var ContactList = [
    {
        name:'Arpan',
        phone:'9876532100'
    },
    {
        name:'Tony Stark',
        phone:'1000000000'
    },
    {
        name:'Akash',
        phone:'9884203632'
    }
];


app.get('/', function(req, res){
    // res.send('<a href = "change">Cool, it is running!!</a>');
    
    //Fetching from local variable
    //     return res.render('home', {
    //     title : 'Contact List',
    //     contact_list : ContactList
    // });

    //Fetching from database
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home', {
                title : 'Contact List',
                contact_list : contacts
            });
    });
});
app.get('/practice', function(req, res){
    // console.log(res);
    return res.render('practice', {
        title:'Playground'
    });
});

app.post('/create-contact', function(req, res){
    // console.log(req.body);
    
    //Pushing into Local variable
    // ContactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // console.log(ContactList);



    
    //Pushing into Database
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('***', newContact);
        return res.redirect('back');
       
    });
    
    // return res.redirect('back');
});
//query params
app.get('/delete-contact', function(req, res){
    console.log(req.query);
    //Local variable-Deleting through phone number
    // let phone = req.query.phone;
    // let ContactIndex = ContactList.findIndex(contact => contact.phone == phone);
    // if(ContactIndex != -1){
    //     ContactList.splice(ContactIndex, 1);
    // }

    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error is deleting an object from DB');
            return;
        }
        return res.redirect('back');
    });
    // return res.redirect('back');
});
//String Params
// app.get('/delete-contact/:phone', function(req, res){
//     console.log(req.params);
//     let phone = req.params.phone;
//     let ContactIndex = ContactList.findIndex(contact => contact.phone == phone);
//     if(ContactIndex != -1){
//         ContactList.splice(ContactIndex, 1);
//     }
//     return res.redirect('back');
// });

app.listen(port, function(err){
    if(err){
        console.log('Error in running server', err);
    }
    console.log('Yep!! My Express server is running!');
});