import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTodoDetail, updateTodo } from "../apis/todoApi";
import { getAllTags } from "../apis/tagApi";
import { TodoDto } from "../types/todo";
import { TagDto } from "../types/tag";
import { Form, Input, Button, Select, message, Spin } from 'antd';
import {useTagStore} from "../stores/TagStore.ts";

const TodoDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [todo, setTodo] = useState<TodoDto | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const tags = useTagStore(state => state.tags);
    const setTags = useTagStore(state => state.setTags);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodoAndTags = async () => {
            if (id) {
                setLoading(true);
                try {
                    const todoData = await getTodoDetail(Number(id));
                    setTodo(todoData);

                    const tagsData = await getAllTags();
                    setTags(tagsData);
                } catch (error) {
                    message.error('Todo 또는 태그를 불러오는 데 실패했습니다.');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchTodoAndTags();
    }, [id, setTags]);

    const handleUpdate = async (values: any) => {
        if (todo) {
            setIsSubmitting(true);
            try {
                console.log('Sending updated data:', {
                    id: todo.id,
                    title: values.title,
                    description: values.description,
                    tagIds: values.tags,
                });

                await updateTodo(todo.id, values.title, values.description, values.tags);
                message.success('Todo가 수정되었습니다!');
                navigate('/');
            } catch (error) {
                message.error('Todo 수정에 실패했습니다.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (loading) return <Spin size="large" />;

    if (!todo) return <div>Todo를 찾을 수 없습니다.</div>;

    return (
        <div>
            <h1>Todo 수정</h1>
            <Form
                initialValues={{
                    title: todo.title,
                    description: todo.description,
                    tags: todo.todoTags.map(tag => tag.tagId),
                }}
                onFinish={handleUpdate}
            >
                <Form.Item
                    label="제목"
                    name="title"
                    rules={[{ required: true, message: '제목을 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="설명"
                    name="description"
                    rules={[{ required: true, message: '설명을 입력하세요!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="태그"
                    name="tags"
                    rules={[{ required: true, message: '태그를 선택하세요!' }]}
                >
                    <Select
                        mode="multiple"
                        options={tags.map((tag: TagDto) => ({
                            label: tag.name,
                            value: tag.id,
                        }))}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                    >
                        수정하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default TodoDetail;
