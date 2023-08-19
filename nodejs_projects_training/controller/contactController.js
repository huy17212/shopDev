const expressAsyncHandler = require("express-async-handler")

const Contact = require("../models/contactModel");

//@desc api GET all contacts
//@router api GET /api/contacts
//@access public
const getContacts = expressAsyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    if (!contacts) {
        res.status(404);
        throw new Error("Contacts not found");
    }
    res.status(200).json(contacts);
});

const getContact = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc api PUT contacts
//@router api PUT /api/contacts/:id
//@access public
const updateContact = expressAsyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User not have permission to update to other user contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new : true});
    if (!updatedContact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(updatedContact);
});

//@desc api DELETE all contacts
//@router api DELETE /api/contacts
//@access public
const deleteContact = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User not have permission to update to other user contacts");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

//@desc api CREATE all contacts
//@router api CREATE /api/contacts
//@access public
const createContact = expressAsyncHandler(async (req, res) => {
    console.log(JSON.stringify(req.body, null, 2));
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are mandatory !");
    }
    const contact = await Contact.create({
        name, 
        email,
        phone,
        user_id: req.user.id
    })

    res.status(201).json(contact);
});

module.exports = { getContacts, updateContact, deleteContact, createContact, getContact };