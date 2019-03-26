import AlgoFrame from "./AlgoFrame";
import MazeData from "./MazeData";

/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _mazeData: MazeData;                // 数据层
    private _algoFrame: AlgoFrame;              // 渲染层
    // 迷宫行走方向
    private _d: number[][] = [ [ 0, -1 ], [ 1, 0 ], [ 0, 1 ], [ -1, 0 ] ];

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

        this._go( this._mazeData.ENTRY_X, this._mazeData.ENTRY_Y );
    }
    /**
     * 走迷宫函数
     * @param row
     * @param y
     */
    private _go ( row: number, col: number ): void
    {
        // 记录经过此点
        this._mazeData.visite( row, col );
        // 走出了迷宫
        if ( row == this._mazeData.EXIT_X && col == this._mazeData.EXIT_Y ) {
            return
        };

        let nextRow = 0;    // 下一步要走的x方向
        let nextCol = 0;    // 下一步要走的y方向
        // 开始遍历四个方向
        for ( let i = 0; i < this._d.length; i++ ) {
            nextRow = row + this._d[ i ][ 0 ];
            nextCol = col + this._d[ i ][ 1 ];
            if (
                !this._mazeData.checkArea( nextRow, nextCol ) ||
                this._mazeData.isVisited( nextRow, nextCol ) ||
                this._mazeData.getMaze( nextRow, nextCol ) == MazeData.WALL
            ) continue;
            this._go( nextRow, nextCol );
        }

        return;
    }

    // 动画
    update ()
    {
        this._algoFrame.clear();
        this._algoFrame.render( this._mazeData );
    }
}
export default AlgoVisualizer;
