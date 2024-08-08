import { Authenticated, Refine } from "@refinedev/core";
import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { App as AntdApp } from "antd";
import { Logo } from "@/components/logo";
import { Header } from "@/components/header";
import {
  AccountsPageCreate,
  AccountsPageEdit,
  AccountsPageList,
} from "@/pages/accounts";
import { dataProvider } from "@/providers/data-provider";
import { authProvider } from "@/providers/auth-provider";
import { ConfigProvider } from "@/providers/config-provider";
import {
  ClientsPageCreate,
  ClientsPageEdit,
  ClientsPageList,
} from "./pages/clients";
import { InvoicePageList } from "./pages/invoices";
import "@refinedev/antd/dist/reset.css";
import "./styles/custom.css";

const App: React.FC = () => {
  return (
    <DevtoolsProvider>
      <BrowserRouter>
        <ConfigProvider>
          <AntdApp>
            <Refine
              routerProvider={routerProvider}
              authProvider={authProvider}
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "accounts",
                  list: "/accounts",
                  create: "/accounts/new",
                  edit: "/accounts/:id/edit",
                },
                {
                  name: "clients",
                  list: "/clients",
                  create: "/clients/new",
                  edit: "/clients/:id/edit",
                },
                {
                  name: "invoices",
                  list: "/invoices",
                  show: "/invoices/:id",
                  create: "/invoices/new",
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                breadcrumb: false,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-routes"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2
                        Header={() => <Header />}
                        Sider={() => null}
                      >
                        <div
                          style={{
                            maxWidth: "1280px",
                            padding: "24px",
                            margin: "0 auto",
                          }}
                        >
                          <Outlet />
                        </div>
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<NavigateToResource />} />
                  <Route
                    path="/accounts"
                    element={
                      <AccountsPageList>
                        <Outlet />
                      </AccountsPageList>
                    }
                  >
                    <Route index element={null} />
                    <Route path="new" element={<AccountsPageCreate />} />
                  </Route>
                  <Route
                    path="/accounts/:id/edit"
                    element={<AccountsPageEdit />}
                  />

                  <Route
                    path="/clients"
                    element={
                      <ClientsPageList>
                        <Outlet />
                      </ClientsPageList>
                    }
                  >
                    <Route index element={null} />
                    <Route path="new" element={<ClientsPageCreate />} />
                  </Route>
                  <Route
                    path="/clients/:id/edit"
                    element={<ClientsPageEdit />}
                  />

                  <Route path="/invoices">
                    <Route index element={<InvoicePageList />} />
                  </Route>
                </Route>

                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        type="login"
                        registerLink={false}
                        forgotPasswordLink={false}
                        title={
                          <Logo
                            titleProps={{ level: 2 }}
                            svgProps={{ width: "48px", height: "48px" }}
                          />
                        }
                        formProps={{
                          initialValues: {
                            email: "demo@refine.dev",
                            password: "demodemo",
                          },
                        }}
                      />
                    }
                  />
                </Route>

                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<div>Login page</div>} />
                </Route>

                <Route
                  element={
                    <Authenticated key="catch-all">
                      <ThemedLayoutV2
                        Header={() => <Header />}
                        Sider={() => null}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ConfigProvider>
      </BrowserRouter>
    </DevtoolsProvider>
  );
};

export default App;
