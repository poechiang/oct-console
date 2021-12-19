import DataSet from '@antv/data-set';
import { Chart, registerShape, Util } from '@antv/g2';
import Block from '@components/Block';
import * as fetch from '@lib/fetch';
import { map } from 'lodash';
import { FC, useEffect, useRef, useState } from 'react';

function getTextAttrs(cfg: any) {
    return {
        ...cfg.defaultStyle,
        ...cfg.style,
        fontSize: cfg.data.size,
        text: cfg.data.text,
        textAlign: 'center',
        fontFamily: cfg.data.font,
        fill: cfg.color || cfg.defaultStyle.stroke,
        textBaseline: 'Alphabetic',
    };
}

// 给point注册一个词云的shape
registerShape('point', 'cloud', {
    draw(cfg: any, container) {
        const attrs = getTextAttrs(cfg);
        const textShape = container.addShape('text', {
            attrs: {
                ...attrs,
                x: cfg.x,
                y: cfg.y,
            },
        });
        if (cfg.data.rotate) {
            Util.rotate(textShape, (cfg.data.rotate * Math.PI) / 180);
        }
        return textShape;
    },
});

const createChart = (chartHost: HTMLElement, data: any[]) => {
    const chart = new Chart({
        container: chartHost,
        autoFit: true,
        height: 500,
        padding: 0,
    });
    if (data) {
        console.log(333, data);
        chart.data(data);
    }
    chart.scale({});
    chart.legend(false);
    chart.axis(false);
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart.coordinate().reflect('x');
    chart
        .point()
        .position('x*y')
        .color('CornflowerBlue')
        .shape('cloud')
        .tooltip('count*tag', (count, tag) => ({
            name: tag,
            value: count,
        }));
    chart.interaction('element-active');
    chart.render();

    return chart;
};
const buildChartViews = (data: any[]) => {
    const dv = new DataSet.View().source(data);
    const range = data?.length ? dv.range('count') : null;

    console.log(666, dv, range);
    const min = range?.[0] || 0;
    const max = range?.[1] || 0;
    dv.transform({
        type: 'tag-cloud',
        fields: ['x', 'count'],
        size: [600, 500],
        font: 'Verdana',
        padding: 0,
        timeInterval: 5000, // max execute time
        rotate() {
            let random = ~~(Math.random() * 4) % 4;
            if (random === 2) {
                random = 0;
            }
            return random * 90; // 0, 90, 270
        },
        fontSize(d) {
            if (d.value) {
                return ((d.value - min) / (max - min)) * (80 - 24) + 24;
            }
            return 0;
        },
    });
    return dv.rows;
};
const queryBlogTags = () => {
    return fetch.get('/blog/tags/statistics');
};
const Overview: FC<any> = (props) => {
    const chartHost = useRef(null);
    const [data, setData] = useState<any[]>([]);
    const [chart, setChart] = useState<Chart>();

    useEffect(() => {
        chart?.destroy();
        setChart(createChart(chartHost.current as unknown as HTMLElement, []));
        queryBlogTags().then((resp) => {
            const data = map(resp.result || [], (o: any) => {
                return { ...o, x: o.tag };
            });
            console.log(chart);

            setData(data);
        });
        return () => {
            chart?.destroy();
        };
    }, []);
    useEffect(() => {
        if (!data?.length) return;

        chart?.changeData(buildChartViews(data));
        chart?.render();
    }, [data]);
    return (
        <main id='overview' className='oc-page-wrap'>
            <Block title='日记标签'>
                <div ref={chartHost}></div>
            </Block>
        </main>
    );
};

export default Overview;
