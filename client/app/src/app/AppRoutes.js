import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from './components/spinner/spinner';

const Error404Page = lazy(() => import('./components/error/error_404'));
const Error500Page = lazy(() => import('./components/error/error_500'));


const ConnectionTool = lazy(() => import('./components/connection_tool/connection_tool'));
const DumpServerPage = lazy(() => import('./components/dump_server/dump_server'));
const SettingsPage = lazy(() => import('./components/settings/settings'));

// const EditorHomePage = lazy(() => import('./components/editor/editor_home'));
const AppGenerator = lazy(() => import('./components/generator/generator'));


const ResetPasswordPage = lazy(() => import('./components/auth/reset-passsword'));
const RegisterPage = lazy(() => import('./components/auth/register'));
const LoginPage = lazy(() => import('./components/auth/login'));
const LogoutPage = lazy(() => import('./components/auth/logout'));
const ForgotPasswordPage = lazy(() => import('./components/auth/forgot-password'));
const ForgotPasswordKeyPage = lazy(() => import('./components/auth/forgot-password-key'));



class AppRoutes extends Component {
    render() {
        return (
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route exact path='/'>
                        <Redirect to="/generator" />
                    </Route>
                    {/* <Route exact path="/project" component={EditorHomePage} /> */}
                    <Route path="/generator" component={AppGenerator} />
                    <Route exact path="/dump_server" component={DumpServerPage} />
                    <Route exact path="/connection_tool" component={ConnectionTool} />
                    <Route exact path="/505" component={Error500Page} />
                    <Route exact path="/404" component={Error404Page} />
                    <Route exact path="/settings" component={SettingsPage} />

                    <Route exact path="/logout" component={LogoutPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <Route exact path="/forgot-password" component={ForgotPasswordPage} />
                    <Route exact path="/forgot-password-key" component={ForgotPasswordKeyPage} />
                    <Route exact path="/reset-password" component={ResetPasswordPage} />

                    <Redirect to="/404" />

                </Switch>
            </Suspense>
        );
    }
}

export default AppRoutes;
