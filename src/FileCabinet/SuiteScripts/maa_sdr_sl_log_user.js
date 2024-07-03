/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (context) => {
            var request = context.request;
            var expRepNo = request.parameters.sdr_tranId;
            var employeeId = -5;

            var employee = record.load({
                type : record.Type.EMPLOYEE,
                id : employeeId
            });

            log.debug('User '+employee.getValue('entityid')+' opened expense report number '+expRepNo);
        }

        return {onRequest}

    });
