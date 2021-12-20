import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import { HTTPService } from 'src/app/content/main/services/HTTPService';

@Component({
  selector: 'app-constractor-list',
  templateUrl: './constractor-list.component.html',
  styleUrls: ['./constractor-list.component.css'],
})
export class ConstractorListComponent extends URLLoader implements OnInit {
  @Input() constructors;
  @Input() constructorI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editConstructor(id);
  }

  delete(id) {
    this.deleteConstructor(id);
  }

  editConstructor(value: string) {
    this.editEvent.emit(value);
  }

  deleteConstructor(value) {
    this.deleteEvent.emit(value);
  }
}
