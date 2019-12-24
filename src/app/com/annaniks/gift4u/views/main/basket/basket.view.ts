import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Product, ServerResponse, CityCountry, Addresses } from '../../../models/models';
import { MainService } from '../main.service';
import { BasketService } from './basket.service';
import { AppService, TranslateService1 } from '../../../services';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingPrice, CarrierType, PromoCode } from './basket.models';
import { Title } from '@angular/platform-browser';
import { CookieService } from '../../../services/cookie.service';
import { PlatformService } from '../../../services/platform.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../../../services/loading.service';

@Component({
    selector: 'basket-view',
    templateUrl: 'basket.view.html',
    styleUrls: ['basket.view.scss']
})
export class BasketView implements OnInit {
    public isGet: boolean = false
    private _orderForm: FormGroup;
    public basketProducts: Product[] = [];
    public routeSteps = [];
    public cities: CityCountry[] = [];
    public orderStep: number = 1;
    public carrierTypes: CarrierType[] = [];
    public message: string = '';
    public error: boolean = false;
    public loading: boolean = false;
    public isPostCard: boolean = false
    public promoCodeLoading: boolean = false;
    private _promoCodeFormControl = new FormControl(null, Validators.required);
    private _promoCode;
    private _isPost: boolean = false
    public promoCodeMessage: string;
    public isPromocode: boolean = false;
    private _totalPrice: number;
    public shippingMessage: string = '';
    public isPaymentChecked: boolean = false;
    public shippingPrice: number = 0;
    private _fullPrice: number = 0;
    private _submited: boolean = false;
    public isPack: boolean = false;
    public isPayNow: boolean = false;
    public visibleCarrierTypes: CarrierType[] = [];
    public _currierInfo: any;
    public _localShippingInfo: ShippingPrice = {} as ShippingPrice
    public isFreeShipping: boolean = false;
    public codPrice: number = 0;
    public makeOrderError: string = this._translate.instant('_error');
    public allAddresses: Addresses[];
    public isDiscount: boolean = false
    public isRegistration: boolean;
    private _isHasMainAddress: boolean = false;
    private _type: number;
    public postcard: string;
    private _productIdArray: Array<number> = [];
    private _minDate: Date;
    private _isWarmingText: boolean = false

    public paymentMethods = [
        { id: 0, header: this.translateWord('_pay_now'), under: this.translateWord('_bank_card'), errorText: '', percent: 0 },
        { id: 1, header: this.translateWord('_upon_receipt'), under: this.translateWord('_in_cash'), errorText: '', percent: 0 },
    ]
    private _allTimes = [
        { name: '09:00 - 12:00', start: 9, end: 12, id: 1 },
        { name: '12:00 - 15:00', start: 12, end: 15, id: 2 },
        { name: '15:00 - 18:00', start: 15, end: 18, id: 3 },
        { name: '18:00 - 21:00', start: 18, end: 21, id: 4 }
    ]
    private _newAllTimes = []

    public visiblePaymentMethods = [];

    constructor(
        private _fb: FormBuilder,
        public _mainService: MainService,
        private _basketService: BasketService,
        private _appService: AppService,
        private messageService: MessageService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _title: Title,
        private _cookieService: CookieService,
        private _translateService: TranslateService1,
        private _platformService: PlatformService,
        private _datePipe: DatePipe,
        private _translate: TranslateService,
        private _loadingService: LoadingService,
        @Inject("FILE_URL") private _fileUrl: string,
        @Inject("CALENDER_CONFIG_ARM") private _calendarConfigarm,
        @Inject("CALENDER_CONFIG_EN") private _calendarConfigen,
        @Inject("CALENDER_CONFIG_RU") private _calendarConfigru,
    ) {
        this._checkBasketProducts();
        this._checkQueryParams();
        this.visiblePaymentMethods = this.paymentMethods;
    }

