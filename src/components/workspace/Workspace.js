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

const { ipcRenderer } = window.require("electron");
const path = window.require("path");

const Workspace = () => {
    return <></>;
};

export default Workspace;
