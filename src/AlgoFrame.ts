import AlgoVisHelper from "./AlgoVisHelper";

/**
 * 视图层， 接收数据进行绘制
 */
class AlgoFrame extends Phaser.GameObjects.Graphics
{
    private _stageWidth: number;
    private _stageHeight: number;

    constructor ( scene: Phaser.Scene )
    {
        super( scene );
        scene.add.existing( this );

        this._stageWidth = scene.sys.canvas.width;
        this._stageHeight = scene.sys.canvas.height;
    }

    // 接受渲染的数据
    private _money: number[];
    render ( data: number[] ): void
    {
        this._money = data;
        this.clear();
        this._repaint();
    }

    // 具体渲染过程
    private _repaint (): void
    {
        let w = Math.floor( this._stageWidth / this._money.length );
        let h = 0;
        let x = 0;
        let y = 0;

        for ( let i = 0; i < this._money.length; i++ ) {
            x = w * i + 20;
            if ( this._money[ i ] < 0 ) {
                AlgoVisHelper.setFillColor( this, AlgoVisHelper.Red );
                h = -this._money[ i ];
                y = this._stageHeight / 2;
            } else {
                AlgoVisHelper.setFillColor( this, AlgoVisHelper.Blue );
                h = this._money[ i ];
                y = this._stageHeight / 2 - h;
            }
            AlgoVisHelper.fillRect( this, x, y, w - 1, h );
        }
    }
}

export default AlgoFrame;
