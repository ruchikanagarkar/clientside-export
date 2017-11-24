var downloadExcel = function(data, event) {
    var excel = generate();
    download(excel);

    var divContainer = document.getElementById("divContainervData");
    divContainer.innerHTML = "";
    divContainer.appendChild(excel);

}

var generate = function() {
    // EXTRACT VALUE FOR HTML HEADER. 
    var columns = ['name', 'desc', 'id', 'createdOn'];
    var cases = [
        ['Foo', 'programmer', '1234', '12 Apr 2017 12:34:55'],
        ['Bar', 'bus driver', '2345', '13 Apr 2017 12:34:55'],
        ['Moo', 'Reindeer Hunter', '3456', '14 Apr 2017 12:34:55']
    ];

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.border = '2px solid black';

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1); // TABLE ROW.

    var col = columns.map(function(queCol) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.bgColor = "#a5a5da";
        th.innerHTML = queCol.toUpperCase();
        tr.appendChild(th);
        return tr;
    });

    // ADD JSON DATA TO THE TABLE AS ROWS. 
    var rows = cases.map(function(queRow, index) {
        tr = table.insertRow(-1); //create empty row at last position  
        queRow.forEach(function(row) {
            var cell = tr.insertCell(-1); //create empty cell in the current row at last position
            cell.innerHTML = row;
        });
        return tr;
    });

    return table;
} //generate ends

var download = function(content, fileName = 'exportExcel.xls', mimeType = 'application/vnd.ms-excel') {
    const a = (document && document.createElement('a')) || {};

    if (typeof navigator != 'undefined' && navigator.msSaveBlob) { // IE10
        navigator.msSaveBlob(new window.Blob([content], { type: mimeType }), fileName);

    } else if (typeof window.URL != 'undefined' && 'download' in a) { // html5
        var table_html = content.outerHTML.replace(/ /g, '%20');
        a.href = 'data:' + mimeType + ', ' + table_html;
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    } else {
        window.open('data:' + mimeType + ', ' + window.encodeURI(content));
    }
} //download ends