import { createPost, deleteOne, getAllPost, updateOne } from "../controller/post.js";
import express from "express";

const postRouter = express.Router();

postRouter.post('/posts', async (req, res) => {
    const payload = req.body;
    const newPost = await createPost(payload);
    return res.json({ "post":newPost })
});
postRouter.get('/posts', async (req, res) => {
    const getPost = await getAllPost()
    return res.json({ "posts":getPost })
});
postRouter.put('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    const updatedPost = await updateOne(id, payload);
    return res.send({ "post":updatedPost });

});
postRouter.delete('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const newPost = await deleteOne(id);
    return res.send({ "message": "Delete success"})
});


export default postRouter;