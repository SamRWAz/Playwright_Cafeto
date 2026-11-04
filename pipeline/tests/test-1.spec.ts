import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Crear cuenta' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nombre' }).fill('C');
  await page.getByRole('textbox', { name: 'Nombre' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nombre' }).fill('Carlos ');
  await page.getByRole('textbox', { name: 'Nombre' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nombre' }).fill('Carlos G');
  await page.getByRole('textbox', { name: 'Nombre' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nombre' }).fill('Carlos Gomez');
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('carlosgomez-test');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('C');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cafe2026!');
  await page.getByRole('textbox', { name: 'Confirmación' }).click();
  await page.getByRole('textbox', { name: 'Confirmación' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Confirmación' }).fill('C');
  await page.getByRole('textbox', { name: 'Confirmación' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Confirmación' }).fill('Cafe2026!');
  await page.getByRole('button', { name: 'Registrarme' }).click();
  await expect(page.locator('#mensaje')).toContainText('El correo no es válido');
});