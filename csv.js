/*
 * Generates a two table csv data from two different arrays
*/
var generateCsv = function(queHeaders, queRows, headers, rows) {
    var csv = queHeaders.map(queCol => queCol.toUpperCase()).join(',') + '\n';

    queRows.forEach((queRow) => {
        csv += queRow.join(',');
        csv += "\n";
    }); //first dataset

    csv += '\n';
    csv += headers.map(col => col.toUpperCase()).join(',') + '\n';

    rows.forEach((row) => {
        csv += row.join(',');
        csv += "\n";
    }); //second dataset

    return csv;
}

var download = function(content, fileName = 'summary.csv', mimeType = 'text/csv;encoding:utf-8') {
    const a = (document && document.createElement('a')) || {};

    if (typeof navigator != 'undefined' && navigator.msSaveBlob) { // IE10
        navigator.msSaveBlob(new window.Blob([content], { type: mimeType }), fileName);

    } else if (typeof window.URL != 'undefined' && 'download' in a) { // html5
        a.href = window.URL.createObjectURL(new window.Blob([content], { type: mimeType }));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    } else {
        window.open('data:' + mimeType + ', ' + window.encodeURI(content));
    }
}

function downloadCSV() {

    let d = new Date();

    let dateVal = d.getDay() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(); //seconds is not coming to csv as we cannot format date to csv export

    let columns = ['name', 'description', 'id', 'createdOn'];
    let cases = [
        ['Foo', 'programmer', '1234', dateVal],
        ['Bar', 'bus driver', '2345', dateVal],
        ['Moo', 'Reindeer Hunter', '3456', '14 Apr 2017 12:34:55']
    ];

    let queColumns = ['name', 'id'];
    let queCases = [
        ['Ruchika', '234'],
        ['Trisha', '435'],
        ['Surya', '57']
    ];

    let csv = generateCsv(queColumns, queCases, columns, cases);
    download(csv);
}