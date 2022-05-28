const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const mongoURI = "mongodb+srv://asmankin:asmankin@cluster0.htfb5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const newUser = require("./model/modelUser");
const project = require("./model/project");
const regulation = require("./model/regulation");
const participant = require("./model/participant");

const jwt = require('jsonwebtoken');
const { json } = require("express/lib/response");
const { findByIdAndUpdate } = require("./model/modelUser");

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

        if (user[0].password == password){
            const token = jwt.sign(
                { userId: user[0].id },
                "someSecret",
                { expiresIn: '1h' }
            )

           return response.json({userId: user[0].id });
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

app.get("/createProject/:id", function(request, response){

    const id = request.params.id;

    newUser.findOne({_id:id}, function (err, doc){
        if (err) throw err;

        if (doc) {

            project.find({"_id":{"$in":doc["projects"]}}, function (err, project){
  
                response.json(project);
            });          
        }
    });
});

app.post("/createProject/:id", function(request, response){

    if (!request.body) response.status(400).json({message: "Нет тела запроса"});

    const name = request.body.title;
    const id = request.body.id;

    const newProject = new project({name:name});
    newProject.save();

    const idProject = newProject._id;
    let projects = [];

    newUser.findOne({_id:id}, function(err, user){

        if (err) throw err;
        
        if (user){
            projects = user.projects;
            projects.push(idProject);

            newUser.findByIdAndUpdate(id, {projects: projects}, {new: true}, function (err, user){

                user.save();
            });

            project.find({"_id":{"$in":user["projects"]}}, function (err, project){
  
                return response.json(project);
            });  
        }
    });

});

app.post("/deleteProject/:id", function(request, response){

    if (!request.body) response.status(400).json({message: "Нет тела запроса"});

    let idProject = request.body.id;

    project.deleteOne({_id: idProject}, function(err, result){});

    let userId = request.params.id;

    newUser.findOne({_id:userId}, function(err, user){
        let projects = user.projects;

        for (let i = 0; i<project.length; i++){
            if (projects[i]._id == idProject){
                delete(projects[i]);
                break;
            }
        }

        newUser.findByIdAndUpdate(userId, {projects: projects}, {new: true}, function (err, user){

            user.save();
        });

        newUser.find({"_id":{"$in":user["projects"]}}, function (err, project){
  
            return response.json(project);
        }); 
    });
});

app.get("/regulation/:id", function(request, response){

    const id = request.params.id;

    regulation.find({project: id}, function (err, regulation){
        if (regulation){
           return response.json(regulation);
        }

        response.json(null);
    });  
});

app.post("/regulation/:id", function(request, response){

    if (!request.body) response.status(400).json({message: "Нет тела запроса"});

    let blank = request.body.blank;
    let idProject = request.params.id;

    regulation.findOne({project:idProject}, function(err, result){
        if (result){
            
        }
        else{   
            let regulationDB = new regulation({
                businessTarget: blank.businessTarget,
                projectTarget: blank.projectTarget,
                requirements: blank.requirements,
                restriction: blank.restriction,
                controlPoints: blank.controlPoints,
                budget: blank.budget,
                table: blank.table,
                project: idProject
            });
        
            regulationDB.save();
        }
        
    });

    regulation.updateOne({project:idProject}, {
        businessTarget: blank.businessTarget,
        projectTarget: blank.projectTarget,
        requirements: blank.requirements,
        restriction: blank.restriction,
        controlPoints: blank.controlPoints,
        budget: blank.budget,
        table: blank.table,
        project: idProject
    }, function(err, blankDB){});
});

app.get("/participants/:id", function(request, response){

    const id = request.params.id;

    participant.find({project: id}, function (err, men){
        if (men){
           return response.json(men);
        }

        response.json(null);
    });  
});

app.post("/participants/:id", function(request, response){

    if (!request.body) response.status(400).json({message: "Нет тела запроса"});

    let participant = request.body.participant;
    let idProject = request.params.id;

    participant.findOne({project:idProject}, function(err, result){
        if (result){
            
        }
        else{   
            let participantDB = new participant({
                name: participant.name,
                uninformed: participant.uninformed,
                resisting: participant.resisting,
                neutral: participant.neutral,
                supporting: participant.supporting,
                leading: participant.leading,
                project: idProject
            });
        
            participantDB.save();
        }
        
    });

    participantDB.updateOne({project:idProject}, {
        name: participant.name,
        uninformed: participant.uninformed,
        resisting: participant.resisting,
        neutral: participant.neutral,
        supporting: participant.supporting,
        leading: participant.leading,
        project: idProject
    }, function(err, result){});
});