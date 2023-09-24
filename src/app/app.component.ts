import { Component,  ViewEncapsulation, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { NgxSerial } from 'ngx-serial';

interface Data {
  temp: Number;
  humi: Number;
  bright: Number;
  sHumi: Number;
}

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css'],
})
export class AppComponent {

 
  public serial: any;
  public data : Data ;
  num = 0;
  //data = {temp: Number, humi: Number, bright: Number, sHumi: Number};
  public port: any;

  ngOnInit(): void {
    this.serial = new NgxSerial(
      this.dataHandler.bind(this)
    );
  }

  constructor() {

    //this.serial = new NgxSerial(this.dataHandler.bind(this));

    this.data = {
      temp: 0,
      humi: 0,
      bright: 0,
      sHumi: 0
    };

  }

  dataHandler(dataRaw: string) {
    console.log(dataRaw);
    try {
      let input : Data = JSON.parse(dataRaw);
      this.data = input;


      console.log(this.data);
    } catch (error) {
      console.error("Error al recibir data")
    }
  }

  connect() {
    if(!this.port){
      this.serial.connect((port:any)=>{
        this.port = port;
      });
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
