import { BaseKey } from "@pankod/refine-core";

export interface FormFieldProp {
  title: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  description: string;
  ArticleType: string;
  location: string;
  price: number | undefined;
}

export interface ArticleCardProps {
  id?: BaseKey | undefined;
  title: string;
  photo: string;
  desc:string;
  articleType:string;
}
