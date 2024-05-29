// Define question-answer pairs
const crimeQAPairs = [
    {
        question: "What is crime prediction?",
        answer: "Crime prediction involves using data analysis and statistical techniques to forecast where and when crimes are likely to occur."
    },
    {
        question: "How does crime prediction help law enforcement?",
        answer: "Crime prediction helps law enforcement agencies allocate resources more effectively, prioritize patrols, and prevent criminal activity."
    },
    {
        question: "What factors are considered in crime prediction?",
        answer: "Factors such as historical crime data, demographic information, location, time of day, and weather conditions are considered in crime prediction."
    },
    {
        question: "Can crime prediction models prevent all crimes?",
        answer: "While crime prediction models can help prevent some crimes, they cannot prevent all criminal activity. However, they can assist in reducing crime rates and improving public safety."
    },
    {
        question: "How accurate are crime prediction models?",
        answer: "The accuracy of crime prediction models varies depending on the quality of data and the methods used. While they can provide valuable insights, they are not always 100% accurate."
    },
    {
        question: "What is community policing?",
        answer: "Community policing involves building partnerships between law enforcement agencies and the communities they serve to address crime and public safety issues collaboratively."
    },
    {
        question: "What can individuals do to prevent crime?",
        answer: "Individuals can take steps such as securing their property, being aware of their surroundings, reporting suspicious activity, and participating in community crime prevention programs."
    },
    {
        question: "How does technology aid in crime prevention?",
        answer: "Technology such as surveillance cameras, alarms, and crime mapping software can deter criminals, facilitate investigations, and improve overall security."
    },
    {
        question: "What is hot spot policing?",
        answer: "Hot spot policing involves focusing law enforcement resources on areas with high levels of criminal activity to prevent and deter crime."
    },
    {
        question: "What are some examples of crime prevention strategies?",
        answer: "Examples of crime prevention strategies include neighborhood watch programs, security patrols, public lighting improvements, and community outreach initiatives."
    },
    {
        question: "How can communities work together to prevent crime?",
        answer: "Communities can work together by organizing neighborhood events, sharing information with law enforcement, and supporting local crime prevention initiatives."
    },
    {
        question: "What is the role of education in crime prevention?",
        answer: "Education can help raise awareness about crime prevention strategies, teach individuals how to recognize and report criminal activity, and empower communities to take proactive measures to improve safety."
    },
    {
        question: "What is the importance of data analysis in crime prevention?",
        answer: "Data analysis helps identify crime trends, patterns, and risk factors, enabling law enforcement agencies to develop targeted interventions and allocate resources more efficiently."
    },
    {
        question: "How can public spaces be designed to prevent crime?",
        answer: "Public spaces can be designed with features such as clear sightlines, well-lit areas, and natural surveillance to deter criminal activity and promote community safety."
    },
    {
        question: "What are some examples of crime prevention programs?",
        answer: "Examples of crime prevention programs include youth mentorship programs, drug and alcohol prevention initiatives, and restorative justice programs aimed at reducing re-offending."
    },
    {
        question: "What role do businesses play in crime prevention?",
        answer: "Businesses can contribute to crime prevention by implementing security measures, participating in crime reporting networks, and supporting community-based crime prevention efforts."
    },
    {
        question: "How does public awareness help in preventing crime?",
        answer: "Public awareness campaigns can educate individuals about crime risks, prevention strategies, and the importance of reporting criminal activity, leading to increased vigilance and community engagement."
    },
    {
        question: "What is the impact of social and economic factors on crime rates?",
        answer: "Social and economic factors such as poverty, unemployment, and inequality can contribute to higher crime rates. Addressing these root causes is essential for effective crime prevention."
    },
    {
        question: "How can environmental design influence crime prevention?",
        answer: "Environmental design principles such as defensible space, natural surveillance, and target hardening can make neighborhoods safer by reducing opportunities for criminal activity."
    },
    {
        question: "What are some common misconceptions about crime prevention?",
        answer: "Common misconceptions include the belief that crime prevention is solely the responsibility of law enforcement, that crime rates are determined solely by police activity, and that crime cannot be prevented entirely."
    }
];


const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    const userQuestion = userMessage.toLowerCase().trim();
    let foundAnswer = false;

    // Check if the user's question matches any predefined question
    crimeQAPairs.forEach(qaPair => {
        if (qaPair.question.toLowerCase() === userQuestion) {
            messageElement.textContent = qaPair.answer;
            foundAnswer = true;
        }
    });

    // If no predefined answer is found, send request to OpenAI API
    if (!foundAnswer) {
        // Your existing code to interact with OpenAI API
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Analysing...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
