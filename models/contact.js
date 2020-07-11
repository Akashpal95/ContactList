const mongoose = require('mongoose');
//Schema for collection/table in the database is being designed
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

//Look into validation of fields in schema
//Capital for naming collection
//Collection is being created with the designed schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;