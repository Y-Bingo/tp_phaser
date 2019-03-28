/**
 * 随机队列
 */
export class RandomQueue<E> {

    private _queue: E[];

    constructor ()
    {
        this._queue = new Array<E>();
    }

    isEmpty (): boolean { return !( this._queue.length ) }

    // 入队操作
    enqueue ( ele: E ): void
    {
        this._queue.push( ele );
    }

    // 随机出队操作
    RandomDequeue (): E
    {
        if ( this._queue.length == 0 ) return null;
        if ( this._queue.length == 1 ) return this.dequeue();

        let randomIndex = Math.floor( Math.random() * this._queue.length );
        let ele = this._queue[ randomIndex ];
        // 把队列最后的元素置换到随机位置取出的元素
        this._queue[ randomIndex ] = this._queue.pop();
        // return this._queue.shift();
        return ele;
    }

    // 常规出队操作 = 出栈
    dequeue (): E
    {
        return this._queue.pop();
    }

    clear (): void
    {
        this._queue = [];
    }
}
