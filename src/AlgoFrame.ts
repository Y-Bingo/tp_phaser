import { SweeperData } from "./SweeperData";

/**
 * 视图层， 接收数据进行绘制 (该项目需要使用一个RenderTexture来生成了)
 */
class AlgoFrame extends Phaser.GameObjects.RenderTexture
{
    private _stageWidth: number;
    private _stageHeight: number;

    constructor ( scene: Phaser.Scene )
    {
        super( scene, 0, 0 );
        scene.add.existing( this );

        this._stageWidth = scene.sys.canvas.width;
        this._stageHeight = scene.sys.canvas.height;
    }

    setMap ( data: SweeperData ): void
    {
        this._data = data;
        this._initStage();
    }

    transToIndex ( x: number, y: number ): { row: number, col: number }
    {
        let col = Math.floor( x / this._blockSize );
        let row = Math.floor( y / this._blockSize );
        return { row, col };
    }

    private _blockSize = 32;
    private _startX: number;
    private _startY: number;
    private _initStage (): void
    {
        let boxW = this._data.ROW * this._blockSize;
        let boxH = this._data.COL * this._blockSize;
        this._startX = ( this._stageWidth - boxW ) / 2;
        this._startY = ( this._stageHeight - boxH ) / 2;

        this.setSize( boxW, boxH );
        this.setPosition( this._startX, this._startY );
    }

    // 接受渲染的数据
    private _data: SweeperData;
    render ( data: SweeperData ): void
    {
        this._data = data;
        this._repaint();
    }

    // 具体渲染过程
    private _repaint (): void
    {
        let x = 0;
        let y = 0;
        for ( let row = 0; row < this._data.ROW; row++ ) {
            for ( let col = 0; col < this._data.COL; col++ ) {
                x = col * this._blockSize;
                y = row * this._blockSize;
                // 是否立旗了
                if ( this._data.isFlag( row, col ) )
                    this.drawFrame( "sweeper", "flag.png", x, y );
                // 是否开了
                else if ( !this._data.isOpen( row, col ) )
                    this.drawFrame( "sweeper", "block.png", x, y );
                // 是否有雷
                else if ( this._data.isMine( row, col ) )
                    this.drawFrame( "sweeper", "mine.png", x, y );
                else
                    this.drawFrame( "sweeper", this._data.getNums( row, col ) + ".png", x, y );
            }
        }
    }
}

export default AlgoFrame;
