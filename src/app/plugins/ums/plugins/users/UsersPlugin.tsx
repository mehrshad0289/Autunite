import * as React from 'react';
import {IPlugin, PluginStore} from 'react-pluggable';
import i18next from 'i18next';
import en from './i18n/en';
import fa from './i18n/fa';
import  Users from './components/Users';
import GlobalConstants from 'app/global/GlobalConstants';
class UsersPlugin implements IPlugin {
    pluginStore!: PluginStore;


    getPluginName(): string {
        return `${GlobalConstants.Plugins.Users.Name}@0.1.0`;
    }

    getDependencies(): string[] {
        return [];
    }

    init(pluginStore: PluginStore): void {
        this.pluginStore = pluginStore;
    }

    activate(): void {
        i18next.addResourceBundle(GlobalConstants.langCodes.en, GlobalConstants.Plugins.Users.Name, en);
        i18next.addResourceBundle(GlobalConstants.langCodes.fa, GlobalConstants.Plugins.Users.Name, fa);
        this.pluginStore.executeFunction('Renderer.add', `${GlobalConstants.Plugins.Users.Functions.Activate}`, () => (
            <Users/>
        ));
    }

    deactivate(): void {
        this.pluginStore.removeFunction(`${GlobalConstants.Plugins.Users.Functions.Activate}`);
    }
}

export default UsersPlugin;
