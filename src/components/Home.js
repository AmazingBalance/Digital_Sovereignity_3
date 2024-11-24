import React, { Fragment, useEffect } from "react";
import { get } from "utils/requests";

import Titlebar from "components/titlebar/Titlebar";

import logo from "../logo.svg";
import new_project from "../assets/images/new_project.svg";
import open_project from "../assets/images/open_project.svg";
import helper from "../assets/images/helper.svg";
import styles from "components/Home.module.scss";

import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProject, setActiveProject } from "../state/projectsSlice";

const { ipcRenderer } = window.require("electron");
const path = window.require("path");

function Home({ history }) {
    const dispatch = useDispatch();

    const handleOpenProject = async () => {
        let fileData = await ipcRenderer.invoke("open-file-dialog");
        console.log("Received fileData:", fileData); // Лог для проверки

        if (fileData && fileData.path && fileData.fileData) {
            const projectData = JSON.parse(fileData.fileData);

            const projectId = Date.now(); // Генерируем уникальный ID
            const fileName = path.basename(fileData.path); // Извлекаем название файла

            const projectWithId = {
                ...projectData,
                id: projectId,
                fileName: fileName,
                path: fileData.path,
            };

            dispatch(addProject(projectWithId));
            dispatch(setActiveProject(projectId));
            history.push("/editor"); // Навигация
        } else {
            console.error("Invalid fileData received:", fileData);
        }
    };

    const handleCreateNewProject = async () => {
        const defaultContent = {
            name: "Новый проект",
            createdAt: new Date().toISOString(),
            data: {},
        };

        const result = await ipcRenderer.invoke(
            "save-new-project",
            defaultContent
        );
        if (result.success) {
            const fileName = path.basename(result.path);
            const projectId = Date.now(); // Генерируем уникальный ID

            const newProject = {
                ...defaultContent,
                id: projectId,
                path: result.path,
                fileName: fileName,
            };

            dispatch(addProject(newProject));
            dispatch(setActiveProject(projectId));
            history.push("/editor"); // Навигация
        } else {
            console.error("Ошибка создания файла:", result.error);
        }
    };

    return (
        <Fragment>
            <Titlebar />

            <div className={styles.home}>
                <header className={styles["home-header"]}>
                    <img
                        src={logo}
                        className={styles["home-logo"]}
                        alt="logo"
                    />
                </header>
                <body className={styles.mainBody}>
                    <div
                        className={styles.mainMenuSetting}
                        onClick={() => handleCreateNewProject()}
                    >
                        <div className={styles.mainMenuSetting_ImageContainer}>
                            <img
                                src={new_project}
                                className={styles.mainMenuSetting_Image}
                                alt="Создать новый проект"
                            />
                        </div>
                        <p>Создать новый проект</p>
                    </div>
                    <div
                        className={styles.mainMenuSetting}
                        onClick={() => handleOpenProject()}
                    >
                        <div className={styles.mainMenuSetting_ImageContainer}>
                            <img
                                src={open_project}
                                className={styles.mainMenuSetting_Image}
                                alt="Открыть старый проект"
                            />
                        </div>
                        <p>Открыть старый проект</p>
                    </div>
                    <div className={styles.mainMenuSetting}>
                        <div className={styles.mainMenuSetting_ImageContainer}>
                            <img
                                src={helper}
                                className={styles.mainMenuSetting_Image}
                                alt="Список команд"
                            />
                        </div>
                        <p>Интерактивный список команд</p>
                    </div>
                </body>
            </div>
        </Fragment>
    );
}

export default Home;
