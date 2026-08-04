const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "C") {
      display.textContent = "0";
    } else if (btn.textContent === "=") {
      try {
        display.textContent = eval(display.textContent.replace("√","Math.sqrt"));
      } catch {
        display.textContent = "Error";
      }
    } else {
      if (display.textContent === "0") display.textContent = "";
      display.textContent += btn.textContent;
    }
  });
});


