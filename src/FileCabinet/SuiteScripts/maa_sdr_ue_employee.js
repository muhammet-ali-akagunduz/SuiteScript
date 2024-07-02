/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/redirect'],
    /**
     * 
     * @param {record} record 
     * @param {redirect} redirect 
     * @returns 
     */
    function (record, redirect) {

        return {
            afterSubmit: function (context) {

                var employee = context.newRecord;
                var empCode = employee.getValue('custentity_sdr_employee_code');
                var supervisorName = employee.getText('supervisor');
                var supervisorId = employee.getValue('supervisor');
                var employeeName = employee.getText('entityid');

                employee.setValue('custentity_sdr_employee_code', 'EMP002');

                //log.debug('Employee Code',empCode);
                //log.debug('Employee Name',employeeName);
                //log.debug('Supervisor ID',supervisorId);
                //log.debug('Supervisor Name',supervisorName);
                //log.debug("0");
                if (context.type == context.UserEventType.CREATE) {
                    //log.debug('1');
                    var phoneCall = record.create({
                        type: record.Type.PHONE_CALL
                    });
                    phoneCall.setValue('title', 'Call HR for benefirs');
                    phoneCall.setValue('assigned', employee.id);
                    phoneCall.save();
                }
                redirect.toSuitelet({
                    scriptId: 'customscript_maa_sdr_customer_onboard',
                    deploymentId: 'customdeploy_maa_sdr_customer_onboard',
                    parameters: {
                        sdr_name: employee.getValue('entityid'),
                        sdr_phone: employee.getValue({ fieldId: 'phone' }),
                        sdr_email: employee.getValue({ fieldId: 'email' }),
                        sdr_supervisor: employee.getValue({ fieldId: 'supervisor' }),
                        sdr_empid: employee.id
                    }
                });
            }
        };
    });