import json

id = "blockId"


def nv(block):
    if id in block["val"].keys():
        s = "int " + block["var_name"] + " = "
        s += parseBlocks([block["val"], ], endline=0)
    else:
        s = block["val"]["type"] + " " + block["var_name"] + " = "
        s += str(block["val"]["val"])
    return s


def cv(block):
    s = block["var_name"] + " = "
    if "blockId" in block["val"].keys():
        s += parseBlocks([block["val"], ], endline=0)
    else:
        s += str(block["val"]["val"])

    return s


def add_pin(pin, setting):
    return f"pinMode({pin}, {setting})"


def light(block, tab=0):
    s = add_pin(f"LED_BUILTIN_{block["blockId"][1]}", "OUTPUT")
    s += ";\n" + "\t" * tab

    if block["type"]:
        s += f"analogWrite(LED_BUILTIN_{block["blockId"][1]}, "
    else:
        s += f"digitalWrite(LED_BUILTIN_{block["blockId"][1]}, "

    if isinstance(block["val"], str):
        s += block["val"] + ")"
    else:
        s += str(block["val"]["val"]) + ")"

    return s


def button(block):
    s = add_pin(f"BUTTON_BUILTIN_{block['blockId'][1]}", "INPUT_PULLDOWN")
    return s


def read(type_, block):
    s = ""
    if type_:
        s += "analogRead("
    else:
        s += "digitalRead("

    if block["from"] in ["B" + str(i) for i in range(1, 4)]:
        s += "BUTTON_BUILTIN_" + block["from"][1]
    else:
        s += block["from"]

    s += ")"

    return s


def write(type_, block):
    s = ""
    if type_:
        s += "analogWrite("
    else:
        s += "digitalWrite("

    if block["to"] in ["L1", "L2"]:
        s += "LED_BUILTIN_" + block["to"][1]
    else:
        s += block["to"]

    s += ", "

    if isinstance(block["val"], str):
        s += block["val"]
    elif id in block["val"].keys():
        s += parseBlocks([block["val"], ], endline=0)
    else:
        s += str(block["val"]["val"])

    return s + ")"


def arith(block):
    s = "("

    if isinstance(block["par1"], str):
        s += block["par1"]
    elif id in block["par1"].keys():
        s += parseBlocks([block["par1"], ], endline=0)
    else:
        s += str(block["par1"]["val"])

    s += " "
    if block[id] == "=":
        s += "=="
    elif block[id] == "!":
        s += "!="
    else:
        s += block[id]

    s += " "

    if isinstance(block["par2"], str):
        s += block["par2"]
    elif id in block["par2"].keys():
        s += parseBlocks([block["par2"], ], endline=0)
    else:
        s += str(block["par2"]["val"])

    return s + ")"


def if_(block, tab):
    s = "if "
    if isinstance(block["condition"], dict):
        s += parseBlocks([block["condition"], ], endline=0)
    else:
        s += f"({block['condition']})"
    s += "\n" + "\t" * tab + "{\n" + parseBlocks(block["body"], tab + 1)

    return s + "\n" + "\t" * tab + "}"


def else_(block, tab):
    s = "else\n" + "\t" * tab
    s += "{\n" + parseBlocks(block["body"], tab + 1)
    return s + "\n" + "\t" * tab + "}"


def whiloop(block, tab):
    s = "while "
    if isinstance(block["condition"], dict):
        s += parseBlocks([block["condition"], ], endline=0)
    else:
        s += f"({block['condition']})"
    s += " {\n" + parseBlocks(block["body"], tab + 1)

    return s + "\n" + "\t" * tab + "}"


def foroop(block, tab):
    s = "for (int i = 0; i < "
    if isinstance(block["steps"], str):
        s += block["steps"]
    elif id in block["steps"].keys():
        s += parseBlocks([block["steps"], ], endline=0)
    else:
        s += str(block["steps"]["val"])

    s += "; i++) {\n"
    s += parseBlocks(block["body"], tab + 1)

    return s + "\n" + "\t" * tab + "}"


def delay(block):
    s = "delay("

    if isinstance(block["ms"], dict):
        if id in block["ms"].keys():
            s += parseBlocks([block["ms"], ], endline=0)
        else:
            s += str(block["ms"]["val"])
    else:
        s += str(block["ms"])

    return s + ")"


def serial(block):
    s = ""
    i = 0

    if block[id][2] == "A":
        s += "Serial.available()"
        i = 1
    elif block[id][2] == "R":
        s += "Serial.read()"
        i = 1
    elif block[id][2] == "I":
        s += "Serial.begin(" + str(block["extr"]["val"]) + ")"
    elif block[id][2] == "L":
        s += "Serial.println("
        if "type" in block.keys():
            s += str(block["val"]["val"])
            s += ", " + block["type"]
        else:
            s += '"' + str(block["val"]["val"]) + '"'
        s += ")"
    elif block[id][2] == "T":
        s += "Serial.print(\"" + str(block["val"]["val"]) + "\")"

    return s, i


def parseBlocks(body, tab=0, printer=False, endline=True):
    if printer:
        print("Parsing: ", body)
    to = ""
    for ind, block in enumerate(body):
        ignore = 0
        to += "\t" * tab
        if printer:
            print(block[id])

        if block[id] == "nv":
            to += nv(block)
        elif block[id] == "cv":
            to += cv(block)
        elif block[id][0] == "L":
            to += light(block, tab)
        elif block[id][0] == "B":
            to += button(block)
        elif block[id] == "dr":
            to += read(0, block)
        elif block[id] == "ar":
            to += read(1, block)
        elif block[id] == "dw":
            to += write(0, block)
        elif block[id] == "aw":
            to += write(1, block)
        elif block[id] in "+-*/><!=":
            to += arith(block)
        elif block[id] == "if":
            to += if_(block, tab)
            ignore = 1
        elif block[id] == "el":
            to += else_(block, tab)
            ignore = 1
        elif block[id] == "d":
            to += delay(block)
        elif block[id] == "wl":
            to += whiloop(block, tab)
            ignore = 1
        elif block[id] == "fl":
            to += foroop(block, tab)
            ignore = 1
        elif block[id][:-1] == "SP":
            ns, ignore = serial(block)
            to += ns

        if printer:
            print(ind + 1, len(body), ind + 1 < len(body))
        to += ";" * (endline and not ignore) + "\n" * (ind + 1 < len(body))
    if printer:
        print("res: ", to)
    return to


def decipher(data, filepath):
    glovar = ""
    setup = ""
    loop = ""

    code = """#include "Arduino.h"

// -<GLOVAR>-

void setup()
{
// -<SETUP>-
}

void loop()
{
// -<LOOP>-
}

"""

    for key in data.keys():
        if key == "glovar":
            glovar = parseBlocks(data[key])
        elif key == "setup":
            setup = parseBlocks(data[key], 1)
        elif key == "loop":
            loop = parseBlocks(data[key], 1)

    code = code.replace("// -<GLOVAR>-", glovar)
    code = code.replace("// -<SETUP>-", setup)
    code = code.replace("// -<LOOP>-", loop)

    with open(filepath, "w") as file:
        file.write(code)


data = None
with open("example.json", "r") as file:
    decipher(json.loads(file.read()), "./bro_tosta/bro_tosta.cpp")