    ngOnInit() {
        this._newAllTimes = this._allTimes
        this._formBuilder();
        this._setRouteSteps();
        this._checkWarmingText();
        this._setFormValues();
        this._getAllAddresses();
        this._getCities();
        this._getCarriers();
        this._setMinDate();
        this._isPostProduct()
    }
    private _checkWarmingText() {
        this._isWarmingText = false
        this.paymentMethods.forEach((data) => {
            if (data.errorText) {
                this._isWarmingText = true
            }
        })
    }
    private _checkQueryParams(): void {
        let params = this._activatedRoute.snapshot.queryParams;
        if (params && params.orderID) {
            this._checkPaymentVerification(params.paymentID)
        }
        else {
            this.isPaymentChecked = true;
        }
    }
    private _setMinDate(): void {
        let today = new Date();
        let minDate = new Date();
        let durationsArray = []
        this.basketProducts.forEach((data) => {
            durationsArray.push(data.duration_of_preparation)
        })
        let maxduration = Math.max.apply(null, durationsArray)
        if (maxduration == 0) {
            let currentDate = new Date();
            let currentTime = currentDate.getHours();
            if (currentTime >= this._allTimes[this._allTimes.length - 1].start) {
                minDate.setDate(today.getDate() + 1);
            } else {
                minDate.setDate(today.getDate() + maxduration);
            }
        } else {
            minDate.setDate(today.getDate() + maxduration);
        }
        this._minDate = minDate
    }
    private _formBuilder(): void {
        this._orderForm = this._fb.group({
            allAddress: [''],
            name: ['', Validators.required],
            phone: ['', [Validators.required, Validators.minLength(8)]],
            email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            comment: [''],
            city: [null, Validators.required],
            address: ['', Validators.required],
            index: ['', Validators.required],
            shipping_method: [null, Validators.required],
            payment_method: [null, Validators.required],
            isBonuce: [null],
            isBalance: [null],
            delivery_day: [null, Validators.required],
            delivery_time: [null, Validators.required]
        })
        this._orderForm.get('allAddress').valueChanges.subscribe((value: Addresses) => {
            this._setValueAfterSelectAddress(value)

        })
        this._orderForm.get('city').valueChanges.subscribe((value) => {
            this._orderForm.get('isBonuce').setValue(null)
            this._orderForm.get('isBalance').setValue(null);
            this._localShippingInfo.price = null
            if (this._orderForm.get('shipping_method')) {
                this._orderForm.get('shipping_method').reset()
            }
            if (this._orderForm.get('payment_method')) {
                this._orderForm.get('payment_method').reset()
            }
        })
        this._orderForm.get('delivery_day').valueChanges.subscribe((value) => {
            let currentDate = new Date();
            let today = currentDate.getDate();
            let currentTime = currentDate.getHours();
            if (value && value.getDate() == today) {
                this._allTimes.forEach((data, index) => {
                    if (currentTime >= data.start && currentTime <= data.end) {
                        this._newAllTimes = this._allTimes.slice(index + 1);
                    }
                    if (this._orderForm.get('delivery_time').value && this._orderForm.get('delivery_time').value.id <= index + 1) {
                        this._orderForm.get('delivery_time').reset();
                    }
                })
            } else {
                this._newAllTimes = this._allTimes
            }

        })
        this._orderForm.controls.shipping_method.valueChanges.subscribe((data) => {
            this._orderForm.get('payment_method').reset();
            if (data == 4 || data == 5) {
                //this._orderForm.get('payment_method').setValue(data);
                //this._orderForm.get('payment_method').disable();
            }
            else {
                this._orderForm.get('payment_method').enable();
            }
            this._checkShippingPrice(this._appService.checkPropertyValue(this._orderForm.get('city').value, 'id'), data)
        })


        this._orderForm.controls.city.valueChanges.subscribe((data) => {
            if (this._orderForm.get('shipping_method').value) {
                this._checkShippingPrice(this._appService.checkPropertyValue(data, 'id'), this._orderForm.get('shipping_method').value);
            }
            this._isPostProduct()
            this._setVisibleCarriers(data);
            this._setVisiblePayMethods(data);
        })

        this._orderForm.get('payment_method').valueChanges.subscribe((data) => {
            if (data == 4 || data == 5) {
                let currer = this.paymentMethods.filter((element) => element.id === data)[0];
                if (currer) {
                    this._currierInfo = currer;
                    this.codPrice = this._totalPrice * currer.percent / 100
                }
            }
            else {
                this.codPrice = 0;
            }
            if (data == 0 && this._orderForm.get('shipping_method').value == 4 || this._orderForm.get('shipping_method').value == 5)
                this._checkShippingPrice(this._appService.checkPropertyValue(this._orderForm.get('city').value, 'id'), this._orderForm.get('shipping_method').value);
        })

        this._orderForm.get('payment_method').valueChanges.subscribe((data) => {
            if (data == '0') {
                this.isPayNow = true;
            }
            else {
                this.isPayNow = false;
            }
        })
    }
    private _setValueAfterSelectAddress(value: Addresses): void {
        this._orderForm.patchValue({
            address: value.address,
            index: value.index
        })
    }
    public onClickisPostcard(): void {
        this.isPostCard = !this.isPostCard
    }
    private _setFormValues(): void {
        if (this._mainService.isAuthorized) {
            this._mainService.getUser().subscribe((data) => {
                this._orderForm.patchValue({
                    name: data.name,
                    phone: data.phone,
                    email: data.email
                })
            })
        }
    }

