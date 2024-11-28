import { IFile } from "./IFile";
import { INavigationContainerProps } from "./INavigationContainerProps";

export interface IHomeProps {
  language?: string;
  sharedFiles?: IFile[];
  navigationContainer: INavigationContainerProps;
}
