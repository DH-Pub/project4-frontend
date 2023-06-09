import { authApi } from "./features/authApi";

export const milestoneApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMilestone: builder.query({
            query: () => "/milestone/getAll",
            providesTags: (result, error, milestone) => {
                const tags = [];
                tags.push({ type: "MilestoneDelete", id: "DelMil" });
                tags.push({ type: "MilestoneCreate", id: "CreateMil" });
                return tags;
            },
        }),
        findMilestoneByName: builder.query({
            query: (name) => `/milestone/${name}`,
        }),

        deleteProjects: builder.mutation({
            query: (id) => {
                return {
                    url: `/milestone/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: (result, error, id) => {
                return [{ type: "MilestoneDelete", id: "DelMil" }];
            },
        }),
        updateMilestone: builder.mutation({
            query: (body) => {
              return {
                url: `/milestone/${body.id}`,
                method: "PUT",
                body,
              };
            },
          }),
          createMilestone: builder.mutation({
            invalidatesTags: (result, error, milestone) => {
              return [{ type: "MilestoneCreate", id: "CreateMil" }];
            },
            query: (body) => {
              return {
                url: `/milestone/create`,
                method: "POST",
                body,
                params: { projectId: body.projectId },
              };
            },
          }),
    })
})