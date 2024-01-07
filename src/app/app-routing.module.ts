import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', redirectTo: '/Converter', pathMatch: 'full' },
  { path: 'Converter', component: CurrencyConverterComponent },
  { path: 'about', component: AboutComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
