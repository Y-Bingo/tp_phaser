export class SelectionData
{

    private _data: number[];

    cur: number;               // 当前比较的值
    curMin: number;            // 当前比较区间的最下索引
    orderIndex: number;        // 已经排好序的区间

    constructor ( num: number, MIN: number, MAX: number )
    {
        this.cur = -1;
        this.curMin = -1;
        this.orderIndex = num;
        this._data = [];
        for ( let i = 0; i < num; i++ ) {
            this._data.push( ( ( Math.random() * MAX ) >> 0 ) + MIN );
        }
    }

    getN (): number { return this._data.length };

    get ( index: number ): number { return this._data[ index ]; }

    set ( index: number, value: number ): void { this._data[ index ] = value; }

    swap ( lt: number, rt: number ): void
    {
        if ( lt > this._data.length || rt > this._data.length ) return;
        let temp = this._data[ lt ];
        this._data[ lt ] = this._data[ rt ];
        this._data[ rt ] = temp;
        temp = null;
    }

    setData ( orderIndex: number, cur: number, curMin: number ): void
    {
        this.cur = cur;
        this.curMin = curMin;
        this.orderIndex = orderIndex;
    }
}
