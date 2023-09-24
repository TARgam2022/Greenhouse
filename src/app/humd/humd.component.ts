import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-humd',
  templateUrl: './humd.component.html',
  styleUrls: ['./humd.component.css']
})
export class HumdComponent {

  @Input('humidity') Humidity = {};

}
