import express  from "express";
import { createProfile, getProfile } from "../controller/profile.js";

const profileRouter = express.Router();

profileRouter.post('/profile', async(req,res)=>{
    const payload = req.body;
    console.log(payload);
    const newProfile = await createProfile(payload);
    return res.send({"profile":newProfile})
});
profileRouter.get('/profile', async(req,res)=>{
    const profiles = await getProfile()
    return res.json({profiles})
});

export default profileRouter;