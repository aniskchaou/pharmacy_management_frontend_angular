import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import { HTTPService } from 'src/app/content/main/services/HTTPService';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent extends URLLoader implements OnInit {
  @Input() services;
  @Input() serviceI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editService(id);
  }

  delete(id) {
    this.deleteService(id);
  }

  editService(value: string) {
    this.editEvent.emit(value);
  }

  deleteService(value) {
    this.deleteEvent.emit(value);
  }
}
