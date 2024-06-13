const report = require("multiple-cucumber-html-reporter");

// Function to get current date in YYYY-MM-DD format
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const currentDate = getCurrentDate();
report.generate({
    jsonDir: "json-logs/",
    reportPath: "./reports/cucumber-htmlreport.html",
    metadata: {
        browser: {
            name: "chrome",
            version: "XX",
        },
        device: "Macbook Air",
        platform: {
            name: "macos",
        },
        reportName: "Sample Cucumber Report",
        customData: {
            title: "Run Information",
            data: [
                { label: "Project", value: "SC-Cucumber-Report" }
            ]
        }
    }
}, function () {
    // Open the generated report in the default browser
    exec(`open ./reports/cucumber-htmlreport-${currentDate}.html`);
});
    
console.log('Report generation complete.');
process.exit(0);