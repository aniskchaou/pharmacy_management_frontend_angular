import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import SupplierMessage from 'src/app/content/main/messages/SupplierMessage';
import SupplierTestService from 'src/app/content/main/mocks/SupplierTestService';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import SupplierValidation from 'src/app/content/main/validations/SupplierValidation';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css'],
})
export class AddSupplierComponent extends URLLoader implements OnInit {
  supplierForm: FormGroup;
  msg: SupplierMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  supplierI18n;

  constructor(
    private validation: SupplierValidation,
    private message: SupplierMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.supplierForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/supplier']);
      });
  }
  get f() {
    return this.supplierForm.controls;
  }

  ngOnInit(): void {
    this.getSupplierByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.supplierForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/supplier/create',
        this.supplierForm.value
      );
      this.supplierForm.reset();
      this.closeModal();
      this.goBack();
      /**super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      );**/
    }
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
}
