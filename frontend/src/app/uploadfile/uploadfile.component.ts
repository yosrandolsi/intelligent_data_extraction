import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import gsap from 'gsap';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  showEvaluationCard: boolean = false;
  showConfirmationBox: boolean = false;
  feedbackMessage: string = '';
  pdfSrc?: string | Uint8Array; //
  public files: FileList | null = null;
  public fileName: string | null = null;
  public fileDataUrl: string | null = null;
  public savedSuccessfully: boolean = false;
  public extractionResultsText: string = '';
  public isExtracting: boolean = false;
  public documentForm: FormGroup;
  invoiceNumberScore: number = 0;
  invoiceDateScore: number = 0;
  totalAmountScore: number = 0;
  vendorNameScore: number = 0;
  accountNumberScore: number = 0;
  statementDateScore: number = 0;
  previousBalanceScore: number = 0;
  totalDepositsScore: number = 0;
  totalWithdrawalsScore: number = 0;
  currentBalanceScore: number = 0;
  customerAddressScore: number = 0;


  receiptNumberScore: number = 0;
receiptDateScore: number = 0;

storeNameScore: number = 0;
salesTaxScore: number = 0;


cinNumberScore: number = 0;
fullNameScore: number = 0;
dateOfBirthScore: number = 0;
nationalityScore: number = 0;
expiryDateScore: number = 0;
issueDateScore: number = 0;
licenceNumberScore: number = 0;
nameScore: number = 0;


passportNumberScore: number = 0;
givenNameScore: number = 0;
surnameScore: number = 0;

