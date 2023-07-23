interface Response<T> {
    code: number;
    data: T;
    msg: string;
}

export { Response };