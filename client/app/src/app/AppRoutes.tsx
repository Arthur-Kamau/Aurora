import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from './components/spinner/spinner';

const Error404Page = lazy(() => import('./components/error/error_404'));
const Error500Page = lazy(() => import('./components/error/error_500'));

const CreateToolPage = lazy(() => import('./components/create_tool/create_tool'));
const ConnectionTool = lazy(() => import('./components/connection_tool/connection_tool'));
const DumpServerPage = lazy(() => import('./components/dump_server/dump_server'));
const SettingsPage = lazy(() => import('./components/settings/settings'));

// const EditorHomePage = lazy(() => import('./components/editor/editor_home'));
const AppGenerator = lazy(() => import('./components/generator/generator'));


const ResetPasswordPage = lazy(() => import('./components/auth/reset-password'));
const RegisterPage = lazy(() => import('./components/auth/register'));
const LoginPage = lazy(() => import('./components/auth/login'));
const LoginKey = lazy(() => import('./components/auth/login-key'));
const LoginFillPersonalDetails = lazy(() => import('./components/auth/login-fill-personal-details'));
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
                    {/* <Route path="/generator" websocket={this.props.websocket} component={AppGenerator} /> */}
                    <Route path="/generator" component={() => <AppGenerator   />}  />
                    <Route exact path="/dump_server" component={DumpServerPage} />
                    <Route exact path="/create_tool" component={ CreateToolPage} />
                    <Route exact path="/connection_tool" component={ConnectionTool} />
                    <Route exact path="/505" component={Error500Page} />
                    <Route exact path="/404" component={Error404Page} />
                    <Route exact path="/settings" component={SettingsPage} />

                    <Route exact path="/logout" component={LogoutPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/login-key" component={LoginKey} />
                    <Route exact path="/login-personal-details" component={LoginFillPersonalDetails} />
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
