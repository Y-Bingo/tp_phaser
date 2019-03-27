type TMazeData = {
    map: string[],
    row: number,
    col: number,
    entryX: number,
    entryY: number,
    exitX: number,
    exitY: number
}
export const ROAD: string = " ";      // 路标识
export const WALL: string = "#";      // 墙标识

/**
 * 迷宫地图，负责生成迷宫
 */
export default class MazeMap
{
    private _cols: number;          // 迷宫列数 默认5列
    private _rows: number;          // 迷宫行数 默认5行
    private _map: string[];         // 迷宫数据

    private _entryX: number;        // 入口X坐标
    private _entryY: number;        // 入口Y坐标
    private _exitX: number;         // 出口X坐标
    private _exitY: number;         // 出口Y坐标
    private _cells: number[][];     // 空房记录

    constructor ( row: number, col: number, [ entryX, entryY ]: number[], [ exitX, exitY ]: number[] )
    {
        this.ROW = row;
        this.COL = col;
        this._entryX = entryX ? entryX : 1;
        this._entryY = entryY ? entryY : 0;
        this._exitX = exitX ? exitX : this._rows - 2;
        this._exitY = exitY ? exitY : this._cols - 1;

        let rowArr = [];
        this._map = [];
        this._cells = [];
        for ( let row = 0; row < this._rows; row++ ) {
            rowArr = [];
            this._cells[ row ] = [];
            for ( let col = 0; col < this._cols; col++ ) {
                if ( row % 2 == 1 && col % 2 == 1 )
                    rowArr[ col ] = ROAD;
                else
                    rowArr[ col ] = WALL;
                this._cells[ row ][ col ] = 1;
            }
            this._map[ row ] = rowArr.join( "" );
        }

        this.openCell( this.ENTRY_X, this.ENTRY_Y );
        this.openCell( this.EXIT_X, this.EXIT_Y );
    }

    // 获取迷宫行数
    get ROW () { return this._rows; }
    set ROW ( value: number )
    {
        if ( value <= 0 || value % 2 != 1 )
            console.warn( `设置的【ROW:${ value }】值为非法值` );
        this._rows = Math.max( value, 5 );
    }
    // 获取迷宫列数
    get COL () { return this._cols; }
    set COL ( value: number )
    {
        if ( value <= 0 || value % 2 != 1 )
            console.warn( `设置的【COL:${ value }】值为非法值` );
        this._cols = Math.max( value, 5 );
    }

    // 获取出入口
    get ENTRY_X (): number { return this._entryX; }
    get ENTRY_Y (): number { return this._entryY; }
    get EXIT_X (): number { return this._exitX; }
    get EXIT_Y (): number { return this._exitY; }

    // 获取地图
    get MAP () { return this._map.join( "\n" ); }
    get CELL () { return this._cells; }
    // 获取迷宫信息
    getMaze ( row: number, col: number ): string
    {
        if ( !this.checkArea( row, col ) ) {
            console.error( `获取【${ row }, ${ col }】失败！，迷宫<${ this._rows },${ this._cols }>范围` );
            return "";
        }
        return this._map[ row ][ col ];
    }

    // 检查位置合法性
    checkArea ( row: number, col: number ): boolean
    {
        if ( row >= this._rows || col >= this._cols || row < 0 || col < 0 ) {
            return false;
        }
        return true;
    }

    // 链接两个控件
    linkCell ( [ row, col ]: number[], [ nextRow, nextCol ]: number[] ): void
    {
        if ( !this.checkArea( row, col ) || !this.checkArea( nextRow, nextCol ) ) return;
        let newRow = Math.floor( ( row + nextRow ) / 2 );
        let newCol = Math.floor( ( col + nextCol ) / 2 );
        this.openCell( nextRow, nextCol );
        this.openCell( newRow, newCol );
    }
    // 开房
    openCell ( row: number, col: number ): void
    {
        // 增加一间房间 0 表示房间
        this._cells[ row ][ col ] = 0;
        if ( this._map[ row ][ col ] === ROAD ) return;

        let rowArr = this._map[ row ].split( "" );
        rowArr[ col ] = " ";

        this._map[ row ] = rowArr.join( "" );
    }
    // 是否打开的
    isOpen ( row: number, col: number ): boolean { return !( this._cells[ row ][ col ] ) }
    // 两个空间之间是否链接
    isLink ( [ row, col ]: number[], [ nextRow, nextCol ]: number[] ): boolean
    {
        let newRow = Math.floor( ( row + nextRow ) / 2 );
        let newCol = Math.floor( ( col + nextCol ) / 2 );
        return !( this._cells[ newRow ][ newCol ] )
    }
}
