import AlgoVisHelper from "./AlgoVisHelper";
import MazeMap, { ROAD, WALL, Step } from "./MazeMap";
import MazePath from "./MazeData";

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
    private _mazePath: MazePath;
    renderPath ( data: MazePath ): void
    {
        this._mazePath = data;
        this._paintPath();
    }


    // 接受渲染的数据
    private _mazeMap: MazeMap;
    renderMap ( data: MazeMap ): void
    {
        this._mazeMap = data;
        this._paintMap();
    }

    // 渲染地图
    private _paintMap (): void
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
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.DarkGray );
                else if ( mazeData == ROAD )
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.Gray );
                else if ( mazeData == WALL )
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.LightBlack );

                AlgoVisHelper.fillRect( this, x, y, this._blockSize, this._blockSize )
            }
        }
    }

    // 渲染路径
    private _paintPath (): void
    {
        let data = null;
        let x = null;
        let y = null;
        // 计算要绘制的size
        for ( let row = 0; row < this._mazePath.ROW; row++ ) {
            for ( let col = 0; col < this._mazePath.COL; col++ ) {
                data = this._mazePath.getMaze( row, col );
                x = col * this._blockSize + this._startX;
                y = row * this._blockSize + this._startY;
                if ( this._mazePath.isVisited( row, col ) )
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.Orange );
                else if ( data == ROAD )
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.Gray );
                else if ( data == WALL )
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.LightBlack );
                AlgoVisHelper.fillRect( this, x, y, this._blockSize, this._blockSize );

                if ( this._mazePath.getPath( row, col ) ) {
                    AlgoVisHelper.setFillColor( this, AlgoVisHelper.Red );
                    AlgoVisHelper.fillRect( this, x, y, this._blockSize, this._blockSize );
                }
            }
        }
    }

}

export default AlgoFrame;
