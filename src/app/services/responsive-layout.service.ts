import { Injectable, computed, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';


@Injectable({
  providedIn: 'root'
})
export class ResponsiveLayoutService {

  private readonly small = '(max-width: 600px)';
  private readonly medium = '(min-width: 601px) and (max-width: 1000px)';
  private readonly large = '(min-width: 1001px)';


  breakPointObserver = inject(BreakpointObserver)

  screenWidth = toSignal(this.breakPointObserver.observe([this.small, this.medium, this.large]));

  smallWidth = computed(() => this.screenWidth()?.breakpoints[this.small])
  mediumWidth = computed(() => this.screenWidth()?.breakpoints[this.medium])
  largeWidth = computed(() => this.screenWidth()?.breakpoints[this.large])





  constructor() { }
}
