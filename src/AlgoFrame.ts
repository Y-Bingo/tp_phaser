import AlgoVisHelper from "./AlgoVisHelper";
import { SelectionData } from './SelectionData';

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

    setSortData ( data: SelectionData ): void
    {
        this._sortData = data;
        this._initStage();
        this._repaint();
    }
    // 绘制前
    private _blockW: number = 8;     // 方块size
    private _startX: number;            // 开始绘制前的X坐标
    private _startY: number;            // 开始绘制前的Y坐标
    private _initStage (): void
    {
        this._blockW = Math.floor( this._stageWidth / this._sortData.getN() );
        this._startX = ( this._stageWidth - this._blockW * this._sortData.getN() ) / 2;
        this._startY = this._stageHeight;
    }

    // 接受渲染的数据
    private _sortData: SelectionData;
    render ( data: SelectionData ): void
    {
        this._sortData = data;
        this._repaint();
    }

    // 具体渲染过程
    private _repaint (): void
    {
        // TODO: 绘制自己的数据data
        let num = 0;
        let x = 0;
        let y = 0;
        for ( let index = 0; index < this._sortData.getN(); index++ ) {
            if ( index < this._sortData.orderIndex )
                AlgoVisHelper.setFillColor( this, AlgoVisHelper.Orange );
            else
                AlgoVisHelper.setFillColor( this, AlgoVisHelper.Grey );

            if ( index === this._sortData.curMin )
                AlgoVisHelper.setFillColor( this, AlgoVisHelper.Red );
            if ( index === this._sortData.cur )
                AlgoVisHelper.setFillColor( this, AlgoVisHelper.Blue );

            num = this._sortData.get( index );
            x = index * this._blockW + this._startX;
            y = this._stageHeight - num;
            AlgoVisHelper.fillRect( this, x, y, this._blockW - 2, num );
        }
    }
}

export default AlgoFrame;
