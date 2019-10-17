import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Breadcrumbs } from '../../models/models';
import { TranslateService } from '../../services';

@Component({
    selector: "app-route-step",
    templateUrl: 'route-step.component.html',
    styleUrls: ['route-step.component.scss']
})
export class RouteStepComponent implements OnInit, OnDestroy {
    tempState = [];
    public arrow_icon: string
    @Input('routes') breadcrumbs: Array<Breadcrumbs> = [];
    constructor(private router: Router, private route: ActivatedRoute, private _titleService: Title,private _translateService:TranslateService) {
        // this.router.routeReuseStrategy.shouldReuseRoute = function(){
        //     return false;
        // }
        this.arrow_icon = window.innerWidth > 600 ? 'arrow_right_alt' : 'keyboard_arrow_right'
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    window.scrollTo(0, 0)
                    // this.router.navigated = false;
                    // this.breadcrumbs = [];
                    // this.tempState = [];
                    // let currentRoute = this.route.root,
                    //     url = '';
                    // do {
                    //     const childrenRoutes = currentRoute.children;
                    //     currentRoute = null;
                    //     childrenRoutes.forEach(routes => {
                    //         if (routes.outlet === 'primary') {
                    //             const routeSnapshot = routes.snapshot;
                    //             let queryParams;
                    //             url += routeSnapshot.url.map(segment => segment.path).join('/');
                    //             if (routes.snapshot.data.title !== undefined) {
                    //                 if (routes.snapshot.queryParams != {}) {
                    //                     queryParams = route.snapshot.queryParams;
                    //                 }
                    //                 if (!this.tempState.includes(routes.snapshot.data.title)) {
                    //                     this.tempState.push(routes.snapshot.data.title);
                    //                     this.breadcrumbs.push({
                    //                         label: routes.snapshot.data.title,
                    //                         status: status,
                    //                         url: url,
                    //                         queryParams: queryParams
                    //                     });
                    //                 }
                    //             }
                    //             currentRoute = routes;

                    //         }
                    //     });
                    // } while (currentRoute);
                }
            });
    }

    ngOnInit() { }
    public translateWord(key1:string,key2:string,key3:string){
        return this._translateService.translateImportant(key1,key2,key3)
    }
    ngOnDestroy() { }
}