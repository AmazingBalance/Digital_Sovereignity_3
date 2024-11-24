import React from "react";
import { useSelector, useDispatch } from "react-redux";

const { ipcRenderer } = window.require("electron");
const path = window.require("path");

const Blockly = require("../../utils/blockly.min.js");

Blockly.Blocks["start_block"] = {
    init: function () {
        this.appendDummyInput().appendField("Start Program");
        this.setColour(120);
        this.setNextStatement(true);
        this.setTooltip("This is the start block of the program.");
        this.setHelpUrl("");
    },
};

Blockly.Blocks["end_block"] = {
    init: function () {
        this.appendDummyInput().appendField("End Program");
        this.setColour(0);
        this.setPreviousStatement(true);
        this.setTooltip("This is the end block of the program.");
        this.setHelpUrl("");
    },
};

// Block definition for "Hello World 1"
Blockly.Blocks["image_hello_world_1"] = {
    init: function () {
        this.appendDummyInput()
            .appendField(
                new Blockly.FieldImage(
                    "https://img.icons8.com/?size=100&id=81250&format=png&color=000000", // Image for block 1
                    50,
                    50,
                    "*"
                )
            )
            .appendField("Hello World 1");
        this.setColour(160);
        this.setTooltip("This block says 'Hello World 1'");
        this.setHelpUrl("");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
};

// Block definition for "Hello World 2"
Blockly.Blocks["image_hello_world_2"] = {
    init: function () {
        this.appendDummyInput()
            .appendField(
                new Blockly.FieldImage(
                    "https://img.icons8.com/?size=100&id=RCEIOyRG7cRL&format=png&color=000000", // Image for block 2
                    50,
                    50,
                    "*"
                )
            )
            .appendField("Hello World 2");
        this.setColour(230);
        this.setTooltip("This block says 'Hello World 2'");
        this.setHelpUrl("");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
};

Blockly.Blocks["if_else_block"] = {
    init: function () {
        this.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("If");
        this.appendStatementInput("DO").setCheck(null).appendField("then");
        this.appendStatementInput("ELSE").setCheck(null).appendField("else");
        this.setColour(230);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("If-Else block with condition and actions");
        this.setHelpUrl("");
    },
};

Blockly.Blocks["equals_block"] = {
    init: function () {
        this.appendValueInput("LEFT")
            .setCheck("Number")
            .appendField("Аргумент 1");
        this.appendDummyInput().appendField("равно");
        this.appendValueInput("RIGHT")
            .setCheck("Number")
            .appendField("Аргумент 2");
        this.setOutput(true, "Boolean");
        this.setColour(160);
        this.setTooltip("Проверка на равенство двух аргументов");
        this.setHelpUrl("");
    },
};

Blockly.Blocks["arithmetic_block"] = {
    init: function () {
        this.appendValueInput("LEFT")
            .setCheck("Number")
            .appendField("Аргумент 1");
        this.appendDummyInput().appendField(
            new Blockly.FieldDropdown([
                ["+", "ADD"],
                ["-", "SUBTRACT"],
                ["*", "MULTIPLY"],
                ["/", "DIVIDE"],
            ]),
            "OPERATOR"
        );
        this.appendValueInput("RIGHT")
            .setCheck("Number")
            .appendField("Аргумент 2");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Арифметические операции между двумя числами");
        this.setHelpUrl("");
    },
};

Blockly.JavaScript["arithmetic_block"] = function (block) {
    var left = Blockly.JavaScript.valueToCode(
        block,
        "LEFT",
        Blockly.JavaScript.ORDER_ATOMIC
    );
    var right = Blockly.JavaScript.valueToCode(
        block,
        "RIGHT",
        Blockly.JavaScript.ORDER_ATOMIC
    );
    var operator = block.getFieldValue("OPERATOR");

    var code;
    switch (operator) {
        case "ADD":
            code = left + " + " + right;
            break;
        case "SUBTRACT":
            code = left + " - " + right;
            break;
        case "MULTIPLY":
            code = left + " * " + right;
            break;
        case "DIVIDE":
            code = left + " / " + right;
            break;
    }
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks["comparison_block"] = {
    init: function () {
        this.appendValueInput("LEFT")
            .setCheck("Number")
            .appendField("Аргумент 1");
        this.appendDummyInput().appendField(
            new Blockly.FieldDropdown([
                [">", "GT"],
                ["<", "LT"],
            ]),
            "COMPARISON"
        );
        this.appendValueInput("RIGHT")
            .setCheck("Number")
            .appendField("Аргумент 2");
        this.setOutput(true, "Boolean");
        this.setColour(210);
        this.setTooltip("Сравнение двух чисел: больше или меньше");
        this.setHelpUrl("");
    },
};

Blockly.JavaScript["comparison_block"] = function (block) {
    var left = Blockly.JavaScript.valueToCode(
        block,
        "LEFT",
        Blockly.JavaScript.ORDER_ATOMIC
    );
    var right = Blockly.JavaScript.valueToCode(
        block,
        "RIGHT",
        Blockly.JavaScript.ORDER_ATOMIC
    );
    var comparison = block.getFieldValue("COMPARISON");

    var code;
    if (comparison == "GT") {
        code = left + " > " + right;
    } else {
        code = left + " < " + right;
    }
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks["not_block"] = {
    init: function () {
        this.appendValueInput("BOOL").setCheck("Boolean").appendField("Не");
        this.setOutput(true, "Boolean");
        this.setColour(120);
        this.setTooltip("Логическая операция НЕ");
        this.setHelpUrl("");
    },
};

Blockly.JavaScript["not_block"] = function (block) {
    var bool = Blockly.JavaScript.valueToCode(
        block,
        "BOOL",
        Blockly.JavaScript.ORDER_ATOMIC
    );
    var code = "!" + bool;
    return [code, Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

Blockly.JavaScript["equals_block"] = function (block) {
    var left = Blockly.JavaScript.valueToCode(
        block,
        "LEFT",
        Blockly.JavaScript.ORDER_ATOMIC
    );
    var right = Blockly.JavaScript.valueToCode(
        block,
        "RIGHT",
        Blockly.JavaScript.ORDER_ATOMIC
    );
    var code = left + " == " + right;
    return [code, Blockly.JavaScript.ORDER_EQUALITY];
};

Blockly.Blocks["argument_block"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Аргумент")
            .appendField(new Blockly.FieldNumber(0), "ARGUMENT");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Числовой аргумент");
        this.setHelpUrl("");
    },
};

Blockly.JavaScript["argument_block"] = function (block) {
    var argument = block.getFieldValue("ARGUMENT");
    var code = argument;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks["argument_string_block"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Аргумент")
            .appendField(new Blockly.FieldTextInput(""), "ARGUMENT");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Строковый аргумент");
        this.setHelpUrl("");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
};

Blockly.Blocks["controls_for"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Повторить ( ")
            .appendField(new Blockly.FieldNumber(0), "ARGUMENT")
            .appendField("раз ) {");
        this.setOutput(true, "Number");

        // Область для ввода тела цикла
        this.appendStatementInput("BODY").setCheck(null);

        // Закрывающая фигурная скобка
        this.appendDummyInput().appendField("}");

        // Настройка предыдущих и следующих операторов
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        // Настройка цвета блока и подсказки
        this.setColour(120);
        this.setTooltip("Цикл for");
        this.setHelpUrl("");
    },
};

Blockly.JavaScript["controls_for"] = function (block) {
    // Получение значения итерации
    var iteration =
        Blockly.JavaScript.valueToCode(
            block,
            "ITERATION",
            Blockly.JavaScript.ORDER_NONE
        ) || "0";

    // Получение тела цикла
    var statements_body = Blockly.JavaScript.statementToCode(block, "BODY");

    // Формирование кода для цикла for
    var code =
        "for (var i = 0; i < " +
        iteration +
        "; i++) {\n" +
        statements_body +
        "}\n";
    return code;
};

Blockly.JavaScript["argument_string_block"] = function (block) {
    var argument = block.getFieldValue("ARGUMENT");
    var code = '"' + argument + '"';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// JavaScript generator for "Hello World 1"
Blockly.JavaScript["image_hello_world_1"] = function (block) {
    return 'console.log("Hello World 1");\n';
};

// JavaScript generator for "Hello World 2"
Blockly.JavaScript["image_hello_world_2"] = function (block) {
    return 'console.log("Hello World 2");\n';
};

// JavaScript generator for if-else block
Blockly.JavaScript["if_else_block"] = function (block) {
    var condition =
        Blockly.JavaScript.valueToCode(
            block,
            "CONDITION",
            Blockly.JavaScript.ORDER_NONE
        ) || "false";
    var statements_do = Blockly.JavaScript.statementToCode(block, "DO");
    var statements_else = Blockly.JavaScript.statementToCode(block, "ELSE");

    var code = `if (${condition}) {\n`;
    code += `${statements_do}\n`;
    code += `} else {\n`;
    code += `${statements_else}\n`;
    code += `}\n`;

    return code;
};

// JavaScript generator for start block
Blockly.JavaScript["start_block"] = function (block) {
    var code = 'console.log("Program Started");\n';
    return code;
};

// JavaScript generator for end block
Blockly.JavaScript["end_block"] = function (block) {
    var code = 'console.log("Program Ended");\n';
    return code;
};

// Initialize Blockly workspace
const workspace = Blockly.inject("blocklyDiv", {
    toolbox: `
<xml>
<block type="image_hello_world_1"></block>
<block type="image_hello_world_2"></block>
<block type="equals_block"></block>
<block type="if_else_block"></block>
<block type="start_block"></block>
<block type="end_block"></block>
<block type="not_block"></block>
<block type="comparison_block"></block>
<block type="arithmetic_block"></block>
<block type="argument_block"></block>
<block type="argument_string_block"></block>
<block type="controls_for"></block>
</xml>
`,
});

// Функция для получения значений аргументов из блоков
function getArgumentValues(block, argumentType) {
    let values = [];

    if (
        argumentType === "argument_string_block" ||
        argumentType === "argument_block"
    ) {
        let value = block.inputList[0].fieldRow[1].value_;
        values.push(value);
    } else if (argumentType === "controls_for") {
        let value = block.inputList[0].fieldRow[1].value_;
        values.push(value);
    }

    return values;
}

// Функция для извлечения аргументов и оператора из comparison_block
function getComparisonValues(block, argumentType) {
    let comparisonInfo = [];
    if (argumentType === "comparison_block") {
        let firstArgumentId =
            block.childBlocks_[0].inputList[0].fieldRow[1].value_;
        comparisonInfo.push(firstArgumentId);
        let secondArgumentId =
            block.childBlocks_[1].inputList[0].fieldRow[1].value_;
        comparisonInfo.push(secondArgumentId);
        let operator = block.inputList[1].fieldRow[0].value_;
        comparisonInfo.push(operator);
    }
    // try {
    //     // Проверяем наличие нужных элементов и извлекаем id первого аргумента
    //     if (block.value && block.value[0] && block.value[0].inputList && block.value[0].inputList[0] && block.value[0].inputList[0].fieldRow && block.value[0].inputList[0].fieldRow[0].fieldGroup_) {
    //         let firstArgumentId = block.value[0].inputList[0].fieldRow[0].fieldGroup_.parentElement.childNodes[6]?.attributes[0]?.value;
    //         comparisonInfo.firstArgumentId = firstArgumentId || "undefined";
    //     } else {
    //         comparisonInfo.firstArgumentId = "undefined";
    //     }

    //     // Проверяем наличие нужных элементов и извлекаем id второго аргумента
    //     if (block.value && block.value[0] && block.value[0].inputList && block.value[0].inputList[0] && block.value[0].inputList[0].fieldRow && block.value[0].inputList[0].fieldRow[0].fieldGroup_) {
    //         let secondArgumentId = block.value[0].inputList[0].fieldRow[0].fieldGroup_.parentElement.childNodes[7]?.attributes[0]?.value;
    //         comparisonInfo.secondArgumentId = secondArgumentId || "undefined";
    //     } else {
    //         comparisonInfo.secondArgumentId = "undefined";
    //     }

    //     // Проверяем наличие знака между аргументами
    //     if (block.value && block.value[0] && block.value[0].inputList && block.value[0].inputList[1] && block.value[0].inputList[1].fieldRow) {
    //         let operator = block.value[0].inputList[1].fieldRow[0]?.value_;
    //         comparisonInfo.operator = operator || "undefined";
    //     } else {
    //         comparisonInfo.operator = "undefined";
    //     }

    // } catch (error) {
    //     console.error("Error extracting comparison values:", error);
    // }

    return comparisonInfo;
}

// Рекурсивная функция для обхода дочерних блоков и сборки информации
function executeChildrens(s, d) {
    // Собираем информацию о блоке
    const blockInfo = {
        type: s.type,
        tooltip: s.tooltip,
        id: s.id,
        nextBlock: s.childBlocks_.length > 0 ? s.childBlocks_[0].type : null,
    };

    // Проверяем, если блок является аргументом
    if (
        s.type === "argument_string_block" ||
        s.type === "argument_block" ||
        s.type === "controls_for"
    ) {
        blockInfo.values = getArgumentValues(s, s.type); // Добавляем значения аргументов
    }

    // Если это comparison_block, извлекаем информацию о сравнении
    if (s.type === "comparison_block") {
        blockInfo.comparisonInfo = getComparisonValues(s, s.type);
    }

    // Добавляем информацию о блоке в массив
    d.push(blockInfo);

    // Проверяем, если это блок "end_block", возвращаем данные
    if (s.type === "end_block") {
        return d;
    }

    // Если есть дочерние блоки, рекурсивно обходим их
    if (s.childBlocks_.length > 0) {
        for (let child of s.childBlocks_) {
            executeChildrens(child, d);
        }
    }

    return d;
}

// Главная функция для запуска и вывода всех блоков в консоль и JSON
function runCode() {
    const outputDiv = document.getElementById("output");

    try {
        console.log(workspace);
        let t = workspace.typedBlocksDB;

        // Ищем стартовый блок
        for (let k of t) {
            if (k[0] === "start_block") {
                const blockData = executeChildrens(k[1][0], []); // Получаем все блоки
                console.log(blockData); // Выводим в консоль

                // Преобразуем в JSON и выводим
                const blockDataJSON = JSON.stringify(blockData, null, 2);
                console.log("JSON Data:", blockDataJSON);
                outputDiv.textContent = blockDataJSON; // Выводим в output

                break;
            }
        }
    } catch (error) {
        console.error("Error running code:", error);
    }
}

// Add a button to execute code
const outputDiv = document.getElementById("output");
const runButton = document.createElement("button");
runButton.textContent = "Run Code";
runButton.onclick = runCode;
outputDiv.insertAdjacentElement("beforebegin", runButton);

const Workspace = () => {
    return (
        <>
            <body>
                <div id="blocklyDiv"></div>
                <div id="output">Output will appear here...</div>
            </body>
        </>
    );
};

export default Workspace;
