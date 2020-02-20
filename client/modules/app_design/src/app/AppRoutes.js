import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from './components/spinner/spinner';

const Error404Page = lazy(() => import('./components/error/error_404'));
const Error500Page = lazy(() => import('./components/error/error_500'));


const SchemaGeneratorPage = lazy(() => import('./components/schema_generator/schema_generator'));
const JsonGeneratorPage = lazy(() => import('./components/json_generator/json_generator'));
const SettingsPage = lazy(() => import('./components/settings/settings'));





class AppRoutes extends Component {
    render() {
        return (
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route exact path="/json_generator" component={JsonGeneratorPage} />
                    <Route exact path="/schema_generator" component={SchemaGeneratorPage} />
                    <Route exact path="/505" component={Error500Page} />
                    <Route exact path="/404" component={Error404Page} />
                    <Route exact path="/settings" component={ SettingsPage} />
                    <Redirect to="/404" />

                </Switch>
            </Suspense>
        );
    }
}

export default AppRoutes;