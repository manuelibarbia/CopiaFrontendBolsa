import React from 'react';
import SignInCard from './SignInCard';
import { Button } from 'react-bootstrap';
import { FaBook, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const handleStudentRegistration = () => {
    navigate('/students-form');
  };

  const handleCompanyRegistration = () => {
    navigate('/company-form');
  };

  return (
    <div className='cards-container'>
      <SignInCard>
        <FaBook className='icons' />
        <Button className='buttons' onClick={handleStudentRegistration}>Inscribirme como estudiante</Button>
      </SignInCard>
      <SignInCard>
        <FaBuilding className='icons' />
        <Button className='buttons' onClick={handleCompanyRegistration}>Inscribirme como empresa</Button>
      </SignInCard>
    </div>
  );
};

export default SignIn;