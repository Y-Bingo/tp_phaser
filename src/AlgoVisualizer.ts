import AlgoFrame from "./AlgoFrame";
import { SweeperData } from "./SweeperData";

/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _sweeperData: SweeperData;          // 数据层
    private _algoFrame: AlgoFrame;              // 视图层
    preload (): void
    {
        this.load.atlas( "sweeper", "resource/assest/sweeper.png", "resource/assest/sweeper.json" );
    }
    // 初始化视图
    create (): void
    {
        this._sweeperData = new SweeperData( 10, 10, 10 );
        this._algoFrame = new AlgoFrame( this );

        console.log( this._sweeperData );

        this._algoFrame.setMap( this._sweeperData );
        this._inintKeyInput();
        this._initMouseInput();
    }

    // 动画
    update ()
    {
        this._algoFrame.clear();
        this._algoFrame.render( this._sweeperData );
    }
    // 键盘监听
    private _inintKeyInput (): void
    {
        // TODO: 根据情况加入键盘事件
    }
    // 鼠标监听
    private _initMouseInput (): void
    {
        // TODO: 根据情况加入鼠标事件
    }
}
export default AlgoVisualizer;
