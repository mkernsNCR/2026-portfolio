import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('intro-seen', '1'))
})

test.describe('Navigation', () => {
  test('header is visible on load', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header')
    await expect(header).toBeVisible()
  })

  test('nav links are present on desktop', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 1280, height: 800 })

    const nav = page.getByRole('navigation', { name: 'Main navigation' })
    await expect(nav).toBeVisible()

    for (const label of ['Home', 'Projects', 'Skills', 'Contact']) {
      await expect(nav.getByRole('button', { name: label })).toBeVisible()
    }
  })

  test('clicking Projects nav scrolls to projects section', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 1280, height: 800 })

    const projectsSection = page.locator('#projects')
    await expect(projectsSection).toBeAttached()

    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'Projects' }).click()

    await expect(projectsSection).toBeInViewport()
  })

  test('clicking Contact nav scrolls to contact section', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 1280, height: 800 })

    const contactSection = page.locator('#contact')
    await expect(contactSection).toBeAttached()

    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'Contact' }).click()

    await expect(contactSection).toBeInViewport()
  })
})
