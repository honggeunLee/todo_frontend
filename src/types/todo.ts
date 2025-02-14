export interface TodoDto {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    archived: boolean;
    createdAt: string;
    todoTags: TodoTagDto[];
}

export interface TodoTagDto {
    id: number;
    tagId: number;
    todoId: number;
    tagName: string;
}

export interface TodoCreateRequestDto {
    title: string;
    description: string;
    tagIds: number[];
}
