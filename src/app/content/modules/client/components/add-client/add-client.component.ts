import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import ClientMessage from 'src/app/content/main/messages/ClientMessage';
import ClientTestService from 'src/app/content/main/mocks/ClientTestService';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import ClientValidation from 'src/app/content/main/validations/ClientValidation';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent extends URLLoader implements OnInit {
  clientForm: FormGroup;
  msg: ClientMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  clientI18n;

  constructor(
    private validation: ClientValidation,
    private message: ClientMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.clientForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/client']);
      });
  }
  get f() {
    return this.clientForm.controls;
  }

  ngOnInit(): void {
    this.getClientByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.clientForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/client/create',
        this.clientForm.value
      );
      this.clientForm.reset();
      this.closeModal();
      this.goBack();
      /* super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      );*/
    }
  }

  getClientByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/client/' + lang).subscribe(
      (data) => {
        this.clientI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }
}
