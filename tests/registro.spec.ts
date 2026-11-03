import { test, expect } from '@playwright/test';
import { PaginaRegistro } from '../pages/PaginaRegistro';
import {
  usuarioValido,
  usuarioSinArroba,
  usuarioClavesNoCoinciden,
  pruebasFortaleza,
} from '../data/registro';

test.describe('HU-01 · Funcionalidad de Registro', () => {

  test('muestra error si el correo no tiene arroba (detecta el bug inyectado)', async ({ page }) => {
    const registro = new PaginaRegistro(page);

    // 1. Navegar a la pantalla de registro
    await registro.ir();

    // 2. Intentar registrar con correo sin arroba
    await registro.registrar(usuarioSinArroba);

    // 3. Verificación de aceptación esperada: debe mostrar "El correo no es válido"
    // NOTA: Esta prueba fallará debido al bug inyectado 'registro_correo_sin_arroba'.
    await expect(registro.mensajeAlerta).toHaveText('El correo no es válido');
  });

  test('muestra error si las contraseñas no coinciden', async ({ page }) => {
    const registro = new PaginaRegistro(page);

    // 1. Navegar a la pantalla de registro
    await registro.ir();

    // 2. Intentar registrar con contraseñas desiguales
    await registro.registrar(usuarioClavesNoCoinciden);

    // 3. Verificación: debe alertar sobre la discrepancia
    await expect(registro.mensajeAlerta).toHaveText('Las contraseñas no coinciden');
  });

  test('calcula el nivel de fortaleza de la contraseña en tiempo real', async ({ page }) => {
    const registro = new PaginaRegistro(page);

    // 1. Navegar a la pantalla de registro
    await registro.ir();

    // 2. Probar progresivamente las combinaciones de requisitos y validar la puntuación
    for (const prueba of pruebasFortaleza) {
      await registro.ingresarContrasena(prueba.clave);
      await expect(registro.indicadorFortaleza).toHaveText(prueba.nivelEsperado);
    }
  });

  test('permite el registro exitoso con datos válidos', async ({ page }) => {
    const registro = new PaginaRegistro(page);

    // 1. Navegar a la pantalla de registro
    await registro.ir();

    // 2. Registrar con datos válidos y correo único
    const nuevoUsuario = {
      ...usuarioValido,
      correo: `estudiante_${Date.now()}@cafe.test`,
    };
    await registro.registrar(nuevoUsuario);

    // 3. Verificación de éxito
    await expect(registro.mensajeAlerta).toHaveText('Usuario registrado');
    await expect(registro.estadoRegistro).toHaveText('registrado');
  });

});
