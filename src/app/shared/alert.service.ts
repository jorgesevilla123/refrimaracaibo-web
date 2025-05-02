import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";




@Injectable({
  providedIn: 'root'
})
export class AlertService {

  horizontalPosition: MatSnackBarHorizontalPosition | undefined
  verticalPosition: MatSnackBarVerticalPosition | undefined


  constructor(public snackBar: MatSnackBar) { }

  
  
  notifySuccess(message: string, duration: number, verticalAlign?: MatSnackBarVerticalPosition, horizontalAlign?: MatSnackBarHorizontalPosition){
    this.horizontalPosition = horizontalAlign;
    this.verticalPosition = verticalAlign;
    let snackConfig = new MatSnackBarConfig();
    snackConfig.duration = duration;
    snackConfig.horizontalPosition = this.horizontalPosition;
    snackConfig.verticalPosition = this.verticalPosition;
    snackConfig.panelClass = ['success-class'];
    this.snackBar.open(message, 'Aceptar', snackConfig);


  }

  notifyWarn(message: string, duration: number, verticalAlign?: MatSnackBarVerticalPosition, horizontalAlign?: MatSnackBarHorizontalPosition){
    this.horizontalPosition = horizontalAlign;
    this.verticalPosition = verticalAlign;
    let snackConfig = new MatSnackBarConfig();
    snackConfig.duration = duration;
    snackConfig.horizontalPosition = this.horizontalPosition;
    snackConfig.verticalPosition = this.verticalPosition;
    snackConfig.panelClass = ['web-warn'];
    this.snackBar.open(message, '', snackConfig);

  }



  
}
