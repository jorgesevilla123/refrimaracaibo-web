import { Injectable, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';


@Injectable({
  providedIn: 'root'
})
export class ResponsiveLayoutService {

  private readonly small = '(max-width: 600px)';
  private readonly medium = '(min-width: 601px) and (max-width: 1000px)';
  private readonly large = '(min-width: 1001px)';


  breakPointObserver = inject(BreakpointObserver)

  screenWidth$ = this.breakPointObserver.observe([this.small, this.medium, this.large]);

  constructor() { }
}
