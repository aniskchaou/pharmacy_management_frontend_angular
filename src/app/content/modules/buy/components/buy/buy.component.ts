import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import BuyMessage from 'src/app/content/main/messages/BuyMessage';
import BuyTestService from 'src/app/content/main/mocks/BuyTestService';
import Buy from 'src/app/content/main/models/Buy';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import URLS from 'src/app/content/main/urls/urls';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent extends URLLoader implements OnInit {
  moveEditBuy() {
    console.log();
    this.router.navigate(['/editbuy']);
  }

  moveViewBuy() {
    this.router.navigate(['/viewbuy']);
  }

  buys$ = [];
  buyI18n;
  id = 0;
  loading = false;
  addButton: string;
  listTitle: any;

  constructor(
    private messageService: BuyMessage,
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
      this.httpService.remove(CONFIG.URL_BASE + '/buy/delete/' + id);
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
    this.getBuyByLang(CONFIG.getInstance().getLang());
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/buy/all').subscribe(
      (data: Buy[]) => {
        this.buys$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getBuyByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/buy/' + lang).subscribe(
      (data) => {
        this.buyI18n = data;
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
        this.router.navigate(['/buy']);
      });
  }
}
