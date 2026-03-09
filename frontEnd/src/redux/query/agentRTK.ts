import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AgentField, PagedAgentField } from '@src/dataStruct/agent';
import {
    CreateAgentBodyField,
    AgentAddAccountBodyField,
    AgentDelAccountBodyField,
    GetAgentsBodyField,
} from '@src/dataStruct/agent/body';
import { AGENT_API } from '@src/const/api/agent';
import { MyResponse } from '@src/dataStruct/response';

export const agentRTK = createApi({
    reducerPath: 'agentRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
    tagTypes: ['Agents'],
    endpoints: (builder) => ({
        getAgents: builder.query<MyResponse<PagedAgentField>, GetAgentsBodyField>({
            query: (body) => ({
                url: AGENT_API.GET_AGENTS,
                method: 'POST',
                body,
            }),
            providesTags: ['Agents'],
        }),
        createAgent: builder.mutation<MyResponse<AgentField>, CreateAgentBodyField>({
            query: (body) => ({
                url: AGENT_API.CREATE_AGENT,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Agents'],
        }),
        agentAddAccount: builder.mutation<MyResponse<AgentField>, AgentAddAccountBodyField>({
            query: (body) => ({
                url: AGENT_API.AGENT_ADD_ACCOUNT,
                method: 'PATCH',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
                // Lấy tất cả query getOrders đang cache
                const patchResults: any[] = [];

                const state = getState() as any;

                const queries = agentRTK.util.selectInvalidatedBy(state, [{ type: 'Agents' }]);

                for (const query of queries) {
                    if (query.endpointName !== 'getAgents') continue;

                    const patchResult = dispatch(
                        agentRTK.util.updateQueryData('getAgents', query.originalArgs, (draft) => {
                            if (!draft.data?.items) return;

                            const agent = draft.data.items.find((a) => a.id === arg.id);

                            if (agent) {
                                Object.assign(agent, arg);
                            }
                        })
                    );

                    patchResults.push(patchResult);
                }

                try {
                    await queryFulfilled;
                } catch {
                    patchResults.forEach((p) => p.undo());
                }
            },
        }),
        agentDelAccount: builder.mutation<MyResponse<AgentField>, AgentDelAccountBodyField>({
            query: (body) => ({
                url: AGENT_API.AGENT_DEL_ACCOUNT,
                method: 'PATCH',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
                // Lấy tất cả query getOrders đang cache
                const patchResults: any[] = [];

                const state = getState() as any;

                const queries = agentRTK.util.selectInvalidatedBy(state, [{ type: 'Agents' }]);

                for (const query of queries) {
                    if (query.endpointName !== 'getAgents') continue;

                    const patchResult = dispatch(
                        agentRTK.util.updateQueryData('getAgents', query.originalArgs, (draft) => {
                            if (!draft.data?.items) return;

                            const agent = draft.data.items.find((a) => a.id === arg.id);

                            if (agent) {
                                Object.assign(agent, arg);
                            }
                        })
                    );

                    patchResults.push(patchResult);
                }

                try {
                    await queryFulfilled;
                } catch {
                    patchResults.forEach((p) => p.undo());
                }
            },
        }),
    }),
});

export const { useLazyGetAgentsQuery, useCreateAgentMutation, useAgentAddAccountMutation, useAgentDelAccountMutation } =
    agentRTK;
