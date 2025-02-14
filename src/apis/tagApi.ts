import api from './api';
import {TagCreateRequestDto, TagDto} from "../types/tag.ts";

// 모든 태그 조회
export const getAllTags = async (): Promise<TagDto[]> => {
    const response = await api.get('/api/tags');
    return response.data;
};

// 새로운 태그 생성
export const createTag = async (name: string): Promise<TagDto> => {
    const response = await api.post('/api/tags', { name } as TagCreateRequestDto);
    return response.data;
};
