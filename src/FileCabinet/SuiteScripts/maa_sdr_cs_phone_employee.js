/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (context) => {
            //log.debug("Hello World");

            var employee = context.newRecord;
            var empCode = employee.getValue('custentity_sdr_employee_code');
            //var supervisorName = employee.getText('supervisor');
            var supervisorId = employee.getValue('supervisor');
            //var employeeName = employee.getText('entityid');

            employee.setValue('custentity_sdr_employee_code','EMP002');

            log.debug('Employee Code',empCode);
            //log.debug('Employee Name',employeeName);
            log.debug('Supervisor ID',supervisorId);
            //log.debug('Supervisor Name',supervisorName);
            if(context.type == context.UserEventType.CREATE){
                var phoneCall = record.create({
                    type : record.Type.PHONE_CALL,
                    defaultValues : {
                        customform : -150
                    }
                });
                
                phoneCall.setValue('title','Call HR for benefirs');
                
                phoneCall.setValue('assigned',employee.id);
                
                phoneCall.save();
            }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
