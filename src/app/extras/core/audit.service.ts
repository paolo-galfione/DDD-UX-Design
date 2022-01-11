import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class AuditService {
    public auditLog: { dataLog: string, ruolo: string, motivazione: string }[] = [];

    addLog(ruolo: string, motivazione: string) {
        this.auditLog.push({ dataLog: new Date().toString(), ruolo, motivazione});
    }
    
  }