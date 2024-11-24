import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    activeProjectId: null,
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        addProject(state, action) {
            state.projects.push(action.payload);
        },
        setActiveProject(state, action) {
            state.activeProjectId = action.payload;
        },
        updateProject(state, action) {
            const { id, changes } = action.payload;
            const project = state.projects.find((p) => p.id === id);
            if (project) {
                Object.assign(project, changes);
            }
        },
        removeProject(state, action) {
            const projectId = action.payload;
            state.projects = state.projects.filter((p) => p.id !== projectId);

            // Если удаляем активный проект, сбрасываем activeProjectId
            if (state.activeProjectId === projectId) {
                state.activeProjectId = null;
            }
        },
    },
});

export const { addProject, setActiveProject, updateProject, removeProject } =
    projectsSlice.actions;
export default projectsSlice.reducer;
