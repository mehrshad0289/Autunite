import * as React from 'react';
import {IPlugin, PluginStore} from 'react-pluggable';
import i18next from 'i18next';
import en from './i18n/en';
import fa from './i18n/fa';
import GlobalConstants from "../../global/GlobalConstants";
import  Map from './components/Map';
class MapPlugin implements IPlugin {
    pluginStore!: PluginStore;


    getPluginName(): string {
        return `${GlobalConstants.Plugins.Map.Name}@0.1.0`;
    }

    getDependencies(): string[] {
        return [];
    }

    init(pluginStore: PluginStore): void {
        this.pluginStore = pluginStore;
    }

    activate(): void {
        i18next.addResourceBundle(GlobalConstants.langCodes.en, GlobalConstants.Plugins.Map.Name, en);
        i18next.addResourceBundle(GlobalConstants.langCodes.fa, GlobalConstants.Plugins.Map.Name, fa);
        this.pluginStore.executeFunction('Renderer.add', `${GlobalConstants.Plugins.Map.Functions.Activate}`, () => (
            <Map/>
        ));
    }

    deactivate(): void {
        this.pluginStore.removeFunction(`${GlobalConstants.Plugins.Map.Functions.Activate}`);
    }
}

export default MapPlugin;
