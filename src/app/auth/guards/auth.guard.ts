import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
    // if(this.authService.auth.id){
    //   return true
    // }

    // console.log('Bloqueado por el AuthGuard - canActivate ')

    return this.authService.verificaAutenticacion()
          .pipe(
            tap(estaAutenticado => {
              if( !estaAutenticado ){
                this.router.navigate(['./auth/login'])
              }
            })
          );
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verificaAutenticacion()
            .pipe(
              tap(estaAutenticado => {
                if( !estaAutenticado ){
                  this.router.navigate(['./auth/login'])
                }
              })
            );

    // if(this.authService.auth.id){
    //   return true
    // }

    // console.log('Bloqueado por el AuthGuard - canLoad')

    // return false
  }
  
}
