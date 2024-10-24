// pages/api/admcheck.js
import { Builder, By } from 'selenium-webdriver';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url, username, password } = req.body;

    if (!url || !username || !password) {
      return res.status(400).json({ message: 'URL, username, and password are required' });
    }

    let driver;
    try {
      // Start a new Selenium session
      driver = await new Builder().forBrowser('chrome').build();

      // Navigate to the URL
      await driver.get(url);

      // Wait for the page to load
      await driver.sleep(2000);

      // Locate and fill in the username and password fields
      await driver.findElement(By.name('username')).sendKeys(username); // Adjust the selector if necessary
      await driver.findElement(By.name('password')).sendKeys(password); // Adjust the selector if necessary

      // Take a screenshot of the login page after entering credentials
      const screenshot1 = await driver.takeScreenshot();
      const screenshotPath1 = path.join(process.cwd(), 'public', 'screenshot1.png');
      fs.writeFileSync(screenshotPath1, screenshot1, 'base64');

      // Locate and click the login button
      await driver.findElement(By.id('loginButton')).click();

      // Wait for the page to load after login
      await driver.sleep(30000); // Increase wait time if needed

      // Take a screenshot of the home page after login
      const screenshot2 = await driver.takeScreenshot();
      const screenshotPath2 = path.join(process.cwd(), 'public', 'screenshot2.png');
      fs.writeFileSync(screenshotPath2, screenshot2, 'base64');


      await driver.findElement(By.id('createExamination')).click();
      await driver.findElement(By.id('lnkAddSession')).click();
      await driver.sleep(10000); // Increase wait time if needed


      const uniqueId = Date.now();

      await driver.findElement(By.name('Name')).sendKeys(`TESTSession${uniqueId}`);
      await driver.findElement(By.name('ExternalIdentifier')).sendKeys(`TESTSession${uniqueId}`);
      await driver.findElement(By.name('Timeframe')).sendKeys(`TESTSession${uniqueId}`);
      await driver.findElement(By.name('ResetPasswordDate')).sendKeys("10/17/2024 3:51 PM");

      const screenshot3 = await driver.takeScreenshot();
      const screenshotPath3 = path.join(process.cwd(), 'public', 'screenshot3.png');
      fs.writeFileSync(screenshotPath3, screenshot3, 'base64');

      await driver.findElement(By.id('btnSessionSubmit')).click();
      await driver.sleep(10000);
      const screenshot4 = await driver.takeScreenshot();
      const screenshotPath4 = path.join(process.cwd(), 'public', 'screenshot4.png');
      fs.writeFileSync(screenshotPath4, screenshot4, 'base64');

      await driver.findElement(By.css('a.user-name.componentCount')).click();
      await driver.sleep(10000);
      await driver.findElement(By.id('lnkAddComponent')).click();
      await driver.findElement(By.id('txtAssessmentIdentifier')).sendKeys(`TESTComponent${uniqueId}`);
      await driver.findElement(By.id('txtAssessmentName')).sendKeys(`TESTComponent${uniqueId}`);
      await driver.findElement(By.id('txtComponentIdentifier')).sendKeys(`TESTComponent${uniqueId}`);
      await driver.findElement(By.id('txtComponentName')).sendKeys(`TESTComponent${uniqueId}`);
      await driver.findElement(By.id('txtQualification')).sendKeys(`TESTComponent${uniqueId}`);
      await driver.findElement(By.id('txtStartDate')).sendKeys("10/17/2024 3:51 PM");
      await driver.findElement(By.id('txtEndDate')).sendKeys("10/17/2024 3:51 PM");


      const screenshot5 = await driver.takeScreenshot();
      const screenshotPath5 = path.join(process.cwd(), 'public', 'screenshot5.png');
      fs.writeFileSync(screenshotPath5, screenshot5, 'base64');

      await driver.sleep(10000);
      await driver.findElement(By.id('btnSubmit')).click();
      await driver.sleep(20000);

      const screenshot6 = await driver.takeScreenshot();
      const screenshotPath6 = path.join(process.cwd(), 'public', 'screenshot6.png');
      fs.writeFileSync(screenshotPath6, screenshot6, 'base64');


      // await driver.findElement(By.id('createMarkersLink')).click();
      // await driver.findElement(By.id('lnkAddMarker')).click();

      // await driver.sleep(10000); 
      // await driver.findElement(By.id('txtMarkerSurname')).sendKeys(`TESTMarker${uniqueId}`);
      // await driver.findElement(By.id('txtMarkerInitials')).sendKeys(`TESTMarker${uniqueId}`);
      // await driver.findElement(By.id('txtMarkerExternalIdentifier')).sendKeys(`TESTMarker${uniqueId}`);

      // await driver.findElement(By.id('ddlMarkerTypes')).click();
      // await driver.sleep(20000); 

      // await selectElement.selectByVisibleText('General Marker');

      // await driver.findElement(By.data-text('General Marker')).click();
      //       const liElement = await driver.findElement(By.id('menu')); // Assuming there's an id for the parent ul
      // const generalMarkerLi = await liElement.findElements(By.xpath('.//li[@data-text="General Marker"]')).then(elements => elements[0]);

      // await generalMarkerLi.click();

      //       await driver.findElement(By.id('txtMarkerEmail')).sendKeys(`binja@gmail.com`);

      //       const screenshot7 = await driver.takeScreenshot();
      //       const screenshotPath7 = path.join(process.cwd(), 'public', 'screenshot7.png');
      //       fs.writeFileSync(screenshotPath7, screenshot7, 'base64');

      //       await driver.findElement(By.id('btnMarkerSubmit')).click();



     
      res.status(200).json({ message: 'Screenshots taken', screenshotPaths: [screenshotPath1, screenshotPath2] });
    } catch (error) {
      console.error('Error during Selenium operation:', error);
      res.status(500).json({ message: 'Error taking the screenshots.', error: error.message });
    } finally {
      if (driver) {
        await driver.quit();
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}