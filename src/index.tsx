import React, { useEffect, useState, useRef } from 'react';
import { registerWidget, registerLink, registerUI, IContextProvider, } from './uxp';
import { TitleBar, FilterPanel, WidgetWrapper } from "uxp/components";
import './styles.scss';

import CanvasComponent from './canvasComponent'; 
  

interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

const Qr_widgetsWidget: React.FunctionComponent<IWidgetProps> = (props) => { 
      
    return (
        <WidgetWrapper>   
             <CanvasComponent showDownloadButtons={true} />  
        </WidgetWrapper>
    )
};
 


/**
 * Register as a Widget
 */
registerWidget({
    id: "qr_widgets",
    widget: Qr_widgetsWidget,
    configs: {
        layout: {
            w: 16,
            h: 14,
            minH: 13,
            minW: 14,
            maxW: 16,
            maxH: 14,
        }
    }
});

/**
 * Register as a Sidebar Link
 */
/*
registerLink({
    id: "qr_widgets",
    label: "Qr_widgets",
    // click: () => alert("Hello"),
    component: Qr_widgetsWidget
});
*/

/**
 * Register as a UI
 */

 /*
registerUI({
    id:"qr_widgets",
    component: Qr_widgetsWidget
});
*/