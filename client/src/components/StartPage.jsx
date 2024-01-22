import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Dropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { addReport, updateReport, fetchReport } from '../redux/progressReport/progressReport';
import { useDispatch } from 'react-redux';
const StartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logedInUser = localStorage.getItem('authToken');
    if (!logedInUser) navigate('/login')
  }, [])

  const [selectedLanguage, setSelectedLanguage] = useState('Select a language')

  const handleDropdownSelect = (selectedDropDownLanguage) => {
    setSelectedLanguage(selectedDropDownLanguage)
  };

  const handleSubmit = async () => {
    try {
       await dispatch(addReport({}));
      const fetchReportResult = await dispatch(fetchReport());
  
      if (fetchReportResult) {
        const { _id, correctAnswers, wrongAnswers } = fetchReportResult.payload[0];
          await dispatch(updateReport({
            _id,
            correctAnswers,
            wrongAnswers,
            selectedLanguage,
          }));
        // navigate('/questionBox');
        navigate(`/questionBox/${selectedLanguage}`);
      }
    } catch (error) {
      console.error('Error while handling Submit:', error);
    }
  };
  return (
    <Wrapper>
      <h1 className="heading text-center">Start Quiz...</h1>
      <div className='grid grid-two-column'>
        <div>
          <h3 className='heading2'>Rules...</h3>
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, nemo.
            </li>
            <li>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo consectetur quisquam?
            </li>
            <li>
              Lorem ipsum dolor, sit amet consectetur elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo consectetur quisquam?
            </li>
            <li>
              Lorem ipsum dolor, sit amet adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo consectetur quisquam?
            </li>
            <li>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo consectetur quisquam?
            </li>
            <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo quisquam?
            </li>
          </ul>
        </div>
        <div className='dropDown'>
          <Dropdown onSelect={handleDropdownSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectedLanguage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="english">English</Dropdown.Item>
              <Dropdown.Item eventKey="hindi">Hindi</Dropdown.Item>
              <Dropdown.Item eventKey="french">French</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="buttonStyle text-center">
        <Button variant="success" onClick={handleSubmit} style={{ width: '8rem' }}>
          START...
        </Button>
      </div>

    </Wrapper>
  )
}

export default StartPage
const Wrapper = styled.section`
.heading {
  font-size: 3rem;
  text-decoration: underline;
  margin-top:2rem;
}
.heading2{
  display:flex;
  justify-content:center;
}
.dropDown{
  display:flex;
  justify-content:center;
  align-items:center;
}
@media (max-width: 750px) {
 
  .heading {
    font-size: 2rem;
  };
  .grid{
    gap:2rem;
  }
  .grid-two-column{
    grid-template-columns: 1fr;
  }
}
`
