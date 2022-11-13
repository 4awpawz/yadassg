import type { ComponentIdentifier, ComponentsMap, Component } from "../../../../types/types";
import { join } from "path";
import { getConfiguration } from "../../configuration/getConfiguration.js";
import { findAndReplaceTokenContent } from "../../../lib/token/findAndReplaceTokenContent.js";

const config = (await getConfiguration());

const getComponent = async function(modulePath: string, moduleName: string): Promise<Component> {
    // Dynamic import returns promise.
    let component;
    try {
        const _modulePath = join(process.cwd(), config.libFolder, modulePath);
        component = await import(_modulePath).then(module => module[moduleName]);
    } catch (error) {
        // TODO: 22/11/17 09:10:14 - jeffreyschwartz : Shouldn't execution be aborted here by rethrowing the error?
        return undefined;
    }
    return component;
};

export const hydrateContent = async function(content: string, componentTokensPaths: string[], componentsMap: ComponentsMap): Promise<string> {
    const runtimeCWD = join(process.cwd(), config.libFolder);
    const cwd = process.cwd();
    for (const componentTokenPath of componentTokensPaths) {
        const componentIdentifier: ComponentIdentifier = componentsMap[componentTokenPath] as ComponentIdentifier;
        const component: Component = await getComponent(componentIdentifier.modulePath, componentIdentifier.moduleName);
        // *Important: Set the cwd to 'cwd/lib' so that component calls to import using relative paths are resolved relative to the lib folder.
        if (typeof component === "undefined") return content;
        process.chdir(runtimeCWD);
        // Components are always called asynchronously.
        const componentContent = await component();
        process.chdir(cwd);
        if (typeof componentContent === "undefined") return content;
        content = findAndReplaceTokenContent(content, componentTokenPath, componentContent);
    }
    return content;
};
