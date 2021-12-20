import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import { HTTPService } from 'src/app/content/main/services/HTTPService';

@Component({
  selector: 'app-medicament-list',
  templateUrl: './medicament-list.component.html',
  styleUrls: ['./medicament-list.component.css'],
})
export class MedicamentListComponent extends URLLoader implements OnInit {
  @Input() medicaments;
  @Input() medicamentI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editMedicament(id);
  }

  delete(id) {
    this.deleteMedicament(id);
  }

  editMedicament(value: string) {
    this.editEvent.emit(value);
  }

  deleteMedicament(value) {
    this.deleteEvent.emit(value);
  }
}
