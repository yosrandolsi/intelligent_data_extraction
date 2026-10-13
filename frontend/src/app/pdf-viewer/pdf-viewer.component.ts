import { Component } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent {
 
    imageSrc: string = '';
    pdfSrc: string = '';
  
    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        const fileExtension = file.name.split('.').pop();
        if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
         const reader = new FileReader();
reader.onload = () => {
  this.imageSrc = reader.result as string; // Type assertion
};
          reader.readAsDataURL(file);
        } else if (fileExtension === 'pdf') {
          this.pdfSrc = URL.createObjectURL(file);
        } else {
          // Afficher un message d'erreur ou une icône indiquant que le type de fichier n'est pas supporté
        }
      }
    }
  }