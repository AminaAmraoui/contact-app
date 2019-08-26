const express = require('express')
const {MongoClient, ObjectID} =require('mongodb')
const bodyParser = require('body-parser')
const assert = require('assert')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const mongo_url = 'mongodb://localhost:27017'
const dataBase = 'DBContact'

MongoClient.connect(mongo_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    },(err, client)=>{
    assert.equal(err,null,'DB connection failed')
    const db = client.db(dataBase)

    //add a contact
    app.post('/new_contact',(req,res)=>{
        let newContact = req.body
        db.collection('contacts').insertOne(newContact, (err,data)=>{
            if(err) 
                res.send('Cannot add new contact')
            else
                res.send('Contact added')    
        })
    })

    //get contacts
    app.get('/contacts',(req,res)=>{
        db.collection('contacts').find().toArray((err,data)=>{
            if(err) 
                res.send('Cannot fetch contacts')
            else
                res.send(data)
        })
    })

    app.get('/contacts/:id', (req,res)=>{
        db.collection('contacts').findOne({_id:ObjectID(req.params.id)}, (err,data)=>{
            if(err)
                res.send('Cannot find contact')
            else
            res.send(data)
        })
    })

    //update a contact
    app.put('/modify_contact/:id',(req,res)=>{
        db.collection('contacts').findOneAndUpdate({_id:ObjectID(req.params.id)},{$set:{...req.body}}, (err,data)=>{
            if(err)
                {res.send('Cannot update contact')
                console.log(err)}
            else
                res.send('Contact updated')    
        })
    })

    //delete a contact
    app.delete('/delete_contact/:id',(req,res)=>{
        db.collection('contacts').findOneAndDelete({_id:ObjectID(req.params.id)}, (err,data)=>{
            if(err)
                res.send('Cannot delete contact')
            else
                res.send('contact deleted')    
        })
    })

})

app.listen(8000, (err) => {
    if(err){
        console.log('error while running server')
    } else {
        console.log('Server is running on port 8000')
    }
})