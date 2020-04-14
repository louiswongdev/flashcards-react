import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php?amount=10';
const API_CAT_URL = 'https://opentdb.com/api_category.php';

function decodeHtml(html) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  return textArea.value;
}

export function useFlashcardsAPI() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        const modifiedData = res.data.results.map((questionItem, index) => {
          const answer = decodeHtml(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeHtml(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeHtml(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        });

        setFlashcards(modifiedData);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
        setError(error);
      }
    }

    fetchData();
  }, []);

  return {
    flashcards,
    loading,
    error,
  };
}

export const fetchAPICategories = async () => {
  try {
    const {
      data: { trivia_categories },
    } = await axios.get(API_CAT_URL);

    return trivia_categories.map((category) => category.name);
    // return trivia_categories;
  } catch (error) {
    console.log(error);
  }
};

// export function useFlashcardAPICategories() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const res = await axios.get(API_CAT_URL);
//         console.log(res.data.trivia_categories, 'res');
//         setCategories(res);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchCategories();
//   }, []);
// }

// setFlashcards(
//   res.data.results.map((questionItem, index) => {
//     const answer = decodeHtml(questionItem.correct_answer);
//     const options = [
//       ...questionItem.incorrect_answers.map((a) => decodeHtml(a)),
//       answer,
//     ];
//     return {
//       id: `${index}-${Date.now()}`,
//       question: decodeHtml(questionItem.question),
//       answer: answer,
//       options: options.sort(() => Math.random() - 0.5),
//     };
//   })
// );
