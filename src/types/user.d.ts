
interface UserInfo {
    _id: string,
    userName: string,
    birthday?: string,
    city?: string,
    tel: string,
    email: string,
    avatar?: string,
    discription: string,
    age: number,
    sex: number,
}

interface ChatList {
    userId: string,
    friendId: UserInfo,
    lastMessage: string,
    lastTime: string,
    messageNum: number,
    messageType: number,
    isTop?: Boolean,
    setTopTime?: string,
}

interface AddMessage {
    message: string;
    time: number;
    type: number;
}

interface Friend {
    userId: string;
    friendId: UserInfo;
    friendGroup: number;
    friendType: number;
    friendTime: Date;
    addMessage: AddMessage[];
    isView: boolean;
}

interface FriendGroup {
    name: string;
    index: number;
}

export { UserInfo, ChatList, Friend, FriendGroup };