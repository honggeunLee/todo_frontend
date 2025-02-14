import React from 'react';
import TodoList from '../components/TodoList';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Todo 목록</h1>
            <TodoList />
        </div>
    );
};

export default Home;
