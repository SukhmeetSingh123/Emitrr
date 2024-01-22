import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificQuestions } from '../redux/questionBox/questionBox';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { updateReport,fetchReport} from '../redux/progressReport/progressReport';
import { getUserDetails } from '../redux/Auth/auth';
import styled from 'styled-components';


const QuestionBox = () => {
  const navigate=useNavigate();
  const { languageType } = useParams();
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questionBox);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    dispatch(fetchSpecificQuestions({ languageType }));
  }, [dispatch, languageType]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleOptionChange = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    if (option === correctAnswer) {
      setCorrectCount((prevCount) => prevCount + 1);
    } else {
      setWrongCount((prevCount) => prevCount + 1);
    }
  };

  const getOptionsArray = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const options = [];

    for (let i = 1; i <= 4; i++) {
      const optionKey = `option${i}`;
      if (currentQuestion.hasOwnProperty(optionKey)) {
        options.push(currentQuestion[optionKey]);
      }
    }

    return options;
  };
  const handleSubmit = async () => {
    try {

      const fetchReportResult = await dispatch(fetchReport());
      if (fetchReportResult) {
        const { _id } = fetchReportResult.payload[0];
      await dispatch(updateReport({
        _id,
        correctAnswers: correctCount, 
        wrongAnswers: wrongCount,    
        selectedLanguage: languageType  
      }));
    }
    navigate('/progressReport')

    } catch (error) {
      console.error("Error updating progress report:", error);
    }
  };
  
  return (
    <Container className="mt-3">
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <Row>
          <Col xs={12} md={12} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>
                  <Badge variant="info">{questions[currentQuestionIndex].difficulty}</Badge>
                </Card.Title>
                <Card.Text>{questions[currentQuestionIndex].question}</Card.Text>
                <ul>
                  {getOptionsArray().map((option, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="radio"
                          name={`question_${currentQuestionIndex}`}
                          value={option}
                          checked={selectedOptions[currentQuestionIndex] === option}
                          onChange={() => handleOptionChange(option)}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <StyledButton onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous Question
            </StyledButton>
          </Col>
          <Col xs={12} md={4}>
            <StyledButton onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
              Next Question
            </StyledButton>
          </Col>
          <Col xs={12} md={4}>
            {currentQuestionIndex === questions.length - 1 && (
              <StyledButton onClick={handleSubmit} variant="success">
                Submit
              </StyledButton>
            )}
          </Col>
        </Row>
      ) : (
        <div>
          <p>No more questions available. More questions coming soon!</p>
        </div>
      )}
    </Container>
  );
};

export default QuestionBox;


const StyledButton = styled(Button)`
  margin: 0.5rem;
`;