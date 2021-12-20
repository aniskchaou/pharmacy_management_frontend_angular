import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import TypeMessage from 'src/app/content/main/messages/TypeMessage';
import TypeTestService from 'src/app/content/main/mocks/TypeTestService';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import TypeValidation from 'src/app/content/main/validations/TypeValidation';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css'],
})
export class AddTypeComponent extends URLLoader implements OnInit {
  typeForm: FormGroup;
  msg: TypeMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  typeI18n;

  constructor(
    private validation: TypeValidation,
    private message: TypeMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.typeForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/type']);
      });
  }
  get f() {
    return this.typeForm.controls;
  }

  ngOnInit(): void {
    this.getTypeByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.typeForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/type/create',
        this.typeForm.value
      );
      this.typeForm.reset();
      this.closeModal();
      this.goBack();
      /*super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      );*/
    }
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
}
