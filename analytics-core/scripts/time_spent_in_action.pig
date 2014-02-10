/*
 *
 * CODENVY CONFIDENTIAL
 * ________________
 *
 * [2012] - [2013] Codenvy, S.A.
 * All Rights Reserved.
 * NOTICE: All information contained herein is, and remains
 * the property of Codenvy S.A. and its suppliers,
 * if any. The intellectual and technical concepts contained
 * herein are proprietary to Codenvy S.A.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Codenvy S.A..
 */

DEFINE MongoStorage com.codenvy.analytics.pig.udf.MongoStorage('$STORAGE_USER', '$STORAGE_PASSWORD');
DEFINE UUID com.codenvy.analytics.pig.udf.UUID;

IMPORT 'macros.pig';

l1 = loadResources('$LOG', '$FROM_DATE', '$TO_DATE', '$USER', '$WS');
l = FOREACH l1 GENERATE *, '' AS id; -- it requires 'id' field in scheme

b = combineClosestEventsByID(l, '$EVENT-started', '$EVENT-finished');

a1 = filterByEvent(l, '$EVENT-started,$EVENT-finished');
a2 = extractParam(a1, 'ID', event_id);
a3 = removeNotEmptyField(a2, 'event_id');
a = combineClosestEvents(a3, '$EVENT-started', '$EVENT-finished');

r1 = UNION a, b;
r2 = FOREACH r1 GENERATE dt, ws, user, delta, dt;
result = FOREACH r1 GENERATE UUID(), TOTUPLE('date', ToMilliSeconds(dt)), TOTUPLE('ws', ws), TOTUPLE('user', user),
        TOTUPLE('time', delta), TOTUPLE('ide', ide);

STORE result INTO '$STORAGE_URL.$STORAGE_TABLE' USING MongoStorage;
