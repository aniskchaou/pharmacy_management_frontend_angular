import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import TypeMessage from 'src/app/content/main/messages/TypeMessage';
import TypeTestService from 'src/app/content/main/mocks/TypeTestService';
import Type from 'src/app/content/main/models/Type';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import URLS from 'src/app/content/main/urls/urls';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
})
export class TypeComponent extends URLLoader implements OnInit {
  moveViewType() {
    this.router.navigate(['/edittype']);
  }
  moveEditType() {
    this.router.navigate(['/edittype']);
  }

  types$ = [];
  typeI18n;
  id = 0;
  loading = false;
  addButton: string;
  listTitle: any;

  constructor(
    private messageService: TypeMessage,
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
      this.httpService.remove(CONFIG.URL_BASE + '/type/delete/' + id);
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
    this.getTypeByLang(CONFIG.getInstance().getLang());
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/type/all').subscribe(
      (data: Type[]) => {
        this.types$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getTypeByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/type/' + lang).subscribe(
      (data) => {
        this.typeI18n = data;
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
        this.router.navigate(['/type']);
      });
  }
}
