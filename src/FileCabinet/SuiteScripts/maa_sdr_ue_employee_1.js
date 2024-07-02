
/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * 
 */
define(['N/record', 'N/http'],
    function (record) {

        return {

            afterSubmit: function (context) {
                var employee = context.newRecord;

                var supervisor = record.load({
                    type: record.Type.EMPLOYEE  ,
                    id: employee.getValue('supervisor')
                });

                log.debug('Emp Name', employee.getValue('entityid'));
                log.debug('Supervisor ID', employee.getValue('supervisor'));
                log.debug('Supervisor Name', employee.getText('supervisor'));
                log.debug('Supervisor Email', supervisor.getValue('email'));

            }
        };
    });