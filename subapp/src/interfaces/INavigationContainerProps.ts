export interface INavigationContainerProps {
  navigate: (screenName: string, params?: any) => void;
  goBack: () => void;
}
