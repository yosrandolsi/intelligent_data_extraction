from flask import Flask, request, jsonify
import re
from PIL import Image
import pytesseract
import fitz
from flask_cors import CORS
from io import BytesIO
from transformers import pipeline
import io
import base64

app = Flask(__name__)
CORS(app) 

# Initialiser le modèle de question-réponse
nlp = pipeline(
    "document-question-answering",
    model="impira/layoutlm-document-qa",
)

# Définir les questions par type de document
document_questions = {
    "Invoice": {
        "invoice_number": "What is the invoice number?",
        "invoice_date": "What is the invoice date?",
        "total_amount": "What is the total amount?",
        "subtotal": "What is the subtotal?",
        "due_date": "What is the due date?",
        "vendor_name": "What is the vendor name?",
         "customer_address": "What is the  address?",
         "currency ": "What is the currency used for this invoice?",
        # Ajoutez d'autres questions spécifiques aux factures ici
    },
    "Receipt": {
        "receipt_number": "What is the receipt number?",
        "purchase_date": "When was the purchase made?",
        "total_amount": "What is the total amount of the purchase?",
        "store_name": "What is the purchase name?",
        "sales_tax_amount": "How much sales tax ?"
    },
    "CIN": {
        "cin_number": "What is the CIN number?",
        "full_name": "What is the full name?",
        "date_of_birth": "What is the date of DOB?",
        "nationality": "What is the nationality?",
        "expiry_date": "What is the expiry date?",
        "issue_date": "What is the issue date?"
    },
    "Passport": {
        "passport_number": "What is the passport number?",
        "given_name": "What is the given name?",
        "surname": "What is the surname?",
        "nationality": "What is the nationality?",
        "date_of_birth": "What is the date of birth?",
        "issue_date": "What is the issue date?",
        "expiry_date": "What is the date of expiration?",
        "sex": "What is the sex?"
    },
    "Statement": {
        "account_number": "What is the account number?",
        "statement_date": "What is the statement date?",
        "previous_balance": "What is the previous balance?",
        "total_deposits": "What is the total deposits?",
        "total_withdrawals": "What is the total withdrawals?",
        "current_balance": "What is the current balance?",
        # Ajoutez d'autres questions spécifiques aux relevés de compte ici
    },
    "Driving Licence": {
        "licence_number": "What is the licence number?",
        "Name": "What is the fdriver name?",
        "date_of_birth": "What is the date of birth?",
        "expiry_date": "What is the expiry date?",
        "issuing_authority": "What is the issuing authority?",
        "issue_date": "When was the driving licence issued?",
        "nationality": "What is the nationality?"
    },
    # Ajoutez d'autres types de documents avec leurs questions respectives
}

@app.route('/extract-information', methods=['POST'])
def extract_information():
    if request.method == 'POST':
        # Vérifier si un fichier est téléchargé
        if 'document' not in request.files:
            return jsonify({'error': 'No document found in request'}), 400

        # Accéder au fichier téléchargé
        document_file = request.files['document']
        
        # Vérifier si un fichier a été sélectionné (en option)
        if not document_file.filename:
            return jsonify({'error': 'No file selected'}), 400
        
        # Lire le contenu binaire du fichier
        document_content = document_file.read()

        # Extraire l'extension du fichier
        file_extension = '.' + document_file.filename.split('.')[-1]

        # Afficher le type de document dans la console
        document_type = request.form.get('documentType')
        print("Document type:", document_type)

        # Convertir le contenu binaire en une chaîne base64
        base64_content = base64.b64encode(document_content).decode('utf-8')

        result = {}

        # Utiliser les questions spécifiques au type de document détecté
        if document_type in document_questions:
            questions = document_questions[document_type]
        else:
            return jsonify({'error': 'Document type not recognized'}), 400

        # Traitement des PDF
        if file_extension.lower() == '.pdf':
            # Ouvrir le fichier PDF avec PyMuPDF
            pdf_document = fitz.open(stream=document_content)

            # Récupérer le nombre de pages
            num_pages = len(pdf_document)

            # Stocker les résultats
            pdf_results = {}

            # Parcourir chaque page du PDF
            for page_number in range(num_pages):
                # Obtenir la page
                page = pdf_document.load_page(page_number)
                
                # Récupérer les dimensions de la page
                mat = fitz.Matrix(2, 2)  # Ajustez les dimensions si nécessaire
                pix = page.get_pixmap(matrix=mat)

                # Convertir l'image en objet PIL
                img_pil = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

                # Poser des questions au modèle pour chaque image
                page_results = {}

                for key, question in questions.items():
                    # Utiliser le modèle pour poser la question et obtenir le résultat avec le score
                    result = nlp({"image": img_pil, "question": question})
                    if result:
                        page_results[key] = {"answer": result[0]['answer'], "score": result[0]['score']}
                    else:
                        page_results[key] = {"answer": "No answer found", "score": 0.0}

                # Ajouter les résultats de la page aux résultats globaux
                pdf_results.update(page_results)

            # Fermer le document PDF
            pdf_document.close()

            # Retourner les résultats des PDF
            return jsonify(pdf_results)

        # Traitement des images
        else:
            # Poser les questions pour une seule image
            for key, question in questions.items():
                # Utiliser le modèle pour poser la question et obtenir le résultat avec le score
                output = nlp({"image": base64_content, "question": question})
                if len(output) > 0:
                    result[key] = {"answer": output[0]['answer'], "score": output[0]['score']}
                else:
                    result[key] = {"answer": "No answer found", "score": 0.0}

            # Retourner les résultats pour une seule image
            return jsonify(result)

    else:
        return jsonify({'error': 'Invalid request method'}), 405





