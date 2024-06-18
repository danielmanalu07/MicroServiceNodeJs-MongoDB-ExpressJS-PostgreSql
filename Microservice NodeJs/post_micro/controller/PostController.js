import prisma from "../config/db.config.js";
import axios from "axios";

class PostController {
    static async index(req, res) {
        try {
            const posts = await prisma.post.findMany({});

            let userIds = []
            posts.forEach((item) => {
                userIds.push(item.user_id);
            })



            // method 1
            // let postWithUsers = await Promise.all(
            //     posts.map(async (post) => {
            //         const res = await axios.get(`${process.env.AUTH_MICRO_URL}/api/getUser/${post.user_id}`);
            //         console.log('the user res ', res.data);
            //         return {
            //             ...post,
            //             ...res.data,
            //         }
            //     }),
            // );

            // method 2

            const response = await axios.post(`${process.env.AUTH_MICRO_URL}/api/getUsers`, userIds,);

            // const users = response.data.users;
            const users = {}
            response.data.users.forEach((item) => {
                users[item.id] = item;
            });

            // let postWithUsers = await Promise.all(
            //     posts.map((post) => {
            //         const user = users.find((item) => item.id == post.user_id);

            //         return {
            //             ...post,
            //             user,
            //         }
            //     })
            // )

            // method 3
            let postWithUsers = await Promise.all(
                posts.map((post) => {
                    const user = users[post.user_id];

                    return {
                        ...post,
                        user,
                    }
                }),
            );

            return res.json({ postWithUsers });
        } catch (error) {
            console.log("the post fetch error is ", error);
            return res.status(500).json({ message: 'Something went wrong.' });
        }
    }


    static async store(req, res) {

        try {
            const authUser = req.user
            const { title, content } = req.body
            const post = await prisma.post.create({
                data: {
                    user_id: authUser.id,
                    title,
                    content,
                },
            });

            return res.json({ message: "Post Created Successfully", post });
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong.' });
        }
    }
}

export default PostController