// pages/api/assessorcheck.js
import { Builder, By } from 'selenium-webdriver';
import {Select} from 'selenium-webdriver'
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
            await driver.findElement(By.id('usernameBox')).sendKeys(username); // Adjust the selector if necessary
            await driver.findElement(By.id('passwordBox')).sendKeys(password); // Adjust the selector if necessary

            // Take a screenshot of the login page after entering credentials
            const screenshot1 = await driver.takeScreenshot();
            const screenshotPath1 = path.join(process.cwd(), 'public', 'assessor1.png');
            fs.writeFileSync(screenshotPath1, screenshot1, 'base64');

            // Locate and click the login button
            await driver.findElement(By.id('btnMarking')).click();

            // Wait for the page to load after login
            await driver.sleep(30000); // Increase wait time if needed

            // Take a screenshot of the home page after login
            const screenshot2 = await driver.takeScreenshot();
            const screenshotPath2 = path.join(process.cwd(), 'public', 'assessor2.png');
            fs.writeFileSync(screenshotPath2, screenshot2, 'base64');


            await driver.findElement(By.id('loginLiveEnv_label')).click();
            await driver.sleep(100); // Increase wait time if needed
            await driver.findElement(By.id('env-login-btn')).click();

            await driver.sleep(30000); // Increase wait time if needed

            const screenshot3 = await driver.takeScreenshot();
            const screenshotPath3 = path.join(process.cwd(), 'public', 'assessor3.png');
            fs.writeFileSync(screenshotPath3, screenshot3, 'base64');

            await driver.findElement(By.css('a.menu-button.allow-edge-tap')).sendKeys(`${uniqueId}`);
            await driver.findElement(By.id('logout-button')).click();

            await driver.sleep(30000); // Increase wait time if needed

            
            const screenshot4 = await driver.takeScreenshot();
            const screenshotPath4 = path.join(process.cwd(), 'public', 'assessor4.png');
            fs.writeFileSync(screenshotPath4, screenshot4, 'base64');




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
