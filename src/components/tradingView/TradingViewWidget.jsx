// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget({search}) {
    const onLoadScriptRef = useRef();

    useEffect(
        () => {
            console.log(search) 
            onLoadScriptRef.current = createWidget;

            if (!tvScriptLoadingPromise) {
                tvScriptLoadingPromise = new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.id = 'tradingview-widget-loading-script';
                    script.src = 'https://s3.tradingview.com/tv.js';
                    script.type = 'text/javascript';
                    script.onload = resolve;

                    document.head.appendChild(script);
                });
            }

            tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

            return () => onLoadScriptRef.current = null;

            function createWidget() {
                if (document.getElementById('tradingview_64acb') && 'TradingView' in window) {
                    new window.TradingView.widget({
                        autosize: true,
                        symbol: `NASDAQ:${search}`,
                        interval: "1",
                        timezone: "Etc/UTC",
                        theme: "dark",
                        style: "1",
                        locale: "en",
                        toolbar_bg: "#f1f3f6",
                        enable_publishing: false,
                        gridColor: "rgba(0, 255, 0, 0.06)",
                        hide_top_toolbar: true,
                        allow_symbol_change: true,
                        container_id: "tradingview_64acb"
                    });
                }
            }
        },
        [search]
    );

    return (
        <div className='tradingview-widget-container'>
            <div id='tradingview_64acb' />
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
            </div>
        </div>
    );
}
