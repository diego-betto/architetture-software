import puppeteer from 'puppeteer';

const environment = process.env.NODE_ENV;
const isProduction = environment === "production";

const printPdf = async (url) => {
    // 1. Avvia il browser
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        ...(isProduction && { executablePath: process.env.CHROMIUM_PATH })
    });

    // 2. Apri una nuova pagina
    const page = await browser.newPage();

    // 3. Naviga all'URL
    // 'networkidle0' aspetta che non ci siano più di 0 connessioni di rete per 500ms, 
    // garantendo che la maggior parte dei contenuti sia stata caricata.
    await page.goto(url, { 
        waitUntil: 'networkidle0' 
    });

    // 4. (Opzionale) Esegui l'emulazione del media type 'screen' per rendere il PDF 
    // con gli stili dello schermo anziché con gli stili di stampa (print).
    await page.emulateMediaType('screen');

    const pdfName = url.split('/').pop() + '.pdf';

    // 5. Genera il PDF
    await page.pdf({
        path: `pdf/${pdfName}`, // Nome e percorso del file di output
        format: 'A4', // Formato della pagina (es. 'A4', 'Letter')
        printBackground: true, // Includi colori e immagini di sfondo
        margin: {
            top: '2cm',
            right: '2cm',
            bottom: '2cm',
            left: '2cm'
        }
        // headerTemplate e footerTemplate per intestazioni e piè di pagina
    });

    console.log(`PDF generato con successo: ${pdfName}`);

    // 6. Chiudi il browser
    await browser.close();

    return pdfName;
}

export default printPdf;