    private _checkBasketProducts(): void {
        if (this._platformService.isBrowser) {
            if (JSON.parse(localStorage.getItem('basket_products'))) {
                let basket = JSON.parse(localStorage.getItem('basket_products'));
                this.isGet = true
                if ((this.basketProducts.length !== basket.length)) {
                    if (this.basketProducts.length > basket.length) {
                        this.basketProducts.forEach((data, i) => {
                            let index = basket.indexOf(data);
                            if (index == -1) {
                                this.basketProducts.splice(i, 1);
                            }
                        })
                    } else {
                        basket.forEach((data) => {
                            let index = this.basketProducts.indexOf(data);
                            if (index == -1) {
                                this.basketProducts.push(data)
                            }
                        })
                    }
                }
            }
        }
    }

    private _getCities() {
        this._mainService.getCities().subscribe((data: ServerResponse<CityCountry[]>) => {
            this.cities = data.messages;
            this._setUserCity();
        })
    }
    private _getAllAddresses() {
        if (this._platformService.isBrowser)
            if (this._cookieService.get('accessToken')) {
                this._basketService.getAllAddresses().subscribe((data: ServerResponse<Addresses[]>) => {
                    this.allAddresses = data.messages;
                    for (let address of this.allAddresses) {
                        if (address.status == '1') {
                            this._isHasMainAddress = true
                        }
                    }
                    this._setMainAddress();
                })
            }
    }
    private _setMainAddress(): void {
        if (this._isHasMainAddress) {
            let mainAddress = this.allAddresses.filter((data) => {
                return data.status == "1"
            })[0]
            this._orderForm.patchValue({
                allAddress: mainAddress
            })
            this._setValueAfterSelectAddress(this._orderForm.get('allAddress').value)
        }
    }
    private _setUserCity(): void {
        let city: CityCountry = this._appService.checkPropertyValue(this.cities.filter((element) => element.id === this._mainService.getUserInfo().cityCountryId), 0);
        this._orderForm.patchValue({
            city: city
        })
    }
    public translateWord(key: string) {
        return this._translate.instant(key)
    }
    private _setRouteSteps(): void {
        this._title.setTitle(this.translateWord('_basket'));
        this.routeSteps.push(
            { label: this.translateWord('_main'), url: '/', queryParams: {}, status: '' },
            { label: this.translateWord('_basket'), url: '/basket', queryParams: {}, status: '' }
        )
    }

