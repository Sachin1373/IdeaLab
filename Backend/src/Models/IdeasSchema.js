import mongoose from "mongoose";

const IdeasSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    techstack: [String], 
    status: {
        type: String,
        enum: ['concept', 'brainstorming'], 
        default: 'concept'
    },
    creatorName: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Ideas = mongoose.model("Ideas",IdeasSchema)

export default Ideas