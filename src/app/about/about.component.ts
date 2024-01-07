import { Component } from '@angular/core';
import { saveModel } from 'src/model/saveModel';
import { SaveSearchService } from 'src/servieces/save-search.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  searchToDisplay:saveModel[] | undefined;

  constructor( private saveSearchService:SaveSearchService){}
  
  ngOnInit(): void {
   this.searchToDisplay = this.saveSearchService.saveSearch;
  }
  

}
