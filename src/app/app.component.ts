import { Component } from '@angular/core';
import { DataLayerService } from './services/data-layer.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budgetifier-frontend';
  transactions = [];
  food = [];
  date = [];

  constructor(private dataLayerService: DataLayerService) {
    this.getDataFromService();
  }

  get saved() {
    return this.dataLayerService.isSaved;
  }
  


  getDataFromService() {
    this.dataLayerService.getData().subscribe((elem: Transaction[]) => {
      console.log(elem);
      this.transactions = elem;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  total (arr: Transaction[]) {
    let sum = 0;
    arr.map(elem => {
      sum = sum + elem.amount
    });
    return sum;
  }

  saveTotals() {
    // get the totals and save them
    console.log('saving totals');
    const data = {
      food: this.total(this.food),
      date: this.total(this.date),
      uncategorized: this.total(this.transactions)
    }
    this.dataLayerService.saveData(data);
  }
}
