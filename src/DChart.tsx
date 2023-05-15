import { EChartsType, init } from 'echarts';
import { useLayoutEffect, useRef, useState } from 'react';
type EChartsOption = echarts.EChartsOption;

const initialData = [
    { name: 'Costa Rica', value:1200, selected: false },
    { name: 'Panamá',     value:1200, selected: false },
    { name: 'Colombia',   value:1200, selected: false },
    { name: 'San José',   value:1200,        groupId: 'Costa Rica', selected: false },
    { name: 'Alajuela',   value:1200,        groupId: 'Costa Rica', selected: false },
    { name: 'Heredia',    value:1200,        groupId: 'Costa Rica', selected: false },
    { name: 'Ciudad de Panamá', value: 1200, groupId: 'Panamá'    , selected: false },
    { name: 'Bocas del Toro',   value: 1200, groupId: 'Panamá'    , selected: false },
    { name: 'Bogota', value: 1200,           groupId: 'Colombia'  , selected: false },
    { name: 'Cali',   value: 1200,           groupId: 'Colombia'  , selected: false }
]

export const DChart = () => {

    const main = useRef<HTMLDivElement>( null );
    const [ selectedCountry, setSelectedCountry ] = useState<string>('');
    const [ selectedZone, setSelectedZone ] = useState<string>('');
    const [ chart, setChart ] = useState<EChartsType | undefined>( undefined );
    const [ dataVisible, setDataVisible] = useState( initialData );


    const filterBySelectedCountry = ( name: string ) => {
        console.log('Whaaaat');
        setSelectedCountry( name );
        setSelectedZone('');
        setDataVisible( dataVisible.filter( d => d.name === name || d.groupId === name ) );
    }

    useLayoutEffect(() => {
        if( main.current && !chart ) {
            setChart( init( main.current ) ) ;
        } 
    }, []);
    

    useLayoutEffect(() => {
      

        if( !chart ) return;
        let option: EChartsOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    data: [ ...dataVisible.map( d  => d.name ) ]
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['30%', '40%'],
                        selectedMode: 'single',
                        labelLine: {
                            show: false
                        },
                        label: {
                            position: 'inner',
                            fontSize: 14
                        },
                        data: [ ...dataVisible.filter( d => d.groupId !== undefined ) ]
                    },
                    {
                        
                        type: 'pie',
                        selectedMode: 'single',
                        radius: ['45%', '60%'],
                        label: {
                            position: 'inner',
                            fontSize: 14
                        },
                        labelLine: {
                            show: false
                        },
                        emphasis: {
                            focus: 'series',
                            label: {
                              show: true,
                            }
                        },
                        data: [ ...dataVisible.filter( d => d.groupId === undefined ) ]
                    }
                ]
        };

        chart.setOption( option );
        chart.on('click', { seriesIndex: 0 }, ({ name }) =>  setSelectedZone( name ) );
        chart.on('click', { seriesIndex: 1 }, ({ name }) =>  filterBySelectedCountry( name ));
        chart.getZr().on('click', ( event ) => { if( !event.target ) { setDataVisible( initialData ) }})
        return () => {
            chart.clear();
        }
    }, [ chart, dataVisible ]);
    
    



    return (
        <>
            <pre>País: { JSON.stringify( selectedCountry )}</pre>
            <pre>Zona: { JSON.stringify( selectedZone )}</pre>
            <div 
                ref={ main }
                style={{ width: '100vw', height: '100vh' }}
            >
                    {/* Chart here */}
            </div>
        </>
    )
}
