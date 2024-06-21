import express from 'express' //importing express framework into the express var
import db from '../db/conn.mjs'//importing the conn.mjs from the db folder
import { ObjectId } from 'mongodb' //importing the object 'ObjectId' from the mongodb framework

const router = express.Router() //setting up router var to be exported to main index.mjs file

//create a post route for grades page that's just all grades.
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


//create id for grades route
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


function checkErr(message, status) { //helper function to check to see if any data is taken.
    const error = new Error(message)
    error.status = status;
    return error
}

export default router;