import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  test: string = "hello";
  tasks = [
    {
      content: "loading ..."
    }
  ];

  constructor() { }

  sayHi() {
    console.log(this.test);
  }

  getTasks() {
    return this.tasks;
  }


  getDailyTasks(day: number, month: number, year: number) {
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
        this.tasks = data.data.getDailyTask;
        console.log(this.tasks);
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }

  createTask(form: FormGroup) {
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
      }
    })
    .catch(err =>{
      console.log(err)
    });
  }
}
