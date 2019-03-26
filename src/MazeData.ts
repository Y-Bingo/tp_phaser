type TMazeData = {
    map: string[],
    row: number,
    col: number,
    entryX: number,
    entryY: number,
    exitX: number,
    exitY: number
}

export default class MazeData
{
    static ROAD: string = " ";      // 路标识
    static WALL: string = "#";      // 墙标识

    private _cols: number;          // 迷宫列数
    private _rows: number;          // 迷宫行数
    private _map: string[];         // 迷宫数据

    private _entryX: number;        // 入口X坐标
    private _entryY: number;        // 入口Y坐标
    private _exitX: number;         // 出口X坐标
    private _exitY: number;         // 出口Y坐标
    private _visited: number[][];   // 行走路径记录
    private _path: number[][];      // 路径记录

    constructor ( maze: TMazeData )
    {
        this._map = maze.map;
        this._rows = maze.row;
        this._cols = maze.col;

        this._entryX = maze.entryX;
        this._entryY = maze.entryY;
        this._exitX = maze.exitX;
        this._exitY = maze.exitY;

        this._visited = [];
        this._path = [];
        for ( let row = 0; row < this._rows; row++ ) {
            this._visited[ row ] = [];
            this._path[ row ] = [];
            for ( let col = 0; col < this._cols; col++ ) {
                this._visited[ row ][ col ] = 0;
                this._path[ row ][ col ] = 0;
            }
        }
    }

    get COL (): number { return this._cols; }
    get ROW (): number { return this._rows; }
    get ENTRY_X (): number { return this._entryX; }
    get ENTRY_Y (): number { return this._entryY; }
    get EXIT_X (): number { return this._exitX; }
    get EXIT_Y (): number { return this._exitY; }
    getMap (): string[] { return this._map; }

    checkArea ( row: number, col: number ): boolean
    {
        if ( row >= this._rows || col >= this._cols || row < 0 || col < 0 ) {

            return false;
        }
        return true;
    }

    // 获取迷宫信息
    getMaze ( row: number, col: number ): string
    {
        if ( !this.checkArea( row, col ) ) {
            console.error( `获取【${ row }, ${ col }】失败！，迷宫<${ this._rows },${ this._cols }>范围` );
            return "";
        }
        return this._map[ row ][ col ];
    }

    // 是否经过某点
    isVisited ( row: number, col: number ): boolean { return !!( this._visited[ row ][ col ] ); }
    // 经过某点
    visite ( row: number, col: number ): void { this._visited[ row ][ col ] = 1; }

    // 获取路径信息
    getPath ( row: number, col: number ): number { return this._path[ row ][ col ]; }
    // 更改路径信息
    inPath ( row: number, col: number, isPath: boolean ): void { this._path[ row ][ col ] = isPath ? 1 : 0; }
}
