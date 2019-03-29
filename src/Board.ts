
export interface IBoard
{
    STEP: number;           // 步数
    MAP: string[] | string;          // 地图（布局）
}

/**
 * 桌面局势
 */
export default class Board implements IBoard
{
    private _map: string[];
    private _step: number;

    private _row: number;
    private _col: number;

    private _preBoard: IBoard;

    constructor ( boardData: IBoard, preBoard: IBoard )
    {
        this._step = boardData.STEP;
        this._preBoard = preBoard;

        this._map = [];
        for ( let i = 0; i < boardData.MAP.length; i++ )
            this._map[ i ] = boardData.MAP[ i ];

        this._row = this._map.length;
        this._col = this._map[ 0 ].length;
    }

    get STEP () { return this._step; }
    get MAP () { return this._map; }
    get ROW () { return this._row; }
    get COL () { return this._col; }

    // 检查区域合法性
    checkArea ( row: number, col: number ): boolean
    {
        if ( row < 0 || row > this._row || col < 0 || col > this._col ) return false;
        return true;
    }

    // 获取地图信息
    getMap ( row: number, col: number ): string
    {
        if ( !this.checkArea( row, col ) ) return ".";
        return this._map[ row ][ col ];
    }



}
