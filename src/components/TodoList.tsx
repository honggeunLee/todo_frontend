import React, { useEffect, useState } from 'react';
import { List, Button, Space, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TodoDto } from "../types/todo.ts";
import { archiveTodo, deleteTodo, getTodos, markTodoAsCompleted } from "../apis/todoApi.ts";
import { getAllTags } from "../apis/tagApi.ts";
import TodoItem from "./TodoItem.tsx";
import CreateTag from "./CreateTag.tsx";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoDto[]>([]);
    const [tags, setTags] = useState<any[]>([]); // 태그 목록
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showArchived, setShowArchived] = useState<boolean>(false);
    const [isTagModalVisible, setIsTagModalVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const todosData = await getTodos();
                setTodos(todosData);
                const tagsData = await getAllTags();
                setTags(tagsData);
            } catch (error) {
                message.error('데이터를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleTagCreated = () => {
        getAllTags().then((tagsData) => setTags(tagsData));
    };

    const handleCreateTagClick = () => {
        setIsTagModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleComplete = async (id: number) => {
        await markTodoAsCompleted(id);
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: true } : todo)));
    };

    const handleArchive = async (id: number) => {
        await archiveTodo(id);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleClickTodo = (id: number) => {
        navigate(`/todo/${id}`);
    };

    // 태그 선택 처리
    const handleTagSelect = (value: string[]) => {
        setSelectedTags(value);
    };

    // 선택된 태그 기반으로 Todo 필터링
    const filteredTodos = todos.filter(todo =>
        selectedTags.every(tag => todo.todoTags.some(todoTag => todoTag.tagName === tag))
    );

    // 아카이브 상태에 따라 Todo 필터링
    const todosToShow = showArchived
        ? filteredTodos.filter(todo => todo.archived)  // 아카이브된 Todo만
        : filteredTodos.filter(todo => !todo.archived);  // 아카이브되지 않은 Todo만

    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" onClick={() => window.location.href = '/create'}>새 Todo 생성</Button>
                <Button
                    type="default"
                    onClick={() => setShowArchived(!showArchived)}
                >
                    {showArchived ? '아카이브 Todo 숨기기' : '아카이브 Todo 보기'}
                </Button>

                <Button
                    type="default"
                    onClick={handleCreateTagClick}
                >
                    태그 생성
                </Button>

                <Select
                    showSearch
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="태그를 검색하세요"
                    value={selectedTags}
                    onChange={handleTagSelect}
                    filterOption={(input, option) =>
                        String(option?.children).toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {tags.map((tag) => (
                        <Select.Option key={tag.id} value={tag.name}>
                            {tag.name}
                        </Select.Option>
                    ))}
                </Select>

                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={todosToShow}
                    renderItem={todo => (
                        <TodoItem
                            todo={todo}
                            onDelete={handleDelete}
                            onComplete={handleComplete}
                            onArchive={handleArchive}
                            onClick={() => handleClickTodo(todo.id)}
                        />
                    )}
                />
            </Space>

            <CreateTag
                visible={isTagModalVisible}
                onClose={() => setIsTagModalVisible(false)}
                onTagCreated={handleTagCreated}
            />
        </div>
    );
};

export default TodoList;
