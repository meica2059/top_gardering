import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Panel from './views/Panel';
import PageNotFound from './views/PageNotFound';
import Chat from './views/Chat';

function Example() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Panel />} />
                <Route path='/panel' element={<Panel />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Example;

if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Example />
        </React.StrictMode>
    )
}
