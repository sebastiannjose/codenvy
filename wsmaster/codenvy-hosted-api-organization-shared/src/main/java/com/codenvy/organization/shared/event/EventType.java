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
package com.codenvy.organization.shared.event;

/**
 * Defines organizations event types.
 *
 * @author Anton Korneta
 */
public enum EventType {

  /** Published when organization name changed. */
  ORGANIZATION_RENAMED,

  /** Published when organization removed. */
  ORGANIZATION_REMOVED,

  /** Published when new member added to organization. */
  MEMBER_ADDED,

  /** Published when member removed from organization. */
  MEMBER_REMOVED
}
