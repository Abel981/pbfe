import { createContext } from 'react';

const SidebarContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

export default SidebarContext;