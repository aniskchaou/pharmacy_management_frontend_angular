import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/content/main/configs/URLLoader';
import CategoryMessage from 'src/app/content/main/messages/CategoryMessage';
import CategoryTestService from 'src/app/content/main/mocks/CategoryTestService';
import { HTTPService } from 'src/app/content/main/services/HTTPService';
import CONFIG from 'src/app/content/main/urls/urls';
import CategoryValidation from 'src/app/content/main/validations/CategoryValidation';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent extends URLLoader implements OnInit {
  categoryForm: FormGroup;
  msg: CategoryMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  categoryI18n;

  selectedFile: File;

  retrievedImage: any;

  base64Data: any;

  retrieveResonse: any;

  imageName: any;

  constructor(
    private validation: CategoryValidation,
    private message: CategoryMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.categoryForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/category']);
      });
  }
  get f() {
    return this.categoryForm.controls;
  }

  ngOnInit(): void {
    this.getCategoryByLang(CONFIG.getInstance().getLang());
    this.httpService
      .getAll('http://localhost:8080/category/get/img.jpg')
      .subscribe((res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
  }

  reset() {
    this.categoryForm.reset();
  }

  public onFileChanged(event) {
    //Select File

    this.selectedFile = event.target.files[0];
    this.imageName = this.selectedFile.name;
  }

  add() {
    this.submitted = true;

    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
    this.httpService.sendFile(
      CONFIG.URL_BASE + '/category/savefile',
      uploadImageData
    );
    this.imageName = this.selectedFile.name;
    this.categoryForm.addControl(
      'imageName',
      new FormControl(this.selectedFile.name)
    );
    this.httpService
      .getAll('http://localhost:8080/category/get/' + this.imageName)
      .subscribe((res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
    console.log(this.categoryForm.value);
    if (this.validation.checkValidation()) {
      /*  this.httpService.create(
        CONFIG.URL_BASE + '/category/create',
        this.categoryForm.value
      );
      console.log(this.categoryForm.value);
      this.categoryForm.reset();
      this.closeModal();
      this.goBack();
     super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      );*/
    }
  }

  getCategoryByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/category/' + lang)
      .subscribe(
        (data) => {
          this.categoryI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
