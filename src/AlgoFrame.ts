import AlgoVisHelper from "./AlgoVisHelper";
import MazeMap, { ROAD, WALL } from "./MazeMap";

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

    setMapData ( data: MazeMap ): void
    {
        this._mazeMap = data;
        this._initStage();
        this._repaint();
    }
    // 绘制前
    private _blockSize: number = 8;     // 方块size
    private _startX: number;            // 开始绘制前的X坐标
    private _startY: number;            // 开始绘制前的Y坐标
    private _initStage (): void
    {
        let blockW = Math.floor( this._stageWidth / this._mazeMap.ROW );
        let blockH = Math.floor( this._stageHeight / this._mazeMap.COL );
        this._blockSize = Math.min( blockW, blockH );
        this._startX = ( this._stageWidth - this._blockSize * this._mazeMap.ROW ) / 2;
        this._startY = ( this._stageHeight - this._blockSize * this._mazeMap.COL ) / 2;
    }

    // 接受渲染的数据
    private _mazeMap: MazeMap;
    renderMap ( data: MazeMap ): void
    {
        this._mazeMap = data;
        this._repaint();
    }
    // 具体渲染过程
    private _repaint (): void
    {
        let mazeData = "";
        let x = 0;
        let y = 0;
        for ( let row = 0; row < this._mazeMap.ROW; row++ ) {
            for ( let col = 0; col < this._mazeMap.COL; col++ ) {
                mazeData = this._mazeMap.getMaze( row, col );
                x = col * this._blockSize + this._startX;
                y = row * this._blockSize + this._startY;
                if ( !this._mazeMap.isCover( row, col ) )
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.Grey );
                else if ( mazeData == ROAD )
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.White );
                else if ( mazeData == WALL )
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.Blue );

                AlgoVisHelper.fillRect( this, x, y, this._blockSize, this._blockSize )
            }
        }

    }
}

export default AlgoFrame;
