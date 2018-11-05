import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() items:string[];
  @Output() itemsChange = new EventEmitter();

  @Input() title: string = "";
  constructor() { 
  }

  ngOnInit() {
  }

  valueChanges(index, value){

    this.items[index] = value;
    this.itemsChange.emit(this.items);
  }

  add(){
    if (!this.items) this.items = [];

    this.items.push("");
  }

  remove(index){
    this.items.splice(index, 1);
  }
}
