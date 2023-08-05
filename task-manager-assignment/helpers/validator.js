class validator {
    static validateTaskInfo(taskInfo, taskData) {
      if(taskInfo.hasOwnProperty("taskId") &&
        taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("completionStatus") && this.validateUniqueTaskId(taskInfo, taskData)) {
          return {
            "status": true,
            "message": "Task has been added"
          };
        }
        if(!this.validateUniqueTaskId(taskInfo, taskData)){
          return {
            "status": false,
            "message": "Task Id has to be unique"
          };
        }
        return {
          "status": false,
          "message": "Tasks Info has Incorrect Information !, Please give right information"
        }
    }

    static validateUniqueTaskId(taskInfo, taskData) {
      let valueFound = taskData.taskManager.some(el => el.taskId === taskInfo.taskId);
      if(valueFound) return false;
      return true;
    }

    static validateUpdateTaskInfo(taskInfo , taskData) {
      if(taskInfo.hasOwnProperty("taskId") ||
        taskInfo.hasOwnProperty("title") ||
        taskInfo.hasOwnProperty("description") ||
        taskInfo.hasOwnProperty("completionStatus")) {
          return {
            "status": true,
            "message": "Task has been updated"
          };
        }
        return {
          "status": false,
          "message": "Tasks Info has Incorrect Information !, Please give right information"
        }
    }
  
  }
  
  module.exports = validator;