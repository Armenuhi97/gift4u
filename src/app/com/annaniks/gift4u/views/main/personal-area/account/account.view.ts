import { Component, OnInit } from '@angular/core';
import { City } from '../../catalog/catalog.models';
import { ServerResponse, User, Month, Day, Year } from 'src/app/com/annaniks/gift4u/models/models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '../../main.service';
import { PersonalAreaService } from '../personal-area.service';
import { AppService, TranslateService } from '../../../../services';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../../services/loading.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'account-view',
    templateUrl: 'account.view.html',
    styleUrls: ['account.view.scss']
})
export class AccountView implements OnInit {
    private _userInfo: User = new User();
    private _userForm: FormGroup;
    private _giftForm: FormGroup;
    private _cities: City[] = [];
    private _isActiveGift: boolean = false;
    private _giftError: boolean = false;
    private _error: string = null;
    public selected: number = -1
    public genderArray = [
        { id: 0, title: this.getTranslateWord('Male', 'Мужской', 'Արական') },
        { id: 1, title: this.getTranslateWord('Female', 'Женский', 'Իգական') }
    ]
    public day: Day[] = []
    public month: Month[] = [
        { text: this.getTranslateWord('January', 'Январь', 'Հունվար'), id: 1 },
        { text: this.getTranslateWord('February', 'Февраль', 'Փետրվար'), id: 2 },
        { text: this.getTranslateWord('March', 'Март', 'Մարտ'), id: 3 },
        { text: this.getTranslateWord('April', 'Апрель', 'Ապրիլ'), id: 4 },
        { text: this.getTranslateWord('May', 'Май', 'Մայիս'), id: 5 },
        { text: this.getTranslateWord('June', 'Июнь', 'Հունիս'), id: 6 },
        { text: this.getTranslateWord('July', 'Июль', 'Հուլիս'), id: 7 },
        { text: this.getTranslateWord('August', 'Август', 'Օգօստոս'), id: 8 },
        { text: this.getTranslateWord('September', 'Сентябрь', 'Սեպտեմբեր'), id: 9 },
        { text: this.getTranslateWord('October', 'Октябрь', 'Հոկտեմբեր'), id: 10 },
        { text: this.getTranslateWord('November', 'Ноябрь', 'Նոյեմբեր'), id: 11 },
        { text: this.getTranslateWord('ecember', 'Декабрь', 'Դեկտեմբեր'), id: 12 }
    ]
    public years: Year[] = []
    constructor(
        private _mainService: MainService,
        private _fb: FormBuilder,
        private _personalAreaService: PersonalAreaService,
        private _appService: AppService,
        private _datePipe: DatePipe,
        private _messageService: MessageService,
        private _loadingService: LoadingService,
        private _activatedRoute: ActivatedRoute,
        private _title: Title,
        private _translateService: TranslateService
    ) {
        this._title.setTitle(this._activatedRoute.data['_value'].title);
    }

