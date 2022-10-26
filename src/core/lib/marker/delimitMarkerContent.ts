/**
 * delimitMarkerContent - wraps marker content in curly braces.
 */

import type { Marker } from "../../../types/types";

export const delimitMarkerContent = function(markerContent: Marker | string): Marker {
    let _markerContent = markerContent;
    _markerContent = _markerContent.startsWith("{") ? _markerContent : `{${_markerContent}`;
    _markerContent = _markerContent.endsWith("}") ? _markerContent : `${_markerContent}}`;
    return _markerContent as Marker;
};
