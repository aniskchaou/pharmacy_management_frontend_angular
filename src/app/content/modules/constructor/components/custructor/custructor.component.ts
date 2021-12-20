import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import ConstructorMessage from 'src/app/content/main/messages/ConstructorMessage';
import ConstructorTestService from 'src/app/content/main/mocks/ConstructorTestService';
import Constructor from 'src/app/content/main/models/Constructor';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import URLS from 'src/app/content/main/urls/urls';

@Component({
  selector: 'app-custructor',
  templateUrl: './custructor.component.html',
  styleUrls: ['./custructor.component.css'],
})
export class CustructorComponent extends URLLoader implements OnInit {
  moveEditConstructor() {
    this.router.navigate(['/editconstructor']);
  }

  moveViewConstructor() {
    this.router.navigate(['/viewconstructor']);
  }

  constructors$ = [];
  constructorI18n;
  id = 0;
  loading = false;
  addButton: string;
  listTitle: any;

  constructor(
    private messageService: ConstructorMessage,
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
      this.httpService.remove(CONFIG.URL_BASE + '/constructor/delete/' + id);
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
    this.getConstructorByLang(CONFIG.getInstance().getLang());
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/constructor/all').subscribe(
      (data: Constructor[]) => {
        this.constructors$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getConstructorByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/constructor/' + lang)
      .subscribe(
        (data) => {
          this.constructorI18n = data;
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
        this.router.navigate(['/constructor']);
      });
  }
}
