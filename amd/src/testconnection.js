// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Tests the connection to the Edflex API.
 *
 * @module    mod_edflex/testconnection
 * @copyright 2025 Edflex <support@edflex.com>
 * @license   https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Ajax from 'core/ajax';
import {get_strings as getStrings} from 'core/str';

export const init = () => {
    document.body.addEventListener('click', async(e) => {
        if (e.target && e.target.id === 'mod_edflex_test_api_connection_btn') {
            const [successMessage, errorMessage] = await getStrings([
                {key: 'apiconnectionsuccess', component: 'mod_edflex'},
                {key: 'apiconnectionerror', component: 'mod_edflex'}
            ]);

            const notificationContainer = document.getElementById('mod_edflex_connection_status');
            notificationContainer.textContent = '';

            const apiurl = document.getElementById('id_s_mod_edflex_apiurl')?.value || '';
            const clientid = document.getElementById('id_s_mod_edflex_clientid')?.value || '';
            const clientsecret = document.getElementById('id_s_mod_edflex_clientsecret')?.value || '';

            const args = {apiurl, clientid, clientsecret};

            const xhr = Ajax.call([{
                methodname: 'mod_edflex_test_api_connection',
                args: args
            }])[0];

            xhr.done((response) => {
                if (response.success) {
                    notificationContainer.textContent = successMessage;
                } else {
                    notificationContainer.textContent = errorMessage;
                }
            });

            xhr.fail((error) => {
                const msg = error?.message || '';
                const pre = document.createElement('pre');
                pre.textContent = `${errorMessage} ${msg}`;
                notificationContainer.textContent = '';
                notificationContainer.appendChild(pre);
            });
        }
    });
};
