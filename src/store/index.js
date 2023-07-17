import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/features/authApi";
import { authReducer } from "./apis/features/authSlice";
import { setCredentials, logOut } from "./apis/features/authSlice";
import {
	changeEmail,
	changeUsername,
	changePassword,
	changeBio,
	changePic,
	signupFormReducer,
} from "./slices/signupFormSlice";
import { setTeam, clearTeam, teamReducer } from "./slices/teamSlice";
import { setUser, userReducer } from "./slices/userSlice";
import {
	setProject,
	clearProject,
	projectReducer,
} from "./slices/projectSlice";

import { usersApi } from "./apis/usersApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
	currentMemberReducer,
	setCurrentMember,
	clearCurrentMember,
} from "./slices/currentMemberSlice";
import { taskApi } from "./apis/taskApi";
import { setTasks, setShowTaskDetails, taskReducer } from "./slices/taskSlice";
import { documentApi } from "./apis/documentApi";
import { documentReducer, setDocuments } from "./slices/documentSlice";
import { teamsApi } from "./apis/teamsApi";
import { projectApi } from "./apis/projectApi";

const store = configureStore({
	reducer: {
		// authorization
		[authApi.reducerPath]: authApi.reducer,
		auth: authReducer,

		// users
		[usersApi.reducerPath]: usersApi.reducer,
		signupForm: signupFormReducer,
		user: userReducer,

		// teams
		[teamsApi.reducerPath]: teamsApi.reducer,
		team: teamReducer,

		// projects
		[projectApi.reducerPath]: projectApi.reducer,
		project: projectReducer,

		// tasks
		[taskApi.reducerPath]: taskApi.reducer,
		tasks: taskReducer,
		currentMember: currentMemberReducer,

		// documents
		[documentApi.reducerPath]: documentApi.reducer,
		document: documentReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(usersApi.middleware)
			.concat(taskApi.middleware)
			.concat(documentApi.middleware);
	},
	devTools: true,
});

setupListeners(store.dispatch);

// to simplify import
export {
	store,
	setCredentials,
	logOut,

	// signupForm
	changeEmail,
	changeUsername,
	changePassword,
	changeBio,
	changePic,

	// user
	setUser,

	// team
	setTeam,
	clearTeam,

	// project
	setProject,
	clearProject,

	//task
	setTasks,
	setShowTaskDetails,

	//document
	setDocuments,

	//currentMember
	setCurrentMember,
	clearCurrentMember,
};

export { useLoginMutation } from "./apis/features/authLoginApi";
export {
	useSignUpMutation,
	useCreateAdminMutation,
	useGetAllUsersQuery,
	useGetUserQuery,
	useGetPersonalAccountQuery,
	useUpdateUserMutation,
	useDeleteImageMutation,
	useChangePasswordMutation,
	useChangeAdminRoleMutation,
	useDeleteUserMutation,
	useClearUserRefreshTokenMutation,
	useDeleteAllRefreshTokensMutation
} from "./apis/usersApi";
export {
	useGetAllUserTeamsQuery,
	useCreateTeamMutation,
	useGetTeamQuery,
	useGetCurrentMemberQuery,
	useGetAllMembersDetailsQuery,
	useChangeMemberRoleMutation,
	useRemoveMemberMutation,
	useAddMemberMutation,
	useDeleteTeamMutation,
	useUpdateTeamMutation,
	useGetAllTeamsQuery,
} from "./apis/teamsApi";
export {
	useGetTasksQuery,
	useCreateTaskMutation,
	useGetTasksByProjectQuery,
	useUpdateTaskMutation,
	useGetTaskByUserQuery,
} from "./apis/taskApi";

export {
	useCreateDocumentMutation,
	useGetDocumentsByProjectIdQuery,
} from "./apis/documentApi";
