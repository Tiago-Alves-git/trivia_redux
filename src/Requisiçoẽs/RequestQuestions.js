// const requestQuestions = async (Token) => {
//   const url = `https://opentdb.com/api.php?amount=5&token=${Token}`;

//   const request = await fetch(url);
//   const data = await request.json();
//   return data;
// };

async function requestQuestions() {
  try {
    const response = await fetch('/Questions.json');
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    const data = await response.json();
    // Manipule os dados conforme necessário
    return data;
  } catch (error) {
    console.error('Erro ao carregar as perguntas:', error);
  }
}

export default requestQuestions;
