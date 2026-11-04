import { test } from '@playwright/test';
import { PaginaRegistro } from '../pages/PaginaRegistro';
import {
  usuarioValido,
  usuarioSinArroba,
  usuarioClavesNoCoinciden,
  pruebasFortaleza,
} from '../data/registro';

test.describe('HU-01 · Funcionalidad de Registro', () => {

  test('intento de registro con correo sin arroba', async ({ page }) => {
    const registro = new PaginaRegistro(page);
    await registro.ir();
    await registro.registrar(usuarioSinArroba);
  });

  test('intento de registro con contraseñas que no coinciden', async ({ page }) => {
    const registro = new PaginaRegistro(page);
    await registro.ir();
    await registro.registrar(usuarioClavesNoCoinciden);
  });

  test('ingreso de contraseñas para evaluar fortaleza en tiempo real', async ({ page }) => {
    const registro = new PaginaRegistro(page);
    await registro.ir();
    for (const prueba of pruebasFortaleza) {
      await registro.ingresarContrasena(prueba.clave);
    }
  });

  test('registro con datos válidos', async ({ page }) => {
    const registro = new PaginaRegistro(page);
    await registro.ir();
    const nuevoUsuario = {
      ...usuarioValido,
      correo: `estudiante_${Date.now()}@cafe.test`,
    };
    await registro.registrar(nuevoUsuario);
  });

});
