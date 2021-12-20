import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import { HTTPService } from 'src/app/content/main/services/HTTPService';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css'],
})
export class TypeListComponent extends URLLoader implements OnInit {
  @Input() types;
  @Input() typeI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editType(id);
  }

  delete(id) {
    this.deleteType(id);
  }

  editType(value: string) {
    this.editEvent.emit(value);
  }

  deleteType(value) {
    this.deleteEvent.emit(value);
  }
}
