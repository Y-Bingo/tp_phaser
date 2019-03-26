import AlgoVisHelper from "./AlgoVisHelper";
import MazeData from "./MazeData";
import { Step } from "./MazeData";

/**
 * 视图层， 接收数据进行绘制
 */
class AlgoFrame extends Phaser.GameObjects.Graphics
{
    private _stageWidth: number;
    private _stageHeight: number;
    private _minSize: number;

    constructor ( scene: Phaser.Scene )
    {
        super( scene );
        scene.add.existing( this );

        this._stageWidth = scene.sys.canvas.width;
        this._stageHeight = scene.sys.canvas.height;
    }

    // 接受渲染的数据
    private _data: MazeData;
    render ( data: MazeData ): void
    {
        this._data = data;
        this._paintBefore();
        this._repaint();
    }
    // 绘制前
    private _blockSize: number = 8;     // 方块size
    private _startX: number;            // 开始绘制前的X坐标
    private _startY: number;            // 开始绘制前的Y坐标
    private _paintBefore (): void
    {
        let blockW = Math.floor( this._stageWidth / this._data.ROW );
        let blockH = Math.floor( this._stageHeight / this._data.COL );
        this._blockSize = Math.min( blockW, blockH );
        this._startX = ( this._stageWidth - this._blockSize * this._data.ROW ) / 2;
        this._startY = ( this._stageHeight - this._blockSize * this._data.COL ) / 2;
    }
    // 具体渲染过程
    private _repaint (): void
    {
        let data = null;
        let x = null;
        let y = null;
        // 计算要绘制的size
        for ( let row = 0; row < this._data.ROW; row++ ) {
            for ( let col = 0; col < this._data.COL; col++ ) {
                data = this._data.getMaze( row, col );
                x = col * this._blockSize + this._startX;
                y = row * this._blockSize + this._startY;
                if ( this._data.isVisited( row, col ) )
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.Orange );
                else if ( data == MazeData.ROAD )
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.White );
                else if ( data == MazeData.WALL )
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.Blue );
                AlgoVisHelper.fillRect( this, x, y, this._blockSize, this._blockSize );

                if ( this._data.getPath( row, col ) ) {
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.Red );
                    AlgoVisHelper.fillRect( this, x, y, this._blockSize, this._blockSize );
                }
            }
        }
    }
}

export default AlgoFrame;
