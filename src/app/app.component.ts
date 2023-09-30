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
    this.maxH = 0;

    this.minS = 0;
    this.maxS = 0;

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
  

  sendState(){
    
    console.log(this.pumpStatRaw + " + " + this.fanStatRaw);

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
    
    
    console.log(this.pumpStat + " + " + this.fanStat);
    //this.serial.sendData(this.fanStat + ";" + this.pumpStat);
    (async () => { 
      // Do something before delay
      console.log('before delay')
      this.serial.sendData(this.fanStat + ";" + this.pumpStat);

      await new Promise(f => setTimeout(f, 2000));

      // Do something after
      console.log('after delay')
      this.serial.sendData(this.fanStat + ";0");
      this.pumpStatRaw = false;
    })();
  }

  dataHandler(dataRaw: string) {
    console.log(dataRaw);
    try {
      let input : Data = JSON.parse(dataRaw);
      this.data = input;
      console.log(this.data);

      if(this.auto){
        if(this.data.humi > this.maxH && this.fanStatRaw == 0){
          this.fanStatRaw = 1;
          this.sendState();
        }
        if(this.data.humi < this.maxH && this.fanStatRaw == 1){
          this.fanStatRaw = 0;
        }
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
