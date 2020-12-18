import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-json-converter',
  templateUrl: './json-converter.component.html',
  styleUrls: ['./json-converter.component.scss'],
})
export class JsonConverterComponent implements OnInit {
  finalOutput:any;
  error:string;
  name:string
  constructor() { }

  ngOnInit(): void {
  }

  doSome() {
    try {
      this.finalOutput = JSON.parse(this.name)  
    } catch (error) {
      this.error="Please add valid input";
      setTimeout(() => {
        this.error=''
      }, 3000);
    }
    
  }

}
