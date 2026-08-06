const display = document.getElementById("display");
let lastAnswer = "";

// Bouton kalkilatris
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.innerText;

    if (val === "=") {
      try {
        const res = math.evaluate(display.innerText);
        display.innerText = res;
        lastAnswer = res;
      } catch {
        display.innerText = "Erè nan ekpresyon!";
      }
    } else if (val === "C") {
      display.innerText = "";
    } else if (val === "DEL" || val === "Backspace") {
      // retire dènye karaktè a
      display.innerText = display.innerText.slice(0, -1);
    } else if (val === "Ans") {
      display.innerText += lastAnswer;
    } else if (val === "π") {
      display.innerText += "pi"; // math.js konprann pi
    } else if (val === "sin") {
      display.innerText += "sin(";
    } else if (val === "cos") {
      display.innerText += "cos(";
    } else if (val === "tan") {
      display.innerText += "tan(";
    } else if (val === "log") {
      display.innerText += "log(";
    } else if (val === "ln") {
      display.innerText += "ln(";
    } else if (val === "EXP") {
      display.innerText += "exp(";
    } else if (val !== "Rezoud ak AI") {
      display.innerText += val;
    }
  });
});

// API AI pou etap pa etap
const API_KEY = "METE_KLE_API_OU_ISIT"; // ranplase ak kle API reyèl ou

async function solveWithAI() {
  const expr = display.innerText;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // pi rapid, pi disponib
        messages: [
          {
            role: "user",
            content: `Rezoud ekwasyon sa etap pa etap: ${expr}`
          }
        ]
      })
    });

    const data = await response.json();
    display.innerText = data.choices[0].message.content;
  } catch (error) {
    display.innerText = "Erè API!";
    console.error(error);
  }
}
