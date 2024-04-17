/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface Config {
  /**
   * Configuration options for notifications-backend-module-email */
  notifications: {
    processors: {
      email: {
        /**
         * Transport to use for sending emails */
        transportConfig:
          | {
              transport: 'smtp';
              /**
               * SMTP server hostname
               */
              hostname: string;
              /**
               * SMTP server port
               */
              port: number;
              /**
               * Use secure connection for SMTP, defaults to false
               */
              secure?: boolean;
              /**
               * Require TLS for SMTP connection, defaults to false
               */
              requireTls?: boolean;
              /**
               * SMTP username
               */
              username?: string;
              /**
               * SMTP password
               * @visibility secret
               */
              password?: string;
            }
          | {
              transport: 'ses';
              /**
               * SES ApiVersion to use, defaults to 2010-12-01
               */
              apiVersion?: string;
              /**
               * AWS account ID to use
               */
              accountId?: string;
            }
          | {
              transport: 'sendmail';
              /**
               * Sendmail binary path, defaults to /usr/sbin/sendmail
               */
              path?: string;
              /**
               * Newline style, defaults to 'unix'
               */
              newline?: 'unix' | 'windows';
            };
        /**
         * Sender email address
         */
        sender: string;
        /**
         * Email format, defaults to HTML
         */
        format?: 'html' | 'text';
        /**
         * Optional reply-to address
         */
        replyTo?: string;
        /**
         * Configuration for broadcast notifications
         */
        broadcastConfig?: {
          /**
           * Receiver of the broadcast notifications:
           * none - skips sending
           * users - sends to all users in backstage, might have performance impact
           * config - sends to the emails specified in the config
           */
          receiver: 'none' | 'users' | 'config';
          /**
           * Broadcast notification receivers when receiver is set to config
           */
          receiverEmails?: string[];
        };
        /**
         * Email cache TTL, defaults to 1 hour
         */
        cacheTtl?: number;
      };
    };
  };
}
