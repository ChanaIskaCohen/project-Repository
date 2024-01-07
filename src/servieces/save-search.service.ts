import { Injectable } from '@angular/core';
import { rateModel } from 'src/model/rateModel';
import { saveModel } from 'src/model/saveModel';

@Injectable({
  providedIn: 'root'
})
export class SaveSearchService {
  private _saveSearch: saveModel[] = [];

  public get saveSearch(): saveModel[] {
    return this._saveSearch;
  }
  public set saveSearch(value: saveModel) {
    this._saveSearch.push(value);
  }
  constructor() { }
  
}
