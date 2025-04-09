import Realm from 'realm';
import { Task } from './model';

export const getRealm = async () => {
  return await Realm.open({
    schema: [Task],
  });
};
