/*
 * Copyright (c) [2015] - [2017] Red Hat, Inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */
'use strict';

import {CodenvyAPI} from './codenvy-api.factory';
import {CodenvyPermissions} from './codenvy-permissions.factory';
import {CodenvySystem} from './codenvy-system.factory';
import {CodenvyTeam} from './codenvy-team.factory';
import {CodenvyTeamEventsManager} from './codenvy-team-events-manager.factory';
import {CodenvyResourcesDistribution} from './codenvy-resources-distribution.factory';
import {CodenvyAPIBuilder} from './builder/codenvy-api-builder.factory';
import {CodenvyHttpBackendFactory} from './test/codenvy-http-backend.factory';
import {CodenvyHttpBackendProviderFactory} from './test/codenvy-http-backend-provider.factory';
import {CodenvyPayment} from './codenvy-payment.factory';
import {CodenvyInvoices} from './codenvy-invoices.factory';
import {CodenvySubscription} from './codenvy-subscription.factory';
import {CodenvyInvite} from './codenvy-invite.factory';
import {CodenvyOrganization} from './codenvy-organizations.factory';


export class CodenvyApiConfig {

  constructor(register: che.IRegisterService) {
    register.app.constant('clientTokenPath', '/'); // is necessary for Braintree
    register.factory('codenvyPermissions', CodenvyPermissions);
    register.factory('codenvySystem', CodenvySystem);
    register.factory('codenvyTeam', CodenvyTeam);
    register.factory('codenvyOrganization', CodenvyOrganization);
    register.factory('codenvyTeamEventsManager', CodenvyTeamEventsManager);
    register.factory('codenvyAPI', CodenvyAPI);
    register.factory('codenvyAPIBuilder', CodenvyAPIBuilder);
    register.factory('codenvyHttpBackend', CodenvyHttpBackendFactory);
    register.factory('codenvyHttpBackendProvider', CodenvyHttpBackendProviderFactory);
    register.factory('codenvyResourcesDistribution', CodenvyResourcesDistribution);
    register.factory('codenvyPayment', CodenvyPayment);
    register.factory('codenvyInvoices', CodenvyInvoices);
    register.factory('codenvySubscription', CodenvySubscription);
    register.factory('codenvyInvite', CodenvyInvite);
  }
}
