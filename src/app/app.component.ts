import { Component } from '@angular/core';
import { DataLayerService } from './services/data-layer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budgetifier-frontend';
  transactions: Transaction[];

  constructor(private dataLayerService: DataLayerService) {
  }


  getDataFromService() {
    this.dataLayerService.getData().subscribe((elem: Transaction[]) => {
      console.log(elem);
      this.transactions = elem;
    })
  }
}
