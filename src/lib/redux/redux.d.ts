declare interface ReduxAction {
    type: symbol;
    [x: string]: any;
}
declare interface ChartCache {
    [x: string]: Chart;
}

declare interface RootState {
    [x: string]: any;
}
