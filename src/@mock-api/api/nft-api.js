import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';
import mock from '../mock';



mock.onPost('/api/create-nft').reply(({ data }) => {
  return [200];
});


