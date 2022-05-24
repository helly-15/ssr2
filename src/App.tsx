import * as React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Chart from "./Chart/Chart";

export default function App(props:any) {
    return (
        <div>
            <Routes>
                <Route path='/:yearId' element={<Chart componentData = {props.context}/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/2020" replace />}
                    />
            </Routes>
        </div>
    );
}