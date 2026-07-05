import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('intro-seen', '1'))
})

test.describe('Content sections', () => {
  test('hero section displays name and role', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('#home')
    await expect(hero).toBeVisible()
    await expect(hero.getByText('Matt Kerns')).toBeVisible()
    await expect(hero.getByText('Full Stack Engineer')).toBeVisible()
  })

  test('projects section renders project cards', async ({ page }) => {
    await page.goto('/')
    const projectsSection = page.locator('#projects')
    await expect(projectsSection).toBeVisible()
    const projectCards = projectsSection.locator('button')
    await expect(projectCards).toHaveCount(4)
  })

  test('skills section renders skill items', async ({ page }) => {
    await page.goto('/')
    const skillsSection = page.locator('#skills')
    await expect(skillsSection).toBeVisible()
    await expect(skillsSection.getByText('Skills', { exact: true })).toBeVisible()
  })

  test('contact section is present', async ({ page }) => {
    await page.goto('/')
    const contactSection = page.locator('#contact')
    await expect(contactSection).toBeVisible()
    await expect(contactSection.getByText("Let's build something great.")).toBeVisible()
  })

  test('footer displays copyright', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(footer.getByText(/© \d{4} Matt Kerns/)).toBeVisible()
  })
})
