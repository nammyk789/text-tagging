// TODO:
// - make text tagging smoother
// - have some way of displaying JSON table

document.data = {};
document.data.start_index = [];
document.data.end_index = [];
document.data.text = [];
document.data.tag = [];

// Function to get the Selected Text 
function getSelectedText() {
    var selectedText = '';

    // window.getSelection
    if (window.getSelection) {
        selectedText = window.getSelection();
    }
    // document.getSelection
    else if (document.getSelection) {
        selectedText = document.getSelection();
    }
    // document.selection
    else if (document.selection) {
        selectedText = 
        document.selection.createRange().text;
    } else return;
    // To write the selected text into the textarea
    //document.testform.selectedtext.value = selectedText;
    return selectedText;
}


function getIndexesOfText() {
    var selectedText = getSelectedText();
    var start = selectedText.anchorOffset;
    var end = selectedText.focusOffset;
    if (start >= 0 && end >= 0){
        console.log("start: " + start);
        console.log("end: " + end);
    }

    // because we don't care which direction highlighting happened in
    if (start < end) {
        document.data.start_index.push(start);
        document.data.end_index.push(end);
    } else {
        document.data.start_index.push(end);
        document.data.end_index.push(start);
    }
    document.data.text.push(selectedText.toString());
}


function getTextTag() {
    var tag = window.prompt("tag: ");
    document.data.tag.push(tag);
    buildTable(document.data);
}

function tagData(){
    getIndexesOfText();
    getTextTag();
}


function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function downloadDataLocally() {
    jsonData = JSON.stringify(document.data);
    download(jsonData, "json.txt", 'text/plain');
}

function buildTable(data){
    console.log(data);
    var table = document.getElementById('myTable')
    table.innerHTML = "";
    for (var i = 0; i < data.start_index.length; i++){
        var row = `<tr>
                        <td>${data.start_index[i]}</td>
                        <td>${data.end_index[i]}</td>
                        <td>${data.text[i]}</td>
                        <td>${data.tag[i]}</td>
                  </tr>`
        table.innerHTML += row


    }
}