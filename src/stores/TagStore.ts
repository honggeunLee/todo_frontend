import { TagDto } from '../types/tag';
import {create} from "zustand/react";

interface TagStore {
    tags: TagDto[];
    setTags: (tags: TagDto[]) => void;
}

export const useTagStore = create<TagStore>((set) => ({
    tags: [],
    setTags: (tags) => set({ tags }),
}));
