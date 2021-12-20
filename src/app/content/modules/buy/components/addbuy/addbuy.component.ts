import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import BuyMessage from 'src/app/content/main/messages/BuyMessage';
import BuyTestService from 'src/app/content/main/mocks/BuyTestService';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import BuyValidation from 'src/app/content/main/validations/BuyValidation';

@Component({
  selector: 'app-add-buy',
  templateUrl: './addbuy.component.html',
  styleUrls: ['./addbuy.component.css'],
})
export class AddbuyComponent extends URLLoader implements OnInit {
  buyForm: FormGroup;
  msg: BuyMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  buyI18n;

  constructor(
    private validation: BuyValidation,
    private message: BuyMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.buyForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/buy']);
      });
  }
  get f() {
    return this.buyForm.controls;
  }

  ngOnInit(): void {
    this.getBuyByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.buyForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/buy/create',
        this.buyForm.value
      );
      this.buyForm.reset();
      this.closeModal();
      this.goBack();
      /*super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      );*/
    }
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
}
