const quizData = {
  general: {
    instructions: "Answer the general knowledge questions to test your basic knowledge.",
    questions: [
      { question: "What is the capital of France?", options: ["Paris", "Rome", "Berlin", "Madrid"], answer: "Paris" },
      { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
      { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], answer: "Da Vinci" },
      { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"],answer: "Jupiter"},
      { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "India", "Japan", "South Korea"], answer: "Japan" },
      { question: "Who invented the telephone?", options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Albert Einstein"], answer: "Alexander Graham Bell" },
      { question: "What is the smallest continent by land area?", options: ["Europe", "Australia", "Asia", "Africa"], answer: "Australia" },
      { question: "Which element is represented by the chemical symbol 'O'?", options: ["Oxygen", "Osmium", "Ozone", "Oganesson"], answer: "Oxygen" }
    ],
  },
  animals: {
    instructions: "Test your knowledge about animals with these questions.",
    questions: [
      { question: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Horse", "Leopard"], answer: "Cheetah" },
      { question: "Which bird can fly backwards?", options: ["Hummingbird", "Sparrow", "Eagle", "Crow"], answer: "Hummingbird" },
      { question: "What is the tallest animal in the world?", options: ["Elephant", "Giraffe", "Horse", "Kangaroo"], answer: "Giraffe" },
      { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], answer: "Blue Whale" },
{ question: "Which animal is known to have the longest lifespan?", options: ["Elephant", "Tortoise", "Whale", "Human"], answer: "Tortoise" },
{ question: "What is the fastest bird in the world?", options: ["Eagle", "Peregrine Falcon", "Hummingbird", "Sparrow"], answer: "Peregrine Falcon" },
{ question: "Which animal is known for its ability to change color?", options: ["Chameleon", "Octopus", "Squid", "Cuttlefish"], answer: "Chameleon" },
{ question: "Which animal has the longest neck?", options: ["Elephant", "Giraffe", "Kangaroo", "Zebra"], answer: "Giraffe" }

    ],
  },
  computers: {
    instructions: "Answer the following questions related to computers.",
    questions: [
      { question: "What does CPU stand for?", options: ["Central Processing Unit", "Control Panel Unit", "Computer Power Unit", "Central Programming Unit"], answer: "Central Processing Unit" },
      { question: "What is the brain of the computer?", options: ["Motherboard", "CPU", "RAM", "Hard Drive"], answer: "CPU" },
      { question: "What does HTML stand for?", options: ["Hypertext Markup Language", "Hyper Transfer Markup Language", "High-level Text Markup Language", "Hypertext Machine Language"], answer: "Hypertext Markup Language" },
      { question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Read-Only Memory", "Remote Access Memory"], answer: "Random Access Memory" },
{ question: "Which company developed the first computer mouse?", options: ["IBM", "Microsoft", "Apple", "Xerox"], answer: "Xerox" },
{ question: "What does the 'CSS' stand for?", options: ["Cascading Style Sheet", "Central Styling Steady", "Cascading Sheet Style", "Control Style Sheet"], answer: "Cascading Style Sheet" },
{ question: "What is the full form of 'URL'?", options: ["Uniform Resource Locator", "Universal Resource Locator", "Uniform Retrieval Locator", "Unified Resource Locator"], answer: "Uniform Resource Locator" },
{ question: "Which programming language is known as the language of the web?", options: ["Java", "C", "JavaScript", "Python"], answer: "JavaScript" }
],
  },
  fruits: {
    instructions: "How much do you know about fruits? Answer these questions!",
    questions: [
      { question: "Which fruit is known as the 'King of Fruits'?", options: ["Mango", "Apple", "Banana", "Pineapple"], answer: "Mango" },
      { question: "What fruit is red and has seeds on the outside?", options: ["Strawberry", "Apple", "Cherry", "Pomegranate"], answer: "Strawberry" },
      { question: "Which fruit is known to keep doctors away?", options: ["Apple", "Orange", "Banana", "Mango"], answer: "Apple" },
      { question: "Which fruit is known for its high Vitamin C content?", options: ["Banana", "Apple", "Orange", "Mango"], answer: "Orange" },
{ question: "Which fruit is typically used to make guacamole?", options: ["Tomato", "Avocado", "Cucumber", "Olive"], answer: "Avocado" },
{ question: "Which fruit is known as the 'queen of fruits'?", options: ["Apple", "Grape", "Durian", "Mango"], answer: "Mango" },
{ question: "Which fruit is typically used in a fruit salad and is known for being yellow when ripe?", options: ["Banana", "Pineapple", "Mango", "Apple"], answer: "Banana" },
{ question: "What fruit is used to make wine?", options: ["Apple", "Cherry", "Grapes", "Peach"], answer: "Grapes" }

    ],
  },
};

let currentCategory = "";
let currentQuestionIndex = 0;
let userAnswers = [];
let timer;

document.querySelectorAll(".quiz-card").forEach((card) => {
  card.addEventListener("click", () => {
    currentCategory = card.dataset.category;
    currentQuestionIndex = 0;
    userAnswers = [];
    startQuiz();
  });
});

function startQuiz() {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  // Show instructions for the selected category
  document.getElementById("question-title").textContent = quizData[currentCategory].instructions;

  // Display instructions and have the user click to proceed
  const proceedButton = document.createElement("button");
  proceedButton.textContent = "Proceed to Quiz";
  proceedButton.id = "proceedBtn";
  document.getElementById("quiz-screen").appendChild(proceedButton);

  proceedButton.addEventListener("click", () => {
    document.getElementById("proceedBtn").remove();  // Remove the proceed button
    loadQuestion();  // Load the first question
    startTimer(30);  // Start timer with 30 seconds
  });
}


function loadQuestion() {
  const questionData = quizData[currentCategory].questions[currentQuestionIndex];
  document.getElementById("question-title").textContent = questionData.question;
  
  const optionsList = document.getElementById("options-list");
  optionsList.innerHTML = ""; // Clear previous options

  questionData.options.forEach((option) => {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="radio" name="quiz-option" value="${option}"> ${option}</label>`;
    optionsList.appendChild(li);
  });

  // Show "Next" or "Submit" button based on current question index
  document.getElementById("nextBtn").style.display =
    currentQuestionIndex < quizData[currentCategory].questions.length - 1 ? "inline-block" : "none";
  document.getElementById("submitBtn").style.display =
    currentQuestionIndex === quizData[currentCategory].questions.length - 1 ? "inline-block" : "none";
}

document.getElementById("nextBtn").addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
  if (selectedOption) {
    userAnswers.push(selectedOption.value);
    currentQuestionIndex++;
    loadQuestion();
  } else {
    alert("Please select an answer!");
  }
});

document.getElementById("submitBtn").addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
  if (selectedOption) {
    userAnswers.push(selectedOption.value);
    endQuiz();
  } else {
    alert("Please select an answer!");
  }
});

document.getElementById("checkBtn").addEventListener("click", () => {
  reviewAnswers();
});

function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  let score = 0;
  quizData[currentCategory].questions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      score++;
    }
  });

  document.getElementById("score-text").textContent = `You scored ${score} out of ${quizData[currentCategory].questions.length}.`;
  document.getElementById("badge-text").textContent = score === quizData[currentCategory].questions.length
    ? "Great job! You answered all questions correctly!"
    : score >= quizData[currentCategory].questions.length / 2
    ? "Good work! You did well!"
    : "Better luck next time!";
}

function startTimer(seconds) {
  let timeRemaining = seconds;
  timer = setInterval(() => {
    timeRemaining--;
    document.getElementById("time").textContent = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function reviewAnswers() {
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("review-screen").style.display = "block";
  
  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = "";

  quizData[currentCategory].questions.forEach((question, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <p><strong>${question.question}</strong></p>
      <p>Your Answer: ${userAnswers[index]} <span style="color: ${userAnswers[index] === question.answer ? 'green' : 'red'};">(${userAnswers[index] === question.answer ? 'Correct' : 'Incorrect'})</span></p>
    `;
    reviewList.appendChild(li);
  });
}



