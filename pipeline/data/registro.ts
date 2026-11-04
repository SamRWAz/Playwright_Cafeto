export interface DatosRegistro {
  nombre: string;
  correo: string;
  contrasena: string;
  confirmacion: string;
}

export const usuarioValido: DatosRegistro = {
  nombre: 'Usuario Valido',
  correo: `usuario_${Date.now()}@cafe.test`,
  contrasena: 'Cafe2026!',
  confirmacion: 'Cafe2026!',
};

export const usuarioSinArroba: DatosRegistro = {
  nombre: 'Usuario Sin Arroba',
  correo: 'usuariosinarroba.test',
  contrasena: 'Cafe2026!',
  confirmacion: 'Cafe2026!',
};

export const usuarioClavesNoCoinciden: DatosRegistro = {
  nombre: 'Usuario Claves Desiguales',
  correo: 'desiguales@cafe.test',
  contrasena: 'Cafe2026!',
  confirmacion: 'OtraClave2026!',
};

export const pruebasFortaleza = [
  { clave: 'abc', nivelEsperado: '0' },
  { clave: 'solominisculas', nivelEsperado: '1' },        // solo longitud >= 8
  { clave: 'MayusculaLarga', nivelEsperado: '2' },        // longitud + mayúscula
  { clave: 'Mayuscula123', nivelEsperado: '3' },          // longitud + mayúscula + número
  { clave: 'Cafe2026!', nivelEsperado: '4' },             // longitud + mayúscula + número + símbolo
];
