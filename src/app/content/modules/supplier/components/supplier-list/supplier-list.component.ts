import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import { HTTPService } from 'src/app/content/main/services/HTTPService';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
})
export class SupplierListComponent extends URLLoader implements OnInit {
  @Input() suppliers;
  @Input() supplierI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editSupplier(id);
  }

  delete(id) {
    this.deleteSupplier(id);
  }

  editSupplier(value: string) {
    this.editEvent.emit(value);
  }

  deleteSupplier(value) {
    this.deleteEvent.emit(value);
  }
}