patterns = {
    "Invoice": re.compile(r'(invoice|facture|FACTURA|فاتورة)', re.IGNORECASE),
    "Receipt": re.compile(r'(receipt|reçu|RECEIPT|ticket de caisse|quittance|purchase)', re.IGNORECASE),

    "CIN": re.compile(r'(CIN|carte identité|carte d\'identité| NATIONAL IDENTITY CARD|IDENTITY CARD|IDENTIFICATION CARD|CARTE DE IDENTIATE)', re.IGNORECASE),
    "Passport": re.compile(r'(passport|passeport|PASSEPORT|PASSAPORT|TRAVEL DOCUMENT)', re.IGNORECASE),
    "Statement": re.compile(r'(statement|balance|account|INCOME STATEMENT)', re.IGNORECASE),
    "Driving Licence": re.compile(r'(driving licence|driving license|permis de conduire|Licence to Drive|PERMIS DE CONDUCERE)', re.IGNORECASE)

}

# Fonction pour classifier le document en fonction de son contenu
def classify_document(text):
    for doc_type, pattern in patterns.items():
        if pattern.search(text):
            return doc_type
    return "Unknown"

@app.route('/classify', methods=['POST'])
def classify():
    if 'document' not in request.files:
        return jsonify({'error': 'No document uploaded'}), 400

    uploaded_file = request.files['document']
    if uploaded_file.filename == '':
        return jsonify({'error': 'No selected document'}), 400

    # Si le fichier est une image
    if uploaded_file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
        # Ouvrir l'image
        image = Image.open(uploaded_file)
        # Convertir l'image en niveau de gris (si nécessaire)
        image = image.convert('L')
        # Extraire le texte de l'image
        text = pytesseract.image_to_string(image)

        # Classifier le document
        document_type = classify_document(text)

        # Retourner le type de document
        return jsonify({'document_type': document_type}), 200

    # Si le fichier est un PDF
    elif uploaded_file.filename.lower().endswith('.pdf'):
        # Ouvrir le fichier PDF avec PyMuPDF
        with fitz.open(stream=uploaded_file.read()) as pdf_document:
            # Initialiser un dictionnaire pour stocker le nombre de pages classifiées de chaque type
            document_counts = {doc_type: 0 for doc_type in patterns.keys()}

            # Parcourir chaque page du PDF
            for page_number in range(len(pdf_document)):
                # Extraire l'image de la page
                pixmap = pdf_document[page_number].get_pixmap()
                img = Image.frombytes("RGB", [pixmap.width, pixmap.height], pixmap.samples)

                # Convertir l'image en niveau de gris (si nécessaire)
                img = img.convert('L')
                # Extraire le texte de l'image
                text = pytesseract.image_to_string(img)

                # Classifier le document
                document_type = classify_document(text)

                # Incrémenter le compteur du type de document
                document_counts[document_type] += 1

            # Sélectionner le type de document le plus fréquent dans le PDF
            most_common_document_type = max(document_counts, key=document_counts.get)

            # Retourner le type de document le plus fréquent
            return jsonify({'document_type': most_common_document_type}), 200

    else:
        return jsonify({'error': 'Invalid file format, only images (PNG, JPG, JPEG, GIF) and PDF files are supported'}), 400


if __name__ == '__main__':
    app.run(debug=True)

