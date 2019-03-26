import AlgoFrame from "./AlgoFrame";
import MazeData from "./MazeData";

/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _mazeData: MazeData;                      // 数据层
    private _algoFrame: AlgoFrame;              // 渲染层

    private _isAmination: boolean;              // 是否播放动画

    preload (): void
    {
        this._isAmination = true;
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
    }
    // 动画
    update ()
    {
        this._algoFrame.clear();
        this._algoFrame.render( this._mazeData );
    }
}
export default AlgoVisualizer;
