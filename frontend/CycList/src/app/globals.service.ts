import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private static tasks = [
    {
      content: "",
      name: "loading ...",
      day: "__",
      month: "__",
      year: "____",
      startTime: "00:00"
    }
  ];

  private static user = {
    userId: [null],
    email: [null],
    nickName: [null],
    token: [null]
  };

  constructor() { }

  static getToken(cookie: CookieService) {
    return cookie.get("user.token");
  }

  static getTasks() {
    return GlobalsService.tasks;
  }

  static setUser(user: any) {
    GlobalsService.user = user;
  }

  static getUser() {
    return GlobalsService.user;
  }

  // static signin() {
  //   GlobalsService.cookie.set('user', 'Readerstacks', 2, '/', "Cyclist", true, 'Lax');
  // }

  static login(form: FormGroup) {
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
    fetch("http://localhost:3000/graphql", {
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
        console.log(form);
        console.log(data);
        // refresh, ISN'T WORKING THOUGH
        GlobalsService.setUser(data);
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }



  static getAllTasks(type: string) {
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
    fetch("http://localhost:3000/graphql", {
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
        GlobalsService.tasks = data.data.getAllTask;
        console.log(GlobalsService.tasks);
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }

  static getDailyTasks(day: number, month: number, year: number) {
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
    fetch("http://localhost:3000/graphql", {
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
        GlobalsService.tasks = data.data.getDailyTask;
        console.log(GlobalsService.tasks);
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }
  static getFutureTasks(year: number) {
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
    fetch("http://localhost:3000/graphql", {
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
        GlobalsService.tasks = data.data.getFutureTask;
        console.log(GlobalsService.tasks);
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }

  static createTask(form: FormGroup) {
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
    fetch("http://localhost:3000/graphql", {
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
        console.log(form);
        // refresh, ISN'T WORKING THOUGH
        GlobalsService.getAllTasks("");
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }
}
