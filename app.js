const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const mongoURI = "mongodb+srv://asmankin:asmankin@cluster0.htfb5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const newUser = require("./model/modelUser");
const project = require("./model/project");

async function startMongoose(){
    try {
        await mongoose.connect(mongoURI, {
            useNewURLParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (error) {
        console.log("Server Error", error.message);
        process.exit(1);
    }
}
startMongoose();

app.use(express.json({ extended: true }));

app.post("/", function(request, response){
    if (!request.body) response.status(400).json({message: "Нет тела запроса"});
    
    const {email, password} = request.body;

    newUser.find({email}, function (err, user){
        if (err) return handleError(err);

        if (user.length > 0) {
           return response.json({answer:"yes"});
        }
        else return response.status(400).json({message: "Пользователь не найден"});
    });
});

app.post("/registr", function(request, response){
    if (!request.body) response.status(400).json({message: "Нет тела запроса"});

    const {email, password} = request.body;

    const createdUser = new newUser({email, password});
    createdUser.save();
});

app.get("/createProject", async function(request, response){

    try {
        const data = await project.find();
        response.json(data);
    } catch (e) {
        response.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

app.post("/createProject", function(request, response){
    if (!request.body) response.status(400).json({message: "Нет тела запроса"});

    const {name} = request.body;

    const data = new project({name:name});
    data.save();
});


