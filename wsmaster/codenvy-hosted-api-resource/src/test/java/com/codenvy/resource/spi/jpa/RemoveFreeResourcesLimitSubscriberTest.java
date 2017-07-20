/*******************************************************************************
 * Copyright (c) [2012] - [2017] Red Hat, Inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 *******************************************************************************/
package com.codenvy.resource.spi.jpa;

import com.codenvy.resource.spi.FreeResourcesLimitDao;
import com.codenvy.resource.spi.jpa.JpaFreeResourcesLimitDao.RemoveFreeResourcesLimitSubscriber;

import org.eclipse.che.account.event.BeforeAccountRemovedEvent;
import org.eclipse.che.account.spi.AccountImpl;
import org.eclipse.che.api.core.notification.EventService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.testng.MockitoTestNGListener;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.verify;

/**
 * Tests for {@link RemoveFreeResourcesLimitSubscriber}
 *
 * @author Sergii Leschenko
 */
@Listeners(MockitoTestNGListener.class)
public class RemoveFreeResourcesLimitSubscriberTest {
    @Mock
    private EventService          eventService;
    @Mock
    private FreeResourcesLimitDao limitDao;

    @InjectMocks
    RemoveFreeResourcesLimitSubscriber subscriber;

    @Test
    public void shouldSubscribeItself() {
        subscriber.subscribe();

        verify(eventService).subscribe(eq(subscriber));
    }

    @Test
    public void shouldUnsubscribeItself() {
        subscriber.unsubscribe();

        verify(eventService).unsubscribe(eq(subscriber));
    }

    @Test
    public void shouldRemoveMembersOnBeforeOrganizationRemovedEvent() throws Exception {
        final AccountImpl account = new AccountImpl("id", "name", "test");

        subscriber.onEvent(new BeforeAccountRemovedEvent(account));

        verify(limitDao).remove("id");
    }
}
