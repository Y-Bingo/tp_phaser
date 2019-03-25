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
    private _data: Object;
    render ( data: Object ): void
    {
        this._data = data;
        this._repaint();
    }

    // 具体渲染过程
    private _repaint (): void
    {
        // TODO: 绘制自己的数据data

    }
}

export default AlgoFrame;
