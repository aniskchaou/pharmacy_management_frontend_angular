import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import ConstructorMessage from 'src/app/content/main/messages/ConstructorMessage';
import ConstructorTestService from 'src/app/content/main/mocks/ConstructorTestService';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import ConstructorValidation from 'src/app/content/main/validations/ConstructorValidation';

@Component({
  selector: 'app-add-constructor',
  templateUrl: './add-constructor.component.html',
  styleUrls: ['./add-constructor.component.css'],
})
export class AddConstructorComponent extends URLLoader implements OnInit {
  constructorForm: FormGroup;
  msg: ConstructorMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  constructorI18n;

  constructor(
    private validation: ConstructorValidation,
    private message: ConstructorMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.constructorForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/constructor']);
      });
  }
  get f() {
    return this.constructorForm.controls;
  }

  ngOnInit(): void {
    this.getConstructorByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.constructorForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/constructor/create',
        this.constructorForm.value
      );
      this.constructorForm.reset();
      this.closeModal();
      this.goBack();
      /* super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      );*/
    }
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
}
