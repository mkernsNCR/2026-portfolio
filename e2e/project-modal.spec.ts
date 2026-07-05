import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('intro-seen', '1'))
})

test.describe('Project details modal', () => {
  test('clicking a project card opens details modal', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 1280, height: 800 })

    const firstProjectCard = page.locator('#projects button').first()
    await firstProjectCard.click()

    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()
  })

  test('modal can be closed', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 1280, height: 800 })

    await page.locator('#projects button').first().click()
    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
  })
})
