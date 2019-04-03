import AlgoFrame from "./AlgoFrame";
import Board from "./Board";

let level = 16;
/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _data: Board;                      // 数据层
    private _algoFrame: AlgoFrame;              // 渲染层

    preload (): void
    {
        this.load.json( "board", `resource/gameData/Level_${ level }.json` );
    }

    // 初始化视图
    create (): void
    {
        // 初始化数据
        this._data = new Board( this.cache.json.get( "board" ), null );

        this._algoFrame = new AlgoFrame( this );
        this._algoFrame.setMap( this._data );

        console.log( this._data.isResolve() );
    }
    // 动画
    update ()
    {
        this._algoFrame.clear();
        this._algoFrame.render( this._data );
    }

}
export default AlgoVisualizer;
