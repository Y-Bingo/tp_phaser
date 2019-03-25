import AlgoFrame from "./AlgoFrame";
import MonteCarloData from "./MonteCarloData";
import { Circle, Point } from "./Circle";

/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _monteCardloData: MonteCarloData;   // 数据层
    private _algoFrame: AlgoFrame;              // 渲染层

    private _isAmination: boolean;              // 是否播放动画

    preload (): void
    {
        this._isAmination = true;
        this._initModel();
    }

    // 初始化数据
    private _initModel (): void
    {
        let stageW = this.sys.canvas.width;
        let stageH = this.sys.canvas.height;
        let r = stageW > stageH ? stageH / 2 : stageW / 2;
        this._monteCardloData = new MonteCarloData( new Circle( stageW / 2, stageH / 2, r ) );

    }
    // 初始化视图
    create (): void
    {
        this._algoFrame = new AlgoFrame( this );
        // this._inintKeyInput();
        // this._initMouseInput();
    }
    // 动画
    update ()
    {
        this._algoFrame.clear();
        this._algoFrame.render( this._monteCardloData );
        console.log( "PI：", this._monteCardloData.estimatePi() );

        let circle = this._monteCardloData.getCircle();
        let x = Math.floor( Math.random() * circle.r * 2 ) + ( circle.x - circle.r );
        let y = Math.floor( Math.random() * circle.r * 2 ) + ( circle.y - circle.r );
        this._monteCardloData.addPoint( new Point( x, y ) );

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
