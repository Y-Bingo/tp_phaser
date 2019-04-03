
export interface IBoard
{
    STEP: number;           // 步数
    MAP: string[][] | string[];          // 地图（布局）
}

/**
 * 桌面局势
 */
export default class Board implements IBoard
{
    private _map: string[][];       // 地图数据
    private _stepCount: number;     // 剩余多少步

    private _row: number;           // 行数
    private _col: number;           // 列数

    private _rm: number[][];        // 消除标记
    private _step: number[][];        // 执行的操作
    private _resolve: number[][];   // 解题过程

    private _preBoard: Board;

    constructor ( boardData: IBoard, preBoard: Board )
    {
        this._preBoard = preBoard;
        this._stepCount = boardData.STEP;

        this._rm = [];
        this._map = [];
        this._step = [];
        this._resolve = [];
        for ( let row = 0; row < boardData.MAP.length; row++ ) {
            this._map[ row ] = [];
            this._rm[ row ] = [];
            for ( let col = 0; col < boardData.MAP[ row ].length; col++ ) {
                this._map[ row ][ col ] = boardData.MAP[ row ][ col ];
                this._rm[ row ][ col ] = 0;
            }
        }

        this._row = this._map.length;
        this._col = this._map[ 0 ].length;
    }

    get STEP () { return this._stepCount; }
    get MAP () { return this._map; }
    get ROW () { return this._row; }
    get COL () { return this._col; }

    // 检查区域合法性
    checkArea ( row: number, col: number ): boolean
    {
        if ( row < 0 || row >= this._row || col < 0 || col >= this._col ) return false;
        return true;
    }

    // 获取地图信息
    getMap ( row: number, col: number ): string
    {
        if ( !this.checkArea( row, col ) ) return ".";
        return this._map[ row ][ col ];
    }
    // 获取步骤
    getStep (): number[][] { return this._step; }

    // 是否有解
    isResolve (): boolean
    {
        return this._resolving( this, this._stepCount );
    }

    private _checkResolve ( board: Board ): boolean
    {
        for ( let row = 0; row < board.ROW; row++ ) {
            for ( let col = 0; col < board.COL; col++ ) {
                if ( board.getMap( row, col ) != "#" ) return false;
            }
        }
        // 有解
        let steps = [];
        let stepCount = 1;
        while ( board._preBoard ) {
            steps.unshift( board.getStep() );
            board = board._preBoard;
        }
        for ( let i = 0; i < steps.length; i++ ) {
            console.log( `step ${ i }: [${ steps[ i ][ 0 ].join( "," ) }] <=> [${ steps[ i ][ 1 ].join( "," ) }]` );
        }
        return true;
    }

    // 执行解题过程
    private _d: number[][] = [ [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ];     // 两个方向 右，下, 左
    private _resolving ( board: Board, step: number ): boolean
    {
        if ( board == null ) return false;;
        // 步骤为0则退出
        if ( step == 0 ) return this._checkResolve( board );
        // 在用完步骤之前，得到解,也退出
        if ( this._checkResolve( board ) ) return true;

        for ( let row = 0; row < this._row; row++ ) {
            for ( let col = 0; col < this._col; col++ ) {
                if ( this._map[ row ][ col ] == "#" ) continue;

                for ( let i = 0; i < this._d.length; i++ ) {
                    let nextRow = row + this._d[ i ][ 0 ];
                    let nextCol = col + this._d[ i ][ 1 ];
                    if ( !this.checkArea( nextRow, nextCol ) ) continue;
                    let newBoard = new Board( board, board );
                    newBoard._swap( row, col, nextRow, nextCol );
                    newBoard._run();
                    // 深度遍历
                    if ( this._resolving( newBoard, step - 1 ) ) return true;
                }

            }
        }

        return false;
    }
    // 交换目标数组的数据
    private _swap ( row: number, col: number, newRow: number, newCol: number ): void
    {
        let temp = this._map[ row ][ col ];
        this._map[ row ][ col ] = this._map[ newRow ][ newCol ];
        this._map[ newRow ][ newCol ] = temp;

        // 记录交换步骤
        this._step = [ [ row, col ], [ newRow, newCol ] ];
    }

    // 执行交换后的过程
    private _run (): void
    {
        do {
            this._drop();
        } while ( this._remove() );
    }
    // 下落操作
    private _drop (): void
    {
        let cur = 0;
        // 从左到右
        for ( let col = 0; col < this._col; col++ ) {
            cur = this._row - 1;
            // 自底向上
            for ( let row = this._row - 1; row >= 0; row-- ) {
                if ( this._map[ row ][ col ] === "#" ) continue;
                this._map[ cur ][ col ] = this._map[ row ][ col ];
                cur--;
            }
            for ( ; cur >= 0; cur-- )
                this._map[ cur ][ col ] = "#";
        }
    }
    // 消除操作
    private _rmD: number[][] = [ [ 0, 1 ], [ 1, 0 ] ];          // 消除的方向
    private _remove (): boolean
    {
        let hasRm = false;
        let nextRow1 = 0, nextCol1 = 0;     // 下一个的坐标
        let nextRow2 = 0, nextCol2 = 0;     // 下两个的坐标                    // 需要消除的方格
        for ( let row = 0; row < this._row; row++ ) {
            for ( let col = 0; col < this._col; col++ ) {
                if ( this._map[ row ][ col ] == "#" ) continue;

                for ( let i = 0; i < this._rmD.length; i++ ) {
                    nextRow1 = row + this._rmD[ i ][ 0 ];
                    nextCol1 = col + this._rmD[ i ][ 1 ];
                    nextRow2 = row + this._rmD[ i ][ 0 ] * 2;
                    nextCol2 = col + this._rmD[ i ][ 1 ] * 2;
                    if ( !this.checkArea( nextRow1, nextCol1 ) || !this.checkArea( nextRow2, nextCol2 ) ) continue;

                    if ( this._map[ row ][ col ] != this._map[ nextRow1 ][ nextCol1 ] ) continue;
                    if ( this._map[ nextRow1 ][ nextCol1 ] != this._map[ nextRow2 ][ nextCol2 ] ) continue;

                    this._rm[ row ][ col ] = 1;
                    this._rm[ nextRow1 ][ nextCol1 ] = 1;
                    this._rm[ nextRow2 ][ nextCol2 ] = 1;
                }
            }
        }

        // 进行消除
        for ( let row = 0; row < this._row; row++ ) {
            for ( let col = 0; col < this._col; col++ ) {
                if ( !this._rm[ row ][ col ] ) continue;
                this._map[ row ][ col ] = "#";
                hasRm = true;
                // 清空
                this._rm[ row ][ col ] = 0;
            }
        }

        return hasRm;
    }
}
