import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainSectionTemplatesComponent } from '../main-sections/main-section-templates/main-section-templates.component';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-register-toolbar',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, MainSectionTemplatesComponent],
  templateUrl: './register-toolbar.component.html',
  styleUrls: ['./register-toolbar.component.scss']
})
export class RegisterToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
