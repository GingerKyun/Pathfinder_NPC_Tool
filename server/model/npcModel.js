import mongoose from 'mongoose';

const npcSchema = mongoose.Schema({
    name: String,
    age: String,
    location: String, 
    race: String, 
    backstory: String,
    languages: String, 
    skills: String,
    additionalDetails: String
})

const npc = mongoose.model('NPC', npcSchema);

export default npc;