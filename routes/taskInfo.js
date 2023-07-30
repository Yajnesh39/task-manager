const taskRoutes = require('express').Router();
const taskData = require('../tasks.json');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const validator = require('../helpers/validator');

module.exports = taskRoutes;

taskRoutes.use(bodyParser.json());

taskRoutes.get('/' , (req , res) => {
    return res.status(200).json(taskData);
});

taskRoutes.get('/:taskId', (req, res) => {
    let tasksList = taskData.taskManager;
    let taskIdPassed = req.params.taskId;
    let result = tasksList.filter(val => val.taskId == taskIdPassed);
    if ( result == null || result == undefined || result.length == 0) {
      return res.status(404).json({ "message" : " Taskid does not exist "});
    }
    else { 
      res.status(200);
      res.send(result);   
    }
})

taskRoutes.post('/', (req, res) => {
  const taskDetails = req.body;
  let writePath = path.join(__dirname, '..', 'tasks.json');
  if(validator.validateTaskInfo(taskDetails, taskData).status) {
    let taskDataModified = taskData;
    taskDataModified.taskManager.push(taskDetails);
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
    res.status(200);
    res.json(validator.validateTaskInfo(taskDetails, taskData));
  } else {
    res.status(400);
    res.json(validator.validateTaskInfo(taskDetails, taskData))
  }
});


taskRoutes.put('/:taskId', (req, res) => {
  let tasksList = taskData.taskManager;
  const taskIdPassed = req.params.taskId;
  let resultForPut = tasksList.find(val => val.taskId == taskIdPassed);
  if ( resultForPut == null || resultForPut == undefined || resultForPut.length == 0) {
    return res.status(404).json({ "message" : " Taskid does not exist "});
  }
  else { 
    const taskUpdateDetails = req.body;
    console.log(taskUpdateDetails);
    console.log("----------");
    console.log(resultForPut);
    if (validator.validateUpdateTaskInfo(taskUpdateDetails , taskData).status) {
      let writePath = path.join(__dirname, '..', 'tasks.json');

      let taskDataModified = taskData;
      //let taskDataModified = JSON.parse(JSON.stringify(taskData));
      //let filteredTaskData = taskDataModified.taskManager.filter(task => task.taskId == taskIdPassed);
      //resultForPut.title = taskUpdateDetails.title;
      //resultForPut.description = taskUpdateDetails.description;
      //resultForPut.completionStatus = taskUpdateDetails.completionStatus;

      console.log("task id pass",taskIdPassed);

      const newState = tasksList.map(obj =>
        obj.taskId == taskIdPassed ? { ...obj, ...taskUpdateDetails } : obj
      );

      

      taskDataModified.taskManager = newState;
      console.log("************");
      console.log(newState);
      //console.log(resultForPut);
      console.log("99999999999999999999");
      //console.log(newState);
      res.json(taskUpdateDetails);
      console.log(taskDataModified);
      fs.writeFileSync(writePath, JSON.stringify(taskDataModified));
    } else {
      res.status(400)
      console.log("Not updated");
      res.json(validator.validateUpdateTaskInfo(taskUpdateDetails, taskData));
    }  
  }
});

taskRoutes.delete('/:taskId', (req, res) => { 
  let tasksList = taskData.taskManager;
  console.log(tasksList);
  let taskIdPassed = req.params.taskId;
  console.log(taskIdPassed);
  let resultForPut = tasksList.find(val => val.taskId == taskIdPassed);
  console.log(resultForPut);
  if ( resultForPut == null || resultForPut == undefined || resultForPut.length == 0) {
    return res.status(404).json({ "message" : " Taskid does not exist "});
  }
  else {
    let writePath = path.join(__dirname, '..', 'tasks.json');
    const taskDataModified = taskData;
    const index = tasksList.findIndex(x => x.taskId === taskIdPassed);
    tasksList.splice(index, 1);
    
    taskDataModified.taskManager = tasksList;

    fs.writeFileSync(writePath, JSON.stringify(taskDataModified));
    res.json({" message" : "Task data deleted"});

  }
});
  

