import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';
import mock from '../mock';


let walletsApi = mockApi.components.examples.wallets.value;
mock.onGet('/api/wallets').reply(({ data }) => {
  return [200,walletsApi];
});


