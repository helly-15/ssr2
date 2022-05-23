import * as React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Chart from "./Chart/Chart";

export default function App(props:any) {
    return (
        <div>

            {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
            <Routes>

                <Route path='/:yearId' element={<Chart componentData = {props.context}/>}/>
                {/*<Route path='/:yearId-:articleId' element={<Chart componentData = {props.context}/>}/>*/}
                    {/*<Route index element={<Home />} />*/}
                    {/*<Route path="about" element={<About />} />*/}
                    {/*<Route path="dashboard" element={<Dashboard />} />*/}

                    {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                    {/*<Route path="*" element={<NoMatch />} />*/}
                    <Route
                        path="*"
                        element={<Navigate to="/2020" replace />}
                    />
            </Routes>
        </div>
    );
}