import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface HeaderNavToggle{
  screenwidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-header',
  standalone: true,//ajouter
  // Assure-toi que RouterModule est importé
  imports: [CommonModule, RouterModule],//ajouter
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('fadeInOut',[
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset:'0'}),
            style({transform: 'rotate(2turn)', offset:'1'}),
          ])
        )
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit{

  @Output() onToggleHeaderNav: EventEmitter<HeaderNavToggle> = new EventEmitter();
  collapsed= false;
  screenwidth= 0;
  navData= navbarData;


  @HostListener('window: resize', ['$event'])
  onResize(event: any){
    this.screenwidth = window.innerWidth;
    if(this.screenwidth <= 768){
      this.collapsed = false;
      this.onToggleHeaderNav.emit({collapsed: this.collapsed, screenwidth: this.screenwidth});
    }
  }
  
  ngOnInit(): void{
    this.screenwidth = window.innerWidth;
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleHeaderNav.emit({collapsed: this.collapsed, screenwidth: this.screenwidth});
  }
  
  closeHeader(): void{
    this.collapsed= false;
    this.onToggleHeaderNav.emit({collapsed: this.collapsed, screenwidth: this.screenwidth});
  }
  
  
  /*menuValue: boolean= false;
  menu_icon: String= 'bi bi-list'

  openMenu(){
    this.menuValue =!this.menuValue;
    this.menu_icon= this.menuValue ? 'bi bi-x':'bi bi-list';
  }

  closeMenu(){
    this.menuValue= false;
    this.menu_icon= 'bi bi-list'
  }*/
}
