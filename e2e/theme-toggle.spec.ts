import { test, expect } from '@playwright/test'

test.describe('Theme mode toggle', () => {
  test('defaults to fun mode', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/theme-fun/)
  })

  test('can switch to business mode', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/theme-fun/)

    await page.getByRole('radio', { name: 'Business Mode' }).click()

    await expect(page.locator('html')).toHaveClass(/theme-business/)
  })

  test('can switch back to fun mode', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('radio', { name: 'Business Mode' }).click()
    await expect(page.locator('html')).toHaveClass(/theme-business/)

    await page.getByRole('radio', { name: 'Fun Mode' }).click()
    await expect(page.locator('html')).toHaveClass(/theme-fun/)
  })

  test('persists theme choice in localStorage', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('radio', { name: 'Business Mode' }).click()
    await expect(page.locator('html')).toHaveClass(/theme-business/)

    const stored = await page.evaluate(() => localStorage.getItem('portfolio-theme'))
    expect(stored).toBe('business')
  })
})
