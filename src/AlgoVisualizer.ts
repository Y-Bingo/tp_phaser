import AlgoFrame from "./AlgoFrame";
import MazeMap from "./MazeMap";
import { RandomQueue } from "./RandomQueue";

/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _mazeMap: MazeMap;                      // 数据层
    private _algoFrame: AlgoFrame;                  // 渲染层
    // 方向
    private _d: number[][] = [ [ -1, 0 ], [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ];

    preload (): void
    {
        this._mazeMap = new MazeMap( 101, 101, [], [] );
    }

    // 初始化视图
    create (): void
    {
        this._algoFrame = new AlgoFrame( this );
        this._algoFrame.setMapData( this._mazeMap );

        // // 递归建造调用
        // this._build( this._mazeMap.ENTRY_X, this._mazeMap.ENTRY_Y + 1 );

        this._next = new RandomQueue();
        this._next.enqueue( [ this._mazeMap.ENTRY_X, this._mazeMap.ENTRY_Y + 1 ] );
    }

    private _next: RandomQueue<number[]>;
    /**
     * ! 非递归遍历的一个注意点:
     * ? 什么时候去确定这个cell是被访问了
     * * 只要是被放进了队列里面，就应标记为已经访问了
     * * 如果Cell-A只是被放进了待访问队列里面，而没有标记为已访问，则比他先出来的Cell有可能会重复访问到Cell-A
     */
    private _build (): void
    {
        if ( this._next.isEmpty() ) return;

        let [ row, col ] = this._next.dequeue();
        // 除雾
        this._mazeMap.demist( row, col );

        let nextRow = 0;
        let nextCol = 0;
        for ( let i = 0; i < this._d.length; i++ ) {
            nextRow = this._d[ i ][ 0 ] * 2 + row;
            nextCol = this._d[ i ][ 1 ] * 2 + col;

            if ( !this._mazeMap.checkArea( nextRow, nextCol ) ) continue;
            if ( this._mazeMap.isOpen( nextRow, nextCol ) ) continue;
            if ( this._mazeMap.isLink( [ row, col ], [ nextRow, nextCol ] ) ) continue;

            this._mazeMap.linkCell( [ row, col ], [ nextRow, nextCol ] );
            this._next.enqueue( [ nextRow, nextCol ] );
        }
    }

    /**
     * ! 递归遍历的
     * * cell的访问标记，必须在递归调用前进行标记，该条件比非递归宽松~
     */
    // private _build ( row: number, col: number ): void
    // {
    //     // this._mazeMap.openCell( row, col );

    //     let nextRow = 0;
    //     let nextCol = 0;
    //     for ( let i = 0; i < this._d.length; i++ ) {
    //         nextRow = this._d[ i ][ 0 ] * 2 + row;
    //         nextCol = this._d[ i ][ 1 ] * 2 + col;
    //         if ( !this._mazeMap.checkArea( nextRow, nextCol ) ) continue;
    //         if ( this._mazeMap.isOpen( nextRow, nextCol ) ) continue;
    //         if ( this._mazeMap.isLink( [ row, col ], [ nextRow, nextCol ] ) ) continue;

    //         this._mazeMap.linkCell( [ row, col ], [ nextRow, nextCol ] );
    //         // this._mazeMap.openCell( row + this._d[ i ][ 0 ], col + this._d[ i ][ 1 ] )
    //         this._build( nextRow, nextCol );
    //     }
    // }

    // 动画
    update ()
    {
        this._build();

        this._algoFrame.clear();
        this._algoFrame.renderMap( this._mazeMap );
    }
}
export default AlgoVisualizer;
