import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    description: {
        type : String,
        require : true
    },
    techstack : [String],
    status: {
        type : String,
        enum: ["open", "closed"],
        default: "open"
    },
    maxTeamSize: {
        type: Number,
        required: true
    },
    currentTeamSize:{
        type: Number,
        default: 0 
    },
    creatorName: {
        type: String,
        required: true 
      },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Project = mongoose.model("Project",ProjectSchema)

export default Project