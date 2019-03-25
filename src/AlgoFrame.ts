import AlgoVisHelper from "./AlgoVisHelper";
import MonteCarloData from "./MonteCarloData";

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
    private _data: MonteCarloData;
    render ( data: MonteCarloData ): void
    {
        this._data = data;
        this._repaint();
    }

    // 具体渲染过程
    private _repaint (): void
    {
        let circle = this._data.getCircle();
        AlgoVisHelper.setStrokeColor( this, AlgoVisHelper.Green );
        AlgoVisHelper.strokeRect( this, circle.x - circle.r, circle.y - circle.r, circle.r * 2, circle.r * 2 );

        AlgoVisHelper.setStrokeColor( this, AlgoVisHelper.Orange );
        AlgoVisHelper.strokeCircle( this, circle.x, circle.y, circle.r );
        let nums = this._data.getPointNums();
        let point = null;
        for ( let i = 0; i < nums; i++ ) {
            point = this._data.getPoint( i );
            if ( circle.contain( point ) )
                AlgoVisHelper.setFillColor( this, AlgoVisHelper.Orange );
            else
                AlgoVisHelper.setFillColor( this, AlgoVisHelper.Green );
            AlgoVisHelper.fillCircle( this, point.x, point.y, 5 );
        }
    }
}

export default AlgoFrame;
