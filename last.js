
        const startButton = document.getElementById('startBtn');
        const quizContainer = document.getElementById('quiz');
        const questionElement = document.getElementById('question');
        const nextButton = document.getElementById('nextBtn');
        const endScreen = document.getElementById('end-screen');
        const scoreElement = document.getElementById('score');
        const correctAnswersList = document.getElementById('correct-answers');
        const timerElement = document.getElementById('timer');
        const questionnumberElement = document.getElementById('question-number');

        let currentQuestionIndex = 0;
        let score = 0;
        let timerInterval;
        let timeLeft = 10;
        let answered = false;

        const questions = [
            {
                question: "1. Choose the correct HTML tag to make a text italic?",
                answers: ["<li>", "<italic>", "<italics>", "<i>"],
                correct: 3
            },
            {
                question: "2. Which of the following is not a pair tag?",
                answers: ["<p>", "<italic>", "<u>", "<img>"],
                correct: 3
            },
            {
                question: "3. Which attribute is used to name an element uniquely?",
                answers: ["class", "id", "dot", "all of the above"],
                correct: 1
            },
            {
                question: "4. What does the vlink attribute mean?",
                answers: ["visited link", "virtual link", "very good link", "active link"],
                correct: 0
            },
            {
                question: "5. HTML documents are saved in?",
                answers: ["special binary code", "machine language codes", "ASCII text", "none of the above"],
                correct: 2
            },
            {
                question: "6. Some tags enclose text; those tags are known as?",
                answers: ["couple tag", "single tag", "double tag", "pair tag"],
                correct: 3
            },
            {
                question: "7. Choose the correct HTML tag to make a text italic",
                answers: ["<li>", "<italic>", "<italics>", "<i>"],
                correct: 3
            },
            {
                question: "8. How can you make a numbered list?",
                answers: ["<dl>", "<ol>", "<list>", "<ul>"],
                correct: 1
            },
            {
                question: "9. Which tag inserts a line horizontally on your web page?",
                answers: ["<hr>", "<link>", "<line>", "<tr>"],
                correct: 0
            },
            {
                question: "10. How can you make a bulleted list?",
                answers: ["<li>", "<list>", "<ul>", "<ol>"],
                correct: 2
            }
        ];

        const totalQuestions = questions.length;

        startButton.addEventListener('click', startQuiz);
        nextButton.addEventListener('click', nextQuestion);
        document.getElementById('restartBtn').addEventListener('click', startQuiz);

        function startQuiz() {
            startButton.style.display = 'none';
            quizContainer.style.display = 'block'; 
            endScreen.style.display = 'none'; 
            score = 0;
            currentQuestionIndex = 0;
            timeLeft = 10;
            // answered = false;
            setNextQuestion();
            
            startTimer();
        }

        function setNextQuestion() {
            resetState();
            showQuestion(questions[currentQuestionIndex]);
            updateQuestionNumber();
            // updateProgressBar();
        }

        function showQuestion(question) {
            questionElement.textContent = question.question;
            document.getElementById('option1-text').textContent = question.answers[0];
            document.getElementById('option2-text').textContent = question.answers[1];
            document.getElementById('option3-text').textContent = question.answers[2];
            document.getElementById('option4-text').textContent = question.answers[3];
            nextButton.style.display = 'none'; // Hide next button initially
        }

        function updateQuestionNumber() {
            questionnumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
        }

        function resetState() {
            const options = document.querySelectorAll('input[name="answer"]');
            options.forEach(option => {
                option.checked = false; // Reset radio buttons
                option.disabled = false; // Enable all options
            });
            timeLeft = 10;
            answered = false;
            timerElement.textContent = timeLeft;
        }

        function startTimer() {
            timerElement.textContent = timeLeft; // Display the initial time
            timerInterval = setInterval(() => {
                timeLeft--;
                timerElement.textContent = timeLeft;
                if (timeLeft === 0) {
                    clearInterval(timerInterval);
                    if (!answered) {
                        nextQuestion();  
                    }
                }
            }, 1000);
        }

        const answerOptions = document.getElementById('answer-options');
        answerOptions.addEventListener('change', function () {
            if (!answered) {
                answered = true;
                checkAnswer();
                disableOptions();
                nextButton.style.display = 'block'; 
                clearInterval(timerInterval);  
            }
        });

        function checkAnswer() {
            const selectedAnswer = document.querySelector('input[name="answer"]:checked');
            if (selectedAnswer && selectedAnswer.value == questions[currentQuestionIndex].correct) {
                score++;
            }
        }

        function disableOptions() {
            const options = document.querySelectorAll('input[name="answer"]');
            options.forEach(option => {
                option.disabled = true; // Disable all options
            });
        }

        function nextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                setNextQuestion();
                startTimer();
            } else {
                endQuiz();
            }
        }

        // function updateProgressBar() {
        //     const progress = (currentQuestionIndex / totalQuestions) * 100;
        //     document.getElementById('progress').style.width = `${progress}%`;
        // }

        function endQuiz() {
            quizContainer.style.display = 'none';
            endScreen.style.display = 'block'; 
            scoreElement.textContent = score;
            correctAnswersList.innerHTML = '';
            questions.forEach(question => {
                const li = document.createElement('li');
                li.textContent = `Correct Answer: ${question.answers[question.correct]}`;
                correctAnswersList.appendChild(li);
            });
        }