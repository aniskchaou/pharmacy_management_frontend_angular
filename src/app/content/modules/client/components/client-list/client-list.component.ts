import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import { HTTPService } from 'src/app/content/main/services/HTTPService';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent extends URLLoader implements OnInit {
  @Input() clients;
  @Input() clientI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editClient(id);
  }

  delete(id) {
    this.deleteClient(id);
  }

  editClient(value: string) {
    this.editEvent.emit(value);
  }

  deleteClient(value) {
    this.deleteEvent.emit(value);
  }
}
