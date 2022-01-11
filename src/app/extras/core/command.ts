import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[command]'
})
export class CommandDirective {
    constructor(private el: ElementRef) {
       console.log('nome', this);
    }

    @HostListener('click') onClick() {
      const attr = this.el.nativeElement.getAttribute('data-bs-target');
      window.alert('Ciao ' + attr);
    }
}