import * as React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import ChartComponent from "./Chart/Chart";

export default function App(props: any) {
    return (
        <div>
            <Routes>
                <Route path='/company/:companyId' element={<ChartComponent componentData={props.context}/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/company/wildberries" replace/>}
                />
            </Routes>
        </div>
    );
}