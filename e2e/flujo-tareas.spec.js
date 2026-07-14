import { test, expect } from '@playwright/test'

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  // 1. Entrar a la aplicación
  await page.goto('/')
 
  // 2. Crear una tarea
  await page.getByLabel('Escribe una nueva tarea...').fill('Comprar pan')
  await page.getByRole('button', { name: 'Añadir Tarea' }).click()
 
  // 3. Verla en la lista
  await page.reload();
  await expect(page.getByText('Comprar pan')).toBeVisible()
  await page.getByRole('button', { name: 'Eliminar' }).click()
})
