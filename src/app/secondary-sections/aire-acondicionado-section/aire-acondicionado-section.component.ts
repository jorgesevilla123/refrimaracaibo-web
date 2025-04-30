import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-aire-acondicionado-section',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './aire-acondicionado-section.component.html',
  styleUrls: ['./aire-acondicionado-section.component.scss']
})
export class AireAcondicionadoSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
