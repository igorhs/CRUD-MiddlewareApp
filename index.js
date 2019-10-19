const express = require ('express');

const server = express();

server.use(express.json());

const projects = [];
var count = 0;

server.use((req, res, next) => {
    return next();
})

function countingReq (req, res, next) {
    count++;
    console.log("Total of requisitions made: " +count);
    return next();
}

function checkProjectExists (req, res, next) {

    const { id } = req.params;

    const project = projects.find(p => p.id == id);

    if (!project){
        return res.status(400).json({ error: 'This project does not exist' });
    }

    return next();
}

 server.get('/projects', countingReq, (req, res)=> {
     return res.json(projects);
 })

 server.post('/projects', countingReq, (req, res) =>{
     const { id, title, tasks } = req.body;

     const project = {
         id,
         title,
         tasks: []
     };

     projects.push(project);

     return res.json(project);
 })

 server.put('/projects/:id', countingReq, checkProjectExists, (req, res) =>{
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.json(project);
 })

 server.delete('/projects/:id', countingReq, checkProjectExists, (req, res) => {
     const { id } = req.params;

     const project = projects.find(p => p.id == id);

     project.title = projects.splice();

     return res.send();
 })

server.post('/projects/:id/tasks', countingReq, checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title, tasks } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;
    project.tasks = tasks;

    return res.json(project);
})

server.listen(3000);