import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-center mt-5">
              Bolsa de trabajo para Estudiantes
            </h1>
            <p className=" text-justify">
              La Secretaría de Asuntos Universitarios de la Universidad
              Tecnológica Nacional Facultad Regional Rosario, te invita a
              ingresar tu CV en el Sistema Virtual de Búsqueda de Empleo para
              que encuentres el trabajo que estás buscando. Esta
              es una base en la cual podés actualizar tus datos cuantas veces
              quieras (y es recomendable que lo hagas periódicamente) e
              inscribirte a las ofertas que proponen las empresas o
              instituciones.
            </p>
            <p className=" text-justify">
              ¿Cómo inscribirte? El primer paso es tener una cuenta de email de
              la UTN-FRRO, si aún no la tenés, retirá el formulario en la
              Secretaría de Asuntos Universitarios, o accedé al formulario que se encuentra en el CVG:
              <Button id="cvg-button"
                href="https://frro.cvg.utn.edu.ar/course/view.php?id=737#section-6"
                target="_blank"
              >
                Trámites administrativos
              </Button>
            </p>
            <p>
              ¿Cómo acceder al sistema de Bolsa de Trabajo? Debés ingresar al sistema mediante el logo
              que se encuentra en la esquina superior derecha (personita con fondo azul), introduciendo
              tu usuario y tu contraseña.
              <br></br>
              Si todavía no estás registrado, accedé a "Unite a la bolsa" en la parte superior, luego a "Inscribirme como estudiante" y completá el formulario.
            </p>
            <p className="text-justify">
              ¿Cómo subir tu CV y actualizar información personal y académica?
              La primera vez que accedés al sistema podrás cargar tus diferentes datos personales
              mediante el menú desplegable que se encontrará en la esquina superior derecha (si bien esto es opcional, es recomendable que completes los formularios). 
              El CV (en formato pdf) lo subirás desde la pestaña "Cargar CV" en el mismo menú desplegable. IMPORTANTE:
              Si no tenés subido el CV al momento de postularte, tu postulación
              no será tenida en cuenta por el sistema.
            </p>
            <p className="text-justify">
              ¿Cómo postularte a las ofertas laborales? Desde "Últimos empleos"
              tendrás un listado con todas las ofertas laborales publicadas. Si te interesa una
              búsqueda laboral, hacé clic en "Inscribirse a la oferta". Repetimos: Es
              imprescindible haber cargado tu currículum en el sistema previo a
              postularte para las búsquedas. Una vez hecho esto, podrás ver tus postulaciones accediendo a "Ver mis ofertas" en el menú desplegable y 
              tendrás la opción de cancelar la postulación. En la fila correspondiente a la búsqueda a la cual te
              postulaste deberá aparecer la fecha de postulación.
              <br></br>
              Las empresas en las que te postules podrán ver los datos necesarios, incluyendo tu correo alternativo, con el cual podrán comunicarse directamente con vos.
              Una vez que la empresa se comunica con el estudiante, el objetivo de la página web ya está logrado.
            </p>
            <p className=" text-justify">
              ¿Cada cuánto tiempo se publican búsquedas laborales? A medida que
              las empresas soliciten personal, la SAU publicará las búsquedas en
              el sistema una vez verificada la documentación de la misma.
            </p>
            <p className="text-justify">
              Como podrás ver, es muy fácil y rápido postularse a una Oferta
              Laboral. Es por eso que es fundamental que tu CV
              siempre esté actualizado. Los cambios más frecuentes son:
            </p>
            <ul>
              <li>Teléfono principal</li>
              <li>Teléfono alternativo</li>
              <li>Actualización del curriculum vitae</li>
              <li>
                Cualquier otra modificación como conocimientos,
                experiencia laboral, etc., es imprescindible notificarla y
                requerirá la actualización de tu CV.
              </li>
            </ul>
            <p className="text-justify">
              Contamos con tu colaboración y te recomendamos consultar nuestras
              propuestas laborales en el Sistema Virtual de Búsqueda de Empleo.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
