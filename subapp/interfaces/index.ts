export interface INavigationContainerProps {
  navigate: (screenName: string, params?: any) => void;
}

export interface IData {
  username: string;
  userId: string;
  defaultRoleId: string;
  defaultWarehouseId: string;
  roleId: string;
  warehouseId: string;
  organization: string;
  client: string;
}