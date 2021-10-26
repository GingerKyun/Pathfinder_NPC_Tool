import npcData from '../model/npcModel.js'
import { ObjectId } from 'mongodb';

export const getNPC = async (req, res) => {
    const { name, age, location, race } = req.body;
    const filter = {}
    if(name !== ''){
        filter.name={
            $regex: '.*' + name + '.*'
        }
    }
    if(age !== ''){
        filter.age={
            $regex: '.*' + age + '.*'
        }
    }
    if(location !== ''){
        filter.location={
            $regex: '.*' + location + '.*'
        }
    }
    if(race !== ''){
        filter.race={
            $regex: '.*' + race + '.*'
        }
    }
    console.log(filter);
    try {
        const allNPC = await npcData.find(filter);
        console.log(filter);
        res.status(200).json(allNPC);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createNPC = async (req, res) => {
    const npc = req.body;
    const newNPC = new npcData(npc);

    try {
        await newNPC.save();
        res.status(201).json(newNPC);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteNPC = async (req, res) => {
    const id = req.params.id;

    try {
        await npcData.findByIdAndRemove(id).exec();
        res.send('Successfully Removed NPC');
    } catch (error) {
        console.log(error);
    }
}

export const updateNPC = async (req, res) => {
    var {id} = req.params
    var newNPC = req.body;
    const npc = await npcData.findById({_id: id})

    if(!npc) {
        console.log(`Unable to find grocery`, 404);
    }

    npc.name = newNPC.name
    npc.age = newNPC.age
    npc.location = newNPC.location
    npc.race = newNPC.race
    npc.backstory = newNPC.backstory
    npc.language = newNPC.language
    npc.skills = newNPC.skills
    npc.additionalDetails = newNPC.additionalDetails

    await npc.save();
    res.status(200).json(npc);
}