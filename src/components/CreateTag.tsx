import React, { useState } from 'react';
import { Button, Input, Modal, message } from 'antd';
import { createTag } from '../apis/tagApi.ts';

interface TagCreationProps {
    visible: boolean;
    onClose: () => void;
    onTagCreated: () => void;
}

const CreateTag: React.FC<TagCreationProps> = ({ visible, onClose, onTagCreated }) => {
    const [tagName, setTagName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleTagNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagName(e.target.value);
    };

    const handleCreateTag = async () => {
        if (!tagName) {
            message.error('태그 이름을 입력해주세요.');
            return;
        }

        setLoading(true);

        try {
            await createTag(tagName);
            message.success('태그가 생성되었습니다.');
            setTagName('');
            onTagCreated();
            onClose();
        } catch (error) {
            message.error('이미 존재하는 태그입니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="새 태그 생성"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    취소
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleCreateTag}
                >
                    태그 생성
                </Button>,
            ]}
        >
            <Input
                value={tagName}
                onChange={handleTagNameChange}
                placeholder="태그 이름을 입력하세요"
            />
        </Modal>
    );
};

export default CreateTag;
