# Sprint 1 Planning Meeting

Location and date: June 2 on Discord

## Sprint Goals

For Sprint1, the frontend team will focus on learning Angular for building the app, the backend team will focus on doing the basic setup related to the database for the project, the QA team will focus on testing whether all the user stories our team want to complete in sprint1 work well. Our team will focus on completing user stories CYC-63, CYC-60, CYC-27, CYC-38 and CYC-66. At the end of Sprint1, we want to have a web app by which users can see the navigation bars for Dashboard, Daily Log, Monthly Log and Future Log and switch between each view, can add tasks and see them show on the Dashboard page in a consistent format and can change to the dark mode.

## User Stories

Sprint 1 user stories to be completed

- CYC-63: As a frontend developer, I want to learn Angular so that I can start
  my project. (~ 7hrs)
- CYC-60: As a user, I want to use a sidebar to switch between each view (daily
  log, monthly log, and future log). (~ 1hr)
  - As a frontend developer, I want to switch views.
  - As a frontend developer, I want to switch views from a sidebar.
  - As a QA, I want to test this feature by following the criteria we create so
    that our web app works well.
- CYC-27: As a user, I want to press an add button to input information about a
  new task, and create the new task. (~ 12hrs)
  - create the database to store the tasks
  - create a add button and pop-up window
  - provide a function to add task to database based on the data sent by frontend
  - initialize backend server using Express and graphQL to receive request and send response to the frontend
  - get task data from backend and display it to user
  - test this feature by following the criteria we create so that our web app
    works well.
  - test that a new task will appear on the dashboard page if I create one by
    clicking the add button and completing the task template.
- CYC-38: As a user, I want to use it in the dark mode so that I can comfortably
  use it at night. (~ 0.5hrs)
  - create a dark mode color version for the web app
- CYC-66: As a user, I want to view each task with a consistent format. (~ 4hrs)
  - send task data to frontend with consistent format
  - implement getAllTask to return all tasks that the user have in database
  - implement getDailyTask to return all tasks that the user have on the given date in database
  - implement getSingleTask to return the details of the given task id in database
  - get task data from backend and display it to user

## Spikes

- Navigating the database (MongoDB)
- Jira Agile tracking
- Coordinating meetings for all to attend.

## Potential spikes:

- Researching Angular frontend
- Getting familiar with MongoDb.
  - Connecting backend to frontend, and backend to database.

## Team Capacity

Approximated 24 hrs

## Participants

All members attended the release planning meeting

- Tianpai Zhang (Tp)
- Yiming Zheng (Daniel)
- Yining He (Jeffrey)
- Dane Gledhill
- Andrew D’Amario
- Yi Hai Xiao (Ricky)
- Kexin Zhai (Maxine)
