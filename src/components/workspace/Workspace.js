import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Blockly from "blockly";

const { ipcRenderer } = window.require("electron");
const path = window.require("path");

const Workspace = () => {
    const blocklyDivRef = useRef(null);

    const [result, setResult] = useState(null); // Для хранения ответа сервера

    let inputArray = "";

    const handleProcess = (blockData) => {
        console.log("JSON Data:", blockData);
        inputArray = blockData; // Присваиваем напрямую
        handleButtonClick(blockData); // Передаём напрямую
    };

    const handleButtonClick = () => {
        // Выполняем какие-то вычисления
        const computedArray = inputArray; // Пример вычислений

        console.log(computedArray);
        // Отправляем результат вычислений на сервер
        fetch("http://localhost:3001/api/process", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: computedArray,
            // Включение учетных данных, если требуется
        })
            .then((response) => response.json())
            .then((data) => {
                setResult(data);
                console.log(data);
            }) // Сохраняем результат в состояние
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        console.log(Blockly);

        Blockly.Blocks["start_block"] = {
            init: function () {
                this.appendDummyInput().appendField("Start Program");
                this.setColour(120);
                this.setNextStatement(true);
                this.setTooltip("This is the start block of the program.");
                this.setHelpUrl("");
            },
        };

        // Blockly.Blocks["end_block"] = {
        //     init: function () {
        //         this.appendDummyInput().appendField("End Program");
        //         this.setColour(0);
        //         this.setPreviousStatement(true);
        //         this.setTooltip("This is the end block of the program.");
        //         this.setHelpUrl("");
        //     },
        // };

        // // Block definition for "Hello World 1"
        // Blockly.Blocks["image_hello_world_1"] = {
        //     init: function () {
        //         this.appendDummyInput()
        //             .appendField(
        //                 new Blockly.FieldImage(
        //                     "https://img.icons8.com/?size=100&id=81250&format=png&color=000000", // Image for block 1
        //                     50,
        //                     50,
        //                     "*"
        //                 )
        //             )
        //             .appendField("Hello World 1");
        //         this.setColour(160);
        //         this.setTooltip("This block says 'Hello World 1'");
        //         this.setHelpUrl("");
        //         this.setPreviousStatement(true);
        //         this.setNextStatement(true);
        //     },
        // };

        // // Block definition for "Hello World 2"
        // Blockly.Blocks["image_hello_world_2"] = {
        //     init: function () {
        //         this.appendDummyInput()
        //             .appendField(
        //                 new Blockly.FieldImage(
        //                     "https://img.icons8.com/?size=100&id=RCEIOyRG7cRL&format=png&color=000000", // Image for block 2
        //                     50,
        //                     50,
        //                     "*"
        //                 )
        //             )
        //             .appendField("Hello World 2");
        //         this.setColour(230);
        //         this.setTooltip("This block says 'Hello World 2'");
        //         this.setHelpUrl("");
        //         this.setPreviousStatement(true);
        //         this.setNextStatement(true);
        //     },
        // };

        Blockly.Blocks["if_else_block"] = {
            init: function () {
                this.appendValueInput("CONDITION")
                    .setCheck("Boolean")
                    .appendField("If");
                this.appendStatementInput("DO")
                    .setCheck(null)
                    .appendField("then");
                this.appendStatementInput("ELSE")
                    .setCheck(null)
                    .appendField("else");
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

        Blockly.Blocks["not_block"] = {
            init: function () {
                this.appendValueInput("BOOL")
                    .setCheck("Boolean")
                    .appendField("Не");
                this.setOutput(true, "Boolean");
                this.setColour(120);
                this.setTooltip("Логическая операция НЕ");
                this.setHelpUrl("");
            },
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
                // this.setOutput(true, "Number");

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

        Blockly.Blocks["infinite_loop"] = {
            init: function () {
                this.appendDummyInput().appendField("loop");
                this.appendStatementInput("BODY")
                    .setCheck(null)
                    .appendField("{");
                this.appendDummyInput().appendField("}");
                this.setColour(120);
                this.setPreviousStatement(true);
                this.setTooltip("Бесконечный цикл, как loop в Arduino.");
                this.setHelpUrl("");
            },
        };

        Blockly.Blocks["setup"] = {
            init: function () {
                this.appendDummyInput().appendField("setup");
                this.appendStatementInput("BODY")
                    .setCheck(null)
                    .appendField("{");
                this.appendDummyInput().appendField("}");
                this.setColour(290);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(
                    "Этот блок выполняется один раз при старте программы, как setup в Arduino."
                );
                this.setHelpUrl("");
            },
        };

        Blockly.Blocks["glovar_values"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("var")
                    .appendField(
                        new Blockly.FieldTextInput("variable_name"),
                        "VAR"
                    )
                    .appendField("=")
                    .appendField(new Blockly.FieldNumber(0), "VALUE");
                this.setColour(230);
                this.setTooltip(
                    "Объявляет глобальную переменную, которая доступна во всей программе."
                );
                this.setHelpUrl("");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
            },
        };

        Blockly.Blocks["glovar_operation"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("set")
                    .appendField(
                        new Blockly.FieldTextInput("variable_name"),
                        "VAR"
                    ) // Имя переменной
                    .appendField("=");

                this.appendValueInput("VALUE") // Значение может быть либо переменной, либо числом
                    .setCheck(["Number", "Variable"]); // Проверка на тип данных

                this.appendDummyInput().appendField(
                    new Blockly.FieldDropdown([
                        ["+", "ADD"],
                        ["-", "SUBTRACT"],
                        ["*", "MULTIPLY"],
                        ["/", "DIVIDE"],
                    ]),
                    "OPERATOR"
                ); // Список операций

                this.appendValueInput("VALUE2") // Второе значение (для операции)
                    .setCheck(["Number", "Variable"]);

                this.setColour(230); // Цвет блока
                this.setTooltip(
                    "Изменяет значение переменной с использованием другой переменной или числового значения и арифметической операции."
                );
                this.setHelpUrl("");
                this.setPreviousStatement(true, null); // Блок может быть в цепочке
                this.setNextStatement(true, null); // Блок может иметь продолжение
            },
        };

        Blockly.Blocks["turn_on_light"] = {
            init: function () {
                // Вход для указания номера лампочки
                this.appendDummyInput()
                    .appendField("Turn on light number")
                    .appendField(new Blockly.FieldNumber(1, 1), "LIGHT_NUMBER"); // Поле для номера лампочки

                // Вход для задания первого числового параметра
                this.appendValueInput("PARAM1")
                    .setCheck("Number")
                    .appendField("with parameter 1");

                // Вход для задания второго числового параметра
                this.appendValueInput("PARAM2")
                    .setCheck("Number")
                    .appendField("and parameter 2");

                // Задание основных параметров блока
                this.setColour(160); // Цвет блока
                this.setTooltip(
                    "Включает указанную лампочку с двумя параметрами."
                );
                this.setHelpUrl(""); // Помощь можно оставить пустой или задать URL справки
                this.setPreviousStatement(true, null); // Блок может идти в цепочке
                this.setNextStatement(true, null); // Блок может иметь продолжение
            },
        };

        Blockly.Blocks["button_set_state"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("Set button number")
                    .appendField(new Blockly.FieldNumber(1, 1), "BUTTON_NUMBER")
                    .appendField("to")
                    .appendField(
                        new Blockly.FieldDropdown([
                            ["ON", "1"],
                            ["OFF", "0"],
                        ]),
                        "BUTTON_STATE"
                    );
                this.setColour(160);
                this.setTooltip(
                    "Sets the state of the button to ON (1) or OFF (0)."
                );
                this.setHelpUrl("");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
            },
        };

        Blockly.Blocks["button_read_state"] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("Read state of button number")
                    .appendField(
                        new Blockly.FieldNumber(1, 1),
                        "BUTTON_NUMBER"
                    );
                this.setOutput(true, "Number");
                this.setColour(210);
                this.setTooltip(
                    "Returns the state of the button: 1 for ON, 0 for OFF."
                );
                this.setHelpUrl("");
            },
        };

        // Initialize Blockly workspace
        const workspace = Blockly.inject("blocklyDiv", {
            toolbox: `
    <xml>
      <block type="equals_block"></block>
      <block type="if_else_block"></block>
      <block type="start_block"></block>
      <block type="not_block"></block>
      <block type="comparison_block"></block>
      <block type="arithmetic_block"></block>
      <block type="argument_block"></block>
      <block type="argument_string_block"></block>
      <block type="controls_for"></block>
      <block type="infinite_loop"></block>
      <block type="setup"></block>
      <block type="glovar_values"></block>
      <block type="glovar_operation"></block>
      <block type="turn_on_light"></block>
      <block type="button_set_state"></block>
      <block type="button_read_state"></block>
    </xml>
  `,
        });

        // Функция для получения значений аргументов из блоков
        function getArgumentValues(block) {
            let values = [];

            let argumentType = block.type;

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

        function getValueFromBlock(block) {
            let value = null;

            // Проверяем, что inputList существует и содержит хотя бы один элемент
            if (block.inputList && block.inputList.length > 0) {
                let fieldRow = block.inputList[0].fieldRow;

                // Проверяем, что поле fieldRow не пустое и содержит нужный элемент
                if (fieldRow && fieldRow.length > 1) {
                    value = fieldRow[1].value_; // Получаем значение value_
                }
            }

            return value;
        }

        function getValueFromGlovarValue(block) {
            let value = null;

            // Проверяем, что inputList существует и содержит хотя бы один элемент
            if (block.inputList && block.inputList.length > 0) {
                let fieldRow = block.inputList[0].fieldRow;

                // Проверяем, что поле fieldRow не пустое и содержит нужный элемент
                if (fieldRow && fieldRow.length > 1) {
                    value = fieldRow[1].value_; // Получаем значение value_
                }
            }

            return value;
        }

        function getOperatorFromBlock(block) {
            let operator = null;

            // Проверяем, существует ли inputList с нужными элементами
            if (block.inputList && block.inputList.length > 2) {
                let fieldRow = block.inputList[2].fieldRow;

                // Проверяем, что поле fieldRow не пустое и содержит нужный элемент
                if (fieldRow && fieldRow.length > 0) {
                    let selectedOption = fieldRow[0].selectedOption;

                    // Проверяем, что selectedOption существует и содержит нужные данные
                    if (selectedOption && selectedOption.length > 0) {
                        operator = selectedOption[0]; // Получаем значение оператора
                    }
                }
            }

            return operator;
        }

        function getOperatorFromTurnOnLight(block) {
            let val = null;

            // Проверяем, существует ли inputList с нужными элементами
            if (block.inputList && block.inputList.length > 2) {
                let fieldRow = block.inputList[0].fieldRow;

                // Проверяем, что поле fieldRow не пустое и содержит нужный элемент
                if (fieldRow && fieldRow.length > 0) {
                    val = fieldRow[1].value_;
                }
            }

            return val;
        }

        function getOperatorFromArithmeticBlock(block) {
            let operator = null;

            // Проверяем, существует ли inputList и есть ли в нем необходимый элемент
            if (block.inputList && block.inputList.length > 1) {
                let fieldRow = block.inputList[1].fieldRow;

                // Проверяем, что поле fieldRow не пустое и содержит нужный элемент
                if (fieldRow && fieldRow.length > 0) {
                    let selectedOption = fieldRow[0].selectedOption;

                    // Проверяем, что selectedOption существует и содержит нужные данные
                    if (selectedOption && selectedOption.length > 0) {
                        operator = selectedOption[0]; // Получаем значение оператора
                    }
                }
            }

            return operator;
        }

        function getGlovarValue(block, argumentType) {
            let values = [];

            if (argumentType === "glovar_values") {
                let value = block.inputList[0].fieldRow[3].value_;
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
                body: [], // Вложенные блоки внутри
                nextBlock: null, // Здесь будет следующий блок, не в списке
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

            if (s.type === "glovar_values") {
                blockInfo.values = getGlovarValue(s, s.type);
            }

            if (s.type === "turn_on_light") {
                let val = getOperatorFromTurnOnLight(s);

                if (val) {
                    blockInfo.val = val;
                }
            }

            if (s.type === "glovar_operation") {
                let operator = getOperatorFromBlock(s);

                if (operator) {
                    blockInfo.operator = operator; // Добавляем оператор в JSON
                }
            }

            if (s.type === "arithmetic_block") {
                let operator = getOperatorFromArithmeticBlock(s);

                if (operator) {
                    blockInfo.operator = operator; // Добавляем оператор в JSON
                }
            }

            if (s.type === "glovar_operation") {
                // Получаем значение из нужного места
                let value = getValueFromBlock(s);

                if (value) {
                    blockInfo.value = value; // Добавляем значение в JSON
                }
            }

            if (s.type === "glovar_values") {
                // Получаем значение из нужного места
                let value = getValueFromGlovarValue(s);

                if (value) {
                    blockInfo.value = value; // Добавляем значение в JSON
                }
            }

            // Обрабатываем дочерние блоки внутри обёрток
            for (let input of s.inputList) {
                if (input.connection && input.connection.targetBlock()) {
                    const childBlock = input.connection.targetBlock();
                    blockInfo.body.push(executeChildrens(childBlock, [])); // Вложенные блоки добавляем в "body"
                }
            }

            // Обрабатываем следующий блок (если есть)
            let nextBlock = s.getNextBlock();
            if (nextBlock) {
                blockInfo.nextBlock = executeChildrens(nextBlock, []); // Сохраняем следующий блок как аргумент
            }

            // Добавляем информацию о текущем блоке в массив
            d.push(blockInfo);

            return d;
        }

        function parseBody(s) {}

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
                        const blockDataJSON = JSON.stringify(
                            blockData,
                            null,
                            2
                        );
                        console.log("JSON Data:", blockDataJSON);
                        handleProcess(blockDataJSON);
                        //outputDiv.textContent = blockDataJSON; // Выводим в output

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
    }, []);

    return (
        <>
            <div
                style={{
                    width: "100%",
                    height: "550px",
                    backgroundColor: "white",
                }}
            >
                <div
                    style={{ height: "550px" }}
                    id="blocklyDiv"
                    ref={blocklyDivRef}
                ></div>
                <div id="output">Output will appear here...</div>
            </div>
        </>
    );
};

export default Workspace;
