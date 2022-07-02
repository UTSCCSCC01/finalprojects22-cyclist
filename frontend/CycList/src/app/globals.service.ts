import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  public loggedIn: boolean = false;

  public tasks = [
    {
      content: "",
      name: "loading ...",
      day: "__",
      month: "__",
      year: "____",
      startTime: "00:00"
    }
  ];

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

  public loadUser() {
    if (this.cookie.check('user'))
      this.user = JSON.parse(this.cookie.get('user'));
  }

  public setUser(user: any) {
    this.user = user;
  }

  public setTasks(tasks: any) {
    this.tasks = tasks;
  }

  public getUser() {
    return this.user;
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

  public async getDailyTasks(day: number, month: number, year: number) {
    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query:`
      query {
        getDailyTask(day: ${day}, month: ${month}, year: ${year}){
          content
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
        // console.log(this.tasks);
      }
    })
    .catch(err =>{
      console.log(err)
    });
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
          startTime
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

  public async createTask(form: FormGroup) {
    // if user is not Authenticated (signed in), don't let them
    if (!this.isAuthenticated()) return;
    const body = {
      query:`
      mutation {
        createTask(hierarchy:"daily",date:"${form.value.dueDate}",repeat:"single", content:"${form.value.description}",name:"${form.value.name}", startTime:"${form.value.dueTime}"){
          content
          startTime
          day
          month
          year
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
        console.log(form);
        // refresh, ISN'T WORKING THOUGH
        this.getAllTasks("");
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }
}
