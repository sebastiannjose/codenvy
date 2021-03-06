/*
 * Copyright (c) [2012] - [2017] Red Hat, Inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */
package com.codenvy.resource.shared.dto;

import com.codenvy.resource.model.AccountLicense;
import java.util.List;
import org.eclipse.che.dto.shared.DTO;

/** @author Sergii Leschenko */
@DTO
public interface AccountLicenseDto extends AccountLicense {
  @Override
  String getAccountId();

  void setAccountId(String accountId);

  AccountLicenseDto withAccountId(String accountId);

  @Override
  List<ProvidedResourcesDto> getResourcesDetails();

  void setResourcesDetails(List<ProvidedResourcesDto> resourcesDetails);

  AccountLicenseDto withResourcesDetails(List<ProvidedResourcesDto> resourcesDetails);

  @Override
  List<ResourceDto> getTotalResources();

  void setTotalResources(List<ResourceDto> totalResources);

  AccountLicenseDto withTotalResources(List<ResourceDto> totalResources);
}
