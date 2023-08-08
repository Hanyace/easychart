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
            db.createObjectStore('users', { keyPath: 'id' });
        }

        // 每个用户都有一个单独的对象仓库，用来存储该用户的聊天记录
        if (!db.objectStoreNames.contains('userMessages')) {
            // 创建一个对象仓库
            // keyPath:主键
            // autoIncrement:是否自增
            const chatStore = db.createObjectStore('userMessages', { keyPath: 'time'});
            // 创建一个索引，用来根据用户名称查询聊天记录
            chatStore.createIndex('by_user', 'userId');
        }
    }
});

// 定义一个接口，用来约束聊天记录的数据类型
interface Chat {
    id?: number;
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
            id?: string;
            messageIds?: number[];
        };
    };
    'userMessages': {
        key: number;
        value: Chat;
        indexes: { 'by_user': string; };
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
    await msgStore.add(chat);
    // 获取聊天记录的id

    // 判断用户是否存在
    let user = await usersStore.get(chat.userId);
    if (!user) {
        // 如果用户不存在，就添加用户
        await usersStore.add({ id: chat.userId, messageIds: [] });
        // 重新获取用户
        user = await usersStore.get(chat.userId);
    }
    // 同时添加聊天id到用户的聊天id数组中
    user?.messageIds?.push(chat.time);
    // 更新用户
    await usersStore.put(user!);
    // 提交事务
    await tx.done;
}


// 封装一个方法，用来获取聊天记录
export async function getChatMessages(userId: string) {
    // 获取数据库对象
    const db = await dbPromise;
    // 创建一个事务
    const tx = db.transaction(['userMessages', 'users'], 'readonly');
    // 获取消息对象仓库
    const msgStore = tx.objectStore('userMessages');
    // 获取用户对象仓库
    const usersStore = tx.objectStore('users');
    // 获取用户
    const user = await usersStore.get(userId);
    console.log(user);
    
    // 获取用户的聊天记录id数组
    const messageIds = user?.messageIds || [];
    // 获取聊天记录
    const messages = await Promise.all(messageIds.map(id => msgStore.get(id)));
    // 提交事务
    await tx.done;
    // 返回聊天记录
    return messages;
}

// 封装一个方法，用来删除聊天记录
export async function deleteChatMessage(id: number) {
    // 获取数据库对象
    const db = await dbPromise;
    // 创建一个事务
    const tx = db.transaction(['userMessages'], 'readwrite');
    // 获取消息对象仓库
    const msgStore = tx.objectStore('userMessages');
    // 删除聊天记录
    await msgStore.delete(id);
    // 提交事务
    await tx.done;
}

// 使用游标查询最近的聊天记录
// 传入时间戳，返回该时间戳之前的10条聊天记录,不传入时间戳，返回最近的10条聊天记录
// 并返回10条聊天记录的最小时间戳
export async function getRecentChatMessages(userId: string, time?: number): Promise<{ messages: Chat[], minTime: number }> {
    // 获取数据库对象
    const db = await dbPromise;
    // 创建一个事务
    const tx = db.transaction(['userMessages'], 'readonly');
    // 获取消息对象仓库
    const msgStore = tx.objectStore('userMessages');
    // 获取游标
    const cursor = await msgStore.index('by_user').openCursor(IDBKeyRange.lowerBound(userId, true), 'prev');
    // 定义一个数组，用来存储聊天记录
    const messages: Chat[] = [];
    // 遍历游标
    console.log(cursor);
    while (cursor) {
        // 判断是否传入时间戳
        if (time) {
            // 如果传入时间戳，就判断当前游标的时间戳是否小于传入的时间戳
            if (cursor.value.time < time) {
                // 如果小于，就将当前游标的聊天记录添加到数组中
                messages.push(cursor.value);
            }
        } else {
            // 如果没有传入时间戳，就直接将当前游标的聊天记录添加到数组中
            messages.push(cursor.value);
        }
        // 判断数组的长度是否为10
        if (messages.length >= 10) {
            // 如果是，就跳出循环
            break;
        }
        // 获取下一个游标
        cursor.continue();
    }
    // 提交事务
    await tx.done;
    // 获取数组中最后一条聊天记录的时间戳
    const lastTime = messages[messages.length - 1]?.time;
    // 返回聊天记录和最后一条聊天记录的时间戳
    return { messages, minTime: lastTime || 0 };
}