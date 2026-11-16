import { test, expect } from '@playwright/test';
import { PaginaRegistro } from '../pages/PaginaRegistro';
import {
  usuarioValido,
  usuarioSinArroba,
  usuarioClavesNoCoinciden,
  pruebasFortaleza,
} from '../data/registro';

test.describe('HU-01 · Funcionalidad de Registro', () => {

  test('intento de registro con correo sin arroba', async ({ page }) => {
    test.fail(true, 'Bug conocido (registro_correo_sin_arroba): la app permite registrar correos sin @ en lugar de rechazarlos');
    const registro = new PaginaRegistro(page);
    await registro.ir();
    await registro.registrar(usuarioSinArroba);
    await expect(registro.estadoRegistro).toHaveText('pendiente');
    await expect(registro.mensajeAlerta).toContainText('El correo no es válido');
  });

  test('intento de registro con contraseñas que no coinciden', async ({ page }) => {
    const registro = new PaginaRegistro(page);
    await registro.ir();
    await registro.registrar(usuarioClavesNoCoinciden);
    await expect(registro.estadoRegistro).toHaveText('pendiente');
    await expect(registro.mensajeAlerta).toHaveText('Las contraseñas no coinciden');
  });

  test('ingreso de contraseñas para evaluar fortaleza en tiempo real', async ({ page }) => {
    const registro = new PaginaRegistro(page);
    await registro.ir();
    for (const prueba of pruebasFortaleza) {
      await registro.ingresarContrasena(prueba.clave);
      await expect(registro.indicadorFortaleza).toHaveText(prueba.nivelEsperado);
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
    await expect(registro.estadoRegistro).toHaveText('registrado');
    await expect(registro.mensajeAlerta).toHaveText('Usuario registrado');
  });

});
