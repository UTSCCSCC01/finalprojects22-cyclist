# Motivation

This project is a bullet journal to help you build your daily schedule, you can add tasks and notes to the journal to avoid missing an important meeting or assignment deadline and so on. It also provides a suggested start time, expected end time, and the day it should be started based on your past experience when you create a new task. If you have too many tasks at the same time thus forget to attend an important appointment, we will remember it for you. If you don't have a clear plan about what should I do in the next few days, we will make a personalized suggestion based on you. Since many journal apps in the market cannot give a suggestion, we are here to make your life easier. That's the reason we exist.

# Installation

For users: Since this is a web app, so no installation is needed, a browser and stable internet are enough.

For developers: We will use ReactJs for frontend and backend, MongoDB cloud service for database. 
There is no need to install MongoDB. 
Please follow [install npm](https://phoenixnap.com/kb/install-node-js-npm-on-windows) to install npm.

Basic steps to install npm:
1. Go to [npm download](https://nodejs.org/en/download/) to download npm. 
2. The system will ask if you want to run the software – click Run.
3. You will be welcomed to the Node.js Setup Wizard – click Next.
4. On the next screen, review the license agreement. Click Next if you agree to the terms and install the software.
5. The installer will prompt you for the installation location. Leave the default location, unless you have a specific need to install it somewhere else – then click Next.
6. The wizard will let you select components to include or remove from the installation. Again, unless you have a specific need, accept the defaults by clicking Next.
7. Finally, click the Install button to run the installer. When it finishes, click Finish.
8. By typing `node -v` on terminal to verify you installed successfully, the system should display the Node.js version installed on your system. Type `npm -v` to check version of npm.


To run our app on your terminal:

Clone the repo

```
 git clone https://github.com/UTSCCSCC01/finalprojects22-cyclist.git
```

# How to Start Frontend and Backend:


1. Run `npm install && npm start` at the root folder.
2. Frontend will be running at `http://localhost:4200/`
3. Backend will be running at `http://localhost:3000/`


# Contribution

### Do you use git flow?

We will use git flow to track the changes of each branch. Features will be created and developed on different branches and when a feature is implemented and pass all tests, it will be merged into the respective branch.

### What do you name your branches?

main: This is the main(master) branch. Frontend/backend code, after being fully tested and being ensured that features inside won't conflict with others, will be merged into this branch. 

frontend: This branch is used for the frontend work including user interfaces and so on.

backend: This branch is used for the backend work including database and server.

feature-xxx: A feature named xxx will be implemented on this branch, once it has passed all tests, it will be merged into the frontend/backend branch.

### Do you use github issues or another ticketing website?

We will use discord/Github issues for ticketing.

### Do you use pull requests?

Our team members will use pull requests to help other members understand the changes with details during building our web app.
