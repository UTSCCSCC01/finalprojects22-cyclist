da- [Installation](#installation)
1. [Installation](#installation)
2. [Implementation Details](#implementation-details)
3. [Set up](#set-up)
   1. [Frontend](#frontend)
      1. [Frontend Structure](#frontend-structure)
   2. [Backend](#backend)
   3. [Database](#database)
4. [Frontend GlobalsService Documentation](#frontend-globalsservice-documentation)
   1. [Fields](#fields)
      1. [public loggedIn: boolean](#public-loggedin-boolean)
      2. [public colorMode: string](#public-colormode-string)
      3. [public em: string](#public-em-string)
      4. [public public now: any](#public-public-now-any)
      5. [public oneYear: any](#public-oneyear-any)
      6. [public minDate: any](#public-mindate-any)
      7. [public maxDate: any](#public-maxDate-any)
      8. [public minMonth: any](#public-minmonth-any)
      9. [public maxMonth: any](#public-maxmonth-any)
      10. [public notifications: string\[\]](#public-notifications-string)
      11. [private user: any](#private-user-any)
      12. [public loginError: string](#public-loginerror-string)
      13. [public taskFormActive: boolean](#public-taskformactive-boolean)
      14. [public taskFormWeek: boolean\[\]](#public-taskformweek-boolean)
      15. [form: Formgroup](#form-formgroup)
      16. [public tasks](#public-tasks)
      17. [public nDays: number](#public-ndays-number)
      18. [public nDates: Date\[\]](#public-ndates-date)
      19. [public dashboardTasks: any\[\]](#public-dashboardtasks-any)
      20. [public dailyTasks: any\[\]](#public-dailytasks-any)
      21. [public monthlyTasks: any\[\]](#public-monthlytasks-any)
      22. [public monthlyTasksNoDay: any\[\]](#public-monthlyTasksNoDay-any)
      23. [public futureTasks: any\[\]](#public-futuretasks-any)
      24. [public tags](#public-tags)
      25. [public completionRates: any\[\]](#public-completionRates-any)
      26. [public sug](#public-sug)
   2. [public async refresh()](#public-async-refresh)
   3. [public setAppTime()](#public-setapptime)
   4. [public setNDates()](#public-setNDates)
   5. [public setNotifications()](#public-setnotifications)
   6. [public removeNotification()](#public-removeNotification)
   7. [public formReset()](#public-formreset)
   8. [public loadUser()](#public-loaduser)
   9. [public isAuthenticated()](#public-isauthenticated)
   10. [public logout()](#public-logout)
   11. [public async register(form: FormGroup)](#public-async-registerform-formgroup)
   12. [public async login(form: FormGroup)](#public-async-loginform-formgroup)
   13. [public async getDashboardTasks()](#public-async-getdashboardtasks)
   14. [public async getOverdueTasks()](#public-async-getOverdueTasks)
   15. [public async getAllTasks(type: string)](#public-async-getalltaskstype-string)
   16. [public async getNDailyTasks()](#public-async-getndailytasks)
   17. [public async getDailyTasks(day: number, month: number, year: number)](#public-async-getdailytasksday-number-month-number-year-number)
   18. [public async getMonthlyLogTasks()](#public-async-getMonthlyLogTasks)
   19. [public async getMonthlyLogTasksNoDate()](#public-async-getMonthlyLogTasksNoDate)
   20. [public async getMonthlyTasksNoDay(month: number, year: number)](#public-async-getMonthlyTasksNoDay)
   21. [public async getMonthlyTasks(month: number, year: number)](#public-async-getMonthlyTasks)
   22. [public async getFutureLogTasks()](#public-async-getfuturelogtasks)
   23. [public async getFutureTasks(year: number)](#public-async-getfuturetasksyear-number)
   24. [public async createModifyTask(form: FormGroup)](#public-async-createmodifytaskform-formgroup)
   25. [public async deleteTask(id: string)](#public-async-deletetaskid-string)
   26. [public async getCompletionRates()](#public-async-getCompletionRates)
   27. [public async getAllTags(userID: string)](#public-async-getalltagsuserid-string)
   28. [public async getTag(tagID: string)](#public-async-getTag)
   29. [public async createTag(value: any)](#public-async-createtagvalue-any)
   30. [public async markSignifier()](#public-async-marksignifier)
   31. [public async completeTask()](#public-async-completeTask)
   32. [public async getSuggestedDuration(hour: number, minute: number, tagID: string)](#public-async-getSuggestedDuration)
5. [Backend Documentation](#backend-documentation)
   1. [createTask](#createtask)
   2. [modifyTask](#modifytask)
   3. [getDailyTask](#getdailytask)
   4. [getMonthTask](#getmonthtask)
   5. [getFutureTask](#getfuturetask)
   6. [getSingleTask](#getsingletask)
   7. [getAllTask](#getalltask)
   8. [getAllTag](#getalltag)
   9. [getTag](#gettag)
   10. [createTag](#createtag)
   11. [createUser](#createuser)
   12. [emailLogin](#emaillogin)
   13. [markSignifier](#marksignifier)
   14. [test](#test)
6. [Database Structure](#database-structure)
   1. [Task](#task)
   2. [User](#user)
   3. [Tag](#tag)

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
1. Run `npm install` under this folder, to install necessary packages for
   frontend.
1. Run `npm start` under this folder to run Angular app. Now the app will be
   running at `http://localhost:4200/`.

### Frontend Structure

- Each frontend component is separated into Angular components:
  - Main app layout: `app`
  - Log in: `log-in`
  - Add tasks: `add-task`
  - Task views: `dashboard`, `daily-log`, `monthly-log`, `future-log`
  - Navigation: `top-bar`, `side-bar`
  - Task format: `task`
- Main styles and SASS variables are in `styles.scss` and can be imported and
  used by components.
- Global variables and methods are in `globals` service and can be imported and
  used by components (details [below](#frontend-documentation)).

## Backend

1. Enter the backend directory `cd backend`.
2. Run `npm install` under this folder to install necessary packages for backend
   code.
3. Run `npm start` under this folder backend to start backend service. Now the
   backend should start at `http://localhost:3000`.

## Database

- Since we are using a cloud service, there is no need to install MongoDB.

# Frontend GlobalsService Documentation

The class GlobalsService is a singleton class that provides each Angular
component with helper functions. The following are fields of GlobalsService.

## Fields

### public loggedIn: boolean

True if a user is logged in.

### public colorMode: string

Tracks the current theme. Possible values are `auto`, `light`, `dark`.

### public em: string

Stores an error message.

### public public now: any

Stores the current date.

### public oneYear: any

Stores the current date plus one year and two months.

### public minDate: any

Stores the lower date boundary to create a task.

### public maxDate: any

Stores the higher date boundary to create a task.

### public minMonth: any

Stores the lower month boundary to create a task.

### public maxMonth: any

Stores the higher month boundary to create a task.

### public notifications: string[]

An array of notifications containing `task._id` values. Updated by
setNotifications().

### private user: any

Stores the current user.

Setter function: public setUser(user: any)

### public loginError: string

Store the current login error.

### public taskFormActive: boolean

True if the add task form is active (not hidden).

### public taskFormWeek: boolean[]

Determines the active weekdays on the add task form when repeat by week is
selected. `taskFormWeek[0]` determines monday, `taskFormWeek[1]` tuesday and so
on.

### form: Formgroup

Contains values that determine the content of the fields in the add task form.

### public tasks

An array of task JSON objects, with attributes: \_id, content, name, day, month,
year, dueTime. `tasks` is used as a temporary variable to house the results of
functions in class `GlobalsService`.

Getter function: public getTasks() Setter function: public setTasks(tasks: any)
Initialize function: public resetTasks() to default task with not meaningful
attributes.

### public nDays: number

The number of days to display on daily log.

### public nDates: Date[]

Array of dates with length `nDays`, containing dates of the next `nDays` days,
including today.

setter setNDates(): initializes

### public dashboardTasks: any[]

Array of tasks containing the tasks to be displayed on the dashboard.

### public dailyTasks: any[]

Array of tasks containing the tasks to be displayed on the daily log page.

### public monthlyTasks: any[]

Array of tasks containing the monthly tasks in the next 6 days.

### public monthlyTasksNoDay: any[]

Array of tasks containing tasks in the current month but not yet scheduled.

### public futureTasks: any[]

Array of tasks containing the tasks to be displayed on the future log page.

### public tags

Array of tag objects with attributes: \_id, creater, name, color, icon,
totalExpectedTime, totalActualTime.

Getter function: public getTags() Setter function: public setTags(tags: any)

### public completionRates: any[]

Array of numbers representing the current user's completion rates as a
percentage.
Index 0: all time completion
Index 1: last 3 months
Index 2: last month

### public sug

An object represeting a duration for the purpose of suggesting task duration.

## public async refresh()

Description: Calls functions that get latest data from the backend
Body Parameters: None
Expected Response: Relevant variables are populated with new data

## public setAppTime()

Description: Sets some variables based on current date and time. Variables are
now, oneYear, minDate, maxDate, minMonth, maxMonth 
Body Parameters: None
Expected Response: The variables are set

## public setNDates()

Description: Set nDates to contain the next nDays Dates.
Body Parameters: None
Expected Response: nDates is set

## public setNotifications()

Description: Set notifications for tasks with their _id in notification.
Body Parameters: None
Expected Response: A notification is created and the task _id is removed 
from notification for each task that needs one created.

## public removeNotification()

Description: Remove a notification based on a task id
Body Parameters: 
Expected Response: A notification is created and the task _id is removed 
from notification for each task that needs one created.

## public formReset()

Description: Sets taskFormWeek and values of form to their default values
Body Parameters: None
Expected Response: taskFormWeek is set to all false and values of form are set
to default values (each value has some default, not necessarily null)

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

- Description: Register the user to the database from their input in the
  registration form.
- Body Parameters:
  - form: FormGroup - the form the user fills to register
- Expected Response:
  - the result from server

## public async login(form: FormGroup)

- Description: verify user login attempt and add user info to appropriate
  fields.
- Body Parameters:
  - form: FormGroup - user's input to the login
- Expected Response:
  - if login attempt is successful, user information is added to appropriate
    fields and user is welcomed to use the application.
  - if not, user is not added and not be granted access to application.

## public async getDashboardTasks()

- Description: store all the user's tasks into field `dashboardTasks` as an
  array of tasks, for dashboard component to use and display.
- Body Parameters: None
- Expected Response:
  - field `dashboardTasks` houses all the user's tasks, empty array if user has
    no tasks.

## public async getOverdueTasks()

- Description: store all the user's overdue tasks into `Tasks`
- Body Parameters: None
- Expected Response:
  - field `Tasks` houses all the user's overdue tasks

## public async getAllTasks(type: string)

- Description: query all user's tasks to field `tasks` as an array of tasks.
- Body Parameters:
  - type: string - the type of tasks to query
- Expected Response:
  - field `tasks` houses all the user's tasks, empty array if user has no tasks.

## public async getNDailyTasks()

- Description: store all the user's tasks for the next `nDays` days into field
  `dailyTasks` as a 2D array of tasks, for daily-log component to use and
  display.
- Body Parameters: None
- Expected Response:
  - field `dailyTasks` houses all the user's tasks for the next `nDays` days,
    empty array if user has no tasks.

## public async getDailyTasks(day: number, month: number, year: number)

- Description: query all user's tasks to field `tasks` that fall under the
  specified date, as an array of tasks.
- Body Parameters:
  - day: number - the day of the specified date
  - month: number - teh month of the specified date
  - year: number - the 4 digit year of the specified date
- Expected Response:
  - field `tasks` houses all the user's tasks for the specified date, empty
    array if user has no tasks.

## public async getMonthlyLogTasks()

- Description: query all user's tasks to field `tasks` appropriate for monthly
  log, as an array of tasks.
- Body Parameters: None
- Expected Response:
  - field `monthlyTasks` houses all the user's tasks for monthly log

## public async getMonthlyLogTasksNoDate()

- Description: query all user's tasks to field `tasks` appropriate for monthly
  log, as an array of tasks.
- Body Parameters: None
- Expected Response:
  - field `monthlyTasksNoDay` houses all the user's tasks for monthly log

## public async getMonthlyTasksNoDay(month: number, year: number)

- Description: query all user's monthly tasks to field `tasks` 
- Body Parameters:
  - year: number - the 4 digit year of the targeted year
  - month: month - the 2 digit year of the targeted month
- Expected Response:
  - field `tasks` houses all the user's monthly tasks

## public async getMonthlyTasks(month: number, year: number) 

- Description: query all user's monthly tasks to field `tasks` 
- Body Parameters:
  - year: number - the 4 digit year of the targeted year
  - month: month - the 2 digit year of the targeted month
- Expected Response:
  - field `tasks` houses all the user's monthly tasks
  
## public async getFutureLogTasks()

- Description: store all the user's tasks with hierarchy "future" into field
  `futureTasks` as a 2D array of tasks, for future-log component to use and
  display.
- Body Parameters: None
- Expected Response:
  - field `futureTasks` houses all the user's tasks with hierarchy "future",
    empty array if user has no tasks.

## public async getFutureTasks(year: number)

- Description: query all user's tasks to field `tasks` with hierarchy "future"
  within the specified year, as an array of tasks.
- Body Parameters:
  - year: number - the 4 digit year of the targeted year
- Expected Response:
  - field `tasks` houses all the user's tasks with hierarchy "future", empty
    array if user has no tasks.

## public async createModifyTask(form: FormGroup)

- Description: create/modify tasks for the user, and update tasks on dashboard,
  daily-log, and future-log. Create if `form.value._id` is `null`, otherwise
  modify.
- Body Parameters:
  - form: FormGroup - the task input form the user filled to input task
- Expected Response:
  - the result of creating/modify task from the server.

## public async deleteTask(id: string)

- Description: delete thie task with the `_id` value of passed `id`.
- Body Parameters:
  - id: string - the id of task to be deleted.
- Expected Response:
  - the result of creating/modify task from the server.

## public async getCompletionRates()

- Description: query user's task completion rates to field `completionRates` 
  as array of percentages.
- Body Parameters: None
- Expected Response:
  - `completionRates` houses the latest figures for current user 

## public async getAllTags(userID: string)

- Description: query all user's tags to field tags as an array of tags
- Body Parameters: None
- Expected Response:
  - field tags houses all the user's tags, empty array if user has no tags.

## public async getTag(tagID: string)

- Description: query for a tag given a tag id
- Body Parameters: 
  - tagID: string - the id of tag to be returned
Expected Response:
  - field tags houses the requested tag

## public async createTag(value: any)

- Description: creates a tag
- Body Parameters:
  - object with tag input information
- Expected Response:
  - add this tag to tags field

## public async markSignifier()

- Description: marks a task with signifiers
- Body Parameters:
  - id: string - id of task to be marked
  - important: Boolean - a signifier
  - completed: Boolean - a signifier
  - abandoned: Boolean - a signifier
- Expected Response:
  - mark tag with give id with given signifiers.

## public async completeTask()

- Description: marks a task as complete and reports time taken to complete it
- Body Parameters:
  - id: string - id of task to be marked
  - completed: Boolean - a signifier
  - hour: number - hours taken
  - minute: number - minutes taken
- Expected Response:
  - task associated with id is marked complete

## public async getSuggestedDuration(hour: number, minute: number, tagID: string)
- Description: given a tag and duration to do a task, suggests a better duration
- Body Paramters:
  - hour: number - hours expected
  - minute: number - minutes expected
- Expected Response:
  - `sug` has a suggested duration 

# Backend Documentation

Since we are using graphQL as our api, it behaves little different from REST:

- All requests are sent to `localhost:3000/graphql` with the POST method and
  different function names inside the body of the request represent different
  usage.
- We can only throw errors in the handlers so all response statuses are
  generated by graphQL, `500` means there are some wrong inputs given by the
  user and `400` means the server doesn’t work.
- requests body should be like
  `query{emailLogin(email:”email”, password:”pass”){ userId}}`
- Function are listed in backend/api/schema, handlers than implement these
  functions should are listed in `backend/api/resolver`, data structures for
  mongoDB are listed in `backend/database`
- all functions with updating database should be put under mutation in the
  schema, the rest functions should be put under query

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
  - notifiable: Boolean
  - notifyTime: Int
  - hour: Int
  - minute: Int
- Expected Response:
  - 200 OK
    - create successfully
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## modifyTask

- Description: this is used to update all given fields of the task with the
  given id
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
  - notifiable: Boolean
  - notifyTime: Int
  - hour: Int
  - minute: Int
- Expected Response:
  - 200 OK
    - return the updated task
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## getDailyTask

- Description: user can get their tasks for the given date, tasks include this
  day’s daily task and repeated tasks on this day. Tasks are ordered by
  chronological order where tasks without a time will be put in the end of list.
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

- Description: user can get their monthly tasks for the given month. It will
  only return the tasks start in 6 days leter until the end of this month.
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
  - type: String //user wants to get their daily task or monthly log….For now,
    it’s all
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
  - id: String //This doesn’t matter since we will use token in the next sprint,
    for now it can be any string
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

- Description: to allow user to create their own tag
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

- Description: to allow user log in their account and return a token.
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

- Description: it will update these 3 fields(important, completed and abandoned)
  of the given task id in database
- Body Parameters:
  - id: String
  - important: Boolean
  - completed: Boolean
  - abandoned: Boolean
  - hour: Int
  - minute: Int
- Expected Response:
  - 200 OK
    - return the updated task
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## test

- Description: this is used during developing, its body parameters and return
  response can be changed at anytime
- Body Parameters:
  - any: String //this can be changed deponds on what you want to test
- Expected Response:
  - 200 OK
    - this can be changed deponds on what you want to test
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## getLastMonthComp

- Description: return the user's task completion rate for the last month
- Body Parameters:
  - field: String //this can be empty string, you can change it for later development
- Expected Response:
  - 200 OK
    - return the rate as float
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error

## getLastThreeMonthComp

- Description: return the user's task completion rate for the last three months
- Body Parameters:
  - field: String //this can be empty string, you can change it for later development
- Expected Response:
  - 200 OK
    - return the rate as float
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error

## getAllComp

- Description: return the user's task completion rate for all tasks until last month
- Body Parameters:
  - field: String //this can be empty string, you can change it for later development
- Expected Response:
  - 200 OK
    - return the rate as float
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error

## getOverdue

- Description: return the user's all unfinished tasks until yesterday
- Body Parameters:
  - field: String //this can be empty string, you can change it for later development
- Expected Response:
  - 200 OK
    - return all unfinished tasks
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error

## suggestion

- Description: return the suggest task time based on the given tagID and expect time
- Body Parameters:
  - hour: Int
  - minute: Int
  - tagID: ID
- Expected Response:
  - 200 OK
    - return the suggestion in the format of hour and minute
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error

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
- hour: int // expected time stored as hour and minute
- minute: int
- expectedDuration: int
- actualDuration: int
- notifiable: boolean
- notifyTime: int
- isRepeat:Boolean
- dayWeekMonth: String //should be day, week or month
- frequency:String //if repeat on month or every n days, put the date or n; if
  repeat on week, e.g. every Mon, Wed and Fri, put 135 as string
- repeatStartDay: String //created based on day, month and year. It's the start
  day of this repeat task in ISO String, used to calculated which day it should
  be showed.
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
