import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import {getAllTags} from "../apis/tagApi.ts";
import {createTodo} from "../apis/todoApi.ts";
import {TagDto} from "../types/tag.ts";

const CreateTodo: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [tags, setTags] = useState<TagDto[]>([]);

    React.useEffect(() => {
        const fetchTags = async () => {
            const tagsData = await getAllTags();
            setTags(tagsData);
        };
        fetchTags();
    }, []);

    const handleSubmit = async () => {
        try {
            await createTodo(title, description, selectedTags);
            message.success('Todo가 생성되었습니다!');
            window.location.href = '/';
        } catch (error) {
            message.error('Todo 생성에 실패했습니다.');
        }
    };

    return (
        <div>
            <Form onFinish={handleSubmit}>
                <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력하세요!' }]}>
                    <Input value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item label="설명" name="description">
                    <Input.TextArea value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item label="태그" name="tags">
                    <Select
                        mode="multiple"
                        value={selectedTags}
                        onChange={setSelectedTags}
                        options={tags.map((tag: any) => ({ label: tag.name, value: tag.id }))}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">저장</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateTodo;
