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
package com.codenvy.wsagent.server;

import org.eclipse.che.api.core.websocket.commons.WebSocketMessageReceiver;
import org.eclipse.che.api.core.websocket.impl.BasicWebSocketEndpoint;
import org.eclipse.che.api.core.websocket.impl.GuiceInjectorEndpointConfigurator;
import org.eclipse.che.api.core.websocket.impl.MessagesReSender;
import org.eclipse.che.api.core.websocket.impl.WebSocketSessionRegistry;

import javax.inject.Inject;
import javax.websocket.server.ServerEndpoint;

/**
 * Duplex WEB SOCKET endpoint, handles messages, errors, session open/close events.
 * This is needed for Hosted version (Codenvy package).
 * In multi node installation we have some additional network configuration.
 * It produces additional path param in URL to wsagent which describe node domain and port where wsagent is launched.
 * Mapping for WebSocket Endpoint changed has changed according this rule.
 * For resolving URL correctly added {node.port_host} parameter we don't use it iny logic construction.
 *
 * @author Vitalii Parfonov
 */

@ServerEndpoint(value = "/{node.port_host}/websocket/{endpoint-id}", configurator = GuiceInjectorEndpointConfigurator.class)
public class CodenvyWebSocketEndpoint extends BasicWebSocketEndpoint {

    @Inject
    public CodenvyWebSocketEndpoint(WebSocketSessionRegistry registry,
                                    MessagesReSender reSender,
                                    WebSocketMessageReceiver receiver) {
        super(registry, reSender, receiver);
    }
}
