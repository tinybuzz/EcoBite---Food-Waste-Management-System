document.addEventListener("DOMContentLoaded", function() {
    const chatInput = document.getElementById("chat-box");

    if (chatInput) {
        chatInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                processChatMessage();
            }
        });
    }
});

function processChatMessage() {
    let chatBox = document.getElementById("chat-box");
    let userMessage = chatBox.value.trim().toLowerCase();
    
    if (!userMessage) return;

    let response = getChatbotResponse(userMessage);

    alert("Chatbot: " + response);
    chatBox.value = ""; 
}

function getChatbotResponse(message) {
    
    let knowledgeBase = {
        "how to donate food": "You can donate food by filling out the donation form on our website and dropping it at the nearest collection point.",
        "where can i donate food": "You can donate food at our designated drop-off centers. Visit our website to find the nearest location.",
        "what type of food can i donate": "You can donate fresh, packaged, and non-perishable food such as rice, pulses, canned goods, and bakery items.",
        "can i donate cooked food": "Yes, you can donate freshly cooked food, but it must be hygienically prepared and packed.",
        "can i donate expired food": "No, we only accept fresh and edible food. Please check the expiration date before donating.",
        "who receives the donated food": "The donated food is distributed to NGOs, shelters, and people in need.",
        "how do you ensure food safety": "We follow strict quality control measures to ensure donated food is safe and edible.",
        "how can i reduce food waste at home": "Plan meals, store food properly, donate excess food, and compost organic waste to reduce food waste at home.",
        "what is the impact of food waste": "Food waste leads to environmental pollution, resource wastage, and increased global hunger.",
        "how does food waste affect the environment": "Food waste increases greenhouse gas emissions and contributes to climate change and landfills.",
        "how can businesses reduce food waste": "Businesses can reduce food waste by donating surplus food, managing inventory better, and training staff.",
        "what happens to wasted food": "Most wasted food ends up in landfills, but some can be composted, repurposed, or used for animal feed.",
        "how does food donation help society": "It helps reduce hunger, supports underprivileged communities, and prevents food waste.",
        "how can i start a food donation drive": "You can partner with us to organize a food donation drive in your area. Contact us through our website for details.",
        "how is the food stored before distribution": "We use cold storage and dry storage facilities to keep donated food fresh.",
        "can i donate food online": "Yes, you can contribute funds through our website, and we will use them to procure food for donation.",
        "do you accept baby food and formula": "Yes, we accept unopened and well-packaged baby food and formula to help families in need.",
        "do you accept dairy products": "We accept packaged dairy products with valid expiration dates but not raw dairy items.",
        "how to prevent food from spoiling": "Store food in airtight containers, refrigerate perishable items, and consume food before expiration dates.",
        "how can restaurants donate surplus food": "Restaurants can register with us to donate surplus food, which we will collect and distribute to those in need.",
        "how can i volunteer for food donation programs": "You can sign up on our website to volunteer for food collection and distribution.",
        "why should we reduce food waste": "Reducing food waste conserves resources, helps the environment, and ensures food is available for those in need.",
        "how can schools contribute to food donation": "Schools can organize food drives and educate students about responsible food consumption and waste reduction.",
        "can food waste be turned into energy": "Yes, food waste can be converted into biogas through anaerobic digestion to produce clean energy.",
        "what is composting and how does it help": "Composting is a process that turns organic food waste into nutrient-rich soil, reducing landfill waste and improving agriculture."
    };

    
    for (let key in knowledgeBase) {
        if (message.includes(key)) {
            return knowledgeBase[key];
        }
    }

    
    return generateDynamicResponse(message);
}

function generateDynamicResponse(message) {
    let foodDonationKeywords = ["donate", "donation", "charity", "feeding", "volunteer", "ngo", "organization"];
    let foodWasteKeywords = ["waste", "leftover", "spoilage", "expiration", "compost", "recycle", "biodegradable"];

    let response = "";

    
    if (foodDonationKeywords.some(keyword => message.includes(keyword))) {
        response = "Food donation is a great way to help those in need. Can you provide more details so I can assist better?";
    }
    
   
    else if (foodWasteKeywords.some(keyword => message.includes(keyword))) {
        response = "Food waste can be reduced through better storage, donation, and composting. Would you like to know more about a specific method?";
    }

    
    if (!response) {
        response = "That's an important question! While I specialize in food donation and food waste, I may need more details to provide the best answer.";
    }

    return response;
}