    ngOnInit() {
        this._formBuilder();
        this._getUser();
        this._getCities();
        this._setDateVariants(1, 31)
    }
    public getTranslateWord(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    private _setDay(start: number, end: number): void {
        if (!this.day[0])
            for (let i = start; i <= end; i++) {
                this.day.push({ day: i })
            }
    }
    private _setYear(): void {
        if (!this.years[0]) {
            let d = new Date()
            let currentYear: number = d.getFullYear();
            let startYear: number = 1919;
            for (let i = startYear; i <= currentYear; i++) {
                this.years.push({ year: i })
            }
        }
    }
    private _setDateVariants(start: number, end: number): void {
        this._setDay(start, end)
        this._setYear()
    }
    private _getUser(): void {
        this._loadingService.showLoading();
        this._mainService.getUser().subscribe((data: User) => {
            this._loadingService.hideLoading();
            this._userInfo = data;
            this._setFormValues();
            this._giftFormBuilder();
        },
            () => {
                this._loadingService.hideLoading()
            })
    }

    private _formBuilder(): void {
        this._userForm = this._fb.group({
            name: [null, Validators.required],
            email: [null, Validators.required],
            phone: [null, Validators.required],
            city: [null],
            gender: [null, Validators.required],
            day: [null, Validators.required],
            month: [null, Validators.required],
            year: [null, Validators.required]
        })
        // this._userForm.enable();
        let countDays: number;
        this._userForm.get('month').valueChanges.subscribe((month) => {
            if (month) {
                if (this._userForm.value.year) {
                    countDays = this._daysInMonth(month.id, this._userForm.value.year.year);
                } else {
                    countDays = this._daysInMonth(month.id, 2015);
                }
                this._setDaysByCountDayInMonth(countDays)
            }
        })
        this._userForm.get('year').valueChanges.subscribe((year) => {
            if (year) {
                if (this._userForm.value.month) {
                    countDays = this._daysInMonth(this._userForm.value.month.id, year.year);
                } else {
                    countDays = this._daysInMonth(1, year.year);
                }
                this._setDaysByCountDayInMonth(countDays)
            }
        })
    }
    private _setDaysByCountDayInMonth(countDays: number): void {
        if (this._userForm.value.day)
            if (countDays < this._userForm.value.day.day) {
                this._userForm.get('day').reset();
            }
        if (countDays) {
            this.day = []
            this._setDateVariants(1, countDays)
        }
    }
    private _daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }
    private _giftFormBuilder(): void {
        this._giftForm = this._fb.group({
            part1: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(1)]],
            part2: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(1)]],
            part3: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(1)]],
            part4: [null, [Validators.required, Validators.maxLength(4), Validators.minLength(1)]]
        })
    }

    private _setFormValues(): void {
        this._userForm.patchValue({
            name: this._userInfo.name,
            email: this._userInfo.email,
            phone: this._userInfo.phone,
            gender: this._userInfo.gender ? this._userInfo.gender : 0,
            city: this._appService.checkPropertyValue(this._appService.filterArray(this._cities, 'id', this._userInfo.cityCountryId), 0, null),
        })
        if (this._userInfo.birthday) {
            this._setYear();
            this._setDay(1, 31)
            let dateArr = this._userInfo.birthday.split('-')
            let selectMonth = this.month.filter((m: Month) => {
                return m.id == +dateArr[1]
            })[0]
            let selectYear = this.years.filter((y: Year) => {
                return y.year == +dateArr[2]
            })[0]
            let selectDay = this.day.filter((d: Day) => {
                return d.day == +dateArr[0]
            })[0]
            this._userForm.patchValue({
                day: selectDay,
                month: selectMonth,
                year: selectYear
            })
            if (selectMonth && selectYear) {
                this.day = []
                let countDay = this._daysInMonth(selectMonth.id, selectYear.year);
                this._setDay(1, countDay);
            }
        }
    }

    private _getCities(): void {
        this._mainService.getCities().subscribe((data: ServerResponse<City[]>) => {
            this._cities = data.messages;
            if (!this._userForm.get('city').value) {
                this._userForm.get('city').setValue(this._appService.checkPropertyValue(this._appService.filterArray(this._cities, 'id', this._userInfo.cityCountryId), 0, null))
            }
        })
    }
    public getAttributeName(name:string){
        return this._translateService.getRequestTranslateAttribute(name)
    }
    private _activateCertificate(): void {
        this._personalAreaService.activateGiftCertificate(
            this._giftForm.value.part1 + this._giftForm.value.part2 + this._giftForm.value.part3 + this._giftForm.value.part4
        ).subscribe((data) => {
            this._giftError = false;
            this._isActiveGift = true;
        },
            (error) => {
                this._giftError = true;
            })
    }

    public onClickEditField(controlName: string) {
        let control = this._userForm.get(controlName);
        if (control.disabled) {
            control.enable();
        }
        else {
            control.disable();
        }
    }

    public onClickContinue(): void {
        //this._userForm.enable();
        let date = new Date(this._userForm.value.year.year, this._userForm.value.month.id - 1, this._userForm.value.day.day);
        if (this._userForm.valid) {
            this._personalAreaService.changeUser({
                name: this._userForm.get('name').value,
                email: this._userForm.get('email').value,
                phone: this._userForm.get('phone').value,
                gender: this.userForm.get('gender').value,
                cityCountryId: this._appService.checkPropertyValue(this._userForm.get('city').value, 'id', '').toString(),
                birthday: this._datePipe.transform(date, 'yyyy-MM-dd')
            }).subscribe((data) => {
                this._messageService.add({ severity: 'success', summary: 'Сообщение', detail: 'Спасибо! Ваш профиль успешно изменен ' })
                this._mainService.getUser();
            },
                (error) => {
                    console.error(error);
                    this._error = error.error.message;
                })
        }
    }

    public onClickActivate(): void {
        if (this._giftForm.valid) {
            this._activateCertificate();
        }
    }

    get giftForm(): FormGroup {
        return this._giftForm;
    }

    get userForm(): FormGroup {
        return this._userForm;
    }

    get userInfo(): User {
        return this._userInfo;
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
    get cities(): City[] {
        return this._cities;
    }

    get isActiveGift(): boolean {
        return this._isActiveGift
    }

    get giftError(): boolean {
        return this._giftError
    }

    get error(): string {
        return this._error;
    }


    ngOnDestroy() { }
}