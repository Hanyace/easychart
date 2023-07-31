interface UserInfo {
    userId: string,
    userName: string,
    password: string,
    birthday?: string,
    city?: string,
    tel: string,
    email: string,
    avatar?: string,
    status: number,
    discription: string,
    age: number,
    sex: number,
}

interface ChatList {
    userId: string,
    friendId: string,
    lastMessage: string,
    lastTime: string,
    messageNum: number,
    messageType: number,
    isTop?: Boolean,
    setTopTime?: string,
}

export { UserInfo, ChatList };