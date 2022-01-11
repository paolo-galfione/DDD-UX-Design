import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  mainMenu = [
    { title: 'Home', routerLink: '/'},
    { title: 'CRUD', routerLink: '/crud'},
    { title: 'Domain', routerLink: '/domain'},
    { title: 'State', routerLink: '/state'},
    { title: 'Auth', routerLink: '/auth'},
    { title: 'Extras', routerLink: '/extras'}
];
}
