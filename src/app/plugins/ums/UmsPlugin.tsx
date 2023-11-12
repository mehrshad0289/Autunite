import * as React from 'react';
import {IPlugin, PluginStore} from 'react-pluggable';
import i18next from 'i18next';
import en from './i18n/en';
import fa from './i18n/fa';
import GlobalConstants from "../../global/GlobalConstants";
import UsersPlugin from "./plugins/users/UsersPlugin";
import GroupsPlugin from "./plugins/groups/GroupsPlugin";
import RolesPlugin from "./plugins/roles/RolesPlugin";
class UmsPlugin implements IPlugin {
    pluginStore!: PluginStore;


    getPluginName(): string {
        return `${GlobalConstants.Plugins.Ums.Name}@0.1.0`;
    }

    getDependencies(): string[] {
        return [];
    }

    init(pluginStore: PluginStore): void {
        this.pluginStore = pluginStore;
    }

    activate(): void {
        i18next.addResourceBundle(GlobalConstants.langCodes.en, GlobalConstants.Plugins.Ums.Name, en);
        i18next.addResourceBundle(GlobalConstants.langCodes.fa, GlobalConstants.Plugins.Ums.Name, fa);
        this.pluginStore.install(new UsersPlugin());
        this.pluginStore.install(new GroupsPlugin());
        this.pluginStore.install(new RolesPlugin());

    }

    deactivate(): void {
        this.pluginStore.removeFunction(`${GlobalConstants.Plugins.Ums.Functions.Activate}`);
    }
}

export default UmsPlugin;
