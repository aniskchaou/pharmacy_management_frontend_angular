import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import MedicamentMessage from 'src/app/content/main/messages/MedicamentMessage';
import MedicamentTestService from 'src/app/content/main/mocks/MedicamentTestService';
import Medicament from 'src/app/content/main/models/Medicament';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import URLS from 'src/app/content/main/urls/urls';

@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.component.html',
  styleUrls: ['./medicament.component.css'],
})
export class MedicamentComponent extends URLLoader implements OnInit {
  moveEditMedicament() {
    this.router.navigate(['/editmedicament']);
  }

  moveViewMedicament() {
    this.router.navigate(['/viewmedicament']);
  }

  medicaments$ = [];
  medicamentI18n;
  id = 0;
  loading = false;
  addButton: string;
  listTitle: any;

  constructor(
    private messageService: MedicamentMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
  }

  edit(id) {
    this.id = id;
  }

  delete(id) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/medicament/delete/' + id);
      super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );
      this.reloadPage();
    }
  }

  ngOnInit() {
    this.getAll();
    this.getMedicamentByLang(CONFIG.getInstance().getLang());
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/medicament/all').subscribe(
      (data: Medicament[]) => {
        this.medicaments$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getMedicamentByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/medicament/' + lang)
      .subscribe(
        (data) => {
          this.medicamentI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/medicament']);
      });
  }
}
