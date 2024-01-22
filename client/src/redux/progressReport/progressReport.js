import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addReport = createAsyncThunk("progressReport/addReport", async ({}) => {
    try {
        const response = await fetch("http://localhost:5000/api/progressReport/addReport", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'auth-token':localStorage.getItem('authToken')
            },
            body: JSON.stringify({ }),
        });
        const data = await response.json();
        return data; 
    } catch (error) {
        throw error.message || 'Adding Report Failed failed.';
      }
});

export const fetchReport = createAsyncThunk("progressReport/fetchReport", async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/progressReport/fetchReport", {
        method: "GET",
        headers: {
          'auth-token': localStorage.getItem('authToken')
        },
      });
      const data = await response.json();
      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'Fetching reports failed.');
    }
  });
  

export const updateReport = createAsyncThunk("updateReport",async ({ _id, correctAnswers, wrongAnswers, selectedLanguage }, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:5000/api/progressReport/updateReport/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'auth-token': localStorage.getItem('authToken')
          },
          body: JSON.stringify({ correctAnswers, wrongAnswers, choosenLanguages:[selectedLanguage] }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message || 'Updating report failed.');
      }
    }
  );
  

const initialState = {
    correctAnswers: 0,
    wrongAnswers: 0,
    choosenLanguages: [],
    report:[],
    loading: false,
    error: null,
    addReportSuccess:true,

};

const progressReportSlice = createSlice({
    name: "progressReport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(addReport.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload.error){
                    state.addReportSuccess=false;
                    return;
                }else{
                    state.addReportSuccess=true;
                    // state.choosenLanguages.push(action.payload.choosenLanguages);
                }
            })
            
            .addCase(addReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReport.fulfilled, (state, action) => {
                state.loading = false;
                state.report=action.payload;
                state.correctAnswers = action.payload.correctAnswers;
                state.wrongAnswers = action.payload.wrongAnswers;
                state.choosenLanguages = action.payload.choosenLanguages;
            })
            .addCase(fetchReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateReport.fulfilled, (state, action) => {
                state.loading = false;
                // state.report.correctAnswers=action.payload;
                state.correctAnswers += action.payload.correctAnswers;
                state.wrongAnswers += action.payload.wrongAnswers;
                state.choosenLanguages = action.payload.choosenLanguages;
            })
            .addCase(updateReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const progressReportReducer =  progressReportSlice.reducer;