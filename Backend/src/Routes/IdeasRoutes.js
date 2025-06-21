import express from "express"
import asynchandler from "../Utils/Asynchandler.js"
import Ideas from "../Models/IdeasSchema.js"
import verify from "../Middlewares/Verify.js"

const router = express.Router()

// POST Ideas
router.post('/addidea', verify, asynchandler(async(req,res)=>{
    const {title,description,techstack,status,creatorName,email,createdAt} = req.body
    
    const idea = new Ideas({
        title,
        description,
        techstack,
        status,
        creatorName,
        email,
        createdAt
    })

    await idea.save()
    res.status(201).json({ message: "Idea created successfully!", idea })
}))


// Get all Ideas
router.get('/getideas', asynchandler(async(req,res)=>{
    const ideas = await Ideas.find()
    res.status(200).json(ideas)
}))


//Get Idea by id
router.get('/getidea/:creatorName', verify, asynchandler(async(req,res)=>{
    const {creatorName} = req.params

    const idea = await Ideas.find({creatorName})
    
    if(!idea){
        return res.status(404).json({ error: "Idea not found" })
    }
    else{
        res.status(200).json(idea);
    }
}))

// Update Idea
router.put('/update/:id', verify, asynchandler(async(req,res)=>{
    const {id} = req.params
    const updates = req.body
    const updateidea = await Ideas.findByIdAndUpdate(id,updates,{
        new : true
    })

    if (!updateidea) {
        return res.status(404).json({ error: "Idea not found" });
      }else{
        res.status(200).json({ message: "Idea updated successfully!", updateidea})
      }
}))

// Delete Idea
router.delete('/delete/:id',verify, asynchandler(async(req,res)=>{
    const {id} = req.params

    const deleteidea = await Ideas.findByIdAndDelete(id)

    if (!deleteidea) {
        return res.status(404).json({ error: "Idea not found" });
      }else{
        res.status(200).json({message:"Idea Deleted successfully!"})
      }
}))

export default router;