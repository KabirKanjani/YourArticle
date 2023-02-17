import { BaseKey } from "@pankod/refine-core";
export interface AuthorCardProp{
  id?: BaseKey | undefined;
  name: string;
  email: string;
  avatar: string;
  noOfArticles: number;
}

export interface InfoBarProps {
  icon: ReactNode;
  name: string;
}
