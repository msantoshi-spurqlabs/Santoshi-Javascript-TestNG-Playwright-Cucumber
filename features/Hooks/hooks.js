const { Before, After, AfterStep, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const Loginpage = require('../../pages/Loginpage');
const MyTimesheetsPage = require('../../pages/MyTimesheetsPage');
const MyInfoPage = require('../../pages/MyInfoPage');
const configReader = require('../../utils/configReader');

setDefaultTimeout(configReader.getTimeout('explicit') || 60000);

Before(async function () {

  const browserConfig = configReader.getBrowserConfig();
  const maximize = configReader.get('window.maximize');
  let browserType;

  switch (browserConfig.name) {
    case 'chromium':
      browserType = chromium;
      break;
    case 'firefox':
      browserType = firefox;
      break;
    case 'webkit':
      browserType = webkit;
      break;
    default:
      browserType = chromium;
  }

  this.browser = await browserType.launch({
    headless: browserConfig.headless,
    slowMo: browserConfig.slowMo,   // 1000 milliseconds = 1 second delay
    args: maximize ? ['--start-maximized'] : []
    
});


  this.context = await this.browser.newContext({
    viewport: null
});



  this.page = await this.context.newPage();

  // 🔥 Add Page Object Here
  this.loginPage = new Loginpage(this.page); 
  this.mytimesheetpage = new MyTimesheetsPage(this.page);
  this.myInfoPage = new MyInfoPage(this.page);


  await this.page.goto(configReader.getAppUrl()
  );

});

After(async function () {

  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();

});

AfterStep(async function () {
  if (!this.page) return;

  const screenshot = await this.page.screenshot();
  await this.attach(screenshot, 'image/png');
});