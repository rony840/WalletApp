import { create } from 'zustand';
import { getRealm } from '../database/db';

export const useTaskStore = create((set) => ({
  tasks: [],

  fetchTasks: async () => {
    const realm = await getRealm();
    const realmTasks = realm.objects('Task');
    const tasks = realmTasks.map((t) => ({
      id: t._id.toHexString(),
      name: t.name,
      isCompleted: t.isCompleted,
    }));
    set({ tasks });
    realm.close();
  },

  addTask: async (name) => {
    const realm = await getRealm();
    realm.write(() => {
      realm.create('Task', {
        _id: new Realm.BSON.ObjectId(),
        name,
        isCompleted: false,
      });
    });
    realm.close();
    await useTaskStore.getState().fetchTasks();
  },

  updateTask: async (task) => {
    const realm = await getRealm();
    realm.write(() => {
      const target = realm.objectForPrimaryKey('Task', new Realm.BSON.ObjectId(task.id));
      if (target) {
        target.isCompleted = !target.isCompleted;
      }
    });
    realm.close();
    await useTaskStore.getState().fetchTasks();
  },

  updateTaskName: async (id, newName) => {
    const realm = await getRealm();
    realm.write(() => {
      const task = realm.objectForPrimaryKey('Task', new Realm.BSON.ObjectId(id));
      if (task) {
        task.name = newName;
      }
    });
    realm.close();
    await useTaskStore.getState().fetchTasks();
  },

  deleteTask: async (task) => {
    const realm = await getRealm();
    realm.write(() => {
      const target = realm.objectForPrimaryKey('Task', new Realm.BSON.ObjectId(task.id));
      if (target) {
        realm.delete(target);
      }
    });
    realm.close();
    await useTaskStore.getState().fetchTasks();
  },
}));