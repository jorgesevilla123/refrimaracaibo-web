import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-hogar-section',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './hogar-section.component.html',
  styleUrls: ['./hogar-section.component.scss']
})
export class HogarSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
