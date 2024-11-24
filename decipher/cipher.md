# Cipher

- Чтение\запись цифрового сигнала

- Чтение\запись аналогового сигнала
(наличие отдельных блоков для работы с встроенными
светодиодами\кнопками будет рассматриваться как преимущество)

- Задержка (delay)

- Цикл (достаточным будет реализовать либо цикл с условием, либо
цикл со счетчиком. Наличие обоих видов цикла будет считаться
преимуществом)

- Условный оператор

- Чтение\запись по серийному порту

- Создание переменной


# JSON

```json
{
    "setup": [


        ["L1", 0, 0],
        ["L2", 1, 130],
        "B1",
        "B2",
        "B3",

        ["SP", "ex_freq"],

        "block_id": ["block_values", ["body_if_exists"]],
    ],
    "glovar": {
        "var_name": ["var_type", "value"],
        "var_name_1": ["var_type",  "value"],
    },
    "loop": {
        "block_id": ["block_values", ["body_if_exists"]],
        "wl": ["condition", [
            "body",
        ]],

        "fl": [["var_type", "var_name", "init_val", "condition", "end_val", "increment"], [
            "body",
        ]],
        "if": ["cond", [
            "body",
        ]],
        "dW": ["pin/L1/L2", "0/1"],
        "aW": ["pin/L1/L2", "value"],
        "dR": ["pin/L1/L2/B1/B2/B3", "0/1"],
        "aR": ["pin/L1/L2/B1/B2/B3", "value"],
    },

}
```