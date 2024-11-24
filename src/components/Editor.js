import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateProject,
    addProject,
    setActiveProject,
    removeProject,
} from "../state/projectsSlice";
import styles from "components/Editor.module.scss";

import new_project from "../assets/images/new_project.svg";
import open_project from "../assets/images/open_project.svg";
import helper from "../assets/images/helper.svg";
import save from "../assets/images/save_project.svg";
import run from "../assets/images/run_project.svg";

import Titlebar from "components/titlebar/Titlebar";
import Workspace from "./workspace/Workspace";

const { ipcRenderer } = window.require("electron");
const path = window.require("path");

const Editor = ({ history }) => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);
    const activeProjectId = useSelector(
        (state) => state.projects.activeProjectId
    );
    const activeProject = projects.find(
        (project) => project.id === activeProjectId
    );

    const handleSaveChanges = () => {
        const updatedContent = { ...activeProject, name: "Updated Project" }; // Пример изменения
        dispatch(
            updateProject({ id: activeProjectId, changes: updatedContent })
        );
        handleSaveToFile();
    };

    const handleSaveToFile = () => {
        const { ipcRenderer } = window.require("electron");
        ipcRenderer.invoke("save-file-dialog", JSON.stringify(activeProject));
    };

    const handleSetActiveProject = (projectId) => {
        dispatch(setActiveProject(projectId));
    };

    const handleRemoveProject = (projectId) => {
        dispatch(removeProject(projectId));
        if (activeProjectId === projectId) {
            if (projects.length === 0) {
                dispatch(setActiveProject(null)); // Сбрасываем активный проект
                history.push("/");
            } else {
                dispatch(setActiveProject(projects[0].id));
            }
        }
    };

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

            if (
                !projects.find((pr) => pr.createdAt === projectData.createdAt)
            ) {
                dispatch(addProject(projectWithId));
                dispatch(setActiveProject(projectId));
            } else {
                dispatch(
                    setActiveProject(
                        projects.find(
                            (pr) => pr.createdAt === projectData.createdAt
                        )?.id
                    )
                );
            }
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
        } else {
            console.error("Ошибка создания файла:", result.error);
        }
    };

    return (
        <>
            <Titlebar />

            <div className={styles.editor}>
                <header className={styles.editorHeader}>
                    <div className={styles.editorHeaderGroup}>
                        <div className={styles.editorHeaderItem_ImageContainer}>
                            <img
                                src={save}
                                className={styles.editorHeaderItem_Image}
                                title="Сохранить проект"
                                onClick={() => handleSaveChanges()}
                            />
                        </div>
                        <div className={styles.editorHeaderItem_ImageContainer}>
                            <img
                                src={run}
                                className={styles.editorHeaderItem_Image}
                                title="Запустить проект"
                            />
                        </div>
                    </div>
                    <div className={styles.editorHeaderGroup}>
                        <div className={styles.editorHeaderItem_ImageContainer}>
                            <img
                                src={new_project}
                                className={styles.editorHeaderItem_Image}
                                title="Создать проект"
                                onClick={() => handleCreateNewProject()}
                            />
                        </div>
                        <div className={styles.editorHeaderItem_ImageContainer}>
                            <img
                                src={open_project}
                                className={styles.editorHeaderItem_Image}
                                title="Открыть проект"
                                onClick={() => handleOpenProject()}
                            />
                        </div>
                        <div className={styles.editorHeaderItem_ImageContainer}>
                            <img
                                src={helper}
                                className={styles.editorHeaderItem_Image}
                                title="Список команд"
                            />
                        </div>
                    </div>
                </header>
                <div className={styles.openedProjects}>
                    {projects.map((element) => (
                        <div
                            className={`${styles.openedProjectsItem} ${
                                activeProject === element.id
                                    ? styles.active
                                    : ""
                            }`}
                            key={element.id}
                        >
                            <span
                                className={styles.fileName}
                                onClick={() =>
                                    handleSetActiveProject(element.id)
                                }
                            >
                                {element.fileName}
                            </span>
                            <span
                                className={styles.closeButton}
                                onClick={() => handleRemoveProject(element.id)}
                            >
                                ×
                            </span>
                        </div>
                    ))}
                </div>
                <main className={styles.editorMain}>
                    {activeProject ? (
                        <div>
                            <Workspace />
                            {/*<pre>{JSON.stringify(activeProject, null, 2)}</pre>*/}
                        </div>
                    ) : (
                        <h2
                            style={{
                                color: "white",
                                textAlign: "center",
                                marginTop: "80px",
                            }}
                        >
                            Нет отрытого проекта
                        </h2>
                    )}
                </main>
            </div>
        </>
    );
};

export default Editor;
