interface UserInfo {
    userId: String,
    userName: String,
    password: String,
    birthday?: String,
    city?: String,
    tel: String,
    email: String,
    avatar?: String,
    status: Number,
}

interface ChatList {
    userId: String,
    friendId: String,
    lastMessage: String,
    lastTime: String,
    messageNum: Number,
    messageType: Number,
    isTop?: Boolean,
    setTopTime?: String,
}

export { UserInfo, ChatList };