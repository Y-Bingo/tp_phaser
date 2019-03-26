export default class MazeData
{
    static ROAD: string = " ";  // 路标识
    static WALL: string = "#";  // 墙标识

    private _cols: number;      // 迷宫列数
    private _rows: number;      // 迷宫行数
    private _map: string[];     // 迷宫数据

    constructor ( maze: { map: string[], row: number, col: number } )
    {
        this._map = maze.map;
        this._rows = maze.row;
        this._cols = maze.col;
    }

    get COL (): number { return this._cols; }
    get ROW (): number { return this._rows; }
    getMap (): string[]
    {
        return this._map;
    }
    // 获取迷宫信息
    getMaze ( row: number, col: number ): string
    {
        if ( row >= this._rows || col >= this._cols )
            console.error( `获取【${ row }, ${ col }】失败！，迷宫<${ this._rows },${ this._cols }>范围` );
        return this._map[ row ][ col ];
    }
}
