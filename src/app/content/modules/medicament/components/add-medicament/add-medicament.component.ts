import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import MedicamentMessage from 'src/app/content/main/messages/MedicamentMessage';
import MedicamentTestService from 'src/app/content/main/mocks/MedicamentTestService';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import MedicamentValidation from 'src/app/content/main/validations/MedicamentValidation';

@Component({
  selector: 'app-add-medicament',
  templateUrl: './add-medicament.component.html',
  styleUrls: ['./add-medicament.component.css'],
})
export class AddMedicamentComponent extends URLLoader implements OnInit {
  medicamentForm: FormGroup;
  msg: MedicamentMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  medicamentI18n;

  constructor(
    private validation: MedicamentValidation,
    private message: MedicamentMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.medicamentForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/medicament']);
      });
  }
  get f() {
    return this.medicamentForm.controls;
  }

  ngOnInit(): void {
    this.getMedicamentByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.medicamentForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/medicament/create',
        this.medicamentForm.value
      );
      this.medicamentForm.reset();
      this.closeModal();
      this.goBack();
      /* super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      );*/
    }
  }

  getMedicamentByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/medicament/' + lang)
      .subscribe(
        (data) => {
          this.medicamentI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
