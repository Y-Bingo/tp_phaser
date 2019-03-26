import AlgoFrame from "./AlgoFrame";
import MazeData from "./MazeData";
import { Step } from "./MazeData";

/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _mazeData: MazeData;                // 数据层
    private _algoFrame: AlgoFrame;              // 渲染层
    // 迷宫行走方向
    private _d: number[][] = [ [ 0, -1 ], [ 1, 0 ], [ 0, 1 ], [ -1, 0 ] ];
    private _isSolved: boolean;                 // 迷宫是否有解

    preload (): void
    {
        // 加载迷宫数据
        this.load.json( "maze", "resource/maze_101_101.json" );
    }

    // 初始化视图
    create (): void
    {
        // 初始化迷宫数据
        this._mazeData = new MazeData( this.cache.json.get( "maze" ) );
        // 初始化视图层
        this._algoFrame = new AlgoFrame( this );
        this._isSolved = false;

        this._next.push( new Step( this._mazeData.ENTRY_X, this._mazeData.ENTRY_Y, null ) );
    }
    /**
     * 走迷宫函数
     * @param row
     * @param y
     */
    private _next: Step[] = [];         // 寻路队列
    private _go (): void
    {
        if ( !this._next.length ) return;
        let step = this._next.shift();

        // 回溯
        if ( this._isSolved ) {
            this._mazeData.addPath( step.row, step.col );
            if ( step.pre )
                this._next.push( step.pre );
            return;
        }

        // 记录经过此点
        this._mazeData.visite( step.row, step.col );
        // 走出了迷宫
        if ( step.row == this._mazeData.EXIT_X && step.col == this._mazeData.EXIT_Y ) {
            this._isSolved = true;
            this._next = [ step ];
            return;
        };

        let nextRow = 0;    // 下一步要走的x方向
        let nextCol = 0;    // 下一步要走的y方向
        // 开始遍历四个方向
        for ( let i = 0; i < this._d.length; i++ ) {
            nextRow = step.row + this._d[ i ][ 0 ];
            nextCol = step.col + this._d[ i ][ 1 ];
            if (
                !this._mazeData.checkArea( nextRow, nextCol ) ||
                this._mazeData.isVisited( nextRow, nextCol ) ||
                this._mazeData.getMaze( nextRow, nextCol ) == MazeData.WALL
            ) continue;
            this._next.push( new Step( nextRow, nextCol, step ) );
        }
    }

    // 动画
    update ()
    {
        this._algoFrame.clear();
        this._algoFrame.render( this._mazeData );

        this._go();
    }
}
export default AlgoVisualizer;
