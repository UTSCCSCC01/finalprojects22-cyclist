import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
// import { Time } from './time';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  constructor(
    private fb: FormBuilder,
    private cookie: CookieService
    ) {
  }


  







  /***************/
  /* Navigation  */
  /***************/
  public curLog = "daily";
  public colorMode = "auto";
  public async refresh() {
    this.getAllTags();
    this.getDashboardTasks();
    this.getNDailyTasks();
    this.getFutureLogTasks();
    this.getMonthlyLogTasks();
  }









  /*********************/
  /* Error / Messages  */
  /*********************/
  public em: string = "";
  public setErr(em: any) {
    this.em = em;
  }
  public getErr() {
    return this.em;
  }









  /***************/
  /* Time        */
  /***************/
  public now: any;
  public oneYear: any;
  public oneMonth: any;
  public minYear: any;
  public maxYear: any;
  public minMonth: any;
  public maxMonth: any;
  public nDays: number = 6;
  public nDates: Date[] = [];
  public setAppTime() {
    this.now = new Date();
    this.oneYear = new Date(this.now.getFullYear() + 1, this.now.getMonth(), this.now.getDay());
    this.oneMonth = new Date(this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDay());
    this.minYear = this.now.toISOString().slice(0,10);
    this.maxYear = this.oneYear.toISOString().slice(0,10);
    this.minMonth = this.now.toISOString().slice(0,7);
    this.maxMonth = this.oneYear.toISOString().slice(0,7);
    this.setNDates();
    // TODO: update when go to a new day
  }
  public setNDates() {
    //get the upcomming `this.numDates` dates
    let today = new Date();
    for (let i = 0; i < this.nDays; i++) {
      this.nDates[i] = new Date();
      this.nDates[i].setDate(today.getDate() + i);
    }
  }







  /***************/
  /* Login       */
  /***************/
  private user: any = {};
  //   this.user = {
  //     userId: "",
  //     email: "",
  //     nickName: "",
  //     token: ""
  //   };
  public loggedIn: boolean = false;
  public loginError = "";
  public getToken() {
    return this.user.token;
  }
  public resetUser() {
    this.user = '';
  }
  public loadUser() {
    if (this.cookie.check('user'))
      this.user = JSON.parse(this.cookie.get('user'));
  }
  public setUser(user: any) {
    this.user = user;
  }
  public getUser() {
    return this.user;
  }
  public isAuthenticated() {
    // check if the user is Authenticated (signed in)
    // return this.user.userId !== "";
    return this.cookie.check("user");
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
          this.setErr("Something wrong with server, please contact to admin");
        }else{
          console.log("** " + data.errors[0].message + " **");
          this.setErr("** " + data.errors[0].message + " **");
        }
      }else{ 
        // all g!        
        this.setUser(data.data.createUser);
        // console.log(cookie.get('user'));
        // cookie.set('user', data);
      }
    })
    .catch(err =>{
      // 
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
          this.setErr("Something wrong with server, please contact to admin");
        }else{
          console.log("** " + data.errors[0].message + " **");
          this.setErr("** " + data.errors[0].message + " **");
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
  public logout() {
    this.resetUser();
    this.cookie.delete('user');
    this.loggedIn = false;
    this.dashboardTasks = [];
    this.dailyTasks = [];
    this.monthlyTasks = [];
    this.futureTasks = [];
  }








  /***************/
  /* Tasks       */
  /***************/
  public tasks = [
    // {
    //   content: "",
    //   name: "loading ...",
    //   day: "__",
    //   month: "__",
    //   year: "____",
    //   dueTime: "00:00",
    //   tag: ""
    // }
  ];
  public taskFormActive: boolean = false;
  public taskFormWeek = [false, false, false, false, false, false, false];
  form: FormGroup = this.fb.group({
    _id: null,
    name: null,
    // description: null,
    // signifier: null,          // maybe just call it type????????
    content: "",
    schedule: false,
    dueDate: null,            // please merge     day: Int month: Int year: Int
    dueTime: null,
    // startDate: null,
    
    // startTime: null,
    // expectedDuration: null,  // pointless because we have start and due/end unless this is an AI value

    isRepeat: false,         // maybe just repeat true of false
    frequency: "",
    dayWeekMonth: null,   // add year?
    // repeatStartDay: null,     // only in backend

    tagID: "",                // maybe just call tag, group, was this what was meant????????
    // priority: null,         // maybe like options: ! !! or !!!    
    // mood: null,
    // location: null,
    // interests: null,        // ?????????

    // reminders: null,      // TODO: need to be able to have multiple so maybe an array of 
    // collaborations: null  // TODO: add friends that you will do that job with

                            // Ideas: file (image), url
    // frontend fields that need to be parsed
    tempDueMonth: null,
    tempDueDate: null,
  });
  public formReset() {
    this.taskFormWeek = [false, false, false, false, false, false, false];
    this.form.reset();
    this.form.patchValue({
      frequency: "",
      isRepeat: false,
      tagID: "",
      content: ""
    });
  }
  public dashboardTasks: any[] = [];
  public dailyTasks: any[] = [];
  public monthlyTasks: any[] = [];
  public futureTasks: any[] = [];


  public query(command: string, args: string) {
    return `
    query {
      ${command}(${args}){
        _id
        name
        content
        day
        month
        year
        schedule
        dueTime
        dueDate
        isRepeat
        frequency
        dayWeekMonth
        tag
        color
      }
    }
    `
    // ones that are excluded:
      // creater
      // hierarchy
      // expectedDuration
      // actualDuration
      // start
      // repeatStartDay
      // subTask
      // parentTask
      // identity
      // mood
      // location
      // important

  }
  /**
   * reset the value of `this.tasks` to default value. 
   * This is to solve the problem that switching between pages briefly show 
   * tasks from the previous page.
   */
  public resetTasks() {
    this.tasks = [
      // {
      //   content: "",
      //   name: "loading ...",
      //   day: "__",
      //   month: "__",
      //   year: "____",
      //   dueTime: "00:00",
      //   tag: ""
      // }
    ];
  }
  public setTasks(tasks: any) {
    if (tasks) this.tasks = tasks;
  }
  public getTasks() {
    return this.tasks;
  }
  public async getDashboardTasks() {
    // TODO: actual update for Dashboard
    await this.getAllTasks("");
    this.dashboardTasks = this.getTasks().slice();
    // console.log(this.dashboardTasks);
  }
  public async getAllTasks(type: string) {
    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query: this.query(`getAllTask`, `type: "${type}"`)
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
      query: this.query(`getDailyTask`, `day: ${day}, month: ${month}, year: ${year}`)
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
      query: this.query(`getMonthTask`, `month: ${month}, year: ${year}`)
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
    // console.log("getFutureLogTasks");
    // console.log(this.futureTasks)
  }
  public async getFutureTasks(year: number) {
    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query: this.query(`getFutureTask`, `year: ${year}`)
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
  public async createModifyTask(value: any) {

    // let taskGroup = (document.querySelector('input[name="taskGroup"]:checked') as HTMLInputElement).value;
    // console.log("TASK GROUP " + taskGroup);

    // console.log(value);

    let query = "";
    if (!value._id) {
      query = `
      mutation {
        createTask(date:"${value.dueDate}",repeat:${value.isRepeat}, content:"${value.content}",name:"${value.name}", dueTime:"${value.dueTime}", frequency:"${value.frequency}", dayWeekMonth:"${value.dayWeekMonth}", tagID:"${value.tagID}"){
          name
        }
      }
      `
    } else {
      query = `
      mutation {
        modifyTask(taskId:"${value._id}",date:"${value.dueDate}",repeat:${value.isRepeat},dayWeekMonth:"${value.dayWeekMonth}",frequency:"${value.frequency}",content:"${value.content}", dueTime:"${value.dueTime}",expectedDuration:0,name:"${value.name}",tagID:"${value.tagID}"){
          name
        }
      }
      `
    }

    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query: query,
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
  public async deleteTask(id: string) {
    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query: `
      mutation {
        deleteTask(id:"${id}")
      }
      `,
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







  /***************/
  /* Tags        */
  /***************/
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
  public async createTag(value: any) {
    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query:`
      mutation {
        createTag(name:"${value.name}", color:"${value.color}"){
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
        // all g!
        this.getAllTags();
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }







}
