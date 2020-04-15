import React, { useContext } from 'react';
import styled from 'styled-components';

import { GlobalContext } from '../context/GlobalState';

const Select = styled.select`
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
`;

const FormSection = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  background-color: #f2c14e;
  /* width: 100%; */
`;

const FormGroup = styled.div`
  flex-direction: column;
  display: flex;
  margin: 0.5rem;

  & > label {
    color: #fff;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  background: #333;
  color: white;
  font-size: 1rem;
  margin-top: 17px;
  border: none;
`;

const FormSelect = ({ categories }) => {
  const { handleCategoryChange, handleCountChange, handleSubmit } = useContext(
    GlobalContext
  );
  return (
    <>
      <FormSection onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="category">Category</label>
          <Select
            name="category"
            id="category"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map((category, i) => (
              <option key={i} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <label htmlFor="count">Number of Questions</label>
          <Select
            name="number"
            id="number"
            defaultValue="10"
            onChange={(e) => handleCountChange(e.target.value)}
          >
            {Array.from({ length: 20 }, (v, i) => i).map((num, i) => (
              <option key={i} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <SubmitButton>Generate</SubmitButton>
        </FormGroup>
      </FormSection>
    </>
  );
};

export default FormSelect;