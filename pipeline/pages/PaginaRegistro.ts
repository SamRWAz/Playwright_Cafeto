import { type Locator, type Page } from '@playwright/test';
import { type DatosRegistro } from '../data/registro';

export class PaginaRegistro {
  readonly page: Page;
  readonly botonIrACrearCuenta: Locator;
  readonly titulo: Locator;
  readonly campoNombre: Locator;
  readonly campoCorreo: Locator;
  readonly campoContrasena: Locator;
  readonly campoConfirmacion: Locator;
  readonly indicadorFortaleza: Locator;
  readonly estadoRegistro: Locator;
  readonly botonRegistrarme: Locator;
  readonly mensajeAlerta: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botonIrACrearCuenta = page.getByRole('button', { name: 'Crear cuenta' });
    this.titulo = page.getByRole('heading', { name: 'Registro' });
    this.campoNombre = page.getByLabel('Nombre');
    this.campoCorreo = page.getByLabel('Correo');
    this.campoContrasena = page.getByLabel('Contraseña');
    this.campoConfirmacion = page.getByLabel('Confirmación');
    this.indicadorFortaleza = page.getByTestId('nivel-fortaleza');
    this.estadoRegistro = page.getByTestId('estado-registro');
    this.botonRegistrarme = page.getByRole('button', { name: 'Registrarme' });
    this.mensajeAlerta = page.locator('#mensaje');
  }

  /**
   * Navega a la aplicación y accede a la pantalla de registro
   */
  async ir(): Promise<void> {
    await this.page.goto('/');
    await this.botonIrACrearCuenta.click();
  }

  /**
   * Llena los cuatro campos del formulario de registro
   */
  async llenarFormulario(datos: DatosRegistro): Promise<void> {
    await this.campoNombre.fill(datos.nombre);
    await this.campoCorreo.fill(datos.correo);
    await this.campoContrasena.fill(datos.contrasena);
    await this.campoConfirmacion.fill(datos.confirmacion);
  }

  /**
   * Llena el formulario y hace clic en el botón de registrarme
   */
  async registrar(datos: DatosRegistro): Promise<void> {
    await this.llenarFormulario(datos);
    await this.botonRegistrarme.click();
  }

  /**
   * Escribe únicamente en el campo de contraseña para evaluar la fortaleza
   */
  async ingresarContrasena(clave: string): Promise<void> {
    await this.campoContrasena.fill(clave);
  }
}
