import AlgoFrame from "./AlgoFrame";

/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _money: number[];                   // 数据层
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
        this._money = [];
        for ( let i = 0; i < 100; i++ )
            this._money.push( 100 );
    }
    // 初始化视图
    create (): void
    {
        this._algoFrame = new AlgoFrame( this );
        // this._inintKeyInput();
        // this._initMouseInput();
        this._algoFrame.render( this._money );
    }
    // 动画
    update ()
    {
        this._money.sort( ( a, b ) => ( a - b ) );
        this._algoFrame.render( this._money );
        //  编写自己的动画逻辑
        // k标识执行k轮游戏！
        for ( let k = 0; k < 10; k++ ) {
            for ( let i = 0; i < this._money.length; i++ ) {
                let j = Math.floor( Math.random() * this._money.length )
                this._money[ i ] -= 1;
                this._money[ j ] += 1;
            }
        }
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
