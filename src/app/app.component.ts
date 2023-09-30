import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component,  ViewEncapsulation, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { NgxSerial } from 'ngx-serial';
import { FormsModule } from "@angular/forms";
import { delay, min } from 'rxjs';


interface Data {
  temp: Number;
  humi: Number;
  bright: Number;
  sHumi_1: number;
  sHumi_2: Number;
}

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public pumpStat: any;
  public fanStat: any;
  public pumpStatRaw: any;
  public fanStatRaw: any;

  public auto: any;

  public minT: any;
  public maxT: any;

  public minH: any;
  public maxH: any;

  public minS: any;
  public maxS: any;

  public humdT: any;
  public humdN:any;

  public soilN: any;
  public soilT: any;

  public slider_1: any;
  public message: any;

  public serial: any;
  public pumpDate = new Date();
  public fanDate = new Date();
  public data : Data ;
  //data = {temp: Number, humi: Number, bright: Number, sHumi: Number};
  public port: any;

  ngOnInit(): void {
    this.serial = new NgxSerial(
      this.dataHandler.bind(this)
    );
  }



  constructor() {

    //send arduino vars
    this.fanStatRaw = false;
    this.pumpStatRaw = false;

    this.fanStat = 0;
    this.pumpStat = 0;
    
    this.minT = 0;
    this.maxT = 0;  

    this.minH = 0;
    this.maxH = 70;

    this.minS = 0;
    this.maxS = 50;

    this.humdT = false;
    this.soilT = false;

    this.data = {
      temp: 0,
      humi: 0,
      bright: 0,
      sHumi_1: 0,
      sHumi_2:0
    };
  }

  connect() {
    if(!this.port){
      this.serial.connect((port:any)=>{
        this.port = port;
      });
    }
  }
  sendData(){
    (async () => { 
      // Do something before delay
      console.log("before delay " + this.fanStat + ";" + this.pumpStat)
      this.serial.sendData(this.fanStat + ";" + this.pumpStat);

      await new Promise(f => setTimeout(f, 2000));

      // Do something after
      console.log("after delay " + this.fanStat + ";0");
      this.serial.sendData(this.fanStat + ";0");
      this.pumpStat = 0;
      this.pumpStatRaw = false;
    })();
  }

  sendState(){
    if(!this.auto){
      //console.log(this.pumpStatRaw + " + " + this.fanStatRaw);
      if(this.pumpStatRaw){
        this.pumpStat = 1;
      }else{
        this.pumpStat = 0;
      }
  
      if(this.fanStatRaw){
        this.fanStat = 1;
      }
      else{
        this.fanStat = 0;
      }
      //console.log(this.pumpStat + " + " + this.fanStat);
      //this.serial.sendData(this.fanStat + ";" + this.pumpStat);
      this.sendData();
    }
  }

  addMinutes(date: Date, minutes : number) {
    return new Date(date.getTime() + minutes*60000);
  }

  autoMode(){
    var datePumpAfter : Date= this.addMinutes(this.pumpDate,1);
    var send = false;
    //console.log("new " + new Date() + " fandate - " + this.fanDate + " add - " + dateFanAfter);
    if(this.data.humi > this.maxH ){
      console.log("Activating Fan++++++++")
      this.fanStatRaw = 1;
      this.fanStat = 1;
      this.pumpStat = 0;
      this.pumpStatRaw = 0;
      this.fanDate = new Date();
      //this.sendData();
      send = true;
    }
    if(this.data.humi < this.maxH && this.fanStatRaw == 1){
      console.log("DeActivating Fan------")
      this.fanStatRaw = 0;
      this.fanStat = 0;
      this.pumpStat = 0;
      this.pumpStatRaw = 0;
      //.sendData();
      send = true;
    }
    if(this.data.sHumi_1 < this.maxS && new Date() > datePumpAfter){
      console.log("Activating Pump++++++++")
      this.pumpStat = 1;
      this.pumpStatRaw = 1;
      this.pumpDate = new Date();
      //this.sendData();
      send = true;
    }
    if(this.data.sHumi_1 > this.maxS && this.pumpStatRaw == 1){
      console.log("DeActivating Pump-------")
      this.pumpStatRaw = 0;
      this.pumpStat = 0;
      //this.sendData();
      send = true;
    }
    if(send)
      this.sendData();
  }

  dataHandler(dataRaw: string) {
    //console.log(dataRaw);
    try {
      let input : Data = JSON.parse(dataRaw);
      this.data = input;
      //console.log(this.data);


      if(this.auto){
        this.autoMode();
      }
      

      

    } catch (error) {
      console.error("Error al recibir data")
    }
    
    
  }

  start(){
    this.serial.sendData("START");
  }

  dc(): void {
    if (this.port)
      this.serial.close((port: any) => {
        this.port = port;
      });
  }

}
