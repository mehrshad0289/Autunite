import * as React from 'react';
import {IPlugin, PluginStore} from 'react-pluggable';
import i18next from 'i18next';
import en from './i18n/en';
import fa from './i18n/fa';
import  Groups from './components/Groups';
import GlobalConstants from 'app/global/GlobalConstants';
class GroupsPlugin implements IPlugin {
    pluginStore!: PluginStore;


    getPluginName(): string {
        return `${GlobalConstants.Plugins.Groups.Name}@0.1.0`;
    }

    getDependencies(): string[] {
        return [];
    }

    init(pluginStore: PluginStore): void {
        this.pluginStore = pluginStore;
    }

    activate(): void {
        i18next.addResourceBundle(GlobalConstants.langCodes.en, GlobalConstants.Plugins.Groups.Name, en);
        i18next.addResourceBundle(GlobalConstants.langCodes.fa, GlobalConstants.Plugins.Groups.Name, fa);
        this.pluginStore.executeFunction('Renderer.add', `${GlobalConstants.Plugins.Groups.Functions.Activate}`, () => (
            <Groups/>
        ));
    }

    deactivate(): void {
        this.pluginStore.removeFunction(`${GlobalConstants.Plugins.Groups.Functions.Activate}`);
    }
}

export default GroupsPlugin;
