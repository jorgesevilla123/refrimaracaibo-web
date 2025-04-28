import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarConfig as MatSnackBarConfig, MatLegacySnackBarHorizontalPosition as MatSnackBarHorizontalPosition, MatLegacySnackBarVerticalPosition as MatSnackBarVerticalPosition } from "@angular/material/legacy-snack-bar";




@Injectable({
  providedIn: 'root'
})
export class AlertService {

  horizontalPosition: MatSnackBarHorizontalPosition | undefined
  verticalPosition: MatSnackBarVerticalPosition | undefined


  constructor(private snackBar: MatSnackBar) { }

  
  
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
