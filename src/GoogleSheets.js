import axios from 'axios';

export function fetchEventData() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRdb_2Dk_lX5okpJfOytYH830KTbr9Gdu_lHpi61dFc4IgMH5_LVZSFc9VtOAx8MJSr6J0nvJLt-qeQ/pub?output=csv';

    return axios.get(csvUrl)
        .then(response => {
            return parseCSV(response.data);
        })
        .catch(error => {
            console.error('Error fetching CSV data:', error);
            return [];
        });
}

function parseCSV(csvText) {
    const rows = csvText.split(/\r?\n/);
    const headers = rows[0].split(',');
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const rowData = rows[i].split(',');
        const rowObject = {};

        for (let j = 0; j < headers.length; j++) {
            rowObject[headers[j]] = rowData[j];
        }
        data.push(rowObject);
    }
    return data;
}
