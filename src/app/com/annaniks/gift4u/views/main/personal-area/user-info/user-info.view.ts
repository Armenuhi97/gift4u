import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { User } from '../../../../models/models';
import { MainService } from '../../main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonalAreaService } from '../personal-area.service';
import { LoadingService } from '../../../../services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '../../../../services';

@Component({
    selector: 'user-info-view',
    templateUrl: 'user-info.view.html',
    styleUrls: ['user-info.view.scss']
})
export class UserInfoView implements OnInit, OnDestroy {
    public fullPartsGift;
    private _userInfo: User = new User();
    private _giftForm: FormGroup;
    private _isActiveGift: boolean = false;
    private _giftError: boolean = false;
    private _error: string = null;
    private _image;
    public defaultImage: string = "";
    public isGet: boolean = false
    public uploadIcon: string
    private _giftFullForm: FormGroup;
    constructor(
        private _mainService: MainService,
        private _fb: FormBuilder,
        private _personalAreaService: PersonalAreaService,
        private _loadingService: LoadingService,
        private _activatedRoute: ActivatedRoute,
        private _title: Title,
        private _translateService: TranslateService,
        @Inject('FILE_URL') private _fileUrl: string
    ) {
        this._title.setTitle(this._activatedRoute.data['_value'].title);
    }

    ngOnInit() {
        this._getUser(false);
        this._giftFullFormBuilder()
    }
    public translateWords(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    private _getUser(isFirst: boolean): void {
        this._loadingService.showLoading();
        this._mainService.getUser().subscribe((data: User) => {
            this._loadingService.hideLoading();
            this._userInfo = data;
            this.defaultImage = this._userInfo.profile_image ? this._fileUrl + this._userInfo.profile_image : null
            this.uploadIcon = this._userInfo.profile_image ? 'edit' : 'add'
            if (!isFirst) {
                this._giftFormBuilder();
            }
            this.isGet = true
        },
            () => {
                this._loadingService.hideLoading();
            })
    }
    public getGender(): string {
        if (this._userInfo.gender == 0) {
            return this.translateWords('Male','Мужской','Արական')
        } else {
            if (this._userInfo.gender == 1) {
                return this.translateWords('Female','Женский','Իգական')
            }
        }
    }
    public getPhoneNumber(param: string): string {
        if (param) {
            if (param.startsWith('+374')) {
                return param
            } else {
                return '+374' + param
            }
        }
    }
    public getStatus(): string {
        switch (this._userInfo.percent) {
            case '3.00': {
                return 'STANDART';
                break
            }
            case '5.00': {
                return 'SILVER';
                break
            }
            case '10.00': {
                return 'GOLD';
                break
            }
            case '15.00': {
                return 'PLATINUM';
                break
            }
        }
    }
    private _giftFormBuilder(): void {
        this._giftForm = this._fb.group({
            part1: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(1)]],
            part2: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(1)]],
            part3: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(1)]],
            part4: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(1)]]
        })
    }
    private _giftFullFormBuilder(): void {
        this._giftFullForm = this._fb.group({
            parts: [null, [Validators.required, Validators.maxLength(16), Validators.minLength(1)]]
        })
    }
    private _activateCertificate(): void {
        let giftValue: string;
        if (this._giftForm.valid) {
            giftValue = this._giftForm.value.part1 + this._giftForm.value.part2 + this._giftForm.value.part3 + this._giftForm.value.part4
        } else {
            if (this._giftFullForm.valid) {
                giftValue = this.giftFullForm.value.parts
            }
        }
        this._personalAreaService.activateGiftCertificate(giftValue).subscribe((data) => {
            this._giftError = false;
            this._isActiveGift = true;
        },
            (error) => {
                this._giftError = true;
            })
    }

    public onClickActivate(): void {
        if (this._giftForm.valid || this._giftFullForm.valid) {
            this._activateCertificate();
        }
    }
    public changeImage(event): void {
        if (event) {
            let reader = new FileReader()
            this._image = event;
            // reader.onload = (e: any) => {
            //     this.defaultImage = e.target.result;
            // }
            if (event.target.files[0])
                reader.readAsDataURL(event.target.files[0]);
            this._uploadPhoto()
        }
    }
    private _uploadPhoto() {
        this._loadingService.showLoading()
        let formData: FormData = new FormData();
        if (this._image && this._image.target) {
            let fileList: FileList = this._image.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('photo', file, file.name);
                this._mainService.addImage(formData).subscribe(() => {
                    this._getUser(true)
                },
                    () => {
                        this._loadingService.hideLoading()
                    })
            }
        }
    }
    get giftForm(): FormGroup {
        return this._giftForm;
    }
    get giftFullForm() {
        return this._giftFullForm
    }
    get userInfo(): User {
        return this._userInfo;
    }

    get isActiveGift(): boolean {
        return this._isActiveGift
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
    get giftError(): boolean {
        return this._giftError
    }

    get error(): string {
        return this._error;
    }



    ngOnDestroy() { }
}