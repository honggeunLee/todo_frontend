import React from 'react';
import { Button, List, message, Tag } from 'antd';
import { TodoDto } from "../types/todo.ts";
import { CheckCircleOutlined, DeleteOutlined, InboxOutlined } from '@ant-design/icons';

interface TodoItemProps {
    todo: TodoDto;
    onDelete: (id: number) => void;
    onComplete: (id: number) => void;
    onArchive: (id: number) => void;
    onClick: () => void;  // 클릭 시 Todo 상세 페이지로 이동
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onComplete, onArchive, onClick }) => {
    // 완료 처리
    const handleComplete = async () => {
        try {
            await onComplete(todo.id);
            message.success('Todo가 완료 처리되었습니다.');
        } catch (error) {
            message.error('완료 처리에 실패했습니다.');
        }
    };

    // 삭제 처리
    const handleDelete = async () => {
        try {
            await onDelete(todo.id);
            message.success('Todo가 삭제되었습니다.');
        } catch (error) {
            message.error('삭제 처리에 실패했습니다.');
        }
    };

    // 아카이브 처리
    const handleArchive = async () => {
        if (todo.archived) {
            return;
        }

        try {
            await onArchive(todo.id); // 아카이브 처리
            message.info('Todo가 아카이브 처리되었습니다.');
        } catch (error) {
            message.error('아카이브 처리에 실패했습니다.');
        }
    };

    // 태그 표시
    const renderTags = () => {
        return todo.todoTags.map((tag, index) => (
            <Tag key={index}>{tag.tagName}</Tag>
        ));
    };

    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={handleComplete}
                    disabled={todo.completed}
                >
                    완료
                </Button>,
                <Button
                    type="default"
                    icon={<InboxOutlined />}
                    onClick={handleArchive}
                    disabled={todo.archived}
                >
                    {todo.archived ? '아카이브 처리됨' : '아카이브'}
                </Button>,
                <Button
                    type="default"
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                    style={{ color: 'red', borderColor: 'red' }}
                >
                    삭제
                </Button>,
                <Button type="link" onClick={onClick}>
                    상세
                </Button>,
            ]}
        >
            <List.Item.Meta
                title={todo.title}
                description={todo.description}
            />
            <div style={{ marginTop: 8 }}>
                {renderTags()}
            </div>
        </List.Item>
    );
};

export default TodoItem;
