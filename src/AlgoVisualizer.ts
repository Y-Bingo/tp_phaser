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

        this._initMouseInput();
    }

    // 动画
    update ()
    {
        this._algoFrame.clear();
        this._algoFrame.render( this._sweeperData );
    }
    // 鼠标监听
    private _initMouseInput (): void
    {
        this.input.mouse.disableContextMenu();
        this._algoFrame.setInteractive();
        let row = 0;
        let col = 0;
        this._algoFrame.on( 'pointerdown', ( pointer, x, y ) =>
        {
            let pos = this._algoFrame.transToIndex( x, y );
            // 右键
            if ( pointer.rightButtonDown() ) {
                this._sweeperData.setFlag( pos.row, pos.col );
            }
            // 左键
            else {
                this._sweeperData.open( pos.row, pos.col );
            }

        }, this );
    }
}
export default AlgoVisualizer;
