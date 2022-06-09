import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss']
})
export class DailyViewComponent implements OnInit {

  constructor() { }

  // app = new AppComponent();
  tasks = new Array();

  ngOnInit(): void {
    // this.app.getTasks();
    this.getDailyTasks(3, 6, 2022);
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
        // console.log(this.tasks);

      }
    })
    .catch(err =>{
      console.log(err)
    });
  }

}
