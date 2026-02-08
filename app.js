/* ===== LOGIN SYSTEM ===== */
function showRegister(){
    loginBox.style.display="none";
    registerBox.style.display="block";
}
function showLogin(){
    registerBox.style.display="none";
    loginBox.style.display="block";
}

function register(){
    localStorage.setItem("userEmail", regEmail.value);
    localStorage.setItem("userPass", regPass.value);
    alert("Registration successful!");
    showLogin();
}

function login(){
    if(
        loginEmail.value === localStorage.getItem("userEmail") &&
        loginPass.value === localStorage.getItem("userPass")
    ){
        localStorage.setItem("loggedIn","true");
        window.location.href="quiz.html";
    }else{
        alert("Invalid login!");
    }
}

/* ===== QUESTIONS ===== */
const questions = [ 
    {
 q:"Which feature of C allows access to memory directly?",
 o:["Functions","Pointers","Structures","Files"],
 a:1,
 s:"Pointers allow direct access and manipulation of memory locations."
},
{
 q:"Which data type occupies the least memory?",
 o:["int","float","char","double"],
 a:2,
 s:"char occupies only 1 byte of memory."
},
{
 q:"Which operator is used to get the address of a variable?",
 o:["*","%","&","@"],
 a:2,
 s:"The & operator gives the address of a variable."
},
{
 q:"Which loop executes at least once?",
 o:["for","while","do-while","nested loop"],
 a:2,
 s:"do-while executes once before checking the condition."
},
{
 q:"Who developed the C language?",
 o:["Bjarne Stroustrup","Dennis Ritchie","James Gosling","Guido van Rossum"],
 a:1,
 s:"Dennis Ritchie developed C at Bell Labs."
},
{
 q:"Which header file is required for scanf()?",
 o:["stdio.h","conio.h","stdlib.h","string.h"],
 a:0,
 s:"scanf() is defined in stdio.h."
},

{
 q:"Which data type is immutable in Python?",
 o:["List","Tuple","Set","Dictionary"],
 a:1,
 s:"Tuple values cannot be changed after creation."
},
{
 q:"Which keyword is used to define a function in Python?",
 o:["func","define","def","function"],
 a:2,
 s:"Functions are defined using the def keyword."
},
{
 q:"What does len() return?",
 o:["Size in bytes","Number of elements","Index","Memory address"],
 a:1,
 s:"len() returns the number of elements in a collection."
},
{
 q:"Which symbol is used for comments in Python?",
 o:["//","#","<!-- -->","/* */"],
 a:1,
 s:"Python uses # for single-line comments."
},
{
 q:"Python is a _____ language.",
 o:["Compiled","Low level","Interpreted","Assembly"],
 a:2,
 s:"Python executes code line by line using an interpreter."
},
{
 q:"Which module is used for mathematical functions?",
 o:["math","calc","numbers","statistics"],
 a:0,
 s:"The math module provides mathematical functions."
},
{
 q:"Java follows which programming paradigm?",
 o:["Procedural","Functional","Object Oriented","Assembly"],
 a:2,
 s:"Java follows Object-Oriented Programming principles."
},
{
 q:"Which method is the entry point of Java program?",
 o:["start()","main()","run()","init()"],
 a:1,
 s:"Execution starts from the main() method."
},
{
 q:"Which keyword is used for inheritance?",
 o:["this","super","extends","implements"],
 a:2,
 s:"extends keyword is used for inheritance."
},
{
 q:"JVM stands for?",
 o:["Java Virtual Machine","Java Variable Method","Joint Virtual Machine","Java Verified Machine"],
 a:0,
 s:"JVM executes Java bytecode."
},
{
 q:"Which access modifier allows access within the package only?",
 o:["public","private","protected","default"],
 a:3,
 s:"Default access is package-private."
},
{
 q:"Which exception occurs when dividing by zero?",
 o:["NullPointerException","ArithmeticException","IOException","ArrayException"],
 a:1,
 s:"ArithmeticException occurs when dividing by zero."
},
{
 q:"AI stands for?",
 o:["Artificial Input","Artificial Intelligence","Advanced Interface","Automated Info"],
 a:1,
 s:"AI refers to machines that mimic human intelligence."
},
{
 q:"Which AI system works on rules?",
 o:["Neural Network","Expert System","Machine Learning","Deep Learning"],
 a:1,
 s:"Expert systems use if-then rules."
},
{
 q:"Which test is used to evaluate machine intelligence?",
 o:["Boolean Test","Turing Test","IQ Test","Logic Test"],
 a:1,
 s:"The Turing Test was proposed by Alan Turing."
},
{
 q:"AI agent perceives environment using?",
 o:["Sensors","Actuators","Programs","CPU"],
 a:0,
 s:"Sensors are used to perceive the environment."
},
{
 q:"Which is an AI application?",
 o:["Compiler","Search Engine","Assembler","Text Editor"],
 a:1,
 s:"Search engines use AI for ranking and suggestions."
},
{
 q:"Which field focuses on human-like reasoning?",
 o:["Networking","Robotics","AI","DBMS"],
 a:2,
 s:"AI focuses on mimicking human reasoning."
},
{
 q:"Machine Learning is a subset of?",
 o:["OS","AI","DBMS","Computer Networks"],
 a:1,
 s:"Machine Learning is a subfield of Artificial Intelligence."
},
{
 q:"Which is a supervised learning algorithm?",
 o:["K-means","Linear Regression","Apriori","DBSCAN"],
 a:1,
 s:"Supervised learning uses labeled data."
},
{
 q:"Which algorithm is used for classification?",
 o:["Decision Tree","K-means","PCA","Apriori"],
 a:0,
 s:"Decision Trees are commonly used for classification."
},
{
 q:"Overfitting occurs when?",
 o:["Model performs well on new data","Model learns noise","Model is simple","Data is small"],
 a:1,
 s:"Overfitting happens when a model learns noise instead of patterns."
},
{
 q:"Which metric measures prediction error?",
 o:["Bias","Loss","Variance","Accuracy"],
 a:1,
 s:"Loss function measures the prediction error."
},
{
 q:"Which is NOT a Machine Learning algorithm?",
 o:["SVM","Naive Bayes","Bubble Sort","KNN"],
 a:2,
 s:"Bubble Sort is a sorting algorithm, not ML."
},

 ];

