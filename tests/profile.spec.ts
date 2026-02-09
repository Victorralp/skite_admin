import { test, expect } from '@playwright/test';

test('Profile Page Visual Verification', async ({ page }) => {
    // 1. Navigate to the profile page
    await page.goto('http://localhost:3000/profile');

    // 2. Wait for main content to load
    await page.waitForSelector('h1:has-text("Profile")');

    // 3. Verify Page Title
    const title = page.locator('h1:has-text("Profile")');
    await expect(title).toBeVisible();
    await expect(title).toHaveCSS('font-family', /Neue Montreal/);
    await expect(title).toHaveCSS('font-size', '20px');
    await expect(title).toHaveCSS('font-weight', '700');

    // 4. Verify Left Column (Profile Card)
    const profileCard = page.locator('.rounded-\\[16px\\]').first(); // Adjust selector if needed based on generated classes
    await expect(profileCard).toBeVisible();

    // Check Avatar
    const avatar = profileCard.locator('img[alt="Profile"]');
    await expect(avatar).toBeVisible();

    // Check Name
    await expect(profileCard).toContainText('Bekwa Undie');

    // Check Contact Info
    await expect(profileCard).toContainText('undiebekwa@gmail.com');
    await expect(profileCard).toContainText('07065051560');

    // 5. Verify Right Column (Account Information)
    const accountCard = page.locator('h3:has-text("Account Information")').locator('xpath=../..');
    await expect(accountCard).toBeVisible();

    // Check Account Fields
    await expect(accountCard).toContainText('Email');
    await expect(accountCard).toContainText('undiebekwa@gmail.com');
    await expect(accountCard).toContainText('Phone Number');

    // Check Security Section
    await expect(accountCard).toContainText('Security');
    await expect(accountCard).toContainText('Password');
    await expect(accountCard).toContainText('Password Set');
    await expect(accountCard).toContainText('Two - Factor Authentication');
    await expect(accountCard).toContainText('Enabled');

    // 6. Visual Snapshot (Optional but recommended if setup)
    // await expect(page).toHaveScreenshot();
});
