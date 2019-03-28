import { IMazeData, WALL } from "./MazeMap";

export default class MazeData
{
    private _cols: number;          // 迷宫列数
    private _rows: number;          // 迷宫行数
    private _map: string[];         // 迷宫数据

    private _entryX: number;        // 入口X坐标
    private _entryY: number;        // 入口Y坐标
    private _exitX: number;         // 出口X坐标
    private _exitY: number;         // 出口Y坐标
    private _visited: number[][];   // 行走路径记录

    private _paths: number[][];     // 求解记录

    get COL (): number { return this._cols; }
    get ROW (): number { return this._rows; }
    get ENTRY_X (): number { return this._entryX; }
    get ENTRY_Y (): number { return this._entryY; }
    get EXIT_X (): number { return this._exitX; }
    get EXIT_Y (): number { return this._exitY; }
    getMap (): string[] { return this._map; }
    setMap ( maze: IMazeData ): void
    {
        this._map = maze.MAP;
        this._rows = maze.ROW;
        this._cols = maze.COL;

        this._entryX = maze.ENTRY_X;
        this._entryY = maze.ENTRY_Y;
        this._exitX = maze.EXIT_X;
        this._exitY = maze.EXIT_Y;

        this._visited = [];
        this._paths = [];
        for ( let row = 0; row < this._rows; row++ ) {
            this._visited[ row ] = [];
            this._paths[ row ] = [];
            for ( let col = 0; col < this._cols; col++ ) {
                this._paths[ row ][ col ] = 0;
                this._visited[ row ][ col ] = 0;
            }
        }
    }

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
    // 是否为墙
    isWall ( row: number, col: number ): boolean { return this.getMaze( row, col ) == WALL; }

    // 记录路径
    addPath ( row: number, col: number ) { this._paths[ row ][ col ] = 1; }
    // 获取路径信息
    getPath ( row: number, col: number ): number { return this._paths[ row ][ col ]; }
}
