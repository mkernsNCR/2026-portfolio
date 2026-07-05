import { test, expect } from '@playwright/test'

test.describe('Page load and SEO', () => {
  test('has correct page title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('Matt Kerns | Full Stack Engineer | React, Node.js, AI Systems')
  })

  test('has meta description', async ({ page }) => {
    await page.goto('/')
    const meta = page.locator('meta[name="description"]')
    await expect(meta).toHaveAttribute(
      'content',
      'Matt Kerns is a full stack engineer building modern React applications, developer tools, and bowling analytics platforms.',
    )
  })

  test('has Open Graph tags', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Matt Kerns | Full Stack Engineer | React, Node.js, AI Systems',
    )
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website')
  })
})
