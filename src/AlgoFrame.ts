import Circle from "./Circle";
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
    private _circleArr: Circle[]
    render ( data: Circle[] ): void
    {
        this._circleArr = data;
        this._repaint();
    }

    // 具体渲染过程
    private _repaint (): void
    {
        AlgoVisHelper.setStrokeColor( this, 0x000ffe );
        let circle = null;
        for ( let i = 0; i < this._circleArr.length; i++ ) {
            circle = this._circleArr[ i ];
            if ( !circle.isFilled )
                AlgoVisHelper.strokeCircle( this, circle.x, circle.y, circle.r );
            else
                AlgoVisHelper.fillCircle( this, circle.x, circle.y, circle.r );
        }
    }
}

export default AlgoFrame;
