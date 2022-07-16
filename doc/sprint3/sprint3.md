# Sprint 3

JUL 7, 2022

Discord

## Goal of sprint 3

For Sprint3, our team will focus on polishing the app even further besides
completing user stories CYC-30, CYC-33, CYC-128, CYC-129, CYC-152. At the end of
Sprint3, we want to have a web app for users to see the task groups in the side
bar, Daily Log, Monthly Log and Future Log and switch between each view, can add
tasks anywhere and see them show on the corresponded views and be able to
reschedule tasks. Overall, out team use this sprint3 to debug and improve user
experience.

## User Stories

- CYC-30: modify task
  - CYC-108: 	backend- create function for different fields/tasks so frontend can update the task using this function
  - CYC-153: frontend - a pencil button beside each tasks to edit/reschedule the task
  - CYC-154: Clicking on the edit task button brings up edit task pop up
  - CYC-162: frontend - the pencil button should be visible only when hovering
  - CYC-171: backend - provide a function to delete task over on a task 
  - CYC-180: backend - create schedule in the database
  - CYC-181: frontend - implement deleting a task
  
- CYC-33: signifiers / actions on the tasks
  - CYC-104: frontend - update task template to display the different icons from the signifiers.
  - CYC-110: backend- create a relative function to update different
    fields(important, completed)
  - CYC-160: frontend - set color of signifier symbol to task's tag color
  - CYC-163: frontend - dropdown list to toggle signifier when user clicks on signifiers.
  - CYC-167: iddle end - add service to get and set task signifier
  
- CYC-128: housekeeping / wrapping up sprint 2
  - CYC-130: daily log should display in grid layout
  - CYC-136: daily log should be able to scroll
  - CYC-131: monthly log add calendar on left hand side
  - CYC-133: monthly log: display monthly tasks on the right hand side of the
    screen
  - CYC-138: future log: display all months of the year in grid layout
  - CYC-139: future log: display tasks planned for each month under the month
    title
  - CYC-141: tag: display all user's tags on the left menu
  - CYC-142: tag: add tag
  - CYC-147: top menu bar: display the user name after successful log in
  - CYC-157: backend - store tag color inside task when user creating a new task
  - CYC-169: backend - store month and year for future log
  - CYC-172: backend - update backend functions based on SP3 google doc
  - CYC-174: backend - return task sort by time or day in getDailyTask and
    getMonthlyTask
  - CYC-175: backend - tasks displayed on Daily log is not in chronological
    order
  - CYC-176: frontend - display the future log starting at the current month
  - CYC-177: frontend - increase the contrast on the buttons
  - CYC-178: backend - store time as empty string when there is no time
  - CYC-179: backend - return all tasks start from next month until 1 year later in get future log

- CYC-129: debug sprint 2
  - CYC-135: side bar: indicate which page the user is on
  - CYC-140: future log: add task has too many fields.
  - CYC-144: display appropriate error messages for failed login and register
  - CYC-145: (fixed) Tags are always displayed as the default tag color (red
    box)
  - CYC-146: (fixed) daily log doesn't display tasks on that day
  - CYC-173: backend - throw error if password is too weak

- CYC-152: notification before start / end date of a task
  - CYC-182	frontend - send notification at dueTime  
  - CYC-183	frontend - send system notification
  - CYC-184	frontend - request permission to send system notifications if the app has not yet been granted permission
## Team Capacity

62 hours

## Spikes

- Fixing bugs that we left in the previous sprints and doing some updates to improve the current functions
- Adjusting the meeting time and starting this sprint early to make work more efficient

## Participants

- Tianpai Zhang (Tp)
- Yiming Zheng (Daniel)
- Yining He (Jeffrey)
- Dane Gledhill
- Andrew D’Amario
- Yi Hai Xiao (Ricky)
- Kexin Zhai (Maxine)
