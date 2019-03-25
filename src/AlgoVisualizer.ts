import Circle from "./Circle";
import AlgoFrame from "./AlgoFrame";

/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _circleArr: Circle[];               // 数据层
    private _algoFrame: AlgoFrame;              // 渲染层

    private _isAmination: boolean;              // 是否播放动画

    preload (): void
    {
        this._circleArr = [];
        this._isAmination = true;
        this._initModel();
    }

    // 初始化数据
    private _initModel (): void
    {
        let num = 10;
        let x = 0;
        let y = 0;
        let R = 50;
        let V = 20;
        let vx = 0;
        let vy = 0;
        for ( let i = 0; i < num; i++ ) {
            x = Math.floor( Math.random() * ( this.sys.canvas.width - 2 * R ) ) + R;
            y = Math.floor( Math.random() * ( this.sys.canvas.height - 2 * R ) ) + R;
            vx = Math.floor( Math.random() * V ) - V / 2;
            vy = Math.floor( Math.random() * V ) - V / 2;
            this._circleArr.push( new Circle( x, y, R, vx, vy ) );
        }
    }

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
        this._algoFrame.render( this._circleArr );
        if ( this._isAmination )
            for ( let i = 0; i < this._circleArr.length; i++ )
                this._circleArr[ i ].move( 0, 0, this.sys.canvas.width, this.sys.canvas.height );
    }
    // 键盘监听
    private _inintKeyInput (): void
    {
        let key_space = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.SPACE );
        key_space.on( "up", () =>
        {
            console.log( "触发" );
            this._isAmination = !this._isAmination;
        } );
    }
    // 鼠标监听
    private _initMouseInput (): void
    {
        this.input.on( "pointerdown", ( pointer ) =>
        {
            for ( let i = 0; i < this._circleArr.length; i++ ) {
                if ( this._circleArr[ i ].contain( pointer.x, pointer.y ) ) {
                    this._circleArr[ i ].isFilled = !this._circleArr[ i ].isFilled;
                }
            }
        } )
    }
}
export default AlgoVisualizer;
