import os

files = [
        [".vscode/launch.json",
         """{
    // Используйте IntelliSense, чтобы узнать о возможных атрибутах.
    // Наведите указатель мыши, чтобы просмотреть описания существующих атрибутов.
    // Для получения дополнительной информации посетите: https://go.microsoft.com/fwlink/?linkid=830387

    // !!!
    // Внимание! Ни при каких обстоятельствах не обновляйте прошивку программатора, это может привести к его неработоспособности в случае, если программатор предназначен для работы с неоригинальной прошивкой или "китайский". Обновление драйвера на ПК не приводит к поломке программатора.
    // При начале работы с программатором, сперва подключайте внешнее питание к плате, затем программатор.
    // При окончании работы с программатором, сперва отключайте программатор от платы, затем внешнее питание.
    // !!!
    "version": "0.2.0",
    "configurations": [
        {
            "name": "openocd",
            "request": "launch",
            "type": "cortex-debug",
            "cwd": "${workspaceRoot}",
            "servertype": "openocd",
            "executable": "build-debug/Sketch.elf",
            "svdFile": "${userHome}/.arduino15/packages/Rudiron/tools/openocd/default/openocd/scripts/MDR32F9Qx.svd",
            "configFiles": [
                "interface/1986be92_jlink.cfg"
            ],
            "preLaunchTask": "Отладка: собрать",
        }
    ]
}"""],
    [".vscode/settings.all.json",
            """{
    "cmake.generator": "Ninja"
}"""],
    [".vscode/settings.linux.json",
            """{
    "cmake.cmakePath": "${userHome}/.arduino15/packages/Rudiron/tools/cmake/default/bin/cmake",
    "cortex-debug.openocdPath.linux": "${userHome}/.arduino15/packages/Rudiron/tools/openocd/default/bin/openocd",
    "cortex-debug.armToolchainPath.linux": "${userHome}/.arduino15/packages/Rudiron/tools/gcc-arm-none-eabi/default/bin"
}"""],
    [".vscode/settings.macos.json",
            """{

}"""],
    [".vscode/settings.windows.json",
            """{
    "cmake.cmakePath": "${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/cmake/default/bin/cmake.exe",
    "cortex-debug.openocdPath.windows": "${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/openocd/default/bin/openocd.exe",
    "cortex-debug.armToolchainPath.windows": "${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/gcc-arm-none-eabi/default/bin"
}"""],
    [".vscode/tasks.json",
            """{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "shell",
            "label": "Очистить каталог сборки",
            "command": "rm -r build; rm -r build-debug;",
            "options": {
                "cwd": "${workspaceFolder}"
            },
            "group": "build",
            "problemMatcher": {
                "base": "$gcc",
                "fileLocation": [
                    "relative",
                    "${workspaceFolder}"
                ]
            },
            "presentation": {
                "echo": true,
                "reveal": "never",
                "focus": false,
                "panel": "shared",
                "showReuseMessage": false,
                "clear": true,
            },
        },
        {
            "type": "shell",
            "label": "Выпуск: собрать",
            "command": "",
            "windows": {
                "command": "mkdir build; ${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/cmake/default/bin/cmake.exe -DCMAKE_BUILD_TYPE=Release -G \"Ninja\" -S . -B build/; ${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/cmake/default/bin/cmake.exe --build build;"
            },
            "osx": {
                "command": ""
            },
            "linux": {
                "command": "mkdir build; ${userHome}/.arduino15/packages/Rudiron/tools/cmake/default/bin/cmake -DCMAKE_BUILD_TYPE=Release -G \"Ninja\" -S . -B build/; ${userHome}/.arduino15/packages/Rudiron/tools/cmake/default/bin/cmake --build build;"
            },
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "problemMatcher": {
                "base": "$gcc",
                "fileLocation": [
                    "relative",
                    "${workspaceFolder}/build"
                ]
            },
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared",
                "showReuseMessage": true,
                "clear": false
            }
        },
        {
            "type": "shell",
            "label": "Отладка: собрать",
            "command": "",
            "windows": {
                "command": "mkdir build-debug; ${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/cmake/default/bin/cmake.exe -DCMAKE_BUILD_TYPE=Debug -G \"Ninja\" -S . -B build-debug/; ${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/cmake/default/bin/cmake.exe --build build-debug;"
            },
            "osx": {
                "command": ""
            },
            "linux": {
                "command": "mkdir build-debug; ${userHome}/.arduino15/packages/Rudiron/tools/cmake/default/bin/cmake -DCMAKE_BUILD_TYPE=Debug -G \"Ninja\" -S . -B build-debug/; ${userHome}/.arduino15/packages/Rudiron/tools/cmake/default/bin/cmake --build build-debug;"
            },
            "group": {
                "kind": "build"
            },
            "problemMatcher": {
                "base": "$gcc",
                "fileLocation": [
                    "relative",
                    "${workspaceFolder}/build-debug"
                ]
            },
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared",
                "showReuseMessage": true,
                "clear": false
            }
        },
        {
            "type": "shell",
            "label": "Очистить флеш-память",
            "command": "",
            "windows": {
                "command": "${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/Rudiron Programmer/default/Rudiron Programmer",
                "args": [
                    "${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/bootloaders/default/MDR32F9Qx_default.hex",
                    "build/Sketch.hex",
                    "--english",
                    "--verify_bootloader",
                    "--erase",
                    "--speed",
                    "8"
                ]
            },
            "osx": {
                "command": ""
            },
            "linux": {
                "command": "${userHome}/.arduino15/packages/Rudiron/tools/Rudiron Programmer/default/Rudiron Programmer",
                "args": [
                    "${userHome}/.arduino15/packages/Rudiron/tools/bootloaders/default/MDR32F9Qx_default.hex",
                    "build/Sketch.hex",
                    "--verify_bootloader",
                    "--erase",
                    "--speed",
                    "8"
                ]
            },
            "options": {
                "cwd": "${workspaceFolder}"
            },
            "dependsOn": [
                "Выпуск: собрать"
            ],
            "group": "none",
            "problemMatcher": [],
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared",
                "showReuseMessage": true,
                "clear": true
            }
        },
        {
            "type": "shell",
            "label": "Загрузить в флеш-память",
            "command": "",
            "windows": {
                "command": "${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/Rudiron Programmer/default/Rudiron Programmer",
                "args": [
                    "${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/bootloaders/default/MDR32F9Qx_default.hex",
                    "build/Sketch.hex",
                    "--english",
                    "--erase",
                    "--load",
                    "--run",
                    "--speed",
                    "8"
                ]
            },
            "osx": {
                "command": ""
            },
            "linux": {
                "command": "${userHome}/.arduino15/packages/Rudiron/tools/Rudiron Programmer/default/Rudiron Programmer",
                "args": [
                    "${userHome}/.arduino15/packages/Rudiron/tools/bootloaders/default/MDR32F9Qx_default.hex",
                    "build/Sketch.hex",
                    "--erase",
                    "--load",
                    "--run",
                    "--speed",
                    "8"
                ]
            },
            "dependsOn": [
                "Выпуск: собрать"
            ],
            "group": "none",
            "problemMatcher": [],
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared",
                "showReuseMessage": true,
                "clear": true
            }
        },
        {
            "type": "shell",
            "label": "Запустить",
            "command": "",
            "windows": {
                "command": "${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/Rudiron Programmer/default/Rudiron Programmer",
                "args": [
                    "${userHome}/AppData/Local/Arduino15/packages/Rudiron/tools/bootloaders/default/MDR32F9Qx_default.hex",
                    "build/Sketch.hex",
                    "--english",
                    "--run",
                    "--speed",
                    "8"
                ]
            },
            "osx": {
                "command": ""
            },
            "linux": {
                "command": "${userHome}/.arduino15/packages/Rudiron/tools/Rudiron Programmer/default/Rudiron Programmer",
                "args": [
                    "${userHome}/.arduino15/packages/Rudiron/tools/bootloaders/default/MDR32F9Qx_default.hex",
                    "build/Sketch.hex",
                    "--english",
                    "--run",
                    "--speed",
                    "8"
                ]
            },
            "group": "none",
            "problemMatcher": [],
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared",
                "showReuseMessage": true,
                "clear": true
            }
        }
    ]
}"""],
    ["CMakeLists.txt",
            """# This file is part of Arduino_Core_Rudiron_MDR32F9Qx.

# Arduino_Core_Rudiron_MDR32F9Qx is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# Arduino_Core_Rudiron_MDR32F9Qx is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with Arduino_Core_Rudiron_MDR32F9Qx. If not, see <https://www.gnu.org/licenses/>.

# Author: Daniil Ignatev


cmake_minimum_required(VERSION 3.15.3)
set(CMAKE_VERBOSE_MAKEFILE OFF)


set(platform "MDR32F9Qx")# Аппаратная платформа
set(board_name "Rudiron_Buterbrod_R9_20MHz")# Модель платы
set(f_cpu "80000000")# Максимальная частота процессора


# Определение пути до Arduino15
if(WIN32)
    set(ARDUINO15_DIR "$ENV{USERPROFILE}/AppData/Local/Arduino15")
elseif(APPLE)
    set(ARDUINO15_DIR "$ENV{HOME}/Library/Arduino15")
else()
    set(ARDUINO15_DIR "$ENV{HOME}/.arduino15")
endif()
string(REPLACE "\\" "/" ARDUINO15_DIR ${ARDUINO15_DIR})
message(STATUS "Arduino15 directory: ${ARDUINO15_DIR}")


# Генератор проекта
set(CMAKE_GENERATOR "Ninja")
set(CMAKE_MAKE_PROGRAM "${ARDUINO15_DIR}/packages/Rudiron/tools/ninja/default/ninja" CACHE FILEPATH "Path to Ninja executable")
#set (CMAKE_GENERATOR "Unix Makefiles" CACHE INTERNAL "" FORCE)
message("Generator is set to ${CMAKE_GENERATOR}, located in ${CMAKE_MAKE_PROGRAM}")

# Определение пути до последней версии ARDUIRON_CORE_RUDIRON_MDR32F9Qx
set(VERSIONS_DIR "${ARDUINO15_DIR}/packages/Rudiron/hardware/MDR32F9Qx")
file(GLOB VERSIONS RELATIVE ${VERSIONS_DIR} "${VERSIONS_DIR}/*")

foreach(version ${VERSIONS})
    if(NOT IS_DIRECTORY "${VERSIONS_DIR}/${version}")
        list(REMOVE_ITEM VERSIONS ${version})
    elseif(NOT version MATCHES "^[0-9]+\\.[0-9]+\\.[0-9]+$")
        list(REMOVE_ITEM VERSIONS ${version})
    endif()
endforeach()

list(SORT VERSIONS)
list(GET VERSIONS -1 LATEST_VERSION)
message("Latest version directory: ${LATEST_VERSION}")

set(ARDUIRON_CORE_RUDIRON_MDR32F9Qx "${VERSIONS_DIR}/${LATEST_VERSION}")
if(ARDUIRON_CORE_RUDIRON_MDR32F9Qx STREQUAL "")
    message("Arduino_Core_Rudiron_MDR32F9Qx NOT FOUND. SPECIFY THE FULL PATH!")
    #при необходимости укажите полный путь к Arduino_Core_Rudiron_MDR32F9Qx
    set(ARDUIRON_CORE_RUDIRON_MDR32F9Qx "/../Arduino_Core_Rudiron_MDR32F9Qx")
endif ()

string(REPLACE "\\" "/" ARDUIRON_CORE_RUDIRON_MDR32F9Qx "${ARDUIRON_CORE_RUDIRON_MDR32F9Qx}")
message(STATUS "ARDUIRON_CORE_RUDIRON_MDR32F9Qx PATH = ${ARDUIRON_CORE_RUDIRON_MDR32F9Qx}")


# Компилятор
set(CMAKE_TOOLCHAIN_FILE "${ARDUIRON_CORE_RUDIRON_MDR32F9Qx}/arm-none-eabi-gcc.cmake")
set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_C_EXTENSIONS OFF)
enable_language(C ASM)


# Название проекта
project(Sketch)
set(OUTPUT_NAME "${PROJECT_NAME}.elf")

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE "Release" CACHE STRING "Choose Release or Debug" FORCE)
else()
    message("Build type = ${CMAKE_BUILD_TYPE}")
endif()


# Стандартные пути core
set(core_path "${ARDUIRON_CORE_RUDIRON_MDR32F9Qx}/cores/arduino")
set(core_path_rudiron "${core_path}/rudiron")
set(core_path_system "${core_path}/system")
set(core_path_system_CMSIS_Source "${core_path_system}/CMSIS/Source")
set(core_path_system_CMSIS_Include "${core_path_system}/CMSIS/Include")
set(core_path_system_StdPeriph_Driver_src "${core_path_system}/StdPeriph_Driver/src")
set(core_path_system_StdPeriph_Driver_inc "${core_path_system}/StdPeriph_Driver/inc")
set(core_path_system_StdPeriph_Driver_src_USB_Library "${core_path_system_StdPeriph_Driver_src}/USB_Library")
set(core_path_system_StdPeriph_Driver_inc_USB_Library "${core_path_system_StdPeriph_Driver_inc}/USB_Library")


# Перечень исходных файлов core
file(GLOB_RECURSE core_sources
        ${core_path}/*
        ${core_path_rudiron}/*
        ${core_path_system}/*
        ${core_path_system_CMSIS_Source}/*
        ${core_path_system_StdPeriph_Driver_src}/*
        ${core_path_system_StdPeriph_Driver_src_USB_Library}/*
)

# Перечень путей к файлам заголовков core
set(core_includes
        ${core_path}
        ${core_path_rudiron}
        ${core_path_system}
        ${core_path_system_CMSIS_Include}
        ${core_path_system_StdPeriph_Driver_inc}
        ${core_path_system_StdPeriph_Driver_inc_USB_Library}
)

# Стандартные пути variant
set(variant_path "${ARDUIRON_CORE_RUDIRON_MDR32F9Qx}/variants/${board_name}")

# Перечень исходных файлов variant
file(GLOB_RECURSE variant_sources
        ${variant_path}/*
)

# Перечень путей к файлам заголовков variant
set(variant_includes
        ${variant_path}
)


# Путь до скрипта линковщика
set(LINKER_FILE "${core_path_system}/linker_scripts/${platform}.ld")

# Путь до корневой папки библиотек
set(libraries_path "${ARDUIRON_CORE_RUDIRON_MDR32F9Qx}/libraries")


# Подключение запрошенных библиотек
file(STRINGS libraries.txt library_names)
set(libraries_includes "")
set(libraries_sources "")

foreach(lib_name ${library_names})
        set(modified_path "${libraries_path}/${lib_name}")
        list(APPEND libraries_includes ${modified_path})

        file(GLOB_RECURSE lib_sources
                ${modified_path}/*.c
                ${modified_path}/*.cpp
        )
        list(APPEND libraries_sources ${lib_sources})
endforeach()


# Поиск исходных файлов в корневом каталоге
file(GLOB SKETCH_SOURCES
        *.c
        *.cpp
        )

# Поиск исходных файлов в подкаталоге
set(subfolder_path "subfolder")
file(GLOB SKETCH_SUBFOLDER_SOURCES
        subfolder/*.c
        subfolder/*.cpp
)


# Перечень путей к файлам исходного кода
add_executable(${OUTPUT_NAME}
        ${SKETCH_SOURCES}
        ${SKETCH_SUBFOLDER_SOURCES}

        ${core_sources}
        ${variant_sources}

        # Добавьте пути поиска исходных файлов здесь
        ${libraries_sources}
)


# Перечень путей к файлам заголовков
include_directories(
        ${subfolder_path}

        ${core_includes}
        ${variant_includes}

        # Добавьте пути поиска заголовков здесь
        ${libraries_includes}
)


# Флаги компиляции
target_compile_definitions(${OUTPUT_NAME} PUBLIC
        # USB_IRQ -- включает обработчик прерывания USB
        # HCLK_DISABLE -- работа от внутреннего кварцевого резонатора
        PROGMEM=
        )

# Параметры компиляции
target_compile_options(${OUTPUT_NAME} PRIVATE
        "-c"
        "-mcpu=cortex-m3"
        "-mthumb"
        "-gdwarf-2"# generate debugging information in the DWARF 2 format.
        "-MD"# automatically generate a list of dependencies
        "-MMD"# behaves similarly to -MD but does not list system headers as dependencies
        "-MP"# to generate "phantom" targets for all the prerequisites in the dependency file
        # "-MF"
        # "-Wall"
        "-mapcs-frame"# the compiler generates stack frames in a manner consistent with the ARM Procedure Call Standard
        "-mthumb-interwork"# can safely call ARM state functions from Thumb state and vice versa
        "-fdata-sections"# the compiler will place each data item into its own individual section in the output
        "-ffunction-sections"# the compiler places each function into its own individual section in the output
        "-D__STARTUP_CLEAR_BSS"# clear bss bytes
        "-D_start=main"# entry point
        "-pipe"# GCC uses pipes instead of temporary files to communicate between the various stages of the compilation
        "-fno-exceptions"# to disable exception handling in C++ programs
        # "-fno-threadsafe-statics"# tells the compiler not to generate the extra code required to ensure that the local static variable initialization is thread-safe
        "-DUSE_${platform}"# arduino platform name
        "-DF_CPU=${f_cpu}"# arduino cpu max frequency
        "-DARDUINO=10607"# arduino version
        "-DARDUINO_${board_name}"# arduino board name
        "-DARDUINO_ARCH_${platform}"# arduino arch name
        )

# Уровни оптимизации
if(${CMAKE_BUILD_TYPE} MATCHES "Debug")
    target_compile_options(${OUTPUT_NAME} PRIVATE
            "-Og"
            "-g"
            )
else()
    target_compile_options(${OUTPUT_NAME} PRIVATE
            "-O2"
            )
endif()

# Параметры компоновки
target_link_options(${OUTPUT_NAME} PRIVATE
        "-mcpu=cortex-m3"
        "-T${LINKER_FILE}"
        "-lc"# link against libc.a or libc.so
        "-lstdc++"# link against libstdc++.a or libstdc++.so
        "-lm"# link against libm.a or libm.so
        "-lgcc"# link againgst libgcc.a or libgcc.so
        "--specs=nano.specs"# to request the use of the "nano" version of the C library (libc)
        "-Wl,--print-memory-usage"
        # "-Wl,--cref"
        "-Wl,--check-sections"
        "-Wl,--gc-sections"
        "-Wl,--unresolved-symbols=report-all"
        "-Wl,--warn-common"
        # "-Wl,--warn-section-align"
        "-ffreestanding"
)

# Постобработка прошивки
add_custom_command(TARGET ${OUTPUT_NAME}
        POST_BUILD
        COMMAND ${CMAKE_OBJCOPY} -O srec --srec-len=64 ${OUTPUT_NAME} ${PROJECT_NAME}.s19
        COMMAND ${CMAKE_OBJCOPY} -O ihex ${OUTPUT_NAME} ${PROJECT_NAME}.hex
        COMMAND ${CMAKE_OBJCOPY} -O binary ${OUTPUT_NAME} ${PROJECT_NAME}.bin)

# Вывод информации о размере памяти для продвинутых пользователей
add_custom_command(TARGET ${OUTPUT_NAME}
POST_BUILD
COMMAND ${CMAKE_SIZE_UTIL} ${OUTPUT_NAME})
"""],
    ["libraries.txt",
            """"""],
]


def new_dir(dir_path: str) -> bool:
    try:
        os.mkdir(dir_path)
        return True
    except FileExistsError:
        print("Dir: " + dir_path + " already exists")
        return False


def create_proj(dir_path):
    if new_dir(dir_path):
        os.mkdir(dir_path + "/.vscode")
        os.mkdir(dir_path + "/build")

        for file_data in files:
            with open(dir_path + "/" + file_data[0], "w") as file:
                file.write(file_data[1])

        with open(dir_path + "/" + dir_path.split("/")[-1] + ".cpp", "w") as file:
            file.write("""#include \"Arduino.h\"

void setup() {
}

void loop() {
}""")


create_proj("./bro_tosta")