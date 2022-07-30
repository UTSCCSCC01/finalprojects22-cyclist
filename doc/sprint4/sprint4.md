# Sprint 4

JUL 18, 2022, on Discord

## Goal of sprint 4

For Sprint4, our team will focus on polishing the app even further besides
completing user stories CYC-149, CYC-37, CYC-45, CYC-64, CYC-39. At the end of
Sprint4, users will have a complete experience of our Bullet Journal App. Users
are able to set notification, see overdue tasks, view next 6 days weather,
obtain suggested duration time for a tasks after choosing a tag for a task, and
track completion rate of all tasks on Dashboard. Overall, the app is
well-designed and implemented and ready to be deployed if needed.

## User Stories

1. CYC-149: As a user, I want the dashboard page to display my overdue and completed
   tasks, so that I get reminded to complete the task.
   1. CYC-156: create a grid layout that act as containers for dashboard components (weather, completion rate, incoming notifications, overdue tasks)
   2. CYC-188: Implement middle-end function to get overdue tasks
   3. CYC-189: Style a task component to display an overdue task
   4. CYC-190: Style front-end dashboard “overdue tasks” component 
   5. CYC-206: backend - provide functions to return overdue task
   6. CYC-209:	weather in the dashboard
   7. CYC-210: Display the task completion rate for (all time, past 3 months (seasonal), last month)
2. CYC-37: As a user, I want to see the weather for each day beside each day’s entry in
   the daily log so that I can plan my tasks better with the weather in mind.
   1. CYC-191: Find a suitable weather API for local weather.
   2. CYC-192: Daily log - add a weather icon and temperature on the right of each day
3. CYC-45: As a user, I want the app to notify me in advance so that I can have a better
   preparation of the task before it takes place.
   1. CYC-185: backend - store time and notifiable for each task
   2. CYC-194: Add & edit task - add input fields: yes/no notify & dropdown to select notification (check for valid input, edge cases, etc.)
   3. CYC-197: Schedule notifications to display at their specified times.
4. CYC-64: As a user, I want to suggest a duration time for each task I create.
   1. CYC-198: Add & edit task - add “estimated time” input field (check for valid input, edge cases, etc.)
   2. CYC-200: Display the suggested time only after the user enters an estimated time & tag.
   3. CYC-201: Display mandatory input “actual completion time” when the user marks a task as complete.
   4. CYC-202: Implement a global-service function to store the actual completion time.
   5. CYC-207: backend - update expected and actual time in tag when task has been finished
   6. CYC-213: backend - provide a suggestion time based on given expect time and tag
   7. CYC-214: Implement a middle-end function to get the suggested time from the backend based on user inputs: estimated time & tag.
5. CYC-39: As a user, I want the app to track my task completion rate so that I
   understand my actual ability to complete the task.
   1. CYC-204: Implement a middle-end function to fetch the user’s task completion rates.
   2. CYC-208: backend - provide completion rate for all tasks
   3. CYC-211: backend - provide completion rate for last month
   4. CYC-212: backend - provide a completion rate for last 3 months

## Team Capacity

- 48 hours

## Participants

- Tianpai Zhang (Tp)
- Yiming Zheng (Daniel)
- Yining He (Jeffrey)
- Dane Gledhill
- Andrew D’Amario
- Yi Hai Xiao (Ricky)
- Kexin Zhai (Maxine)
