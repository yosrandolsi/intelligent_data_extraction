import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:8080/users'; // Remplacez ceci par l'URL de votre backend Spring Boot

  constructor(private http: HttpClient) { }

  saveInvoice(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/invoices`, formData);

  }

  saveCIN(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cin`, formData);
  }
  saveReceipt(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/receipts`, formData);
  }
  savePassport(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/passeports`, formData);
  }
  saveDrivingLicence(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/drivingLicences`, formData);
  }
  getAllInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllInvoices`);
  }
  getAllCIN(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllCIN`);
  }
  getAllPasseport(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllPasseport`);
  }
  getAllDrivingLicence(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllDrivingLicence`);
  }
  getAllReceipt(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllReceipt`);
  }
  countTotalDocuments(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
  countDocumentsByType(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/countByType`);
  }
  getSumScorePercentageByType(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/sumScorePercentageByType`);
  }



  saveEvaluation(evaluation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveEvaluation`, evaluation);
  }
  getAllEvaluations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getEvaluation`);
  }
  countInvoicesForLast7Days(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/count-last-7-days`);
  }

  countDocumentsForLast7Days(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/count-documents-last-7-days`);
  }
  countEvaluationNotes(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/count-notes`);
  }

  countDocumentsByUsername(username: string): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/countByUser/${username}`);
  }

  getSumScorePercentageByUsername(username: string): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/sumScorePercentageByUsername/${username}`);
  }
  countDocumentsForLast7DaysByUsername(username: string): Observable<any> {
    const url = `${this.baseUrl}/countDocumentsForLast7DaysByUsername/${username}`;
    return this.http.get(url);
  }
  filterEvaluations(filterType: string): Observable<any[]> {
    const url = `${this.baseUrl}/filter-evaluations?filterType=${filterType}`;
    return this.http.get<any[]>(url);
  }
}

