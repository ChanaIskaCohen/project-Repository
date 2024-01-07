import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { convertModel } from '../model/convertModel';
import { rateModel } from 'src/model/rateModel';
import { RateMock } from 'src/model/ratesMock';

@Injectable({
  providedIn: 'root'
})
export class CurrancyserviceService {


  private currancyUrlapi = 'http://api.exchangeratesapi.io/v1/';
  private currancySymbolapi = 'https://restcountries.com/v3.1/all?fields=currencies';
  // set endpoint and your API key
  // private endpoint = 'convert';
  private endpoint = 'latest';
  private access_key = 'e3aa848b6aedafdb3d8258b0fa45928b';

  currencies: rateModel[] = [];
  private _result: convertModel | undefined;

  public get result(): convertModel | undefined {
    return this._result;
  }
  public set result(value: convertModel | undefined) {
    this._result = value;
  }


  // https://api.exchangeratesapi.io/v1/' + endpoint + '?access_key=' + access_key +'&from=' + from + '&to=' + to + '&amount=' + amount,

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  lastUpdate: any;



  constructor(private http: HttpClient) { }

  public getCurrencies(): Observable<convertModel> {
    if (this.result == undefined)
     return this.getRates();
    else
      return of(this.result);
  }
  public getLastUpdate() {
    return this.lastUpdate;
  }
 

  getRates(): Observable<convertModel> {
    return this.http.get<convertModel>(this.currancyUrlapi + this.endpoint + '?access_key=' + this.access_key).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError),
      // map(response => response.rates)
    );
  }


  public getCurrenciesPromise() {
    return new Promise<any>((resolve, reject) => {
      if (this.currencies.length == 0) {
        let data: convertModel;
        let mockRate: rateModel[] = RateMock;


        this.currencies = mockRate;


        // this.http.get<convertModel>(this.currancyUrlapi + this.endpoint + '?access_key=' + this.access_key)
        // this.http.get<convertModel>('http://api.exchangeratesapi.io/v1/latest?access_key=e3aa848b6aedafdb3d8258b0fa45928b').subscribe(data => {
        //   for (var key in data.rates){
        //     var value = data.rates[key];
        //     let currency:rateModel = {rate: value, full_name: '', name: key, symbol: ''};
        //     this.currencies.push(currency);
        //   }
        //   this.lastUpdate = data.date;

        // this.http.get<any>(`${this.currancySymbolapi}`).subscribe(data => {

        //   data.forEach((currency: { currencies: { [x: string]: {name: any; symbol: any;}; }; }) => {
        //       let name = Object.keys(currency.currencies)[0]
        //       var index = this.currencies.findIndex((element: { name: string; }) => element.name==name);
        //       if (index!=-1)
        //         this.currencies[index] = {...this.currencies[index], full_name: currency.currencies[name].name, symbol: currency.currencies[name].symbol}
        //   }
        // ) 
        resolve(this.currencies);
        //   },
        //   () => {
        //     reject();
        //   }
        // )
      }
      //  , () => { reject(); }    )  }
      else {
        resolve(this.currencies);
      }
    })


  }


  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
