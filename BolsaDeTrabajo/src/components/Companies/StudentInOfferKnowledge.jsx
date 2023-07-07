import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert, Card } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { getStudentKnowledgeAsCompany } from "../../api";

const StudentInOfferKnowledge = () => {
    const { user } = useContext(UserContext);
    const [studentKnowledgeList, setStudentKnowledgeList] = useState([]);
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState(false);
    const { name, surname, userId } = useParams();

    useEffect(() => {
        getStudentKnowledgeAsCompany(user.token, userId)
        .then((data) => {
            console.log(data);
            setStudentKnowledgeList(data);
            setApiError("");
            setApiSuccess(true);
        })
        .catch((error) => {
            setApiSuccess(false);
            setApiError(error.message);
        });
    }, [userId, user.token]);

    return (
    <div style={{ marginBlock: "20px" }}>
        {apiSuccess && studentKnowledgeList.length > 0 ? 
        (<>
        <h1>Conocimientos del estudiante: {name} {surname}</h1>
        {studentKnowledgeList.map((knowledge, index) => (
            <Card
                key={knowledge.knowledgeId}
                className={index % 2 === 0 ? "even-card" : "odd-card"}
            >
                <Card.Body>
                    <Card.Title>
                        Conocimiento: {knowledge.type}
                    </Card.Title>
                    <Card.Text>
                        Nivel: {knowledge.level}
                    </Card.Text>
                </Card.Body>
            </Card> 
        ))}
        </>)
        :
        (<h1>El estudiante {name} {surname} no posee conocimientos</h1>)}
    </div>
    );
}
export default StudentInOfferKnowledge;