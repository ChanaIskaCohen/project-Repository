import { rateModel } from "./rateModel";

export interface convertModel {
    
    success:boolean ;
    timestamp:number ;
    base:string ;
    date:string  ;
    rates:rateModel;  
  }

 