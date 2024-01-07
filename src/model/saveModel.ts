import { rateModel } from "./rateModel";

export interface saveModel {

  amount: number;
  from: rateModel;
  to: rateModel;
  result:string
}

