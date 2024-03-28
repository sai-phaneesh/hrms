import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingController } from '@ionic/angular';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    loading: HTMLIonLoadingElement;
    constructor(private loadingCtrl: LoadingController){
    }
    public url = 'http://13.235.98.232:9000';
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showLoading();
        // add authorization header with jwt token if available
        let token = localStorage.getItem('token');
        // let currentUser: any = currentUserObj ? JSON.parse(currentUserObj) : null;
        if (token) {
            request = request.clone({
                url: this.url + request.url,
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        else {
            request = request.clone({
                url: this.url+request.url,
            });
        }

    
        return next.handle(request)
        .pipe(
            finalize(() => this.loading.hidePopover()),);
    }

    async showLoading() {
        this.loading = await this.loadingCtrl.create({
          message: 'Updating...',
          duration:1000
        });
    
        this.loading.present();
      }
}