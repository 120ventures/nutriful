import { test, expect } from './fixtures/test-base';

test.describe('Smoke Tests', () => {

  test('should load the landing page', async ({ page }) => {
    await page.goto('/');
    
    // Check for main elements
    await expect(page).toHaveTitle(/Your App/i);
  });

});