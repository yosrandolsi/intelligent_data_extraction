import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
    private isDocumentSent = false; // Flag to track sending status
    private documentSent = new Subject<boolean>(); // Observable for status change
    private extractionResults = new Subject<string>();
  
    constructor(private http: HttpClient) { }
    public extractInformationFromDocument(formData: FormData): void {
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'multipart/form-data');
    
      this.http.post<any>('http://localhost:5000/extract-information', formData, { headers })
        .subscribe(
          response => {
            console.log('Extraction result:', response);
            this.extractionResults.next(response); // Émettre les informations extraites
          },
          error => {
            console.error('Extraction error:', error);
            this.extractionResults.error(error); // Émettre l'erreur
          }
        );
    }


    public classifyDocument(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('document', file);
    
      return this.http.post<any>('http://localhost:5000/classify', formData);
    }
  
    public getDocumentSentObservable(): Observable<boolean> {
      return this.documentSent.asObservable();
    }

    public getExtractionResultsObservable(): Observable<string> {
      return this.extractionResults.asObservable();
    }
}
