import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../views/main/main.service';
import { LoadingService } from '../../../services/loading.service';
import { MatDialog } from '@angular/material';
import { LoginModal } from '../../../modals';
import { MessageService } from 'primeng/api';
import { Reviews } from '../../../models/models';

@Component({
    selector: 'app-reviews',
    templateUrl: 'reviews.component.html',
    styleUrls: ['reviews.component.scss']
})
export class ReviewsTabComponent implements OnInit {
    public commentForm: FormGroup;
    public data: Reviews[];
    public isCheck: boolean
    @Input('data')
    set getReview($event) {
        this.data = $event;
        for (let review of this.data) {
            review['buttonText'] = 'Скрыть';
            review['isShow'] = true;
        }
    }
    @Input() id: number
    constructor(private _fb: FormBuilder,
        private _matDialog: MatDialog,
        private _mainService: MainService,
        private _loadingService: LoadingService,
        private _messageService: MessageService,
        @Inject('FILE_URL') public fileUrl: string) { }

    ngOnInit() {
        this._validation();
        this._setFormValue()
    }
    private _validation(): void {
        this.commentForm = this._fb.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            name: ['', Validators.required],
            advantages: ['', Validators.required],
            limitations: ['', Validators.required],
            comments: ['', Validators.required]
        })
    }
    private _setFormValue(): void {
        if (this._mainService.isAuthorized) {
            this._mainService.getUser().subscribe((data) => {
                this.commentForm.patchValue({
                    name: data.name,
                    email: data.email
                })
            })
        }

    }
    public hideComments(review: Reviews): void {
        review.isShow = !review.isShow;
        review.buttonText = review.isShow ? 'Скрыть' : 'Показать'
    }
    public addReview(): void {
        if (this.commentForm.valid) {
            this.isCheck = true
            if (this._mainService.isAuthorized()) {
                this._loadingService.showLoading()
                let commentBody = this.commentForm.getRawValue()
                commentBody['productId'] = this.id;
                this._mainService.addReview(commentBody).subscribe((data) => {
                    this._messageService.add({
                        severity: 'success', summary: 'Сообщение',
                        detail: 'Спасибо! Ваше сообщение успешно отправлено'
                    })
                    this.isCheck = false
                    this.commentForm.reset();
                    this._setFormValue()
                    this._loadingService.hideLoading()
                })
            } else {
                let dialog = this._matDialog.open(LoginModal, {
                    width: '371px',
                    minHeight: '433px',
                    maxHeight: '80vh',
                    data: { isRegistr: true, isReview: true }
                })
                dialog.afterClosed().subscribe(() => {
                    this.isCheck = false
                    if (this._mainService.isAuthorized()) {
                        this._setFormValue()
                    }
                })
            }
        }
    }
    public getUserImage(review) {
        return review.users && review.users.profile_image ?
            this.fileUrl + review.users.profile_image : 'assets/images/logo.jpg';
    }
}
