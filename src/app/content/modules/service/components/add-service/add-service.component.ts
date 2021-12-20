import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import ServiceMessage from 'src/app/content/main/messages/ServiceMessage';
import ServiceTestService from 'src/app/content/main/mocks/ServiceTestService';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import ServiceValidation from 'src/app/content/main/validations/ServiceValidation';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent extends URLLoader implements OnInit {
  serviceForm: FormGroup;
  msg: ServiceMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  serviceI18n;

  constructor(
    private validation: ServiceValidation,
    private message: ServiceMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.serviceForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/service']);
      });
  }
  get f() {
    return this.serviceForm.controls;
  }

  ngOnInit(): void {
    this.getServiceByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.serviceForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/service/create',
        this.serviceForm.value
      );
      this.serviceForm.reset();
      this.closeModal();
      this.goBack();
      /*  super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      );*/
    }
  }

  getServiceByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/service/' + lang)
      .subscribe(
        (data) => {
          this.serviceI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
