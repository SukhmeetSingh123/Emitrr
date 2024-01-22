import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
          localStorage.clear();
      }, []);
    const handleNavigation = () => {
        navigate('/register');
    };
    return (
        <Wrapper className="container">
            <h1 className="heading text-center">Emitrr's Quiz</h1>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <ul>
                        <h2>Introduction</h2>
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
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo consectetur quisquam?
                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo quisquam?
                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo quisquam?
                        </li>
                    </ul>
                        <div className="buttonStyle text-center">
                            <Button variant="primary" style={{ width: '8rem' }} onClick={handleNavigation}>
                                Register
                            </Button>
                        </div>
                        <div className="text-center">
                            <Link to={'/login'} className="linkStyle">
                                Already registered <FaArrowRight size={14} style={{ marginLeft: '0.2rem', marginTop: '3px' }} />
                            </Link>
                        </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Home
const Wrapper = styled.section`
  .heading {
    font-size: 3rem;
    text-decoration: underline;
  }

  li {
    margin-top: 1rem;
  }

  .linkStyle {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:1rem;
  }

  @media (max-width: 750px) {
 
    .heading {
      font-size: 2rem;
    }
  }

`;