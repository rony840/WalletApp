import Realm from 'realm';

export class Task extends Realm.Object {

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      isCompleted: { type: 'bool', default: false },
    },
  };
}
