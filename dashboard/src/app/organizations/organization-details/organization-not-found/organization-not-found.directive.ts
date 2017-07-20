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

/**
 * @ngdoc directive
 * @name organization.details:OrganizationNotFound
 * @restrict E
 * @element
 *
 * @description
 * `<organization-not-found organization-name="myOrganization"></organization-not-found>` for displaying "Organization not found" page.
 *
 * @usage
 *   <organization-not-found organization-name="myOrganization"></organization-not-found>
 *
 * @author Oleksii Kurinnyi
 */
export class OrganizationNotFound implements ng.IDirective {
  restrict: string = 'E';
  replace: boolean = true;
  templateUrl: string = 'app/organizations/organization-details/organization-not-found/organization-not-found.html';

  scope: any = {
    organizationName: '='
  };

}
