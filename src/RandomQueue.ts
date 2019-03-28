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
    randomEnqueue ( ele: E ): void
    {
        if ( Math.random() > 0.5 )
            this._queue.push( ele );
        else
            this._queue.unshift( ele );
    }

    // 随机出队操作
    randomDequeue (): E
    {
        if ( this._queue.length == 0 ) return null;
        if ( this._queue.length == 1 ) return this.dequeue();
        let temp = null;
        // 随机从队列的前面或者后面取出
        if ( Math.random() > 0.5 )
            temp = this._queue.pop();
        else
            temp = this._queue.shift();

        // let randomIndex = Math.floor( Math.random() * this._queue.length );
        // let ele = this._queue[ randomIndex ];
        // this._queue[ randomIndex ] = temp;
        // return this._queue.shift();
        return temp;
    }

    enqueue ( ele: E )
    {
        this._queue.push( ele );
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
