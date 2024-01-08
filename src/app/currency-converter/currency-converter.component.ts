import { Component, Input } from '@angular/core';
import { RateMock } from '../../model/ratesMock';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CurrancyserviceService } from '../../servieces/currancyservice.service';
import { convertModel } from '../../model/convertModel';
import { rateModel } from 'src/model/rateModel';
import { SaveSearchService } from 'src/servieces/save-search.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent {

  // @Input() FromArea?: String;

  public edited = true;

  selectedrate?: String;
  title = "Currency Converter"
  result: any;


  result$!: Observable<Object>;
  private searchTerms = new Subject<string>();
  // rates: rateModel[] = [];
  rates: any;

  amount_value: number = 0;
  amount_value_string: string = '';
  _from: any;
  to: any;
  isResult: boolean = false;
  public resultFrom:string='';
  public resultTo:string='';
  public resultInfo:string='';
  isDataAvailable: boolean = false;
  keyValueArray: { rate: string; name: any; }[] | undefined;
failedToLoad: boolean = false;
  lastUpdate: string | undefined;

  constructor(private currancyService: CurrancyserviceService, private saveSearchService:SaveSearchService) { }
  
  onSubmit(): void {
    alert("onSubmit");
    this.exchange();
    this.isResult= true;
    //  var date = new Date(this.currancyService.getCurrencies());
    //  this.lastUpdate = date.toLocaleString()  + " UTC";
  }
  ngOnInit(): void {

    this.currancyService.getCurrencies().subscribe({
      next: (data: convertModel) => {
        this.rates = data.rates;
        this.keyValueArray = Object.keys(this.rates).map(k => ({name: k, rate: this.rates[k as any]}));

        var indexFrom=this.keyValueArray.findIndex((element: {name:string;}) => element.name == 'USD');

        let rateFrom:rateModel=this.keyValueArray[indexFrom];
        
        this._from = this.keyValueArray.filter(k =>k.name == 'ILS').at(0);
        this.to= this.keyValueArray.filter(k =>k.name == 'USD').at(0);
        this.isResult= true;
       
        this.currancyService.result=data;

        var date = new Date(data.date);
        this.lastUpdate = date.toLocaleString()  + " UTC";

        this.isDataAvailable = true
  
      },
      error: (err: any) => {
        this.failedToLoad=true;
      console.log(err);
      },
      complete: () => {
      console.log('complete');
      }
      });

  }

  changeAmountValue() {
    this.amount_value_string = (Math.round(this.amount_value * 100) / 100).toFixed(2);
    localStorage.setItem("amount", this.amount_value_string);
    if (this.isResult)
      this.exchange();
  }
  exchange() {
    let rateBase = this.to.rate / this._from.rate;
    let result = this.amount_value * rateBase;
    this.resultFrom = this.amount_value + " " + (this._from ? this._from.name : this._from.name) + " =";
    this.resultTo = (result).toFixed(5) + " " + (this.to.name ? this.to.name : this.to.name);
    this.resultInfo = (1).toFixed(2) + " " + this._from.name + " = " + rateBase.toFixed(6) + " " + this.to.name + '\n '
    + (1).toFixed(2) + " " + this.to.name + " = " + (1 / rateBase).toFixed(6) + " " + this._from.name;
    // alert(result);
    this.saveSearchService.saveSearch= {amount: this.amount_value,from:this._from,to:this.to,result:result.toFixed(2)};
  }

  public selectFrom = (currency: rateModel): void => {
    this._from = currency;
    if (this.isResult)
      this.exchange();

  }

  public selectTo = (currency: rateModel): void => {
    this.to = currency;
    if (this.isResult) {
      console.log("in converter compenent new rate is" + currency.name);
      this.exchange();
    }

  }

  
  windowResize(): void{
    // this.submitBtn.nativeElement.style.width = this.formExchange.nativeElement.style.width;
  }


}