    private _getCarriers(): void {
        this._basketService.getCarriers().subscribe((data) => {
            this.carrierTypes = data.messages;
            this._setVisibleCarriers(this.orderForm.get('city').value);
        })
    }
    public getTranslateWord(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    private _checkPaymentVerification(orderId: string): void {
        this.isPaymentChecked = false;
        this._basketService.checkVerifyPayment(orderId).subscribe(
            (data) => {
                if (this._platformService.isBrowser)
                    localStorage.removeItem('basket_products')
                this.basketProducts = [];
                this._mainService.checkUserBasketPrice();
                this.message = this.getTranslateWord(
                    `Thank you Your payment is successfully made! (The order number is ${data.orderId})`,
                    `Спасибо Ваш платеж успешно совершен! (Номер заказа - ${data.orderId})`,
                    `Շնորհակալություն ձեր վճարումը հաջողությամբ կատարվել է(Պատվերի համարն է ${data.orderId})`)
                this.isPaymentChecked = true;
            },
            (error) => {
                this.message = this.getTranslateWord(
                    `Your payment has NOT been made!  (${error.error.data.Description})`,
                    `Ваш платеж НЕ совершен! (${error.error.data.Description})`,
                    `Ձեր վճարումը չի կատարվել (${error.error.data.Description})`);
                this.isPaymentChecked = true;
            })
    }

    private _checkShippingPrice(cityId, currerId: number): void {
        if (currerId)
            this._basketService.checkShippingPrice(cityId, currerId).subscribe((data: ServerResponse<ShippingPrice>) => {
                this._localShippingInfo = data.messages;
                let shippingPrice: ShippingPrice = data.messages;
                if (shippingPrice.priceForFree && this._totalPrice >= +shippingPrice.priceForFree) {
                    this.shippingMessage = this.getTranslateWord('Free shipping', 'Бесплатная доставка', 'Անվճար առաքում');;
                    this.shippingPrice = 0;
                    return;
                }
                else if (shippingPrice.price == '0.00') {
                    this.shippingMessage = this.getTranslateWord('Free shipping', 'Бесплатная доставка', 'Անվճար առաքում');;
                    this.shippingPrice = 0;
                    return;
                }
                else {
                    this.shippingMessage = this.getTranslateWord(`Shipping +${+shippingPrice.price} ֏`, `Доставка +${+shippingPrice.price} ֏`, `Առաքումը +${+shippingPrice.price} ֏`)
                    this.shippingPrice = +shippingPrice.price;
                }
                return;
            })
    }

    public handleDeleteEvent(index: number): void {
        let deletedProductId = this.basketProducts[index]['id'];
        if (this._promoCode) {
            delete this._promoCode[deletedProductId];
        }
        this.basketProducts.splice(index, 1);
        if (this._platformService.isBrowser)
            localStorage.setItem('basket_products', JSON.stringify(this.basketProducts));
        this._setMinDate();
        this._isPostProduct()
        if (this.isPromocode) {
            this._calculatePromocodeDiscountPrice()
        }
        this._mainService.checkUserBasketPrice();
    }

    public onClickMakeOrder(): void {
        if (this.orderStep == 1) {
            this._submited = true;
            this.orderStep = 2;
            this._router.navigate([], { relativeTo: this._activatedRoute })
        }
        if (this.orderStep == 2) {
            if (this._orderForm.valid) {
                this._makeOrder();
            }
        }
    }

    public onClickisPack() {
        this.isPack = !this.isPack;
    }

    public onClickPayNow(event) {
        if (event && this._orderForm.get('payment_method').disabled) {
            if (event.id == 0 || event.id === this._orderForm.get('shipping_method').value) {
                this._orderForm.get('payment_method').setValue(event.id);
            }
        }
    }

    private _makeOrder(): void {
        this.loading = true;
        this._loadingService.showLoading()
        let cartRuleId = '0';
        for (let id of this._productIdArray) {
            cartRuleId = this._type == 1 ? (this._promoCode['id'] ? this._promoCode['id'] : '0') : (this._promoCode[id] ? this._promoCode[id]['id'] : '0');
            if (cartRuleId !== '0') {
                break
            }
        }
        this._basketService.makeOrder({
            fullName: this._orderForm.get('name').value,
            email: this._orderForm.get('email').value,
            phone: this._orderForm.get('phone').value.startsWith('+374') ? this._orderForm.get('phone').value : '+374' + this._orderForm.get('phone').value,
            cityCountryId: this._appService.checkPropertyValue(this._orderForm.get('city').value, 'id'),
            address: this._orderForm.get('address').value,
            index: this._orderForm.get('index').value,
            carrier_id: this._orderForm.get('shipping_method').value,
            isCash: this._orderForm.get('payment_method').value,
            total: this._mainService.getUserInfo().basketPrice,
            products: this.basketProducts,
            comment: this._orderForm.get('comment').value,
            packeting: (this.isPack) ? '1' : '0',
            cartRuleId: cartRuleId,
            user_id: (this._mainService.isAuthorized) ? this._mainService.getUserInfo().id : null,
            isBonus: (this._orderForm.get('isBonuce').value) ? this._orderForm.get('isBonuce').value : false,
            isBalance: (this._orderForm.get('isBalance').value) ? this._orderForm.get('isBalance').value : false,
            day_of_delivery: this._datePipe.transform(this._orderForm.get('delivery_day').value, 'dd.MM.yyyy'),
            hour_of_delivery: this._orderForm.get('delivery_time').value.name
        }, this._mainService.isAuthorized()).subscribe(
            (data) => {
                this._loadingService.hideLoading()
                this.loading = false;
                if (data.error) {
                    this.error = true;
                    //this.makeOrderError = data.message;
                    this.makeOrderError = this._translateService.translateImportant('Error', 'Ошибка', 'Սխալ')
                    return;
                }
                this.error = false;
                this.messageService.add({
                    severity: 'success', summary: this.translateWord('_message'),
                    detail: this.translateWord('_order_success_message')
                })
                if (data && data.orderId) {
                    if (data.isCash == 0 || data.isCash == 4 || data.isCash == 5) {
                        if (data.paymant) {
                            let payment = data.paymant
                            // let responseData = JSON.parse(data.paymant);
                            if (payment.PaymentID && data.pay) {
                                // https://services.ameriabank.am/VPOS
                                window.location.href = `https://services.ameriabank.am/VPOS/Payments/Pay?id=${payment.PaymentID}&lang=am`;
                            }
                            else {
                                if (this._platformService.isBrowser)
                                    localStorage.removeItem('basket_products');
                                this._mainService.checkUserBasketPrice();
                                this.basketProducts = [];
                                this.orderStep = 1;
                                this.message = this.getTranslateWord(`Thank you! Your order is successfully accepted (Order number - ${data.orderId})`, `Спасибо! Ваш заказ успешно принят (Номер заказа - ${data.orderId})`, `Շնորհակալություն: Ձեր պատվերը հաջողությամբ ընդունվել է (Պատվերի համարն է ${data.orderId})`)
                            }
                        }
                        else {
                            if (this._platformService.isBrowser)
                                localStorage.removeItem('basket_products');
                            this._mainService.checkUserBasketPrice();
                            this.basketProducts = [];
                            this.orderStep = 1;
                            this.message = this.getTranslateWord(`Thank you! Your order is successfully accepted (Order number - ${data.orderId})`, `Спасибо! Ваш заказ успешно принят (Номер заказа - ${data.orderId})`, `Շնորհակալություն: Ձեր պատվերը հաջողությամբ ընդունվել է (Պատվերի համարն է ${data.orderId})`)
                        }
                    }
                    else {
                        if (this._platformService.isBrowser)
                            localStorage.removeItem('basket_products');
                        this._mainService.checkUserBasketPrice();
                        this.basketProducts = [];
                        this.orderStep = 1;
                        this.message = this.getTranslateWord(`Thank you! Your order is successfully accepted (Order number - ${data.orderId})`, `Спасибо! Ваш заказ успешно принят (Номер заказа - ${data.orderId})`, `Շնորհակալություն: Ձեր պատվերը հաջողությամբ ընդունվել է (Պատվերի համարն է ${data.orderId})`)
                    }
                }

            },
            (error) => {
                this.error = true;
                this.loading = false;
            })
    }
    private _isPostProduct() {
        let count: number = 0
        this.basketProducts.forEach((product) => {
            if (product.is_post) {
                count++
            }
        })
        if (this.orderForm.get('city').value) {
            this._isPost = (count == this.basketProducts.length) ? false : true
        } else {
            this._isPost = false
        }
    }
    private _setVisibleCarriers(city: CityCountry): void {
        if (city) {
            if (city.region === 3 || city.region === 2 || city.region === 1) {

                this.visibleCarrierTypes = this.carrierTypes.filter((element) => element.id === 3 || element.id === 2 || element.id === 4)
                // : this.carrierTypes.filter((element) => element.id === 3 || element.id === 2);
            }
            if (city.region === 4) {
                this.visibleCarrierTypes = this.carrierTypes.filter((element) => element.id === 4 || element.id === 3)
                // : this.carrierTypes.filter((element) => element.id === 3)
            }
        }
        let filteredArr = this.visibleCarrierTypes.filter((element) => element.id == this._orderForm.get('shipping_method').value)
        if (filteredArr.length == 0) {
            this._orderForm.get('shipping_method').reset();
        }
    }

    private _setVisiblePayMethods(city: CityCountry): void {
        if (city) {
            if (city.region === 1 || city.region === 2 || city.region === 3) {
                this.visiblePaymentMethods = this.paymentMethods;
            }
            if (city.region === 4) {
                this.visiblePaymentMethods = this.paymentMethods.filter((element) => element.id === 0);
            }
        }
        let filteredArr = this.visiblePaymentMethods.filter((element) => element.id == this._orderForm.get('payment_method').value)
        if (filteredArr.length == 0) {
            this._orderForm.get('payment_method').reset();
        }
    }

    public getAttributeName(name: string) {
        return this._translateService.getRequestTranslateAttribute(name)
    }
    private _checkBasketPrice(): number {
        let price: number = 0;
        this.basketProducts.forEach((element) => {
            if (!this.isPromocode) {
                price += element.count * ((element.specificPrice) ? element.specificPrice : +element.price_with_vat);
            } else {
                price += element.count * +element.price_with_vat;
            }

        })
        return price;
    }
    private _checkDiscountPrice(): number {
        let price: number = 0;
        let discountPrice = 0;
        let promoPrice: number = 0;
        this.basketProducts.forEach((element) => {
            price = element.count * ((element && element.specificPrice) ? +element.specificPrice : 0);
            promoPrice = element.count * (element.promoDiscount ? element.discountType == 'Percent - order' ?
                (+element.price_with_vat - +element.price_with_vat * +element.promoDiscount) :
                +element.price_with_vat - +element.promoDiscount : +element.price_with_vat)
            if (price) {
                if ((element.both == 0 || element.both == null) && element.isHaveBoth) {
                    discountPrice += price < promoPrice ? price : promoPrice
                } else {
                    if (element.both == 1) {

                        discountPrice += element.count * (element.promoDiscount ? element.discountType == 'Percent - order' ?
                            (+element.specificPrice - +element.specificPrice * +element.promoDiscount) :
                            +element.specificPrice - +element.promoDiscount : +element.specificPrice);

                    } else {
                        discountPrice += price
                    }
                }
            } else {
                discountPrice += promoPrice
            }

        })
        return +discountPrice.toFixed(2)
    }
    public onClickGetDiscount(): void {
        if (this._promoCodeFormControl.valid && !this.promoCodeLoading && !this.isPromocode) {
            this._checkPromoCode();
        }
    }

    public checkUserBalance(type: string, text: string): string {
        if (this._mainService.isAuthorized && this.orderStep == 2) {
            return (+this._mainService.getUserInfo()[type] < this._fullPrice) ? this.getTranslateWord(`Your ${text}  not enough to pay`, `Ваш  ${text} не достаточно для оплаты`, `Ձեր ${text} բավարար չէ վճարման համար`) : null
        }
    }

    public setDisabledPaymentMethods(paymethod): string {
        let shipMethod = this._orderForm.get('shipping_method').value;
        if (!shipMethod) {
            return 'disabled';
        }
        if (shipMethod == 4 && (paymethod.id !== 4 && paymethod.id !== 0)) {
            return 'disabled';
        }
        if (shipMethod == 5 && (paymethod.id !== 5 && paymethod.id !== 0)) {
            return 'disabled';
        }
        if ((shipMethod == 3 || shipMethod == 2) && (paymethod.id !== 0 && paymethod.id !== 1)) {
            return 'disabled';
        }

        // if ((shipMethod == 0) && (paymethod.id !== 0 && paymethod.id !== 1)) {
        //     return 'disabled';
        // }
        return ''
    }
    private _checkPromoCode(): void {
        this._productIdArray = []
        this.promoCodeLoading = true;
        if (this._platformService.isBrowser) {
            if (localStorage.getItem('basket_products')) {
                let basket = JSON.parse(localStorage.getItem('basket_products'))
                if (this.basketProducts.length !== basket.length) {
                    if (this.basketProducts.length > basket.length) {
                        this.basketProducts.forEach((data, i) => {
                            let index = basket.indexOf(data);
                            if (index == -1) {
                                this.basketProducts.splice(i, 1)
                            }
                        })
                    }
                }
            }
        }
        if (this.basketProducts) {
            for (let product of this.basketProducts) {
                this._productIdArray.push(product['id'])
            }
        }
        this._basketService.checkPromoCode(this._promoCodeFormControl.value, this._productIdArray).subscribe(
            (data: ServerResponse<PromoCode>) => {
                this._promoCode = data.messages;
                this._type = data.type
                this.isPromocode = true;
                this.promoCodeMessage = this.translateWord('_success_promocode_message');;
                this.promoCodeLoading = false;
                this.isDiscount = true
                this._calculatePromocodeDiscountPrice()
            },
            (error) => {
                this.promoCodeMessage = this.translateWord('_promocode_error_message');
                this.promoCodeLoading = false;
            })
    }

    private _calculatePromocodeDiscountPrice() {
        this._checkBasketProducts()
        let promoCodeLength: number = this.basketProducts.length;
        let count: number = 0;
        let salePrice;
        let discountType: string;
        if (this._type == 1) {
            for (let id of this._productIdArray) {
                if (this._promoCode['reduction_amount'] !== 0) {
                    if (this._promoCode['discount_type'] == "Percent - order") {
                        salePrice = +this._promoCode['reduction_amount'] / 100;
                        discountType = "Percent - order"
                    } else {
                        salePrice = +this._promoCode['reduction_amount'];
                        discountType = "Amount - order"
                    }
                }
                if (salePrice)
                    this.basketProducts.forEach((data) => {
                        if (data['id'] == id) {
                            data['promoDiscount'] = +salePrice;
                            data['discountType'] = discountType;
                            data['both'] = this._promoCode['both'];
                            data['isHaveBoth'] = true
                        }
                    })
            }
        } else {
            for (let id of this._productIdArray) {
                if (this._promoCode[id] == 0) {
                    count++
                }
            }
            if (count == promoCodeLength) {
                this.isDiscount = false
            } else {
                this.isDiscount = true
                for (let id of this._productIdArray) {
                    let salePrice;
                    let discountType: string;
                    if (this._promoCode[id] !== 0) {
                        if (this._promoCode[id]['discount_type'] == "Percent - order") {
                            salePrice = +this._promoCode[id]['reduction_amount'] / 100;
                            discountType = "Percent - order"
                        } else {
                            salePrice = +this._promoCode[id]['reduction_amount'];
                            discountType = "Amount - order"
                        }
                    }

                    if (salePrice)
                        this.basketProducts.forEach((data) => {
                            if (data['id'] == id) {
                                data['promoDiscount'] = +salePrice;
                                data['discountType'] = discountType;
                                data['both'] = this._promoCode[id]['both'];
                                data['isHaveBoth'] = true
                            }
                        })
                }
            }
        }
    }
    get discountPrice(): number {
        let totalPrice: number = this._checkBasketPrice();
        if (this.isPromocode) {
            totalPrice = this._checkDiscountPrice()
            // totalPrice = totalPrice - ((totalPrice * this._appService.checkPropertyValue(this._promoCode, 'reduction_amount')) / 100);
        }
        if (this.isPack) {
            totalPrice += 150;
        }
        this._totalPrice = totalPrice;
        return totalPrice;
    }
    get orderForm(): FormGroup {
        return this._orderForm;
    }

    get totalPrice(): number {
        let totalPrice: number = this._checkBasketPrice();
        if ((this.isPack && !this.isPromocode) || (this.isPack && !this.isDiscount && this.isPromocode)) {
            totalPrice = totalPrice + 150;
        }
        if (!this.isPromocode || (!this.isDiscount && this.isPromocode)) {
            this._totalPrice = totalPrice;
            if (this._totalPrice < +this._localShippingInfo.priceForFree) {
                this.shippingPrice = +this._localShippingInfo.price;
                this.shippingMessage = this.getTranslateWord(`Delivery +${this.shippingPrice} ֏`, `Доставка +${this.shippingPrice} ֏`, `Առաքումը +${this.shippingPrice} ֏ է`)
            }
            else {
                this.shippingPrice = 0;
                this.shippingMessage = this.getTranslateWord(`Free delivery`, `Бесплатная доставка`, `Անվճար առաքում`);
            }

        }
        return totalPrice;
    }

    get post(): boolean {
        return this._isPost
    }

    get promoCodeFormControl(): FormControl {
        return this._promoCodeFormControl;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }

    get isAuthorized(): boolean {
        return this._mainService.isAuthorized();
    }

    get fullPrice(): string {
        let price = `${this._totalPrice} ֏`;
        let total = this._totalPrice + this.shippingPrice + this.codPrice;
        if ((this._orderForm.get('payment_method').value == 4 || this._orderForm.get('payment_method').value === 5) && (this._orderForm.get('shipping_method').value == 4 || this._orderForm.get('shipping_method').value == 5) && this._currierInfo) {
            this.codPrice = this._checkBasketPrice() * this._currierInfo.percent / 100;
        }
        if (this.codPrice != 0) {
            price += ` + ${this.codPrice} ֏`
        }
        if (this.shippingPrice != 0) {
            price += ` + ${this.shippingPrice} ֏`;
        }
        price += ` = ${total} ֏`
        this._fullPrice = this._totalPrice + this.shippingPrice + this.codPrice;
        return price;
    }
    get locale() {
        let activeLanguage = this._translateService.getActiveLanguage();
        return this['_calendarConfig' + activeLanguage]

    }
    get bonusPrice(): string {
        let message: string;
        let bonusPrice: number = 0;
        if (this._mainService.isAuthorized()) {
            if (this._mainService.getUserInfo().percent) {
                bonusPrice = ((this._fullPrice - this.shippingPrice) * +this._mainService.getUserInfo().percent) / 100;
                message = this.getTranslateWord(`Your bonuse  ${bonusPrice} ֏`, `Your bonus: ${bonusPrice} ֏`, `Ձեր բոնուսը՝ ${bonusPrice} ֏ է`);
            }
        }
        return message;
    }

    get userBalance(): string {
        return this._mainService.getUserInfo().balance;
    }

    get userBonuce(): string {
        return this._mainService.getUserInfo().priceWithBonus;
    }

    get payNowPrice(): number {
        let paym = this.orderForm.get('payment_method').value;
        if (paym == 0) {
            return (this.isPromocode ? this.discountPrice + this.shippingPrice + this.codPrice : this.totalPrice + this.shippingPrice + this.codPrice);
        }
        else {
            if (paym == 4 || paym == 5) {
                if (this.shippingPrice == 0) {
                    return this.shippingPrice + this.codPrice + 300;
                }
                return this.shippingPrice + this.codPrice;
            }
        }
        return 0;
    }

    get payLaterPrice(): number {
        let paym = this.orderForm.get('payment_method').value;
        if (paym == 0) {
            return 0;
        }
        if (paym == 1) {
            return this.isPromocode ? this.discountPrice + this.shippingPrice : this.totalPrice + this.shippingPrice;
        }
        else {
            if (paym == 4 || paym == 5) {
                if (this.shippingPrice == 0) {
                    return this.isPromocode ? this.discountPrice - 300 : this.totalPrice - 300;
                }
                return this.isPromocode ? this.discountPrice : this.totalPrice;
            }
        }
        return 0;
    }
    get discountPayLaterPrice(): number {
        let laterPrice: number = this.payLaterPrice;

        if (this.isPromocode) {
            laterPrice = laterPrice - ((laterPrice * this._appService.checkPropertyValue(this._promoCode, 'reduction_amount')) / 100);
        }
        return laterPrice;
    }
    get language() {
        return this._translateService.getActiveLanguage()
    }
    get minDate(): Date {
        return this._minDate
    }
    get allTimes() {
        return this._newAllTimes
    }
    get isPost(): boolean {
        return this._isPost
    }
    get isHasWarming() {
        return this._isWarmingText
    }


}