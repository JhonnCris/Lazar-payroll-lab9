const nameInput = document.getElementById('empName');
const hoursInput = document.getElementById('hours');
const rateInput = document.getElementById('rate');
const taxInput = document.getElementById('tax');
const deductionsInput = document.getElementById('otherDed');
const tbody = document.querySelector('tbody');
const button = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

button.addEventListener('click', function(event) {
    event.preventDefault();
    if (!nameInput.value || !hoursInput.value || !rateInput.value) {
        alert("Please fill in required fields");
        return;
    }

    let row = tbody.insertRow();
    cell0 = row.insertCell(0);
    cell0.innerHTML = tbody.rows.length ;
    
    let hours = parseFloat(hoursInput.value) || 0;
    let rate = parseFloat(rateInput.value) || 0;
    let tax = parseFloat(taxInput.value) || 0;
    let otherDed = parseFloat(deductionsInput.value) || 0;

    let grossPay = hours * rate;
    let taxAmount = grossPay * (tax / 100); 
    let netPay = grossPay - taxAmount - otherDed;

    row.insertCell(1).innerHTML = nameInput.value;
    row.insertCell(2).innerHTML = hours.toFixed(2);
    row.insertCell(3).innerHTML = rate.toFixed(2);
    row.insertCell(4).innerHTML = tax.toFixed(2) + "%";
    row.insertCell(5).innerHTML = otherDed.toFixed(2);
    row.insertCell(6).innerHTML = grossPay.toFixed(2);
    row.insertCell(7).innerHTML = netPay.toFixed(2);

    let deleteCell = row.insertCell(8);
    let delBtn = document.createElement('button');
    delBtn.innerHTML = 'Delete';
    delBtn.className = 'third';
    delBtn.onclick = function() {
        tbody.deleteRow(row.rowIndex - 1);
    };
    deleteCell.appendChild(delBtn);
    updateSummary();

    let editCell = row.insertCell(8);
    let editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    editBtn.className = 'third';
    editBtn.style.marginLeft = '5px';
    editBtn.onclick = function() {
        nameInput.value = row.cells[1].innerHTML;
        hoursInput.value = row.cells[2].innerHTML;
        rateInput.value = row.cells[3].innerHTML;
        taxInput.value = row.cells[4].innerHTML.replace('%', '');
        deductionsInput.value = row.cells[5].innerHTML;
        tbody.deleteRow(row.rowIndex - 1);
    }
    editCell.appendChild(editBtn);
    updateSummary();

});

resetBtn.addEventListener('click', function() {
    nameInput.value = '';
    hoursInput.value = '';
    rateInput.value = '';
    taxInput.value = ''; 
    deductionsInput.value = '';
    updateSummary();
});

clearAllBtn.addEventListener('click', function() {
    tbody.innerHTML = '';
    updateSummary();
});
function updateSummary() {
    let rows = tbody.rows;
    let totalGross = 0;
    let totalDeductions = 0;
    let totalNet = 0;

    for (let i = 0; i < rows.length; i++) {
        let gross = parseFloat(rows[i].cells[6].innerHTML) || 0;
        let net = parseFloat(rows[i].cells[7].innerHTML) || 0;
        let taxPercent = parseFloat(rows[i].cells[4].innerHTML.replace('%','')) || 0;
        let otherDed = parseFloat(rows[i].cells[5].innerHTML) || 0;

        let taxAmount = gross * (taxPercent / 100);

        totalGross += gross;
        totalDeductions += taxAmount + otherDed;
        totalNet += net;
    }

    document.getElementById('sumEmployees').innerHTML = rows.length;
    document.getElementById('sumGross').innerHTML = `₱${totalGross.toFixed(2)}`;
    document.getElementById('sumDed').innerHTML = `₱${totalDeductions.toFixed(2)}`;
    document.getElementById('sumNet').innerHTML = `₱${totalNet.toFixed(2)}`;
}
