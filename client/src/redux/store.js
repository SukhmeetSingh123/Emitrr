import { configureStore } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk';
import { authReducer } from './Auth/auth';
import {progressReportReducer} from './progressReport/progressReport'
import {questionBankReducer} from './questionBox/questionBox'
const Store = configureStore({
    reducer: {
        auth:authReducer,
        progressReport:progressReportReducer,
        questionBox:questionBankReducer
    },
    // middleware: [thunk],
})


export default Store;