Author: Jaymes Garland
Date: October 28th, 2018

INTRODUCTION / FUNCTIONALITY
----------------------------------------------------------
This web application allows users to create a simple to-do list. 
I wanted to demonstrate my abilities to develop both front end
and back end code, thus striking a balance between the two.
To build the user interface I used bootstrap cdm for style and
handlebars for formatting. Each to-do is held within a bootstrap
panel. Handlebars allowed me to implement two separate formats
for rendering partial views, one for when the user is logged out
and another for when the user is logged in. You can tell the
difference between these two layouts by looking at the title
of the webpage's tab, at the top of your browser. I wrote
custom functions for each button: the "Add" button operates
via the code found in ./public/js/functionality.js, the
delete and complete buttons call functions found in a <script>
tag at the bottom of ./views/pages/todos.handlebars. For the
back end I felt it was important to create a login system.
To do this I used passport and express-session to authenticate
and keep track of logged in users. I used bcrypt-nodejs to
decode user passwords from their hashcodes. I set up mongodb
connections and collections to GET and POST data. I manually
entered documents into the database for testing via mLab.
After 6 days of work on the project, I believe I have created
a visually fun and technically functional to-do list application.
Users can add to-do items, delete them, and complete them.
To write this program I relied on my previous codes from course
work as well as APIs and documentation of the implemented
technologies. Given more time I would have added even more
functionality; the possibilities are endless. If interested
please see the bottom of this document for a list of possible
future improvements.

INSTALL AND RUN
----------------------------------------------------------
NOTE: you will need to install node.js on your system in order to
execute the npm commands for this program to run. You may download
node.js here: https://nodejs.org/en/download/current/

Step 1: Open terminal and navigate to the root folder of the
        source code.

Step 2: Install the projects dependencies by typing the command: 
        
        npm install

Step 3: Once the dependencies have finished installing you can
        start the project's server with the following command:
        
        npm start

        You should now see the following notification:

        "We've now got a server!
        Your routes will be running on http://localhost:27015"
    
Step 4: Open a web browser and copy http://localhost:27015 into
        the address bar. In some cases (on Mac) you may be able
	to command + click the http address from terminal 
	to open the page in your systems default browser.

Step 5: Log into the application with the following credentials:

        Username: masterdetective123
        Password: elementarymydearwatson

Step 6: Create a to-do by entering text into the text input element
        and clicking the Add button. Your to-do should now be added
        to the "On Going Tasks" section of the application.

Step 7: Delete a to-do by clicking the X button or complete a to-do
        (thereby adding it to the "Completed Tasks" section) by
        clicking the check mark button.
        
        NOTE: at this time, completed tasks can only be removed
        from the system via the mLab account associated with the
	project.

Step 8: Click the logout button at the top of the application
        to logout off the system.

SCHEMAS
----------------------------------------------------------
user = {
    "_id": numerical string,
    "username": string,
    "firstName": string,
    "lastName": string,
    "hashedPassword": hashcode string
}

todo = {
    "_id": numerical string,
    "title": string,
    "desc": string,
    "completed": boolean
}

FILE SYSTEM
----------------------------------------------------------
| config
| - mongoCollections.js
| - mongoConnection.js
| - settings.js
| data
| - todos.js
| - users.js
| node_module
| - *
| public
| - js
| -- functionality.js
| views
| - layouts
| -- main.handlebars
| -- user.handlebars
| - pages
| -- login.handlebars
| -- todos.handlebars
| app.js
| package-lock.json
| package.json
| readme.txt

TECHNOLOGIES
----------------------------------------------------------
Computer:       Macbook Pro with Touchbar
OS:             macOS High Sierra -v 10.13.6
Editor:         Visual Studio Code
Terminal:       iTerm2
Database:       mongodb / mLab
Environment:    node.js
Routing:        express.js
View Engine:    handlebars
Security:       passport / bcrypt

POSSIBLE INPROVEMENTS
----------------------------------------------------------
1.  Clean up app.js file by adding a route folder to the file
    system and import all routes through an index.js file.
2.  Add more functionality, e.g. the ability to register new
    users and to set a due date / complete date for each to-do
    in the database.
3.  Use a gulp file to compile bootstrap source code and custom
    scss files instead of using bootstrap cdm.

