import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const CreateToolPage = lazy(() => import('./create_tool/create_tool'));
const Error404 = lazy(() => import('./error/Error404'));
const Error500 = lazy(() => import('./error/Error500'));
const BlankPage = lazy(() => import('./blank/BlankPage'));
const SettingsPage = lazy(() => import('./settings/settings'));
const LoginPage = lazy(() => import('./auth/login/Login'));
const RegisterPage = lazy(() => import('./auth/register/Register'));
const ConfirmKeyPage = lazy(() => import('./auth/confirm-key/confirm-key'));
const ForgotPasswordPage = lazy(() => import('./auth/forgot-password/forgot-password'));
const ResetPassword = lazy(() => import('./auth/reset-password/reset-password'));
const ToJsonPage = lazy(() => import('./toJson/toJson'));
const FromJson = lazy(() => import('./FromJson/FromJson'));
const SchedulePage = lazy(() => import('./schedule/schedule'));

const WebsocketTestPage = lazy(() => import('./tool/websockets'));
const MqttTestPage = lazy(() => import('./tool/mqtt'));
const GraphQlTestPage = lazy(() => import('./tool/grqphql'));
const RestToolPage = lazy(() => import('./tool/rest'));
const DumpServerPage = lazy(() => import('./dump_server/dump_server'));



class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/" component={ Dashboard } />
          <Route exact path="/home" component={ Dashboard } />
          <Route exact path="/dashboard" component={ Dashboard } />

          <Route exact path="/login" component={ LoginPage } />
          <Route exact path="/register" component={ RegisterPage } />
          <Route exact path="/forgot-password" component={ ForgotPasswordPage } />
          <Route exact path="/confirm-key" component={ ConfirmKeyPage } />
          <Route exact path="/set-password" component={ ResetPassword } />
     
          <Route exact path="/create_tool" component={ CreateToolPage} />
          <Route  path="/projects" component={ BlankPage } />

          <Route exact path="/schedule" component={ SchedulePage} />

          <Route exact path="/generator" component={ BlankPage} />
          <Route exact path="/generator/to-json" component={ ToJsonPage} />
          <Route exact path="/generator/from-json" component={ FromJson} />


          <Route exact path="/tool" component={ BlankPage} />
          <Route exact path="/tool/rest" component={ RestToolPage} />
          <Route exact path="/tool/websocket" component={ WebsocketTestPage } />
          <Route exact path="/tool/mqtt" component={ MqttTestPage} />
          <Route exact path="/tool/graphql" component={ GraphQlTestPage } />

          <Route exact path="/dump_server" component={ DumpServerPage} />

          <Route exact path="/websocket" component={ BlankPage} />
          
          <Route exact path="/dump-server" component={ BlankPage} />

          <Route exact path="/settings" component={ SettingsPage} />

          <Route exact path="/404" component={ Error404} />
          <Route exact path="/500" component={ Error500} />

          <Redirect to="/404"  />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;