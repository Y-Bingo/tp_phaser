import MazePath from "./MazeData";
import MazeMap, { Step } from "./MazeMap";
import { RandomQueue } from "./RandomQueue";
import AlgoFrame from "./AlgoFrame";
/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _mazeMap: MazeMap;              // 迷宫地图数据
    private _mazePath: MazePath;            // 迷宫寻路数据

    private _algoFrame: AlgoFrame;          // 渲染层

    private _isSolved: boolean;             // 迷宫是否有解
    // 方向
    private _d: number[][] = [ [ -1, 0 ], [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ];

    preload (): void
    {
        // 初始化数据
        this._mazeMap = new MazeMap( 101, 101, [], [] );
        this._mazePath = new MazePath();
        this._nextBuild = new RandomQueue();
        this._nextPass = new RandomQueue();

        // 初始化视图层
        this._algoFrame = new AlgoFrame( this );
        this._algoFrame.setMapData( this._mazeMap );

        this._isSolved = false;
    }

    // 初始化视图
    create (): void
    {
        // // 递归建造调用
        // this._build( this._mazeMap.ENTRY_X, this._mazeMap.ENTRY_Y + 1 );
        this._nextBuild.enqueue( new Step( this._mazeMap.ENTRY_X, this._mazeMap.ENTRY_Y + 1 ) );
        this._nextPass.enqueue( new Step( this._mazeMap.ENTRY_X, this._mazeMap.ENTRY_Y ) );
    }

    private _nextBuild: RandomQueue<Step>;
    /**
     * ! 非递归遍历的一个注意点:
     * ? 什么时候去确定这个cell是被访问了
     * * 只要是被放进了队列里面，就应标记为已经访问了
     * * 如果Cell-A只是被放进了待访问队列里面，而没有标记为已访问，则比他先出来的Cell有可能会重复访问到Cell-A
     */
    private _build (): void
    {
        if ( this._nextBuild.isEmpty() ) {
            this._mazeMap.setOver( true );
            this._mazePath.setMap( this._mazeMap );
            return;
        }

        let step = this._nextBuild.RandomDequeue();
        // 除雾
        this._mazeMap.demist( step.row, step.col );

        let nextRow = 0;
        let nextCol = 0;
        for ( let i = 0; i < this._d.length; i++ ) {
            nextRow = this._d[ i ][ 0 ] * 2 + step.row;
            nextCol = this._d[ i ][ 1 ] * 2 + step.col;

            if ( !this._mazeMap.checkArea( nextRow, nextCol ) ) continue;
            if ( this._mazeMap.isOpen( nextRow, nextCol ) ) continue;
            if ( this._mazeMap.isLink( [ step.row, step.col ], [ nextRow, nextCol ] ) ) continue;

            this._mazeMap.linkCell( [ step.row, step.col ], [ nextRow, nextCol ] );
            this._nextBuild.enqueue( new Step( nextRow, nextCol ) );
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

    /**
     * 迷宫求解
     * ? 什么时候去确定这个cell是被访问了
     * * 只要是被放进了队列里面，就应标记为已经访问了
     */
    private _nextPass: RandomQueue<Step>;         // 寻路栈
    private _go (): void
    {
        if ( this._nextPass.isEmpty() ) return;
        let step = this._nextPass.dequeue();

        // 记录经过此点, 只是为了显示效果，才放置在这里记录，模拟递归
        this._mazePath.visite( step.row, step.col );

        // 回溯
        if ( this._isSolved ) {
            this._mazePath.addPath( step.row, step.col );
            if ( step.pre )
                this._nextPass.enqueue( step.pre );
            else
                console.log( "迷宫求解完成！！" );
            return;
        }

        // 走出了迷宫
        if ( step.row == this._mazePath.EXIT_X && step.col == this._mazePath.EXIT_Y ) {
            this._isSolved = true;
            // 清空迷宫
            this._nextPass.clear();
            this._nextPass.enqueue( step );
            return;
        };

        let nextRow = 0;    // 下一步要走的x方向
        let nextCol = 0;    // 下一步要走的y方向
        // 开始遍历四个方向
        for ( let i = 0; i < this._d.length; i++ ) {
            nextRow = step.row + this._d[ i ][ 0 ];
            nextCol = step.col + this._d[ i ][ 1 ];

            if ( !this._mazePath.checkArea( nextRow, nextCol ) ) continue;
            if ( this._mazePath.isVisited( nextRow, nextCol ) ) continue;
            if ( this._mazePath.isWall( nextRow, nextCol ) ) continue;

            this._nextPass.enqueue( new Step( nextRow, nextCol, step ) );
        }
    }

    // 动画
    update ()
    {
        this._algoFrame.clear();
        if ( !this._mazeMap.isOver() ) {
            this._algoFrame.renderMap( this._mazeMap );
            this._build();
        }
        else {
            this._algoFrame.renderPath( this._mazePath );
            this._go();
        }
    }
}
export default AlgoVisualizer;
