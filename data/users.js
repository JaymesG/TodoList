const mongoCollections = require("../config/mongoCollections");
const userDb = mongoCollections.userCollection;

// For testing login:
// username: "masterdetective123"
// password: "elementarymydearwatson",

// Functions for manipulating user data
let exportedMethods = {
    async getUserById(id) {
        if (!id) throw "No ID provided.";
        const userCol = await userDb();
        const users = await userCol.find().toArray();
        for (i = 0; i < users.length; i++) {
            let user = users[i];
            if (user._id === id) {
                return user;
            }
        }
        return "User not found: " + id;
    },
    async getUserByUsername(username) {
        if (!username) throw "No username provided.";
        const userCol = await userDb();
        const users = await userCol.find().toArray();
        //console.log("our users are" + users);
        for (i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.username === username) {
                return user;
            }
        }
        return "User not found: " + username;
    }
}


module.exports = exportedMethods;