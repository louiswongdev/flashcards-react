import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchAPICategories } from '../api';

const FormSection = styled.div``;

const FormGroup = styled.div``;

const FormSelect = () => {
  console.log('formselect');
  const [fetchCategories, setFetchCategories] = useState([]);

  useEffect(() => {
    const fetchCatAPI = async () => {
      setFetchCategories(await fetchAPICategories());
    };

    fetchCatAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFetchCategories]);

  console.log(fetchCategories);
  // const data = useFlashcardAPICategories();
  // console.log(data, 'data');
  return (
    <>
      <FormSection>
        <FormGroup>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            // onChange={e => handleCategoryChange(e.target.value)}
          >
            {fetchCategories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
        </FormGroup>
      </FormSection>
    </>
  );
};

export default FormSelect;
