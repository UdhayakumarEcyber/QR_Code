import * as React from "react";
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
            <CanvasComponent /> 
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
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
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