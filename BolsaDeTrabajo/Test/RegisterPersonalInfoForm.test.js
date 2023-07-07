import { validateEmail } from "../src/components/Students/validateEmail";

describe("validateEmail", () => {
  test("Debe retornar true para un email válido", () => {
    expect(validateEmail("usuario@frro.utn.edu.ar")).toBe(true);
    expect(validateEmail("nombre.apellido12@frro.utn.edu.ar")).toBe(true);
  });

  test("Debe retornar false para un email inválido", () => {
    expect(validateEmail("usuario@otrodominio.com")).toBe(false);
    expect(validateEmail("nombre.apellido@frro.utn")).toBe(false);
    expect(validateEmail("email-invalido")).toBe(false);
  });
});
