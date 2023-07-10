const DB_DOMAIN = "https://localhost:7069/api";

// import axios from "axios";

export async function loginUser(userData) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Authentication/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        data.error ||
          "No se pudo iniciar sesión. Usuario o contraseña incorrecto. Por favor, inténtalo de nuevo."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createOffer({ token, offerData }) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Company/createOffer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        offerTitle: offerData.title,
        offerSpecialty: offerData.specialty,
        offerDescription: offerData.description,
        companyId: offerData.companyId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getStudentsInOffer(token, offerId) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Company/${offerId}/getStudentsInOffer`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.text();
      const errorMessage = errorResponse || "Error desconocido";
      console.error(errorMessage); 
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getStudentKnowledgeAsCompany(token, userId) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Company/getStudentKnowledge/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.text();
      const errorMessage = errorResponse || "Error desconocido";
      console.error(errorMessage); 
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createCareer({ token, careerData }) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Admin/createCareer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        careerName: careerData.careerName,
        careerAbbreviation: careerData.careerAbbreviation,
        careerType: careerData.careerType,
        careerTotalSubjects: careerData.careerTotalSubjects,
      }),
    });
    if (!response.ok) {
      const errorResponse = await response.text();
      const errorMessage = errorResponse || "Error desconocido";
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPendingCompanies(token) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Admin/getAllPendingCompanies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updatePendingCompany(companyId, token) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Admin/updatePendingCompany/${companyId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const responseText = await response.text();
    if (responseText.length === 0) {
      throw new Error("Error");
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export const fetchCVFiles = () => {
//   return axios.get("/api/Admin/getPendingCVFiles")
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("Error al obtener los archivos: ", error);
//       throw error;
//     });
// };

// export async function updatePendingCVFile(CVId, token) {
//   try {
//     const response = await fetch(
//       `${DB_DOMAIN}/Admin/updatePendingCVFile/${CVId}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error);
//     }

//     const responseText = await response.text();
//     if (responseText.length === 0) {
//       throw new Error("Error");
//     }

