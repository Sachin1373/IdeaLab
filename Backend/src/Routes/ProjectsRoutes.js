import express from "express"
import asynchandler from "../Utils/Asynchandler.js"
import Project from "../Models/ProjectSchema.js"

const router = express.Router()

// add project

router.post('/addproject', asynchandler(async(req,res)=>{
    const {title,description,techstack,status,maxTeamSize,currentTeamSize,creatorName,email,createdAt} = req.body
    
    const project = new Project({
        title,
        description,
        techstack,
        status,
        maxTeamSize,
        currentTeamSize,
        creatorName,
        email,
        createdAt
    })

    await project.save()
    res.status(201).json({ message: "Project created successfully!", project })
}))

// Get all projects

router.get('/getprojects', asynchandler(async(req,res)=>{
    const projects = await Project.find()
    res.status(200).json(projects)
}))

//Get project by id

router.get('/getproject/:creatorName',asynchandler(async(req,res)=>{
    const {creatorName} = req.params

    const project = await Project.find({creatorName})
    
    if(!project){
        return res.status(404).json({ error: "Project not found" })
    }
    else{
        res.status(200).json(project);
    }
}))

//Update Project 

router.put('/update/:id',asynchandler(async(req,res)=>{
    const {id} = req.params
    const updates = req.body
    const updateproject = await Project.findByIdAndUpdate(id,updates,{
        new : true
    })

    if (!updateproject) {
        return res.status(404).json({ error: "Project not found" });
      }else{
        res.status(200).json({ message: "Project updated successfully!", updateproject})
      }
}))

// Delete project 

router.delete('/delete/:id',asynchandler(async(req,res)=>{
    const {id} = req.params

    const deletedproject = await Project.findByIdAndDelete(id)

    if (!deletedproject) {
        return res.status(404).json({ error: "Project not found" });
      }else{
        res.status(200).json({message:"Project Deleted successfully!"})
      }
}))

export default router;