sexScore: number = 0;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;
  
  public classifiedDocumentType: string | null = null;
  public selectedDocumentType: string | null = null;

  invoiceForm: FormGroup;
  receiptForm: FormGroup;
  passportForm: FormGroup;
  cinForm: FormGroup;
  statementForm: FormGroup;
  drivingLicenceForm: FormGroup;
  public invalidFileType: boolean = false;

  constructor( private userService: UserService,private fb: FormBuilder, private documentService: DocumentService,private dataService: DataService,private authService: AuthService) {
    this.invoiceForm = this.fb.group({
      invoiceNumber: [''],
      invoiceDate: [''],
      totalAmount: [''],
      vendorName: [''],
    // Ajout du champ de nom du client
      customerAddress: [''], // Ajout du champ d'adresse du client
      
    });
    this.drivingLicenceForm = this.fb.group({
      licenceNumber: [''],
      Name: [''], // Changer le nom du champ pour "name"
      dateOfBirth: [''],
      nationality: [''],
      expiryDate: [''],
      issueDate: ['']
    });


    this.receiptForm = this.fb.group({
      receiptNumber: [''],
      receiptDate: [''],
      totalAmount: [''], // Remplacer 'amountReceived' par 'totalAmount'
      storeName: [''],
      salesTax: ['']
    });

    this.passportForm = this.fb.group({
      passportNumber: [''],
      givenName: [''], // Champ pour le prénom
      surname: [''], // Champ pour le nom
      nationality: [''],
      dateOfBirth: [''],
      issueDate: [''],
      expiryDate: [''],
      sex: ['']
    });

    this.statementForm = this.fb.group({
      accountNumber: [''],
      statementDate: [''],
      previousBalance: [''],
      totalDeposits: [''],
      totalWithdrawals: [''],
      currentBalance: [''],
      sex: ['']
    });



    this.cinForm = this.fb.group({
      cinNumber: [''],
      fullName: [''],
   
      dateOfBirth: [''],
      nationality: [''],
      expiryDate: [''], // Ajout du champ d'expiration
      issueDate: ['']   // Ajout du champ d'émission
    });



    this.documentForm = this.fb.group({
      documentType: ['']
    });
  }

  ngOnInit(): void {
    
    this.documentService.getExtractionResultsObservable().subscribe(
      (extractionResult: any) => {
        this.fillFormFields(extractionResult);
        this.isExtracting = false;
      },
      (error: any) => {
        console.error('Error fetching extraction results:', error);
        this.isExtracting = false;
      }
    );
    
  }
  closeFeedbackBox() {
    this.showEvaluationCard = false;
    // Logique pour fermer la boîte de feedback
  }
  onSubmit() {
    this.showEvaluationCard = true;
    // Sélection de l'action en fonction du type de document sélectionné
    switch(this.selectedDocumentType) {
      case 'CIN':
        this.onSubmitCIN();
        break;
      case 'Invoice':
        this.onSubmitInvoice();
        break;
      case 'Receipt':
        this.onSubmitReceipt();
        break;
      case 'Passport':
        this.onSubmitPassport();
        break;
      case 'Driving Licence':
        this.onSubmitDrivingLicence();
        break;
      default:
        console.error('Unknown document type:', this.selectedDocumentType);
    }
  }
  onSubmitDrivingLicence() {
    if (this.drivingLicenceForm.valid) {
        const formData: { [key: string]: any } = {};
        Object.keys(this.drivingLicenceForm.controls).forEach(key => {
            formData[key] = this.drivingLicenceForm.get(key)?.value;
        });
        formData['fileName'] = this.fileName;
        
        // Ajouter les scores au formData
        formData['licenceNumberScore'] = this.licenceNumberScore;
        formData['nameScore'] = this.nameScore;
        formData['dateOfBirthScore'] = this.dateOfBirthScore;
        formData['nationalityScore'] = this.nationalityScore;
        formData['expiryDateScore'] = this.expiryDateScore;
        formData['issueDateScore'] = this.issueDateScore;

        // Récupérer l'ID de l'utilisateur depuis le stockage local
        const userId = Number(localStorage.getItem('id'));

        // Utiliser l'ID pour récupérer l'utilisateur correspondant depuis le service UserService
        this.userService.getUserById(userId).subscribe(
            (user) => {
                const username = user.username;
                console.log('Username retrieved:', username); // Afficher le nom d'utilisateur dans la console
                formData['username'] = username;

                console.log('Data to be sent to backend (Driving Licence):', formData); // Afficher toutes les données à envoyer vers le backend

                // Envoi des données vers le backend
                this.dataService.saveDrivingLicence(formData).subscribe(
                    (response) => {
                        console.log('Driving Licence data sent successfully:', response);
                        // Réinitialiser le formulaire après l'envoi des données
                        this.savedSuccessfully = true;
                    },
                    (error) => {
                        console.error('Error sending driving licence data:', error);
                        // Log de l'erreur spécifique à la cause de l'échec de l'envoi des données
                        if (error.status === 400) {
                            console.error('Bad request - Invalid data format:', error.error);
                        } else {
                            console.error('Unknown error:', error);
                        }
                    }
                );
            },
            (error) => {
                console.error('Error fetching user data:', error);
            }
        );
    } else {
        console.error('Driving Licence form is invalid.');
    }
}

  
onSubmitPassport() {
  if (this.passportForm.valid) {
      const formData: { [key: string]: any } = {};

      // Récupérer les données du formulaire
      Object.keys(this.passportForm.controls).forEach(key => {
          formData[key] = this.passportForm.get(key)?.value;
      });

      // Ajouter le nom du fichier
      formData['fileName'] = this.fileName;

      // Ajouter les champs de score
      formData['passportNumberScore'] = this.passportNumberScore;
      formData['givenNameScore'] = this.givenNameScore;
      formData['surnameScore'] = this.surnameScore;
      formData['nationalityScore'] = this.nationalityScore;
      formData['dateOfBirthScore'] = this.dateOfBirthScore;
      formData['issueDateScore'] = this.issueDateScore;
      formData['expiryDateScore'] = this.expiryDateScore;
      formData['sexScore'] = this.sexScore; // Si ce champ est inclus dans votre formulaire

      // Récupérer l'ID de l'utilisateur depuis le stockage local
      const userId = Number(localStorage.getItem('id'));

      // Utiliser l'ID pour récupérer l'utilisateur correspondant depuis le service UserService
      this.userService.getUserById(userId).subscribe(
          (user) => {
              const username = user.username;
              console.log('Username retrieved:', username); // Afficher le nom d'utilisateur dans la console
              formData['username'] = username;

              console.log('Data to be sent to backend (Passport):', formData); // Afficher toutes les données à envoyer vers le backend

              // Envoi des données vers le backend
              this.dataService.savePassport(formData).subscribe(
                  (response) => {
                      console.log('Passport data sent successfully:', response);
                      // Réinitialiser le formulaire après l'envoi des données
                      this.savedSuccessfully = true;
                  },
                  (error) => {
                      console.error('Error sending passport data:', error);
                      // Log de l'erreur spécifique à la cause de l'échec de l'envoi des données
                      if (error.status === 400) {
                          console.error('Bad request - Invalid data format:', error.error);
                      } else {
                          console.error('Unknown error:', error);
                      }
                  }
              );
          },
          (error) => {
              console.error('Error fetching user data:', error);
          }
      );
  } else {
      console.error('Passport form is invalid.');
  }
}


  
onSubmitReceipt() {
  if (this.receiptForm.valid && this.fileName) {
    // Mettre à jour le champ fileName dans le formulaire avec la valeur actuelle de this.fileName
    this.receiptForm.get('fileName')?.setValue(this.fileName);

    // Créer un objet formData contenant toutes les valeurs du formulaire
    const formData: { [key: string]: any } = {};
    Object.keys(this.receiptForm.controls).forEach(key => {
      formData[key] = this.receiptForm.get(key)?.value;
    });
    
    // Ajouter le nom de fichier à formData
    formData['fileName'] = this.fileName;

    // Récupérer l'ID de l'utilisateur depuis le stockage local
    const userId = Number(localStorage.getItem('id'));

    // Utiliser l'ID pour récupérer l'utilisateur correspondant depuis le service UserService
    this.userService.getUserById(userId).subscribe(
      (user) => {
        const username = user.username;
        formData['username'] = username;

        // Ajouter les scores au formData
        formData['receiptNumberScore'] = this.receiptNumberScore;
        formData['receiptDateScore'] = this.receiptDateScore;
        formData['totalAmountScore'] = this.totalAmountScore;
        formData['storeNameScore'] = this.storeNameScore;
        formData['salesTaxScore'] = this.salesTaxScore;

        // Envoyer les données vers le backend via le service DataService
        this.dataService.saveReceipt(formData).subscribe(
          (response) => {
            console.log('Receipt data sent successfully:', response);
            // Réinitialiser le formulaire après l'envoi des données si nécessaire
            this.receiptForm.reset();
          },
          (error) => {
            console.error('Error sending receipt data:', error);
            if (error.status === 400) {
              console.error('Bad request - Invalid data format:', error.error);
            } else {
              console.error('Unknown error:', error);
            }
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  } else {
    console.error('Receipt form is invalid or fileName is missing.');
  }
}


onSubmitCIN() {
  if (this.cinForm.valid) {
    const formData: { [key: string]: any } = {};
    Object.keys(this.cinForm.controls).forEach(key => {
      formData[key] = this.cinForm.get(key)?.value;
    });
    formData['fileName'] = this.fileName;
    // Ajouter les champs de score au formulaire de données
    formData['cinNumberScore'] = this.cinNumberScore;
    formData['fullNameScore'] = this.fullNameScore;
    formData['dateOfBirthScore'] = this.dateOfBirthScore;
    formData['nationalityScore'] = this.nationalityScore;
    formData['expiryDateScore'] = this.expiryDateScore;
    formData['issueDateScore'] = this.issueDateScore;

    // Récupérer l'ID de l'utilisateur depuis le stockage local
    const userId = Number(localStorage.getItem('id'));

    // Utiliser l'ID pour récupérer l'utilisateur correspondant depuis le service UserService
    this.userService.getUserById(userId).subscribe(
      (user) => {
        const username = user.username;
        console.log('Username retrieved:', username); // Afficher le nom d'utilisateur dans la console
        formData['username'] = username;

        console.log('Data to be sent to backend (CIN):', formData); // Afficher toutes les données à envoyer vers le backend

        // Envoi des données vers le backend
        this.dataService.saveCIN(formData).subscribe(
          (response) => {
            console.log('CIN data sent successfully:', response);
            // Réinitialiser le formulaire après l'envoi des données
            this.savedSuccessfully = true;
          },
          (error) => {
            console.error('Error sending CIN data:', error);
            // Log de l'erreur spécifique à la cause de l'échec de l'envoi des données
            if (error.status === 400) {
              console.error('Bad request - Invalid data format:', error.error);
            } else {
              console.error('Unknown error:', error);
            }
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  } else {
    console.error('CIN form is invalid.');
  }
}


onSubmitInvoice() {
  if (this.invoiceForm.valid && this.fileName) {
    const formData: { [key: string]: any } = {};
    Object.keys(this.invoiceForm.controls).forEach(key => {
      formData[key] = this.invoiceForm.get(key)?.value;
    });

    // Ajouter les scores aux données à envoyer
    formData['invoiceNumberScore'] = this.invoiceNumberScore;
    formData['invoiceDateScore'] = this.invoiceDateScore;
    formData['totalAmountScore'] = this.totalAmountScore;
    formData['vendorNameScore'] = this.vendorNameScore;
    formData['customerAddressScore'] = this.customerAddressScore;

    formData['fileName'] = this.fileName;

    // Récupérer l'ID de l'utilisateur depuis le stockage local
    const userId = Number(localStorage.getItem('id'));

    // Utiliser l'ID pour récupérer l'utilisateur correspondant depuis le service UserService
    this.userService.getUserById(userId).subscribe(
      (user) => {
        const username = user.username;
        console.log('Username retrieved:', username); // Afficher le nom d'utilisateur dans la console
        formData['username'] = username;

        console.log('Data to be sent to backend (Invoice):', formData); // Afficher toutes les données à envoyer vers le backend

        // Envoi des données vers le backend
        this.dataService.saveInvoice(formData).subscribe(
          (response) => {
            console.log('Invoice data sent successfully:', response);
            this.savedSuccessfully = true; 
          },
          (error) => {
            console.error('Error sending invoice data:', error);
            if (error.status === 400) {
              console.error('Bad request - Invalid data format:', error.error);
            } else {
              console.error('Unknown error:', error);
            }
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  } else {
    console.error('Invoice form is invalid or fileName is missing.');
  }
}


  public handleFileInput(event: any) {
    // Réinitialiser le formulaire
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e) => {
        this.pdfSrc = reader.result as string | Uint8Array; // Ajustement du type ici 
        console.log(this.pdfSrc);
      };
      reader.readAsArrayBuffer(file);
      this.processFile(file); // Utiliser readAsArrayBuffer pour obtenir un Uint8Array
    }

    this.resetForm();

    this.files = event.target.files;
    if (this.files && this.files.length > 0) {
      const file: File = this.files[0];
      this.fileName = file.name;

      this.readFile(file);
      this.validateFileType(file);

      this.documentService.classifyDocument(file).subscribe(
        (response) => {
          console.log('Document classified successfully');
          console.log('Document type:', response.document_type);
          this.classifiedDocumentType = response.document_type;
          this.selectedDocumentType = response.document_type;
        },
        (error) => {
          console.error('Error classifying document:', error);
        }
      );
      this.resetFormFields();
      // Classer le document
      this.classifyDocument(file);
      gsap.to(this.progressBar.nativeElement, { width: '100%', duration: 5, ease: 'linear' }); // Durée de l'animation en secondes
    } else {
      this.resetForm();
    }
  
  }

  public handleFileDrop(event: any) {
    // Réinitialiser le formulaire
    this.resetForm();

    event.preventDefault();
    this.files = event.dataTransfer.files;
    if (this.files && this.files.length > 0) {
      const file: File = this.files[0];
      this.fileName = file.name;
      this.readFile(file);
      this.validateFileType(file);
      this.resetFormFields();
      // Classer le document
      this.classifyDocument(file);
      this.processFile(file);
    } else {
      this.resetForm();
    }
  }
  private processFile(file: File) {
    this.fileName = file.name;
    this.readFile(file);
    this.validateFileType(file);
  
    this.documentService.classifyDocument(file).subscribe(
      (response) => {
        console.log('Document classified successfully');
        console.log('Document type:', response.document_type);
        this.classifiedDocumentType = response.document_type;
        this.selectedDocumentType = response.document_type;
  
        // Lancer l'extraction une fois que la classification est terminée
        this.handleExtractClick();
      },
      (error) => {
        console.error('Error classifying document:', error);
      }
    );
  }
  private classifyDocument(file: File) {
    if (this.files && this.files.length > 0) {
      const file: File = this.files[0];
      this.fileName = file.name;
      this.readFile(file);
      this.validateFileType(file);

      this.documentService.classifyDocument(file).subscribe(
        (response) => {
          console.log('Document classified successfully');
          console.log('Document type:', response.document_type);
          this.classifiedDocumentType = response.document_type;
          this.selectedDocumentType = response.document_type;
        },
        (error) => {
          console.error('Error classifying document:', error);
        }
      );
    } else {
      this.resetForm();
    }
  }

  public removeFile() {
    this.resetForm();
    this.resetFormFields();
  }

  private resetForm() {
    this.fileName = null;
    this.fileDataUrl = null;
    this.files = null;
    this.invoiceForm.reset();
    this.classifiedDocumentType = null;
    this.selectedDocumentType = null;
  }

  private validateFileType(file: File): void {
    const acceptedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!acceptedTypes.includes(file.type)) {
      this.invalidFileType = true;
      setTimeout(() => {
        this.invalidFileType = false;
      }, 3000);
    }
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.fileDataUrl = e.target?.result?.toString() ?? null;
    };
    reader.readAsDataURL(file);
  }



  public fileOver(event: any) {
    event.preventDefault();
    console.log(event);
  }

  public fileLeave(event: any) {
    event.preventDefault();
    console.log(event);
  }

  public browseFiles() {
    this.fileInput.nativeElement.click();
  }

  isPDF(fileUrl: string | null): boolean {
    if (!fileUrl) {
      return false;
    }
    return fileUrl.toLowerCase().endsWith('.pdf');
  }


  public handleExtractClick(): void {
    if (this.files && this.files.length > 0 && this.selectedDocumentType) {
      const file: File = this.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string;

        const formData = new FormData();
        formData.append('document', file);
        if (this.selectedDocumentType) {
          formData.append('documentType', this.selectedDocumentType); // Ajout du type de document s'il est défini
        }

        this.isExtracting = true;
        this.documentService.extractInformationFromDocument(formData);
      };
      if (this.isPDF(file.name)) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsDataURL(file);
      }
    } else {
      console.error('No file selected or document type not specified. Please choose a file and select a document type to extract information.');
    }
  }
  private resetFormFields(): void {
    this.invoiceForm.reset();
    this.receiptForm.reset();
    this.passportForm.reset();
    this.cinForm.reset();
    this.statementForm.reset();
    this.drivingLicenceForm.reset();
    this.invoiceForm.reset();
    this.invoiceNumberScore = 0;
    this.invoiceDateScore = 0;
    this.totalAmountScore = 0;
    this.vendorNameScore = 0;
    this.customerAddressScore = 0;
  
    this.receiptNumberScore = 0;
    this.receiptDateScore = 0;
    this.storeNameScore = 0;
    this.salesTaxScore = 0;
  
    this.cinNumberScore = 0;
    this.fullNameScore = 0;
    this.dateOfBirthScore = 0;
    this.nationalityScore = 0;
    this.expiryDateScore = 0;
    this.issueDateScore = 0;
  
    this.licenceNumberScore = 0;
    this.nameScore = 0;
  
    this.passportNumberScore = 0;
    this.givenNameScore = 0;
    this.surnameScore = 0;
  
    this.accountNumberScore = 0;
    this.statementDateScore = 0;
    this.previousBalanceScore = 0;
    this.totalDepositsScore = 0;
    this.totalWithdrawalsScore = 0;
    this.currentBalanceScore = 0;
  }

  private fillFormFields(extractionResult: any): void {
    if (extractionResult && this.selectedDocumentType === 'Invoice') {
      if (extractionResult.invoice_number && extractionResult.invoice_number.answer) {
        const invoiceNumberScore = extractionResult.invoice_number.score;
        this.invoiceNumberScore = invoiceNumberScore;
        
        this.invoiceForm.patchValue({
          invoiceNumber: extractionResult.invoice_number.answer,
          invoiceDate: extractionResult.invoice_date ? extractionResult.invoice_date.answer || '' : '',
          totalAmount: extractionResult.total_amount ? extractionResult.total_amount.answer || '' : '',
          vendorName: extractionResult.vendor_name ? extractionResult.vendor_name.answer || '' : '',
          customerAddress: extractionResult.customer_address ? extractionResult.customer_address.answer || '' : ''
        });
      }

      // Patch scores for other fields
      this.invoiceDateScore = extractionResult.invoice_date ? extractionResult.invoice_date.score : 0;
      this.totalAmountScore = extractionResult.total_amount ? extractionResult.total_amount.score : 0;
      this.vendorNameScore = extractionResult.vendor_name ? extractionResult.vendor_name.score : 0;
      this.customerAddressScore = extractionResult.customer_address ? extractionResult.customer_address.score : 0;
    
     }else if (extractionResult && this.selectedDocumentType === 'Receipt') {
        if (extractionResult.receipt_number && extractionResult.receipt_number.answer) {
          const receiptNumberScore = extractionResult.receipt_number.score;
          this.receiptNumberScore = receiptNumberScore;
          this.receiptForm.patchValue({
            receiptNumber: extractionResult.receipt_number.answer,
            // Patch other fields similarly
          });
        }
    
        // Patch scores for other fields
        this.receiptDateScore = extractionResult.purchase_date ? extractionResult.purchase_date.score : 0;
        this.totalAmountScore = extractionResult.total_amount ? extractionResult.total_amount.score : 0;
        this.storeNameScore = extractionResult.store_name ? extractionResult.store_name.score : 0;
        this.salesTaxScore = extractionResult.sales_tax_amount ? extractionResult.sales_tax_amount.score : 0;
    
        // Patch other fields
        this.receiptForm.patchValue({
          receiptDate: extractionResult.purchase_date ? extractionResult.purchase_date.answer || '' : '',
          totalAmount: extractionResult.total_amount ? extractionResult.total_amount.answer || '' : '',
          storeName: extractionResult.store_name ? extractionResult.store_name.answer || '' : '',
          salesTax: extractionResult.sales_tax_amount ? extractionResult.sales_tax_amount.answer || '' : '',
          documentType: ''
        });
      
      } else  if (extractionResult && this.selectedDocumentType === 'Statement') {
        this.statementForm.patchValue({
          accountNumber: extractionResult.account_number ? extractionResult.account_number.answer || '' : '',
          statementDate: extractionResult.statement_date ? extractionResult.statement_date.answer || '' : '',
          previousBalance: extractionResult.previous_balance ? extractionResult.previous_balance.answer || '' : '',
          totalDeposits: extractionResult.total_deposits ? extractionResult.total_deposits.answer || '' : '',
          totalWithdrawals: extractionResult.total_withdrawals ? extractionResult.total_withdrawals.answer || '' : '',
          currentBalance: extractionResult.current_balance ? extractionResult.current_balance.answer || '' : '',
          documentType: ''
        });
    
        // Patch scores for fields
        this.accountNumberScore = extractionResult.account_number ? extractionResult.account_number.score : 0;
        this.statementDateScore = extractionResult.statement_date ? extractionResult.statement_date.score : 0;
        this.previousBalanceScore = extractionResult.previous_balance ? extractionResult.previous_balance.score : 0;
        this.totalDepositsScore = extractionResult.total_deposits ? extractionResult.total_deposits.score : 0;
        this.totalWithdrawalsScore = extractionResult.total_withdrawals ? extractionResult.total_withdrawals.score : 0;
        this.currentBalanceScore = extractionResult.current_balance ? extractionResult.current_balance.score : 0;
      
      
      }  if (extractionResult && this.selectedDocumentType === 'CIN') {
        this.cinForm.patchValue({
          cinNumber: extractionResult.cin_number ? extractionResult.cin_number.answer || '' : '',
          fullName: extractionResult.full_name ? extractionResult.full_name.answer || '' : '',
          dateOfBirth: extractionResult.date_of_birth ? extractionResult.date_of_birth.answer || '' : '',
          nationality: extractionResult.nationality ? extractionResult.nationality.answer || '' : '',
          expiryDate: extractionResult.expiry_date ? extractionResult.expiry_date.answer || '' : '',
          issueDate: extractionResult.issue_date ? extractionResult.issue_date.answer || '' : ''
        });
    
        // Patch scores for fields
        this.cinNumberScore = extractionResult.cin_number ? extractionResult.cin_number.score : 0;
        this.fullNameScore = extractionResult.full_name ? extractionResult.full_name.score : 0;
        this.dateOfBirthScore = extractionResult.date_of_birth ? extractionResult.date_of_birth.score : 0;
        this.nationalityScore = extractionResult.nationality ? extractionResult.nationality.score : 0;
        this.expiryDateScore = extractionResult.expiry_date ? extractionResult.expiry_date.score : 0;
        this.issueDateScore = extractionResult.issue_date ? extractionResult.issue_date.score : 0;
      
      
      
       } else  if (extractionResult && this.selectedDocumentType === 'Passport') {
        this.passportForm.patchValue({
          passportNumber: extractionResult.passport_number ? extractionResult.passport_number.answer || '' : '',
          givenName: extractionResult.given_name ? extractionResult.given_name.answer || '' : '',
          surname: extractionResult.surname ? extractionResult.surname.answer || '' : '',
          nationality: extractionResult.nationality ? extractionResult.nationality.answer || '' : '',
          dateOfBirth: extractionResult.date_of_birth ? extractionResult.date_of_birth.answer || '' : '',
          issueDate: extractionResult.issue_date ? extractionResult.issue_date.answer || '' : '',
          expiryDate: extractionResult.expiry_date ? extractionResult.expiry_date.answer || '' : '',
          sex: extractionResult.sex ? extractionResult.sex.answer || '' : ''
        });
    
        // Patch scores for fields
        this.passportNumberScore = extractionResult.passport_number ? extractionResult.passport_number.score : 0;
        this.givenNameScore = extractionResult.given_name ? extractionResult.given_name.score : 0;
        this.surnameScore = extractionResult.surname ? extractionResult.surname.score : 0;
        this.nationalityScore = extractionResult.nationality ? extractionResult.nationality.score : 0;
        this.dateOfBirthScore = extractionResult.date_of_birth ? extractionResult.date_of_birth.score : 0;
        this.issueDateScore = extractionResult.issue_date ? extractionResult.issue_date.score : 0;
        this.expiryDateScore = extractionResult.expiry_date ? extractionResult.expiry_date.score : 0;
        this.sexScore = extractionResult.sex ? extractionResult.sex.score : 0;
      }
      else if (extractionResult && this.selectedDocumentType === 'Driving Licence') {
        this.drivingLicenceForm.patchValue({
          licenceNumber: extractionResult.licence_number ? extractionResult.licence_number.answer || '' : '',
          Name: extractionResult.Name? extractionResult.Name.answer || '' : '',
          dateOfBirth: extractionResult.date_of_birth ? extractionResult.date_of_birth.answer || '' : '',
          nationality: extractionResult.nationality ? extractionResult.nationality.answer || '' : '',
          expiryDate: extractionResult.expiry_date ? extractionResult.expiry_date.answer || '' : '',
          issueDate: extractionResult.issue_date ? extractionResult.issue_date.answer || '' : ''
        });
    
        // Patch scores for fields
        this.licenceNumberScore = extractionResult.licence_number ? extractionResult.licence_number.score : 0;
        this.nameScore = extractionResult.Name ? extractionResult.Name.score : 0;
        this.dateOfBirthScore = extractionResult.date_of_birth ? extractionResult.date_of_birth.score : 0;
        this.nationalityScore = extractionResult.nationality ? extractionResult.nationality.score : 0;
        this.expiryDateScore = extractionResult.expiry_date ? extractionResult.expiry_date.score : 0;
        this.issueDateScore = extractionResult.issue_date ? extractionResult.issue_date.score : 0;
      }
      
      
      }
    
      getInputBorderColor(score: number): string {
        if (score >= 0.60 && score <= 1) {
          return '#32CD32'; // Vert pour les scores de 0.60 à 1
        } else if (score >= 0.31 && score < 0.60) {
          return 'orange'; // Orange pour les scores de 0.31 à 0.59
        } else if (score >= 0.00001 && score < 0.31) {
          return 'red'; // Rouge pour les scores de 0.01 à 0.30
        } else {
          return 'rgb(200, 200, 200)'; // Par défaut, le contour est noir si le score est inférieur à 0.01 ou supérieur à 1
        }
      }
      
      getInputBackgroundColor(score: number): string {
        if (score >= 0.60 && score <= 1) {
          return 'rgba(50, 205, 50, 0.1)'; // Vert très transparent pour les scores de 0.60 à 1
        } else if (score >= 0.31 && score < 0.60) {
          return 'rgba(255, 165, 0, 0.1)'; // Orange très transparent pour les scores de 0.31 à 0.59
        } else if (score >= 0.00001 && score < 0.31) {
          return 'rgba(255, 0, 0, 0.1)'; // Rouge très transparent pour les scores de 0.01 à 0.30
        } else {
          return 'transparent'; // Transparent si le score est inférieur à 0.01 ou supérieur à 1
        }
      }




      
      recordFeedback(ratingAndMessage: { rating: number, message: string }): void {
        let feedback: string;
    
        switch (ratingAndMessage.rating) {
          case 1:
            feedback = "Bad";
            break;
          case 2:
            feedback = "Medium";
            break;
          case 3:
            feedback = "Good";
            break;
          case 4:
            feedback = "Amazing";
            break;
          case 5:
            feedback = "Excellent";
            break;
          default:
            feedback = "Note invalide";
        }
    
        console.log(`Note: ${feedback}, Message: ${ratingAndMessage.message}`);
    
        const userId = Number(localStorage.getItem('id'));
    
        this.userService.getUserById(userId).subscribe(
          (user) => {
            const evaluationData = {
              note: feedback,
              message: ratingAndMessage.message,
              username: user.username
            };
    
            this.saveEvaluation(evaluationData);
          },
          (error) => {
            console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
          }
        );
      }
    
      onSendFeedbackClick(): void {
        const selectedRating = document.querySelector('input[name="rate"]:checked') as HTMLInputElement;
        const feedbackMessage = this.feedbackMessage;
    
        if (selectedRating && feedbackMessage) {
            const ratingValue = parseInt(selectedRating.value);
            const feedbackData = { rating: ratingValue, message: feedbackMessage };
    
            this.recordFeedback(feedbackData);
        } else {
            console.log("Veuillez sélectionner une note et saisir un message avant d'envoyer.");
        }
      }
    
      saveEvaluation(evaluation: any): void {
        this.dataService.saveEvaluation(evaluation).subscribe(
          (response) => {
            console.log('Evaluation saved successfully:', response);
            this.showEvaluationCard = false; // Hide the evaluation card
            this.showConfirmationBox = true; // Show the confirmation box
            
            // Hide the confirmation box after 5 seconds
            setTimeout(() => {
              this.showConfirmationBox = false;
            }, 5000);
          },
          (error) => {
            console.error('Error saving evaluation:', error);
          }
        );
      }
    
      closeConfirmationBox(): void {
        this.showConfirmationBox = false;
      }
    }