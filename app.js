// Initializing required dependencies
const express = require("express");
const app = express();
app.use(express.static("public"))
const PORT = 3000;
const five = require("johnny-five");
const board = new five.Board();

var constant = 200;

app.get("/", function(req, res){
    res.sendFile(__dirname + "/initiate.html")
    constant += 1;
});

board.on("ready", function() {
    const myServo = new five.Servo.Continuous(13);
    const myLed = new five.Led(12);
    function readLoop(){
        if (constant > 200) {
                myServo.cw(); 
                constant -= 1;
                myLed.on();
                console.log(constant)
                
        }
    }
    function readLoop_(){
        if (constant <= 200) {
            myServo.ccw();
            myLed.on();
                // myLed.blink(1000);
                
        }
    }
    setInterval(readLoop, 200);
    setInterval(readLoop_, 700);
});

app.listen(PORT, function() {
    console.log("Server is running on port 3000.");
});