export class SelectionData
{

    private _data: number[];
    constructor ( num: number, MIN: number, MAX: number )
    {
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
        let temp = this._data[ lt ];
        this._data[ lt ] = this._data[ rt ];
        this._data[ rt ] = temp;
        temp = null;
    }
}
