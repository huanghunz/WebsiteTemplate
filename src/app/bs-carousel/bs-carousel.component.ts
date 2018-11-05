import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bs-carousel',
  templateUrl: './bs-carousel.component.html',
  styleUrls: ['./bs-carousel.component.css']
})
export class BsCarouselComponent implements OnInit {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  
  constructor(config: NgbCarouselConfig) {
    
    // stop auto play
    config.interval = 0;
    
  }

  ngOnInit() {
  }

}
