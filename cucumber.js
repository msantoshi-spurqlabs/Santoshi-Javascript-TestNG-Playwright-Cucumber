module.exports = {
  default: {
    require: ["./features/stepDef/*.js","./features/Hooks/**/*.js"],

    paths: ["./features/**/*.feature"],
    format: [
      "progress-bar",
      "html:test-results/reports/cucumber-report.html",
      "json:test-results/reports/cucumber-report.json",
      "junit:test-results/reports/cucumber-report.xml",
      "allure-cucumberjs/reporter"
    
    ],
   parallel: 3,
    publishQuiet: true,
    formatOptions: {
      snippetInterface: "async-await"
    }
  }
};