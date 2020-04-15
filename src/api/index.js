import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php';
const API_CAT_URL = 'https://opentdb.com/api_category.php';

function decodeHtml(html) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  return textArea.value;
}

export async function fetchFlashcards(category = 9, count = 10) {
  // const [flashcards, setFlashcards] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState();
  // console.log(category, 'category');
  console.log(count, 'count');
  try {
    const res = await axios.get(API_URL, {
      params: {
        category,
        amount: count,
      },
    });
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
    console.log(modifiedData, 'modifiedData');
    return modifiedData;
  } catch (error) {
    console.log(error.response);
  }
}

export const fetchCategories = async () => {
  try {
    const {
      data: { trivia_categories },
    } = await axios.get(API_CAT_URL);

    // return trivia_categories.map((category) => category.name);
    return trivia_categories;
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
