// 创建一个储存聊天记录的IndexedDB数据库
import { openDB, DBSchema } from 'idb';

const dbPromise = openDB<MyDB>('chat-db', 1, {
    upgrade(db) {
        // 创建一个对象仓库
        // 判断是否存在，不存在就创建
        if (!db.objectStoreNames.contains('users')) {
            // 创建一个对象仓库
            // keyPath:主键
            // autoIncrement:是否自增
            // 创建组合键
            db.createObjectStore('users', { keyPath: 'id' });
        }

        // 每个用户都有一个单独的对象仓库，用来存储该用户的聊天记录
        if (!db.objectStoreNames.contains('userMessages')) {
            // 创建一个对象仓库
            // keyPath:主键
            // autoIncrement:是否自增
            db.createObjectStore('userMessages', { keyPath: ['userId', 'friendId', 'time'] });
            // 创建一个索引，用来根据用户名称查询聊天记录
            // chatStore.createIndex('byTime', 'time');
        }
    }
});

// 定义一个接口，用来约束聊天记录的数据类型
export interface Chat {
    userId: string;
    friendId: string;
    message: string;
    time: number;
    type: number;
}

// 定义一个接口，用来约束数据库的数据类型
interface MyDB extends DBSchema {
    'users': {
        key: string;
        value: {
            id: string;
            messageIds: number[];
        };
    };
    'userMessages': {
        key: [string, string, number];
        value: Chat;
        // indexes: { 'byTime': string; };
    };
}

// 封装一个方法，用来添加聊天记录
export async function addChatMessage(chat: Chat) {
    // 获取数据库对象
    const db = await dbPromise;
    // 创建一个事务
    const tx = db.transaction(['userMessages', 'users'], 'readwrite');
    // 获取消息对象仓库
    const msgStore = tx.objectStore('userMessages');
    // 获取用户对象仓库
    const usersStore = tx.objectStore('users');

    // 添加聊天记录
    console.log(chat);

    await msgStore.add(chat);

    // 获取聊天记录的id

    // 判断用户是否存在
    let user = await usersStore.get(`${chat.userId}-${chat.friendId}`);
    if (!user) {
        // 如果用户不存在，就添加用户
        const data = { id:`${chat.userId}-${chat.friendId}`, messageIds: [chat.time] }
        console.log(data);

        await usersStore.add(data);
        // 重新获取用户
        user = await usersStore.get(`${chat.userId}-${chat.friendId}`);
    }else {
        // 同时添加聊天id到用户的聊天id数组中
        user?.messageIds?.push(chat.time);
    }
    // 更新用户
    await usersStore.put(user!);
    // 提交事务
    await tx.done;
}


// 封装一个方法，用来获取聊天记录
export async function getChatMessages(userId: string, friendId: string) {
    // 获取数据库对象
    const db = await dbPromise;
    // 创建一个事务
    const tx = db.transaction(['userMessages', 'users'], 'readonly');
    // 获取消息对象仓库
    const msgStore = tx.objectStore('userMessages');
    // 获取用户对象仓库
    const usersStore = tx.objectStore('users');
    // 获取用户
    const user = await usersStore.get(`${userId}-${friendId}`);
    console.log(user);

    // 获取用户的聊天记录id数组
    const messageIds = user?.messageIds || [];
    // 获取聊天记录
    const messages = await Promise.all(messageIds.map(id => msgStore.get([
        userId, friendId, id
    ])));
    // 提交事务
    await tx.done;
    // 返回聊天记录
    return messages;
}

// 封装一个方法，用来删除聊天记录
export async function deleteChatMessage(userId: string, friendId: string, time: number) {
    // 获取数据库对象
    const db = await dbPromise;
    // 创建一个事务
    const tx = db.transaction(['userMessages'], 'readwrite');
    // 获取消息对象仓库
    const msgStore = tx.objectStore('userMessages');
    // 删除聊天记录
    await msgStore.delete([userId, friendId, time]);
    // 提交事务
    await tx.done;
}

// 使用游标查询最近的聊天记录
// 传入时间戳，返回该时间戳之前的10条聊天记录,不传入时间戳，返回最近的10条聊天记录
// 并返回10条聊天记录的最小时间戳
export async function getRecentChatMessages(userId: string, friendId: string, time?: number) {
    // 获取数据库对象
    const db = await dbPromise;
    // 创建一个事务
    const tx = db.transaction(['userMessages', 'users'], 'readonly');
    // 获取消息对象仓库
    const msgStore = tx.objectStore('userMessages');
    // 获取用户对象仓库
    const usersStore = tx.objectStore('users');
    // 获取用户
    const user = await usersStore.get(`${userId}-${friendId}`);
    // 判断用户是否存在
    if (!user) return [];
    // 获取用户的聊天记录id数组
    const messageIds = user?.messageIds;
    // 判断用户是否有聊天记录
    if (!messageIds || messageIds.length === 0) return [];

    // 降序
    messageIds.sort((a, b) => b - a);

    let messages: (Chat | undefined)[] = [];
    // 找到最近的10条聊天记录
    if (messageIds.length > 10) {
        // 获取时间最大的10条聊天记录
        messages = await Promise.all(messageIds.slice(0, 10).map(id => msgStore.get([userId, friendId, id])));
    } else {
        // 获取所有聊天记录        
        messages = await Promise.all(messageIds.map(id => msgStore.get([userId, friendId, id])));
    }
    // 提交事务
    await tx.done;
    // 返回聊天记录
    return messages;
}