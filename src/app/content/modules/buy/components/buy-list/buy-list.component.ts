import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import { HTTPService } from 'src/app/content/main/services/HTTPService';

@Component({
  selector: 'app-buy-list',
  templateUrl: './buy-list.component.html',
  styleUrls: ['./buy-list.component.css'],
})
export class BuyListComponent extends URLLoader implements OnInit {
  @Input() buys;
  @Input() buyI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editBuy(id);
  }

  delete(id) {
    this.deleteBuy(id);
  }

  editBuy(value: string) {
    this.editEvent.emit(value);
  }

  deleteBuy(value) {
    this.deleteEvent.emit(value);
  }
}
