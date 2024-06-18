import express from "express"
import "dotenv/config";
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 5002

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/', (req, res) => {
    return res.json({ message: "It's working post micro ..." })
});

// *Routes
import Routes from "./routes/index.js"
app.use(Routes);

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));