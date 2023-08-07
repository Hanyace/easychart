import type { UserInfo } from './user';

interface CellTemplateProps {
    message: string;
    time: string | number;
    badge: number;
    avatar?: string;
    friendId: UserInfo;
}

export {
    CellTemplateProps
}