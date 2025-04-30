import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';


@Component({
  selector: 'app-nevera-section',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, BrowserModule],
  templateUrl: './nevera-section.component.html',
  styleUrls: ['./nevera-section.component.scss']
})
export class NeveraSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
