import type { TTag } from '~/types/tag';

export type TCard = {
    id: number,
    title: string;
    created_at: string;
    tags: TTag[];
    img: string;
}
