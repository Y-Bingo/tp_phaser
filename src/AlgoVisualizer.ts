import AlgoFrame from "./AlgoFrame";

/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _data: Object;                      // 数据层
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
        // TODO: 初始化数据
    }
    // 初始化视图
    create (): void
    {
        this._algoFrame = new AlgoFrame( this );
        this._inintKeyInput();
        this._initMouseInput();
    }
    // 动画
    update ()
    {
        this._algoFrame.clear();
        this._algoFrame.render( this._data );
        // TODO: 编写自己的动画逻辑

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
