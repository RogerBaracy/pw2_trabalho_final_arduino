import axios from "axios";
import five from "johnny-five";

// Initialize Arduíno
const board = new five.Board();

board.on("ready", () => {
  const led = {
    red: new five.Led(10),
    yellow: new five.Led(9),
    green: new five.Led(8),
  };
  setInterval(() => {
    axios
      .get(
        "http://localhost:8080/listen/list/last/?user_id=04648a60-7404-4294-bd40-d155dea8105f"
      )
      .then((response) => {
        console.log(response.data);
        const color = response.data;
        switch (color) {
          case "vermelho":
            led.red.on();
            break;
          case "verde":
            led.green.on();
            break;
          case "amarelo":
            led.yellow.on();
            break;
          case "desligar vermelho":
            led.red.off();
            break;
          case "desligar verde":
            led.green.off();
            break;
          case "desligar amarelo":
            led.yellow.off();
            break;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, 5000);
});
