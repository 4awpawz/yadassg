/**
 * composeWithTemplate - Compose with a template asset.
 */

import { _find } from "../../../lib/functional.js";
import { findAndReplaceTokenContent } from "../../../lib/token/findAndReplaceTokenContent.js";
import { composeIncludes } from "./composeIncludes.js";
import { composeTokens } from "./composeTokens.js";
import type { Asset } from "../../../../types/types";

export const composeWithTemplate = async function(asset: Asset, assets: Asset[]): Promise<Asset> {
    const associatedPage =
        _find(assets, _asset => _asset.assetType === "page" && _asset.fileName === asset.associatedPage) as Asset;
    if (!associatedPage)
        throw new Error(`there was an error: unable to find associated page for ${asset.fileName}`);
    // Inject the page's content into the Template's "page" token.
    asset.content = findAndReplaceTokenContent(associatedPage.content, "template", asset.content);
    // Resolve includes.
    asset = await composeIncludes(asset, assets);
    // Resolve front matter tokens.
    const frontmatterData = { ...associatedPage.fm.data, ...asset.fm.data };
    asset.content = composeTokens(asset.content, frontmatterData);
    return asset;
};