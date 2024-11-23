import React, { Fragment, useEffect } from "react";
import { get } from "utils/requests";

import { Counter } from "components/counter/Counter";
import Titlebar from "components/titlebar/Titlebar";

import logo from "logo.svg";
import new_project from "../assets/images/new_project.svg";
import open_project from "../assets/images/open_project.svg";
import styles from "components/App.module.scss";

function App() {
    useEffect(() => {
        /**
         * Example call to Flask
         * @see /src/utils/requests.js
         * @see /app.py
         */
        /*setTimeout(() => get(
      'example', // Route
      (response) => alert(response), // Response callback
      (error) => console.error(error) // Error callback
    ), 3000);*/
    }, []);

    return (
        <Fragment>
            <Titlebar />

            <div className={styles.app}>
                <header className={styles["app-header"]}>
                    <img src={logo} className={styles["app-logo"]} alt="logo" />
                </header>
                <body className={styles.mainBody}>
                    <div className={styles.mainMenuSetting}>
                        <div className={styles.mainMenuSetting_ImageContainer}>
                            <img
                                src={new_project}
                                className={styles.mainMenuSetting_Image}
                                alt="Создать новый проект"
                            />
                        </div>
                        <p>Создать новый проект</p>
                    </div>
                    <div className={styles.mainMenuSetting}>
                        <div className={styles.mainMenuSetting_ImageContainer}>
                            <img
                                src={open_project}
                                className={styles.mainMenuSetting_Image}
                                alt="Открыть новый проект"
                            />
                        </div>
                        <p>Открыть новый проект</p>
                    </div>
                    <div className={styles.mainMenuSetting}></div>
                </body>
            </div>
        </Fragment>
    );
}

export default App;
