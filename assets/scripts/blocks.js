$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});
// date function
const date = new Date();
let today = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
let time = date.getHours() + ":" + date.getMinutes();

Blockly.Blocks['bot_block'] = {
  init: function() {
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField("Bot");
        this.setInputsInline(true);
        this.setColour(130);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dropdown_block'] = {
  init: function() {
    this.appendStatementInput("dropdown")
        .setCheck(null)
        .appendField("Ask me a question:")
        .appendField(new Blockly.FieldDropdown([["What is the date today?",today],
                                                ["What is the time now?",time],
                                                ["How are you?","I am doing good."],
                                                ["What is JavaScript?","It is a scripting language "],
                                                ["What is your name?","Rohit Phatarpekar"]]), "dropdown");
    this.setPreviousStatement(true,"NAME");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
 
Blockly.JavaScript['dropdown_block'] = function (block) {
  return block.getFieldValue("dropdown");
}
Blockly.JavaScript['bot_block'] = function(block){
  var statements_d = Blockly.JavaScript.statementToCode(block, 'NAME');
  let code = `inputTextValue = "${statements_d}";`
  return code;
}

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  Blockly.mainWorkspace.clear()
  redrawUi();
}
