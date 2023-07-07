import "./App.css";
import NavBar from "./components/NavBar/NavBar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPersonalInfoForm from "./components/Students/RegisterPersonalInfoForm";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import { Container } from "react-bootstrap";
import RecoverPassword from "./components/Login/RecoverPassword";
import Login from "./components/Login/Login";
import UniversityInfoForm from "./components/Students/UniversityInfoForm";
import { UserProvider } from "./context/UserContext";
import CreateOffer from "./components/Companies/CreateOffer";
import Offers from "./components/Offers/Offers";
import AddressForm from "./components/Students/AddressForm";
import NavStudent from "./components/Students/NavStudent";
import CreateCareer from "./components/Admin/CreateCareer";
import SignIn from "./components/SignIn/SignIn";
import CompanyInfoForm from "./components/Companies/CompanyInfoForm";
import CvFileForm from "./components/Students/CvFileForm";
import OtherInfoForm from "./components/Students/OtherInfoForm";
import OfferStudent from "./components/Students/OfferStudent";
import PendingCompanies from "./components/Admin/PendingCompanies";
import CvFileDownload from "./components/Students/CvFileDownload";
import NotFound from "./components/NotFound/NotFound";
import OfferCompany from "./components/Companies/OfferCompany";
import CreateKnowledge from "./components/Admin/CreateKnowledge";
import StudentsInOffer from "./components/Companies/StudentsInOffer";
import KnowledgeStudent from "./components/Students/KnowledgeStudent";
import StudentInOfferKnowledge from "./components/Companies/StudentInOfferKnowledge";
import OfferStudentHistory from "./components/Students/OfferStudentHistory";

function App() {
  return (
    <>
      <UserProvider>
        <div className="d-flex flex-column min-vh-100">
          <BrowserRouter>
            <NavBar />

            <Container className="flex-grow-1" style={{ marginTop: "90px" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route path="/sign-in-option" element={<SignIn />} />

                <Route
                  path="/students-form"
                  element={<RegisterPersonalInfoForm />}
                />

                <Route path="/company-form" element={<CompanyInfoForm />} />
                <Route path="/recover-password" element={<RecoverPassword />} />

                <Route path="/createOffer" element={<CreateOffer />} />
                <Route path="/Offers" element={<Offers />}></Route>

                <Route path="/navStudent" element={<NavStudent />}></Route>
                <Route path="/addressStudent" element={<AddressForm />} />
                <Route
                  path="/universityStudent"
                  element={<UniversityInfoForm />}
                />

                <Route path="/uploadCV" element={<CvFileForm />} />
                <Route path="/CVStudent" element={<CvFileDownload />} />
                <Route path="/OtherInfo" element={<OtherInfoForm />} />
                <Route
                  path="/StudentKnowledge"
                  element={<KnowledgeStudent />}
                />

                <Route path="/offerStudent" element={<OfferStudent />} />
                <Route path="/company-offers" element={<OfferCompany />} />
                <Route path="/createCareer" element={<CreateCareer />} />
                <Route path="/createKnowledge" element={<CreateKnowledge />} />
                <Route
                  path="/pendingCompanies"
                  element={<PendingCompanies />}
                />
                <Route
                  path="/studentsInOffer/:offerTitle/:offerId"
                  element={<StudentsInOffer />}
                />
                <Route
                  path="student-in-offer-knowledge/:name/:surname/:userId"
                  element={<StudentInOfferKnowledge />}
                />
                <Route //NUEVA RUTA
                  path="student-offer-history"
                  element={<OfferStudentHistory />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </BrowserRouter>
          <div>
            <Footer />
          </div>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
