import express from 'express' //importing express framework into the express var
import db from '../db/conn.mjs'//importing the conn.mjs from the db folder
import { ObjectId } from 'mongodb' //importing the object 'ObjectId' from the mongodb framework

const router = express.Router() //setting up router var to be exported to main index.mjs file

router.get('/', async (req, res) => {

    try{
        let collection = await db.collection("destiny_oc_guardians")
        let results = await collection.find({})
        .limit(50)
        .toArray();
      res.send(results).status(200);    } catch(err) {
        res.status(404).json({error: "Not found"})
    }
})

//create a post route for guardians page to submit new guardian ocs.
router.post('/', async (req, res) => {
    try{
        let collection = await db.collection("destiny_oc_guardians")
        let newDocument = req.body;

        let result = await collection.insertOne(newDocument)
        res.status(201).json(result)

    } catch(err) {
        res.status(400).send(err)
    }
})


//create id for guardians route by ID 
router.get('/:id', async (req, res) => {
    try{//setting up try catch for when the data cannot be read.
        let collection = await db.collection("destiny_oc_guardians") //get data from mongo db collection
        let query = {_id: new ObjectId(req.params.id)} //get id from the params
        let result = await collection.findOne(query) //output data into array form

        if(!result){ //check to see if result is not true. this will prove the number entered is out of scope.
            throw checkErr("Not Found", 404); //throw error if not found. checkErr is a helper function defined below.
        } else{
            res.status(200).json(result) //else return the json result of the var result
        }

    } catch (err) {
        res.status(404).send(err.message) //send error message if things go wrong.
    }
})

//Update route for the guardians database
router.patch('/:id', async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
            const updates = req.body;
            let collection = await db.collection("destiny_oc_guardians")
            let results = await collection.updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
            console.log(results)
            if(!results){ //check to see if result is not true. this will prove the number entered is out of scope.
                throw checkErr("Not Found", 500); //throw error if not found. checkErr is a helper function defined below.
            } else{
                res.status(200).json(results) //else return the json result of the var result
            }

        } else {
            res.status(500).json({error: 'Not a valid ID'})
        }


    } catch(err) {
        res.status(400).send(err)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
            await db.collection("destiny_oc_guardians")
            .deleteOne({_id: new ObjectId(req.params.id)})
            .then(result => {
                res.status(200).json(result)
            })
        } else {
            res.status(500).json({error: 'Not a valid ID'})
        }


    } catch(err) {
        res.status(500).send(err)
    }
})


function checkErr(message, status) { //helper function to check to see if any data is taken.
    const error = new Error(message)
    error.status = status;
    return error
}

export default router;