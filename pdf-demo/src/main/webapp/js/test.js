//
// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
//
var url = './pdf/test.pdf';

//
// Disable workers to avoid yet another cross-origin issue (workers need
// the URL of the script to be loaded, and dynamically loading a cross-origin
// script does not work).
//
// PDFJS.disableWorker = true;

//
// In cases when the pdf.worker.js is located at the different folder than the
// pdf.js's one, or the pdf.js is executed via eval(), the workerSrc property
// shall be specified.
//
// PDFJS.workerSrc = '../../build/pdf.worker.js';

//
// Asynchronous download PDF
//

var pdfDoc = null;
var pageNum = 1;
//var pageRendering = false;

PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
    console.log(pdf.numPages);
    pdfDoc = pdf;
    var innerHTML = "";
    for(var i=1; i <= pdf.numPages ; i++){
        innerHTML =  innerHTML + "<div id='page-"+i+"'  ondragleave='onDragOut(event)' draggable='true' ondragstart='onDrag(event)' ondragover='onDragOver(event)'   ondrop='onDrop(event)'><canvas id='canvas-"+i+"' style='border:1px  solid black' height='300' width='300'></canvas></div>\n";
    }
    document.getElementById("pdf-container").innerHTML = innerHTML;
    renderPage(pageNum);
});


/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(pageNum) {

    pdfDoc.getPage(pageNum).then(function(page) {
        console.log(page.pageIndex);
        var scale = 0.2;
        var viewport = page.getViewport(scale);
        var canvas = document.getElementById('canvas-'+ (page.pageIndex+1));
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        //
        // Render PDF page into canvas context
        //
        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
        pageNum++;
        renderPage(pageNum);
    });
}

function onDrag(event){
    console.log(event.target.id);
    event.dataTransfer.setData("canvas", event.target.id);
    document.getElementById('canvas-'+event.target.id.split('-')[1]).style.border = '3px  solid red';
}

function onDrop(event){

    console.log("Drop Source : " + event.dataTransfer.getData("canvas"));
    console.log("Drop Target : " + event.target.id);
    var sourcePage = event.dataTransfer.getData("canvas").split("-")[1];
    var targetPage = event.target.id.split("-")[1];
    console.log("Page : " + sourcePage + "-> Page : " + targetPage);
    document.getElementById('canvas-'+sourcePage).style.border = '1px  solid black';
    document.getElementById('canvas-'+targetPage).style.borderTop = '1px  solid black';
    if(sourcePage> targetPage){
        console.log("Moving Page Up");
        var listElement = document.getElementById('pdf-container');
        var sourceElement = document.getElementById('page-'+sourcePage);
        var targetElement = document.getElementById('page-'+targetPage);
        listElement.insertBefore(sourceElement, targetElement );
    }

    if(sourcePage < targetPage){
        console.log("Moving Page Down");
        var listElement = document.getElementById('pdf-container');
        var sourceElement = document.getElementById('page-'+sourcePage);
        var targetElement = document.getElementById('page-'+targetPage);
        console.log(targetElement.id);
        listElement.insertBefore(sourceElement, targetElement );
    }
}

function onDragOver(event){
    console.log("Over Me : "+event.target.id);
    document.getElementById('canvas-'+event.target.id.split('-')[1]).style.borderTop = '160px  solid black';
    console.log('>>canvas'+event.dataTransfer.getData("canvas").split("-")[1]);
    event.preventDefault();
}

function onDragOut(event){
    console.log("Over Out Me : "+event.target.id);
    document.getElementById('canvas-'+event.target.id.split('-')[1]).style.borderTop = '1px  solid black';
    event.preventDefault();
}


