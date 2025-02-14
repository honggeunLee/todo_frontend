import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateTodo from './components/CreateTodo';
import TodoDetail from "./components/TodoDetail.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateTodo />} />
                <Route path="/todo/:id" element={<TodoDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
