const report = require("multiple-cucumber-html-reporter");
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
    },
    
});
console.log('Report generation complete.');
process.exit(0);