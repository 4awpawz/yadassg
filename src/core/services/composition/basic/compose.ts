/**
 * Compose - Compose pages using CategorizedPages.
 */

import { composeWithoutPage } from "./composeWithoutPage.js";
import { composeWithPage } from "./composeWithPage.js";
import type { Assets } from "../../../../types/types";
import * as metrics from "../../../lib/metrics.js";

export const compose = async function(assets: Assets): Promise<Assets> {
    metrics.startTimer("composition");
    for (const _asset of assets) {
        if (_asset.assetType !== "template") continue;
        _asset.associatedPage === "" ? await composeWithoutPage(_asset, assets) : await composeWithPage(_asset, assets);
        // TODO: 23/01/04 15:33:01 - jeffreyschwartz : If the asset is a collection, maybe process it here or maybe after hydration occurs so that hydration won't have to be repeated for every generated page in the collection?
    }
    metrics.stopTimer("composition");
    return assets;
};
