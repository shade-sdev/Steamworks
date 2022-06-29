import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeroIconName } from 'ng-heroicon';
import { TableHeader } from 'src/app/core/model/model-front';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  public tableDataSource: any[] = [];
  public icon: HeroIconName = 'plus'

  @Input() tableHeaders: TableHeader[] = [];
  @Input() set tableBody(data: any[]) {
    this.tableDataSource = data;
  }
  @Input() tableOptions = { misc: { icon: this.icon, view: false }, edit: true, delete: true }
  @Input() addButtonLabel!: String;
  @Output() updateAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() addAction: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    console.log(this.tableHeaders)
  }

  public emitUpdateAction(id: typeof uuid) {
    this.updateAction.emit(id);
  }

  public emitDeleteAction(id: typeof uuid) {
    this.deleteAction.emit(id);
  }

  public emitAddAction() {
    this.addAction.emit();
  }

}
