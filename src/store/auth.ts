import {create} from 'zustand';
import {DEFAULT_START_PAGE, ROOT_FOLDER} from '../const/folder.ts';

type UserInfoType = {

}

type AuthState = {
  userInfo: string;
  openedFolders: string[];
  setActivePage: (value: string) => void;
  setOpenFolders: (value: string) => void;
  setFullPathFolder: (value: string[]) => void;
};

const useMenuStore = create<MenuState>((set) => ({
  activePage: DEFAULT_START_PAGE,
  openedFolders: [ROOT_FOLDER],
  setActivePage: (value) => set(() => ({activePage: value})),
  setOpenFolders: (value) => set((state) => {
    if (state.openedFolders.includes(value)) {
      return ({openedFolders: [...state.openedFolders.filter((item) => item !== value)]});
    } else {
      return ({openedFolders: [...state.openedFolders, value]});
    }
  }),
  setFullPathFolder: (value) => set(() => ({openedFolders: [ROOT_FOLDER, ...value]})),
}));

export default useMenuStore;
