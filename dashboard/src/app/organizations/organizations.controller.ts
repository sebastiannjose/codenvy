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
import {CodenvyOrganization} from '../../components/api/codenvy-organizations.factory';
import {CodenvyPermissions} from '../../components/api/codenvy-permissions.factory';
import {CodenvyTeamEventsManager} from '../../components/api/codenvy-team-events-manager.factory';

const MAX_ITEMS = 12;

/**
 * @ngdoc controller
 * @name organizations.controller:OrganizationsController
 * @description This class is handling the controller for organizations
 * @author Oleksii Orel
 */
export class OrganizationsController {
  /**
   * Promises service.
   */
  private $q: ng.IQService;
  /**
   * Organization API interaction.
   */
  private codenvyOrganization: CodenvyOrganization;
  /**
   * Service for displaying notifications.
   */
  private cheNotification: any;
  /**
   * Loading state of the page.
   */
  private isInfoLoading: boolean;
  /**
   * List of organizations.
   */
  private organizations: Array<any> = [];
  /**
   * Page info object.
   */
  private pageInfo: che.IPageInfo;
  /**
   * Has admin user service.
   */
  private hasAdminUserService: boolean;

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor(codenvyOrganization: CodenvyOrganization, cheNotification: any,
              codenvyTeamEventsManager: CodenvyTeamEventsManager, $scope: ng.IScope,
              $q: ng.IQService, codenvyPermissions: CodenvyPermissions, $rootScope: che.IRootScopeService) {
    this.codenvyOrganization = codenvyOrganization;
    this.cheNotification = cheNotification;
    this.$q = $q;

    (<any>$rootScope).showIDE = false;

    this.hasAdminUserService = codenvyPermissions.getUserServices().hasAdminUserService;
    let refreshHandler = () => {
      this.fetchOrganizations();
    };
    codenvyTeamEventsManager.addDeleteHandler(refreshHandler);
    codenvyTeamEventsManager.addRenameHandler(refreshHandler);

    $scope.$on('$destroy', () => {
      codenvyTeamEventsManager.removeRenameHandler(refreshHandler);
      codenvyTeamEventsManager.removeDeleteHandler(refreshHandler);
    });
    this.fetchOrganizations();
  }

  /**
   * Fetches the list of root organizations.
   * @param pageKey {string}
   */
  fetchOrganizations(pageKey?: string): void {
    this.isInfoLoading = true;
    let promise: ng.IPromise<Array<codenvy.IOrganization>>;
    if (angular.isDefined(pageKey)) {
      promise = this.codenvyOrganization.fetchOrganizationPageObjects(pageKey);
    } else {
      // todo remove admin's condition after adding query search to server side
      promise = this.codenvyOrganization.fetchOrganizations(!this.hasAdminUserService ? MAX_ITEMS : 30);
    }

    promise.then((userOrganizations: Array<codenvy.IOrganization>) => {
      this.pageInfo = angular.copy(this.codenvyOrganization.getPageInfo());
      this._updateOrganizationList(userOrganizations);
    }, (error: any) => {
      let message = error.data && error.data.message ? error.data.message : 'Failed to retrieve organizations.';
      this.cheNotification.showError(message);
    }).finally(() => {
      this.isInfoLoading = false;
    });
  }

  _updateOrganizationList(organizations: Array<codenvy.IOrganization>): void {
    // todo remove this admin's condition after adding query search to server side
    if (this.hasAdminUserService) {
      this.organizations = organizations.filter((organization: codenvy.IOrganization) => {
        return !organization.parent;
      });
      return;
    }
    this.organizations = organizations;
  }

  /**
   * Gets the list of organizations.
   *
   * @returns {Array<codenvy.IOrganization>}
   */
  getOrganizations(): Array<codenvy.IOrganization> {
    return this.organizations;
  }
}
