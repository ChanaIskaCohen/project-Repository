import { Component, Input, Output,EventEmitter } from '@angular/core';
import { convertModel } from 'src/model/convertModel';
import { rateModel } from 'src/model/rateModel';
import { CurrancyserviceService } from 'src/servieces/currancyservice.service';

@Component({
  selector: 'app-currency-drop',
  templateUrl: './currency-drop.component.html',
  styleUrls: ['./currency-drop.component.css']
})
export class CurrencyDropComponent {

  @Output() selectedrateEvent = new EventEmitter<rateModel>();
  @Input() selectorId:string='';
  
  @Input() rates:any;

constructor(private currancyService:CurrancyserviceService){};
  selectRate(event: any) { 
    
    const arrRate = event.target.value;

   let keyValueArray = Object.keys(this.rates).map(k => ({name: k, rate: this.rates[k as any]}));
   
    var index=keyValueArray.findIndex((element: {name:string;}) => element.name == arrRate);

    let newRate:rateModel=keyValueArray[index];
     
 
   this.selectedrateEvent.emit(newRate);

     console.log("selectRate:" +newRate.name);
  }
}
