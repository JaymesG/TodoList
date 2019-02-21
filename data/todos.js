const mongoCollections = require("../config/mongoCollections");
const todos = mongoCollections.todoCollection;

//Functions for manipulating todo data
let exportedMethods = {

    async getTodos() {
        const todoCollection = await todos();
        const todoArray = await todoCollection.find({"completed": false}).toArray();
        return todoArray;
    },
    async getCompleted() {
        const todoCollection = await todos();
        const todoArray = await todoCollection.find({"completed": true}).toArray();
        return todoArray;
    },
    async getTodoById(id) {
        const todoCollection = await todos();
        const todo = await todoCollection.find({"_id": id});
        return todo;
    },
    async removeTodo(id) {
        const todoCollection = await todos();
        const deletionInfo = await todoCollection.removeOne({
            _id: id
        });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete task with id of ${id}`;
        }
    },
    async addTodo(title) {
        if (typeof title !== "string") throw "Title must be of type string.";

        const todoCollection = await todos();

        const generatedID = Math.floor(Math.random() * 100000000) + 100;
        const stringId = generatedID.toString();
        const newTodo = {
            // _id: Math.random().toString(36).replace(/[^0-9]+/g, '').substr(2, 10),
            _id: stringId,
            title: title,
            desc: 'This is a new task created by a user.',
            completed: false
        };

        const newInsertInformation = await todoCollection.insertOne(newTodo);
        const newId = newInsertInformation.insertedId;
    },
    async completeTodo(id, updatedTodo) {
        const todoCollection = await todos();

        const updatedTodoData = {};

        if (updatedTodo.title && typeof updatedTodo.title === "string") {
            updatedTodoData.title = updatedTodo.title;
        }

        if (updatedTodo.desc && typeof updatedTodo.desc === "string") {
            updatedTodoData.desc = updatedTodo.desc;
        }

        if (updatedTodo.completed && typeof updatedTodo.completed === "boolean") {
            updatedTodoData.completed = updatedTodo.completed;
        }

        let updateCommand = {
            $set: updatedTodoData
        };
        const query = {
            _id: id
        };
        await todoCollection.updateOne(query, updateCommand);

        // return await this.getTodoById(id);
    }
};

module.exports = exportedMethods;