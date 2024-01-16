import * as React from 'react';
import {IPlugin, PluginStore} from 'react-pluggable';
import i18next from 'i18next';
import en from './i18n/en';
import fa from './i18n/fa';
import  Roles from './components/Roles';
import GlobalConstants from 'app/global/GlobalConstants';
class RolesPlugin implements IPlugin {
    pluginStore!: PluginStore;


    getPluginName(): string {
        return `${GlobalConstants.Plugins.Roles.Name}@0.1.0`;
    }

    getDependencies(): string[] {
        return [];
    }

    init(pluginStore: PluginStore): void {
        this.pluginStore = pluginStore;
    }

    activate(): void {
        i18next.addResourceBundle(GlobalConstants.langCodes.en, GlobalConstants.Plugins.Roles.Name, en);
        i18next.addResourceBundle(GlobalConstants.langCodes.fa, GlobalConstants.Plugins.Roles.Name, fa);
        this.pluginStore.executeFunction('Renderer.add', `${GlobalConstants.Plugins.Roles.Functions.Activate}`, () => (
            <Roles/>
        ));
    }

    deactivate(): void {
        this.pluginStore.removeFunction(`${GlobalConstants.Plugins.Roles.Functions.Activate}`);
    }
}

export default RolesPlugin;
