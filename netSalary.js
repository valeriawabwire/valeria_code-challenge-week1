
function calculateNetSalary() {
    const basicSalary = parseFloat(document.getElementById('basicSalary').value);
    const benefits = parseFloat(document.getElementById('benefits').value);

    const nhifDeductions = calculateNHIFDeductions(basicSalary);
    const nssfDeductions = calculateNSSFDeductions(basicSalary);

    const grossSalary = basicSalary + benefits;
    const payee = calculatePayee(grossSalary);
    const netSalary = grossSalary - payee - nhifDeductions - nssfDeductions;

    displayResults(netSalary, payee, nhifDeductions, nssfDeductions, grossSalary);
}

function calculateNHIFDeductions(grossPay) {
    const nhifRates = [
        { min: 0, max: 5999, deduction: 150 },
        { min: 6000, max: 7999, deduction: 300 },
        { min: 8000, max: 11999, deduction: 400 },
        { min: 12000, max: 14999, deduction: 500 },
        { min: 15000, max: 19999, deduction: 600 },
        { min: 20000, max: 24999, deduction: 750 },
        { min: 25000, max: 29999, deduction: 850 },
        { min: 30000, max: 34999, deduction: 900 },
        { min: 35000, max: 39999, deduction: 950 }
    ];

    const applicableRate = nhifRates.find(rate => grossPay >= rate.min && grossPay <= rate.max);

    return applicableRate ? applicableRate.deduction : 0;
}

function calculateNSSFDeductions(pensionablePay) {
    const tierIRate = 0.06;
    const tierIILowerLimit = 7001;
    const tierIIDeduction = 0.06;

    if (pensionablePay <= tierIILowerLimit) {
        return pensionablePay * tierIRate;
    } else {
        return tierIILowerLimit * tierIRate + (pensionablePay - tierIILowerLimit) * tierIIDeduction;
    }
}

function calculatePayee(grossPay) {
    return grossPay * 0.1;
};

function displayResults(netSalary, payee, nhifDeductions, nssfDeductions, grossSalary) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = `
        <h2>Results</h2>
        <p><strong>Gross Salary:</strong> Ksh ${grossSalary.toFixed(2)}</p>
        <p><strong>Payee (Tax):</strong> Ksh ${payee.toFixed(2)}</p>
        <p><strong>NHIF Deductions:</strong> Ksh ${nhifDeductions.toFixed(2)}</p>
        <p><strong>NSSF Deductions:</strong> Ksh ${nssfDeductions.toFixed(2)}</p>
        <p><strong>Net Salary:</strong> Ksh ${netSalary.toFixed(2)}</p>
    `;
};