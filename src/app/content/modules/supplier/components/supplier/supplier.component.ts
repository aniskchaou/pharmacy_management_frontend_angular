import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import SupplierMessage from 'src/app/content/main/messages/SupplierMessage';
import SupplierTestService from 'src/app/content/main/mocks/SupplierTestService';
import Supplier from 'src/app/content/main/models/Supplier';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import URLS from 'src/app/content/main/urls/urls';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent extends URLLoader implements OnInit {
  moveEditSupplier() {
    this.router.navigate(['/editconstructor']);
  }

  moveViewSupplier() {
    this.router.navigate(['/viewconstructor']);
  }

  suppliers$ = [];
  supplierI18n;
  id = 0;
  loading = false;
  addButton: string;
  listTitle: any;

  constructor(
    private messageService: SupplierMessage,
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
      this.httpService.remove(
        CONFIG.getInstance().getLang() + '/supplier/delete/' + id
      );
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
    this.getSupplierByLang(CONFIG.getInstance().getLang());
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/supplier/all').subscribe(
      (data: Supplier[]) => {
        this.suppliers$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getSupplierByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/supplier/' + lang)
      .subscribe(
        (data) => {
          this.supplierI18n = data;
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
        this.router.navigate(['/supplier']);
      });
  }
}
