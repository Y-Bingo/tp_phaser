import AlgoFrame from "./AlgoFrame";
import { SelectionData } from './SelectionData';

/**
 * 控制层
 */
class AlgoVisualizer extends Phaser.Scene
{
    private _data: SelectionData;               // 数据层
    private _algoFrame: AlgoFrame;              // 渲染层


    preload (): void
    {
        this._initModel();
    }

    // 初始化数据
    private _initModel (): void
    {
        // TODO: 初始化数据
        this._data = new SelectionData( 100, 100, 500 );
    }
    // 初始化视图
    create (): void
    {
        this._algoFrame = new AlgoFrame( this );
        this._algoFrame.setSortData( this._data );

        this.setData( 0, -1, -1 );
        // this._update();
    }
    // 动画
    private _frameTime: number = 10;
    private _i = 0;
    private _j = 0;
    private _min = 0;
    private _update (): void
    {
        let self = this;

        if ( self._i >= self._data.getN() ) {
            self.setData( self._i, -1, -1 );
            return;
        }

        self._min = self._i;

        self._j = self._i + 1;

        while ( self._j < self._data.getN() ) {
            if ( self._data.get( self._j ) < self._data.get( self._min ) )
                self._min = self._j;

            self._j++;
            self.sleep( self._frameTime );

            self.setData( self._i, self._min, self._j );
        }

        self._data.swap( self._min, self._i );

        self._i++;
    }

    setData ( orderIndex: number, curMin: number, cur: number ): void
    {
        let self = this;

        self._data.cur = cur;
        self._data.curMin = curMin;
        self._data.orderIndex = orderIndex;


        self._algoFrame.clear();
        self._algoFrame.render( self._data );
    }

    sleep ( delay: number )
    {
        var start = Date.now();
        while ( Date.now() - start < delay ) {
            continue;
        }
    }

    update ()
    {
        this._update();
    }
}
export default AlgoVisualizer;
