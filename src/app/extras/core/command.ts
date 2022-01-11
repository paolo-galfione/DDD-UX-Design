import { Directive, ElementRef, HostListener } from '@angular/core';
import { AuditService } from './audit.service';
import { AuthService, Permessi } from './auth.service';

@Directive({
  selector: '[command]',
  providers: []
})
export class CommandDirective {
    constructor(private el: ElementRef,
                private auth: AuthService,
                private audit: AuditService) {
    }

    @HostListener('click') onClick() {
      const comando = this.el.nativeElement.getAttribute('data-bs-target').substring(1);
      console.log(`permesso: ${comando}  ruolo: ${this.auth.ruolo}`);
      if(this.auth.leggiPermessoRuolo(comando) === Permessi.YesWithAudit) {
        let motivazione = window.prompt(`Indica la motivazione dell'operazione:`);
        this.audit.addLog(this.auth.ruolo, motivazione || '');
      }
    }
}