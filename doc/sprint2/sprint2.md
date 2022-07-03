# Sprint 2

JUN 20, 2022

Discord

## Goal of sprint 2

For Sprint2, the frontend team will focus on implementing more features for the
app, the backend team will focus on adding more fields into the database more
features, the QA team will focus on testing whether all the user stories our
team want to complete in sprint2 works well. Our team will focus on completing
user stories CYC-46, CYC-47, CYC-58, CYC-59, CYC-32, CYC-35 and CYC-62. At the
end of Sprint2, we want to have a web app for users to see the task groups in
the side bar, Daily Log, Monthly Log and Future Log and switch between each
view, can add tasks and see them show on the corresponded views and be able to
reschedule tasks.

## User Stories

1. (CYC-46): As a user, I want to register an account with my email account so that 
   I can use the app from where I left off.(7 hrs)
   
   - frontend - email, username?, password, confirm password inputs
   - implement backend function for creating user
   - Test registering a user.
   - frontend - create account button
   
2. (CYC-47): As a user, I want to log in to my account so that I can use the app
   from where I left off.
   
   - frontend - username & password inputs
   - frontend - login button
   - backend - verify user and generate token, also provide logout function
   - frontend - link to register account
   - backend - update all other functions by using token to get userid
   - Test logging in as a user
   
3. (CYC-58): As a user, I want to view my tasks on the daily view page, which
   displays tasks in the next 7 days so that it is easy for me to check the 
   tasks in the following complete week.
   
   - frontend - one section for each of the next 6/7 dates displayed in grid
     labeled with their corresponding dates
   - frontend - create task rendering template, including: task icon, title
   - backend- create a relative function to return a list of tasks the user need
     todo on the given date
   - Test scheduled viewing tasks on the daily view page
   
4. (CYC-59): As a user, I want to view my tasks on a monthly log, as a list, so
   that I remember to schedule them later.
   
   - frontend - display the current month and year
   - frontend - present list of tasks planned for this month
   - backend- create a relative function to return a list of tasks the user need
     to do in the given month
   - Test viewing scheduled tasks on a monthly log
   
5. (CYC-62): As a user, I want to view my list of unscheduled tasks on a future
   log, so that I remember to schedule them later.
   
   - frontend - present list of tasks with no planned date or month
   - backend- create a relative function to return a list of tasks the user have
     for future time
   - Test viewing the list of unscheduled tasks on a future log
   
6. (CYC-31): As a user, I want to set a task to be repeated regularly (like
   every Monday, the task will have a unique signifier) so that it is convenient
   to create the same tasks for different days.

   - frontend - create repeat task button, and implement its functions.
   - backend- create a function to create a repeated task in database
   - Test setting a task to be repeated regularly with a unique signifier

7. (CYC-35): As a user, I want to create task groups (with possible start and
   end dates) containing a set of tasks and set colors and icons for them so
   that I can have a better visual representation of related tasks.

   - backend - create a function to create a new task group in database, saving
     the relevant information
   - frontend - create side bar that houses the task groups
   - frontend - add task group input field in add tasks form
   - backend - allow user to choose a tag when create a new task
   - backend - get all task groups created by user
   - Test creating task groups (with possible start and end dates) containing a
     set of tasks and set colors and icons for them
     
## Spikes

- The connection between the frontend part and the backend part including the user information with respect to logging in and registering
- The adjustment of team members' work status after the Reading Week


## Team Capacity

50 hours

## Participants

- Tianpai Zhang (Tp)
- Yiming Zheng (Daniel)
- Yining He (Jeffrey)
- Dane Gledhill
- Andrew D’Amario
- Yi Hai Xiao (Ricky)
- Kexin Zhai (Maxine)
