import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSpecificQuestions = createAsyncThunk("questionBank/fetchSpecificQuestions", async ({ languageType }) => {
    try {
        const response = await fetch(`http://localhost:5000/api/questionBank/fetchSpecificQuestions/${languageType}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
});

const initialState = {
    loading: false,
    error: null,
    questions: [],
};

const questionBankSlice = createSlice({
    name: "questionBank",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecificQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSpecificQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchSpecificQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export const questionBankReducer = questionBankSlice.reducer;
