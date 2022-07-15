- [Installation](#installation)
- [Implementation Details](#implementation-details)
- [Set up](#set-up)
  - [Frontend](#frontend)
    - [Frontend Structure](#frontend-structure)
  - [Backend](#backend)
  - [Database](#database)
- [Frontend GlobalsService Documentation](#frontend-globalsservice-documentation)
  - [Fields](#fields)
    - [public loggedIn: boolean](#public-loggedin-boolean)
    - [public tasks](#public-tasks)
    - [public nDays: number](#public-ndays-number)
    - [public nDates: Date[]](#public-ndates-date)
    - [public dashboardTasks: any[]](#public-dashboardtasks-any)
    - [public dailyTasks: any[]](#public-dailytasks-any)
    - [public monthlyTasks: any[]](#public-monthlytasks-any)
    - [public futureTasks: any[]](#public-futuretasks-any)
  - [public loadUser()](#public-loaduser)
  - [public isAuthenticated()](#public-isauthenticated)
  - [public logout()](#public-logout)
  - [public async register(form: FormGroup)](#public-async-registerform-formgroup)
  - [public async login(form: FormGroup)](#public-async-loginform-formgroup)
  - [public async getDashboardTasks()](#public-async-getdashboardtasks)
  - [public async getAllTasks(type: string)](#public-async-getalltaskstype-string)
  - [public async getNDailyTasks()](#public-async-getndailytasks)
  - [public async getDailyTasks(day: number, month: number, year: number)](#public-async-getdailytasksday-number-month-number-year-number)
  - [public async getFutureLogTasks()](#public-async-getfuturelogtasks)
  - [public async getFutureTasks(year: number)](#public-async-getfuturetasksyear-number)
  - [public async createTask(form: FormGroup)](#public-async-createtaskform-formgroup)
- [Backend Documentation](#backend-documentation)
  - [createTask](#createtask)
  - [getDailyTask](#getdailytask)
  - [getMonthTask](#getmonthtask)
  - [getFutureTask](#getfuturetask)
  - [getSingleTask](#getsingletask)
  - [getAllTask](#getalltask)
  - [getAllTag](#getalltag)
  - [getTag](#gettag)
  - [createUser](#createuser)
  - [emailLogin](#emaillogin)
- [Database Structure](#database-structure)
  - [Task](#task)
  - [User](#user)
  - [Tag](#tag)



# Installation
- frontend: npm
- backend: 
  - Node.js 
  - express.js
  - Database: MongoDB Atlas

# Implementation Details

# Set up

1. Clone the repo

```
 git clone https://github.com/UTSCCSCC01/finalprojects22-cyclist.git
```

2. go into this folder `cd finalprojects22-cyclist`

## Frontend
1. Enter the frontend directory `cd frontend/CycList`. 
1. Run `npm install` under this folder, to install necessary packages for frontend.
2. Run `npm start` under this folder to run Angular app. Now the app will be running at `http://localhost:4200/`.

### Frontend Structure
- Each frontend component is separated into Angular components:
  - Main app layout: `app`
  - Log in: `log-in` 
  - Add tasks: `add-task`
  - Task views: `dashboard`, `daily-log`, `monthly-log`, `future-log`
  - Navigation: `top-bar`, `side-bar`
  - Task format: `task`
- Main styles and SASS variables are in `styles.scss` and can be imported and used by components.
- Global variables and methods are in `globals` service and can be imported and used by components (details [below](#frontend-documentation)).

## Backend
1. Enter the backend directory `cd backend`.
2. Run `npm install` under this folder to install necessary packages for backend code.
3. Run `npm start` under this folder backend to start backend service. Now the backend should start at `http://localhost:3000`.

## Database
- Since we are using a cloud service, there is no need to install MongoDB.


# Frontend GlobalsService Documentation
The class GlobalsService is a singleton class that provides each Angular component with helper functions. The following are fields of GlobalsService.

## Fields

### public loggedIn: boolean 

True if a user is logged in.

### public tasks

An array of task JSON objects, with attributes: content, name, day, month, year, dueTime. `tasks` is used as a temporary variable to house the results of functions in class `GlobalsService`.

Getter function: public getTasks()
Setter function: public setTasks(tasks: any)
Initialize function: public resetTasks() to default task with not meaningful attributes.

### public nDays: number

The number of days to display on daily log.

### public nDates: Date[]

Array of dates with length `nDays`, containing dates of the next `nDays` days, including today.

setter setNDates(): initializes

### public dashboardTasks: any[]

Array of tasks containing the tasks to be displayed on the dashboard.

### public dailyTasks: any[]

Array of tasks containing the tasks to be displayed on the daily log page.

### public monthlyTasks: any[]

Array of tasks containing the tasks to be displayed on the monthly log page.

### public futureTasks: any[]

Array of tasks containing the tasks to be displayed on the future log page.

## public loadUser()

- Description: Load user information from cookie at login, into `user`
- Body Parameters: None
- Expected Response: None

## public isAuthenticated()

- Description: check if the user is Authenticated (signed in)
- Body Parameters: None
- Expected Response: 
  - True if user is authenticated
  - False otherwise

## public logout()

- Description: log the user out and remove all information about the user 
- Body Parameters: None
- Expected Response: None

## public async register(form: FormGroup)

- Description: Register the user to the database from their input in the registration form.
- Body Parameters: 
  - form: FormGroup - the form the user fills to register
- Expected Response:
  - the result from server

## public async login(form: FormGroup)

- Description: verify user login attempt and add user info to appropriate fields.
- Body Parameters:
  - form: FormGroup - user's input to the login
- Expected Response:
  - if login attempt is successful, user information is added to appropriate fields and user is welcomed to use the application.
  - if not, user is not added and not be granted access to application.

## public async getDashboardTasks()

- Description: store all the user's tasks into field `dashboardTasks` as an array of tasks, for dashboard component to use and display.
- Body Parameters: None
- Expected Response:
  - field `dashboardTasks` houses all the user's tasks, empty array if user has no tasks.

## public async getAllTasks(type: string)

- Description: query all user's tasks to field `tasks` as an array of tasks.
- Body Parameters: 
  - type: string - the type of tasks to query
- Expected Response:
  - field `tasks` houses all the user's tasks, empty array if user has no tasks.

## public async getNDailyTasks()

- Description: store all the user's tasks for the next `nDays` days into field `dailyTasks` as a 2D array of tasks, for daily-log component to use and display.
- Body Parameters: None
- Expected Response:
  - field `dailyTasks` houses all the user's tasks for the next `nDays` days, empty array if user has no tasks.

## public async getDailyTasks(day: number, month: number, year: number)

- Description: query all user's tasks to field `tasks` that fall under the specified date, as an array of tasks.
- Body Parameters:
  - day: number - the day of the specified date
  - month: number - teh month of the specified date
  - year: number - the 4 digit year of the specified date
- Expected Response:
  - field `tasks` houses all the user's tasks for the specified date, empty array if user has no tasks.

## public async getFutureLogTasks()

- Description: store all the user's tasks with hierarchy "future" into field `futureTasks` as a 2D array of tasks, for future-log component to use and display.
- Body Parameters: None
- Expected Response:
  - field `futureTasks` houses all the user's tasks with hierarchy "future", empty array if user has no tasks.

## public async getFutureTasks(year: number)

- Description: query all user's tasks to field `tasks` with hierarchy "future" within the specified year, as an array of tasks.
- Body Parameters: 
  - year: number - the 4 digit year of the targeted year
- Expected Response:
  - field `tasks` houses all the user's tasks with hierarchy "future", empty array if user has no tasks.

## public async createTask(form: FormGroup)

- Description: create tasks for the user, and update tasks on dashboard, daily-log, and future-log.
- Body Parameters: 
  - form: FormGroup - the task input form the user filled to input task
- Expected Response:
  - the result of creating task from the server.


# Backend Documentation
Since we are using graphQL as our api, it behaves little different from REST:

- All requests are sent to `localhost:3000/graphql` with the POST method and different function names inside the body of the request represent different usage.
- We can only throw errors in the handlers so all response statuses are generated by graphQL, `500` means there are some wrong inputs given by the user and `400` means the server doesn’t work.
- requests body should be like `query{emailLogin(email:”email”, password:”pass”){ userId}}`
- Function are listed in backend/api/schema, handlers than implement these functions should are listed in `backend/api/resolver`, data structures for mongoDB are listed in `backend/database`
- all functions with updating database should be put under mutation in the schema, the rest functions should be put under query

## createTask

- Description: user can create a new task through this function
- Body Parameters:
  - content: String
  - name: String
  - date: String
  - dueTime: String
  - repeat: Boolean
  - dayWeekMonth: String
  - frequency: String
  - tegID: String
- Expected Response:
  - 200 OK
    - create successfully
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## modifyTask

- Description: this is used to update all given fields of the task with the given id
- Body Parameters:
  - taskId: String
  - content: String
  - name: String
  - date: String
  - dueTime: String
  - repeat: Boolean
  - dayWeekMonth: String
  - frequency: String
  - tegID: String
- Expected Response:
  - 200 OK
    - return the updated task
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.


## getDailyTask

- Description: user can get their tasks for the given date, tasks include this day’s daily task and repeated tasks on this day. Tasks are ordered by chronological order where tasks without a time will be put in the end of list.
- Body Parameters:
  - day: Int
  - month: Int
  - year: Int
- Expected Response:
  - 200 OK
    - get all required tasks
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## getMonthTask

- Description: user can get their monthly tasks for the given month. It will only return the tasks start in 6 days leter until the end of this month.
- Body Parameters:
  - month: Int
  - year: Int
- Expected Response:
  - 200 OK
    - get all required tasks
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## getFutureTask

- Description: user can get their future tasks for the next 12 months.
- Body Parameters:
  - year: Int
- Expected Response:
  - 200 OK
    - get all required tasks
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.


## getSingleTask

- Description: user can get the details of the task with the given id.
- Body Parameters:
  - id: ID
- Expected Response:
  - 200 OK
    - get details of this task
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.


## getAllTask

- Description: user can get all of their tasks
- Body Parameters:
  - type: String  //user wants to get their daily task or monthly log….For now, it’s all
- Expected Response:
  - 200 OK
    - get all tasks
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## getAllTag

- Description:return all tags the user has currently.
- Body Parameters:
  - id: String //This doesn’t matter since we will use token in the next sprint, for now it can be any string
- Expected Response:
  - 200 OK
    - get all tags
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## getTag

- Description:return the tag details for the given tagId.
- Body Parameters:
  - tagId: the tag id
- Expected Response:
  - 200 OK
    - return the details
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## createTag

- Description:  to allow user to create their own tag 
- Body Parameters:
  - name: String
  - color: String
- Expected Response:
  - 200 OK
    - return the tag
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.    

## createUser

- Description: to create a user in database and return its token.
- Body Parameters:
  - email: String
  - nickName: String
  - password: String
- Expected Response:
  - 200 OK
    - create a new user and return token
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## emailLogin

- Description:  to allow user log in their account and return a token. 
- Body Parameters:
  - email: String
  - password: String
- Expected Response:
  - 200 OK
    - return the token
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## markSignifier

- Description:  it will update these 3 fields(important, completed and abandoned) of the given task id in database 
- Body Parameters:
  - id: String
  - important: Boolean
  - completed: Boolean
  - abandoned: Boolean
- Expected Response:
  - 200 OK
    - return the updated task
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## test

- Description: this is used during developing, its body parameters and return response can be changed at anytime 
- Body Parameters:
  - any: String //this can be changed deponds on what you want to test
- Expected Response:
  - 200 OK
    - this can be changed deponds on what you want to test
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

# Database Structure

## Task
- id: ID
- creater: ID
- day:int
- month:int
- year:int
- schedule:Boolean //whether this task has a specific day when it was created
- hierarchy:String //we update this field, all task should be daily right now
- dueTime:String //the due time of this task
- dueDate:String //in the format of 2022-07-01
- expectedDuration: int
- isRepeat:Boolean
- dayWeekMonth: String //should be day, week or month
- frequency:String //if repeat on month or every n days, put the date or n; if repeat on week, e.g. every Mon, Wed and Fri, put 135 as string
- repeatStartDay: String //created based on day, month and year. It's the start day of this repeat task in ISO String, used to calculated which day it should be showed.
- content:String
- tag: ID
- color: String // the color of the tag stored in this task
- important: Boolean
- completed: Boolean
- abandoned: Boolean

## User

- nickName: String
- email: String
- password: String


## Tag
- creator: ID
- name: String
- color: String
- icon: Int
- totalExpectedTime: Int
- totalActualTime: Ine
