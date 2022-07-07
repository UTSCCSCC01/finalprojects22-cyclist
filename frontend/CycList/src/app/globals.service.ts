import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  public loggedIn: boolean = false;
  public curLog = "daily";


  public tasks = [
    {
      content: "",
      name: "loading ...",
      day: "__",
      month: "__",
      year: "____",
      startTime: "00:00",
      tag: ""
    }
  ];

  public tags = [
    {
      _id: "",
      creater: "",
      name: "",
      color: "",
      icon: 0,
      totalExpectedTime: 0,
      totalActualTime: 0
    }
  ];

  public nDays: number = 7;
  public nDates: Date[] = [];

  public dashboardTasks: any[] = [];
  public dailyTasks: any[] = [];
  public monthlyTasks: any[] = [];
  public futureTasks: any[] = [];

  private user: any = {};
  
  constructor(private cookie: CookieService) {
    // this.resetUser();
  }

  public getToken() {
    // return JSON.parse(this.cookie.get('user')).token;
    return this.user.token;
  }

  public resetUser() {
    this.user = '';
  //   this.user = {
  //     userId: "",
  //     email: "",
  //     nickName: "",
  //     token: ""
  //   };
  }

  /**
   * reset the value of `this.tasks` to default value. 
   * This is to solve the problem that switching between pages briefly show 
   * tasks from the previous page.
   */
  public resetTasks() {
    this.tasks = [
      {
        content: "",
        name: "loading ...",
        day: "__",
        month: "__",
        year: "____",
        startTime: "00:00",
        tag: ""
      }
    ];
  }

  public refresh() {
    this.getDashboardTasks();
    this.getNDailyTasks();
    this.getFutureLogTasks();
    this.getMonthlyLogTasks();
    this.getAllTags();
  }

  public loadUser() {
    if (this.cookie.check('user'))
      this.user = JSON.parse(this.cookie.get('user'));
  }

  public setUser(user: any) {
    this.user = user;
  }

  public setTasks(tasks: any) {
    if (tasks) this.tasks = tasks;
  }

  // TODO: update when go to a new day
  public setNDates() {
    //get the upcomming `this.numDates` dates
    let today = new Date();

    for (let i = 0; i < this.nDays; i++) {
      this.nDates[i] = new Date();
      this.nDates[i].setDate(today.getDate() + i);
    }
  }

  public getUser() {
    return this.user;
  }

  public getTasks() {
    return this.tasks;
  }

  // check if the user is Authenticated (signed in)
  public isAuthenticated() {
    // return this.user.userId !== "";
    return this.cookie.check("user");
  }

  public logout() {
    this.resetUser();
    this.cookie.delete('user');
    this.loggedIn = false;
    this.dashboardTasks = [];
    this.dailyTasks = [];
    this.monthlyTasks = [];
    this.futureTasks = [];
  }

  public async register(form: FormGroup) {
    const body = {
      query:`
      mutation {
        createUser(email: "${form.value.email}", nickName: "${form.value.name}", password: "${form.value.password}"){
          userId
          email
          nickName
          token
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    await fetch("http://localhost:3000/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json'
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log("Something wrong with server, please contact to admin");
        }else{
          console.log("** " + data.errors[0].message + " **");
        }
      }else{ 
        // all g!        
        this.setUser(data.data.createUser);
        // console.log(cookie.get('user'));
        // cookie.set('user', data);
      }
    })
    .catch(err =>{
      console.log(err)
    });

    if (this.getUser()) {
      // since we awaited the fetch, we have the data now and set it in the cookie
      this.cookie.set('user', JSON.stringify(this.getUser()));
    }
  }
  public async login(form: FormGroup) {
    const body = {
      query:`
      query {
        emailLogin(email: "${form.value.email}", password: "${form.value.password}"){
          userId
          email
          nickName
          token
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    await fetch("http://localhost:3000/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json'
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log("Something wrong with server, please contact to admin");
        }else{
          console.log("** " + data.errors[0].message + " **");
        }
      }else{ 
        // all g!        
        this.setUser(data.data.emailLogin);
        // console.log(cookie.get('user'));
        // cookie.set('user', data);
      }
    })
    .catch(err =>{
      console.log(err)
    });

    if (this.getUser()) {
      // since we awaited the fetch, we have the data now and set it in the cookie
      this.cookie.set('user', JSON.stringify(this.getUser()));
    }
  }

  public async getDashboardTasks() {
    // TODO: actual update for Dashboard
    await this.getAllTasks("");
    this.dashboardTasks = this.getTasks().slice();
  }
  public async getAllTasks(type: string) {
    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query:`
      query {
        getAllTask(type: "${type}"){
          content
          name
          day
          month
          year
          startTime
          tag
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    await fetch("http://localhost:3000/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json',
      "Authorization": this.getToken()
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log("Something wrong with server, please contact to admin");
        }else{
          console.log("** " + data.errors[0].message + " **");
        }
      }else{
        this.setTasks(data.data.getAllTask);
        // console.log(this.tasks);
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }

  public async getNDailyTasks() {
    //get each day's tasks
    for(let i = 0; i < this.nDays; i++) {
      await this.getDailyTasks(this.nDates[i].getDate(), this.nDates[i].getMonth() + 1, this.nDates[i].getFullYear());
      // console.log(this.nDates[i].getDate());
      // console.log(this.nDates[i].getMonth() + 1);
      // console.log(this.nDates[i].getFullYear());

      this.dailyTasks[i] = this.getTasks().slice();
      // console.log(this.dailyTasks[i]);
    }
    // console.log(this.dailyTasks);
  }
  public async getDailyTasks(day: number, month: number, year: number) {
    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query:`
      query {
        getDailyTask(day: ${day}, month: ${month}, year: ${year}){
          content
          name
          day
          month
          year
          startTime
          tag
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    await fetch("http://localhost:3000/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json',
      "Authorization": this.getToken()
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log("Something wrong with server, please contact to admin");
        }else{
          console.log("** " + data.errors[0].message + " **");
        }
      }else{
        this.setTasks(data.data.getDailyTask);
        // console.log(this.tasks);  // [DEBUG]
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }

  public async getMonthlyLogTasks() {
    // TODO: Actually update for Monthly Log
    let date = new Date();
    await this.getMonthlyTasks(date.getMonth()+1, date.getFullYear());
    this.monthlyTasks = this.getTasks().slice();
  }
  public async getMonthlyTasks(month: number, year: number) {
    const body = {
      query:`
      query {
        getMonthTask(month: ${month}, year: ${year}){
          _id
          content
          name
          day
          month
          year
          startTime
          tag
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    await fetch("http://localhost:3000/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json',
      "Authorization": this.getToken()
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log("Something wrong with server, please contact to admin");
        }else{
          console.log("** " + data.errors[0].message + " **");
        }
      }else{
        this.setTasks(data.data.getMonthTask);
        // console.log(this.getTasks());
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }

  public async getFutureLogTasks() {
    // TODO: Actually update for Future Log
    await this.getFutureTasks((new Date()).getFullYear());
    this.futureTasks = this.getTasks().slice();
    console.log("getFutureLogTasks");
    console.log(this.futureTasks)
  }
  public async getFutureTasks(year: number) {
    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query:`
      query {
        getFutureTask(year: ${year}){
          _id
          content
          name
          day
          month
          year
          tag
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    await fetch("http://localhost:3000/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json',
      "Authorization": this.getToken()
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log("Something wrong with server, please contact to admin");
        }else{
          console.log("** " + data.errors[0].message + " **");
        }
      }else{
        this.setTasks(data.data.getFutureTask);
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }

  public async createTask(value: any) {

    // let taskGroup = (document.querySelector('input[name="taskGroup"]:checked') as HTMLInputElement).value;
    // console.log("TASK GROUP " + taskGroup);

    console.log(value);

    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query:`
      mutation {
        createTask(hierarchy:"${this.curLog}",date:"${value.dueDate}",repeat:${value.isRepeat}, content:"${value.description}",name:"${value.name}", startTime:"${value.dueTime}", frequency:"${value.frequency}", dayWeekMonth:"${value.dayWeekMonth}", tagID:"${value.tagID}"){
          content
          startTime
          day
          month
          year
          tag
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    await fetch("http://localhost:3000/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json',
      "Authorization": this.getToken()
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log("Something wrong with server, please contact to admin");
        }else{
          console.log("** " + data.errors[0].message + " **");
        }
      }else{
        // all g!
        this.refresh();
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }

  public getTags() {
    return this.tags;
  }

  public setTags(tags: any) {
    this.tags = tags;
  }

  public async getAllTags() {
    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query:`
      query {
        getAllTag(id: "${this.getUser().userID}"){
          _id
          creater
          name
          color
          icon
          totalExpectedTime
          totalActualTime
        }
      }
      `
    }
    let err = false;
    let backenderr = false;
    await fetch("http://localhost:3000/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json'
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
      }
      return res.json();
    })
    .then(data =>{
      if(err){
        if(backenderr){
          console.log("Something wrong with server, please contact to admin");
        }else{
          console.log("** " + data.errors[0].message + " **");
        }
      }else{
        this.setTags(data.data.getAllTag);
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }


  public async getTag(tagID: string) {
    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    if (tagID) {
      const body = {
        query:`
        query {
          getTag(tagId: "${tagID}"){
            _id
            creater
            name
            color
            icon
            totalExpectedTime
            totalActualTime
          }
        }
        `
      }
      let err = false;
      let backenderr = false;
      await fetch("http://localhost:3000/graphql", {
      method: 'POST',
      body: JSON.stringify(body),
      headers:{
        "Content-Type": 'application/json',
        "Authorization": this.getToken()
      }
      })
      .then(res =>{
        if(res.status !== 200 && res.status !== 201){
          err = true;
          if(res.status === 400){
            backenderr = true;
          }
        }
        return res.json();
      })
      .then(data =>{
        if(err){
          if(backenderr){
            console.log("Something wrong with server, please contact to admin");
          }else{
            console.log("** " + data.errors[0].message + " **");
          }
        }else{
          this.setTags([data.data.getTag]);
          console.log(this.getTags());
          // return data.data.getTag;
        }
      })
      .catch(err =>{
        console.log(err)
      });
    } else {
      console.log("Tag ID is null")
    }
  } 
}
