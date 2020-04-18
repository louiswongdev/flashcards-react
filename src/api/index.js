import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php';
const API_CAT_URL = 'https://opentdb.com/api_category.php';
const API_SESSION_URL = 'https://opentdb.com/api_token.php?command=request';

function decodeHtml(html) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  return textArea.value;
}
let res;

export async function fetchFlashcards(
  category = 9,
  difficulty = null,
  count = 9,
  token
) {
  try {
    // category 30 (Gadgets) won't pull data from API if it has difficulty in search params
    if (category === '30') {
      res = await axios.get(API_URL, {
        params: {
          amount: count,
          category,
          token,
        },
      });
    } else {
      res = await axios.get(API_URL, {
        params: {
          category,
          amount: count,
          difficulty,
          token,
        },
      });
    }
    console.log(res.data, 'returned res');
    const modifiedData = res.data.results.map((questionItem, index) => {
      let counter = 0;
      const answer = decodeHtml(questionItem.correct_answer);
      const options = [
        ...questionItem.incorrect_answers.map((a) => decodeHtml(a)),
        answer,
      ];
      return {
        id: `${index}-${Date.now()}`,
        question: decodeHtml(questionItem.question),
        answer: answer,
        options: options
          .sort(() => Math.random() - 0.5)
          .map((q) => `${(counter += 1)}) ${decodeHtml(q)}`),
      };
    });
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

export const fetchSessionToken = async () => {
  try {
    const {
      data: { token },
    } = await axios.get(API_SESSION_URL);

    return token;
  } catch (error) {
    console.log(error);
  }
};
