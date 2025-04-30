import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';


@Component({
  selector: 'app-commercial-refri',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './commercial-refri.component.html',
  styleUrls: ['./commercial-refri.component.scss']
})
export class CommercialRefriComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
