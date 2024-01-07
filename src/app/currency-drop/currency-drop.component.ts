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

  // @Output() selectedrate:rateModel= {rate: 0, full_name: '', name: '', symbol: ''};;

  @Output() selectedrateEvent = new EventEmitter<rateModel>();
  @Input() selectorId:string='';
  
  @Input() rates:any;

constructor(private currancyService:CurrancyserviceService){};
  ngOnInit(): void {

    
    // // this.currancyService.getRates().subscribe({
    // this.currancyService.getCurrencies().subscribe({
    //   next: (data: rateModel) => {
    //     this.rates = data;
    //     // this.rates = data;
    //   },
    //   error: (err: any) => {
    //   console.log(err);
    //   },
    //   complete: () => {
    //   console.log('complete');
    //   }
    //   });

    // this.currancyService.getCurrenciesPromise().then((data) => {
    //   this.rates=data;
    //   data.forEach((element: { full_name: any; }) => console.log(element.full_name));
  
    //   },
    //     () =>{
    //     // this.failedToLoad = true;
    //     console.error("failedToLoad");
    //     }
    //   );
  
    //   // let localAmount = localStorage.getItem("amount");
    //   // this.amount_value= localAmount ? localAmount : (1).toFixed(2);
  }




  selectRate(event: any) { 
    //  this.selectedrate = value; 

    // this.selectedCurrency = currency;
    // this.selectedrate(currency);
    const arrRate = event.target.value;

   let keyValueArray = Object.keys(this.rates).map(k => ({name: k, rate: this.rates[k as any]}));
   
    var index=keyValueArray.findIndex((element: {name:string;}) => element.name == arrRate);

    let newRate:rateModel=keyValueArray[index];
     
 
   this.selectedrateEvent.emit(newRate);

     console.log("selectRate:" +newRate.name);
  }
}
