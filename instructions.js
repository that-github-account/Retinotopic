// note, might be worthwhile adding an option to specify whether text should be centred or starting from the top for when instructions are very long

var textFont = "30px Arial"; // text font and colour for all text
var textColour = "white";
var textPadding = 200; // size of the padding to the left and right side of text boxes (assuming text boxes are centred)
var textHeight = 40; // height of text line breaks

// Function for wrapping text, courtesy of: https://fjolt.com/article/html-canvas-how-to-wrap-text
// @description: wrapText wraps HTML canvas text onto a canvas of fixed width
// @param ctx - the context for the canvas we want to wrap text on
// @param text - the text we want to wrap.
// @param x - the X starting point of the text on the canvas.
// @param y - the Y starting point of the text on the canvas.
// @param maxWidth - the width at which we want line breaks to begin - i.e. the maximum width of the canvas.
// @param lineHeight - the height of each line, so we can space them below each other.
// @returns an array of [ lineText, x, y ] for all lines
const wrapText = function (ctx, text, x, y, maxWidth, lineHeight) {
    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
    let words = text.split(' ');
    let line = ''; // This will store the text of the current line
    let testLine = ''; // This will store the text when we add a word, to test if it's too long
    let lineArray = []; // This is an array of lines, which the function will return

    // Lets iterate over each word
    for (var n = 0; n < words.length; n++) {
        // Create a test line, and measure it..
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        // If the width of this test line is more than the max width
        if (testWidth > maxWidth && n > 0) {
            // Then the line is finished, push the current line into "lineArray"
            lineArray.push([line, x, y]);
            // Increase the line height, so a new line is started
            y += lineHeight;
            // Update line and test line to use this word as the first word on the next line
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else {
            // If the test line is still less than the max width, then add the word to the current line
            line += `${words[n]} `;
        }
        // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
        if (n === words.length - 1) {
            lineArray.push([line, x, y]);
        }
    }
    // Return the line array
    return lineArray;
};

function instructions(txt) {

    this.text = txt;

    ctx.font = textFont;
    ctx.fillStyle = textColour;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // we pass in ctx, text, x, y, maxWidth, lineHeight to wrapText()
    let wrappedText = wrapText(ctx, this.text, canvas_centrex, canvas_centrey, canvas_width - textPadding, textHeight);

    wrappedText.forEach(function (item) {
        // item[0] is the text
        // item[1] is the x coordinate to fill the text at
        // item[2] is the y coordinate to fill the text at
        ctx.fillText(item[0], item[1], item[2]);
    });
};

function instructionsContinue() { // fixed instructions to display a continue message at the bottom of the screen

    this.text = "Press SPACE to continue.";

    ctx.font = textFont;
    ctx.fillStyle = textColour;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(this.text, canvas_centrex, canvas_height - textPadding);
};