//     return JSON.parse(responseText);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// cambiar ruta de controler y tipo
export async function getKnowledge(token) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Knowledge/knowledge/GetAllKnowledge`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error();
    }
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addKnowledge(token, type) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Admin/createKnowledge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Type: type,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    const successData = await response.text();
    if (successData !== "Conocimiento creado") {
      throw new Error("Error al crear el conocimiento");
    }

    return successData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteKnowledge(token, id) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Admin/deleteKnowledge/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    throw error;
  }
}

export async function createStudent(studentData) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Student/createStudent`, {
      method: "POST",
      //mode:"no-cors", PROBANDO CREAR STUDENT DESDE UN PC REMOTO
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: studentData.userName,
        password: studentData.password,
        confirmPassword: studentData.confirmPassword,
        file: studentData.file,
        name: studentData.lastName,
        surname: studentData.firstName,
        userEmail: studentData.email,
        altEmail: studentData.altEmail,
        documentType: studentData.docType,
        documentNumber: studentData.docNumber,
        CUIL_CUIT: studentData.cuil,
        birth: studentData.birthdate,
        sex: studentData.gender,
        civilStatus: studentData.maritalStatus,
      }),
    });
    if (!response.ok) {
      const errorResponse = await response.text();
      const errorMessage = errorResponse || "Error desconocido";
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateStudentAddressInfo({ token, addressData }) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Student/addStudentAdressInfo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        familyStreet: addressData.familyStreet,
        familyStreetNumber: addressData.familyStreetNumber,
        familyStreetLetter: addressData.familyStreetLetter,
        familyFloor: addressData.familyFloor,
        familyDepartment: addressData.familyDepartment,
        familyCountry: addressData.familyCountry,
        familyProvince: addressData.familyProvince,
        familyLocation: addressData.familyLocation,
        familyPersonalPhone: addressData.familyPersonalPhone,
        familyOtherPhone: addressData.familyOtherPhone,

        personalStreet: addressData.personalStreet,
        personalStreetNumber: addressData.personalStreetNumber,
        personalStreetLetter: addressData.personalStreetLetter,
        personalFloor: addressData.personalFloor,
        personalDepartment: addressData.personalDepartment,
        personalCountry: addressData.personalCountry,
        personalProvince: addressData.personalProvince,
        personalLocation: addressData.personalLocation,
        personalPersonalPhone: addressData.personalPersonalPhone,
        personalOtherPhone: addressData.personalOtherPhone
      }),
    });
    if (!response.ok) {
      const errorResponse = await response.text();
      const errorMessage = errorResponse || "Error desconocido";
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateStudentUniversityInfo(token, universityData) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Student/updateStudentUniversityInfo`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(universityData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      return data;
    } else {
      console.error(
        "Error al actualizar la información de universidad:",
        response.statusText
      );
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadCV(token, cvFile) {
  try {
    const formData = new FormData();
    formData.append("file", cvFile);

    const response = await fetch(`${DB_DOMAIN}/Student/uploadCV`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const message = await response.json();
      console.log(message);
      return { message };
    } else {
      console.error("Error al cargar el CV:", response);
      throw new Error("Error al cargar el CV");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function downloadCV(token) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Student/downloadCV`, {
      method: "GET",
      headers: {
        Accept: "application/pdf",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Currículum no encontrado");
    }
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateStudentOtherInfo(token, otherData) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Student/updateStudentOtherInfo`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(otherData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      return data;
    } else {
      console.error(
        "Error al actualizar la información de universidad:",
        response.statusText
      );
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addStudentToOffer(token, studentId, offerId) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Student/${offerId}/Students/${studentId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      return true;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteStudentFromOffer(token, studentId, offerId) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Student/${offerId}/DeleteStudent/${studentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      return true;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    throw error;
  }
}
//IMPLEMENTAR STUDENT CON KNOWLEDGE

export async function createCompany(companyData) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Company/createCompany`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: companyData.userName,
        password: companyData.password,
        confirmPassword: companyData.confirmPassword,
        companyCUIT: companyData.CUIT,
        companyLine: companyData.line,
        companyName: companyData.name,
        companyAddress: companyData.address,
        companyLocation: companyData.location,
        companyPostalCode: companyData.postalCode,
        companyPhone: companyData.phone,
        companyWebPage: companyData.webPage,

        companyPersonalName: companyData.personalName,
        companyPersonalSurname: companyData.personalSurname,
        companyPersonalJob: companyData.personalJob,
        companyPersonalPhone: companyData.personalPhone,
        userEmail: companyData.email,
        companyRelationContact: companyData.relationContact,
        companyPendingConfirmation: companyData.pendingConfirmation,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      const errorMessage = errorResponse || "Error desconocido";
      console.error(errorMessage); // Imprimir el mensaje de error en la consola
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getOffers() {
  try {
    const response = await fetch(`${DB_DOMAIN}/Offer/Offers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      const errorMessage = errorResponse || "Error desconocido";
      throw new Error(errorMessage);
    }
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getStudentOffers(studentId, token) {
  try {
    const response = await fetch(
      `https://localhost:7069/api/Student/${studentId}/Offers`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCompanyOffers(companyId, token) {
  try {
    const response = await fetch(
      `https://localhost:7069/api/Offer/ByCompany/${companyId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function recoverPassword(userName) {
  try {
    const response = await fetch(`${DB_DOMAIN}/User/recoverPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName.username,
      }),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(
        data.message || "No se pudo encontrar el nombre de usuario ingresado."
      );
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteStudent(token, id) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Student/deleteStudent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: id,
      }),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      const error = new Error(`Response status is ${response.status}`);
      error.response = errorResponse;
      console.log(error.response);
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteOffer(offerId, token) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Offer/deleteOffer/${offerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      const error = new Error(`Response status is ${response.status}`);
      error.response = errorResponse;
      console.log(error.response);
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCompany(token, id) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Company/deleteCompany/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: id,
      }),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      const error = new Error(`Response status is ${response.status}`);
      error.response = errorResponse;
      console.log(error.response);
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logout(token) {
  try {
    const response = await fetch(`${DB_DOMAIN}/Authentication/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      const error = new Error(`Response status is ${response.status}`);
      error.response = errorResponse;
      console.log(error.response);
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function downloadStudentCvForCompany(userId, token) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Company/CVFiles/${userId}/getStudentCV`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.text();
      const errorMessage = errorResponse || "Error desconocido";
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addKnowledgeToStudent(token, knowledgeId) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Student/Knowledge/${knowledgeId}/AddKnowledge`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      return true;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteKnowledgeFromStudent(knowledgeId, token) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Student/Knowledge/${knowledgeId}/DeleteKnowledge`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      const error = new Error(`Response status is ${response.status}`);
      error.response = errorResponse;
      console.log(error.response);
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getStudentKnowledge(token) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Student/Knowledge/GetKnowledgesToStudent`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error();
    }
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//NUEVA FUNCIÓN
export async function getStudentOfferHistory(studentId, token) {
  try {
    const response = await fetch(
      `${DB_DOMAIN}/Student/getStudentOfferHistory/${studentId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok) {
      const errorResponse = await response.text();
      const errorMessage = errorResponse || "Error desconocido";
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}