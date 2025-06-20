import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { WidgetComponent } from "../../components/widget/widget.component";
import { DashboardService } from '../../services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { wrapGrid } from 'animate-css-grid';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    WidgetComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,    
    CdkDropList,
    CdkDropListGroup
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  store = inject(DashboardService);

  dashboard = viewChild.required<ElementRef>('dashboard');

  ngOnInit(): void {
    wrapGrid(this.dashboard().nativeElement, {
      duration: 300
    });
  }

  onDrop(event: CdkDragDrop<number, any>) {

    const {previousContainer, container} = event;

    this.store.updateWidgetPosition(previousContainer.data, container.data);
    
    
  }
}
