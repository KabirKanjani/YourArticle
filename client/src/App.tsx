import React from "react";

import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";
import {
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
  AccountCircleOutlined
} from '@mui/icons-material'
import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { 
  Login,
  Home,
  MyProfile,
  ArticleDetails,
  Authors,
  AllArticles,
  CreateArticle,
  AuthorProfile,
  EditArticle,
  Categories,
  Category_List
 } from "pages/index";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

 function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response=await fetch("https://yourarticle.onrender.com/api/user/signup",{
          method:"POST",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            name:profileObj.name,
            email:profileObj.email,
            avatar:profileObj.picture,
          }
          )
        })
        const data=await response.json();
        console.log(data)
        if(response.status===200)
        {
          console.log("Accepted")
        localStorage.setItem("user",JSON.stringify({...profileObj,avatar:profileObj.picture,userid:data._id}));        
        }
        else{
          console.log("Rejected")
          return Promise.reject();
        }
  
      }
      console.log("Setting Up")
      localStorage.setItem("token", `${credential}`);
      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("https://yourarticle.onrender.com/api/article")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "Articles",
              list:AllArticles,
              show:ArticleDetails,
              create:CreateArticle,
              edit:EditArticle                            
            },
            {
              name: "Authors",
              list:Authors,       
              show:AuthorProfile,
              icon:<PeopleAltOutlined/>
            },
            {
              name: "Categories",
              list:Categories ,   
              show:Category_List,                       
              icon:<VillaOutlined/>
            },
           
            {
              name: "my-profile",
              options: { label: "My Profile " },
              list: MyProfile,
              icon: <AccountCircleOutlined />,   
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          // DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
