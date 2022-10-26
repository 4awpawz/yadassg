/**
 * markerFindAndReplaceContent - replaces a marker with content.
 */

import { delimitMarkerContent } from "./delimitMarkerContent.js";
import type { Marker } from "../../../types/types";

export const markerFindAndReplaceContent = function(content: string, marker: Marker | string, value: string): string {
    const _marker = delimitMarkerContent(marker);
    return content.replace(new RegExp(_marker, "g"), `${value}`);
};
