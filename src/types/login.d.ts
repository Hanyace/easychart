interface Login {
    userName: string;
    password: string;
}

interface LoginResult {
    msg: string;
    code: number;
    data: Token;
}

type Token = {
    token: string;
} 

export { Login, LoginResult };