let i = 0;
let time = 120;
let score = 0;
let userAnswers = new Array(questions.length).fill(-1);

/* LOAD QUIZ */
if(document.getElementById("question")){
    loadQuestion();
    startTimer();
}

/* LOAD QUESTION */
function loadQuestion(){
    let q = questions[i];
    question.innerText = `${i+1}. ${q.q}`;
    options.innerHTML = "";

    q.o.forEach((op,idx)=>{
        options.innerHTML += `
        <div class="option">
            <input type="radio" name="opt" value="${idx}"
            ${userAnswers[i]===idx?"checked":""}>
            ${op}
        </div>`;
    });
}

/* SAVE ANSWER */
function saveAnswer(){
    let sel = document.querySelector('input[name="opt"]:checked');
    userAnswers[i] = sel ? parseInt(sel.value) : -1;
}

/* NEXT */
function nextQuestion(){
    saveAnswer();
    if(i < questions.length-1){
        i++;
        loadQuestion();
    }else{
        alert("This is the last question. Please submit the test.");
    }
}

/* PREVIOUS */
function prevQuestion(){
    saveAnswer();
    if(i > 0){
        i--;
        loadQuestion();
    }
}

/* SUBMIT */
function submitQuiz(){
    if(confirm("Are you sure you want to submit the test?")){
        finishQuiz();
    }
}

/* FINISH */
function finishQuiz(){
    score = 0;
    userAnswers.forEach((ans,idx)=>{
        if(ans === questions[idx].a) score++;
    });

    localStorage.setItem("score",score);
    localStorage.setItem("answers",JSON.stringify(userAnswers));
    window.location.href = "result.html";
}

/* TIMER */
function startTimer(){
    const t = setInterval(()=>{
        timer.innerText = time;
        time--;
        if(time < 0){
            clearInterval(t);
            finishQuiz();
        }
    },1000);
}