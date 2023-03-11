import prisma from "../lib/prisma.js";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import express from "express";

const authRouter = express.Router();


authRouter.post('/signup', async (req, res) => {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = await prisma.User.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        }
    })
    const accessToken = Jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
        expiresIn: 60 * 24
    });
    return res.header("Authorization", accessToken).send({ accessToken, newUser });
});

authRouter.post('/signin', async (req, res) => {
    const user = await prisma.User.findUnique({
        where: {
            email: req.body.email
        }
    })
    if (!user) {
        return res.send({ "message": 'user email not matched' })
    }
    const passwordCompress = bcrypt.compareSync(req.body.password, user.password)
    const accessToken = Jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
        expiresIn: 60 * 24
    });

    if (!passwordCompress) {
        return res.send({ "message": "password don't matched" })
    } else {
        return res.header("Authorization", accessToken).send({ user, accessToken })
    }
});

authRouter.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            profile: true,
            posts: true
        }
    });
    return res.send({ users });

})

export default authRouter;


