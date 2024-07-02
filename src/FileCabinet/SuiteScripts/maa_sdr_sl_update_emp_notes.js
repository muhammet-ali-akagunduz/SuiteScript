/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget','N/record','N/redirect'],
    /**
 * @param{serverWidget} serverWidget
 * @param{record} record
 * @param{redirect} redirect
 */
    (serverWidget,record,redirect) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (context) => {

            var request = context.request;
            var response = context.response;

            if (request.method == 'GET') {
                var name = request.parameters.sdr_name;
                var notes = request.parameters.sdr_notes;
                var empId = request.parameters.sdr_empid;

                var form = serverWidget.createForm({
                    title: 'Update Employee Notes',
                    //hideNavBar : true
                });

                var nameFld = form.addField({
                    id: 'custpage_sdr_emp_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                });

                var notesFld = form.addField({
                    id: 'custpage_sdr_notes',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Notes'
                });

                var empIdFld = form.addField({
                    id: 'custpage_sdr_emp_id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'EMP ID'
                });

                form.addSubmitButton('Continue');

                nameFld.defaultValue = name;
                notesFld.defaultValue = notes;
                empIdFld.defaultValue = empId;

                nameFld.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.INLINE
                });
                empIdFld.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN
                });



                response.writePage(form);
            }else{//POST
                var empId =request.parameters.custpage_sdr_emp_id;
                var notes =request.parameters.custpage_sdr_notes;

                var employee = record.load({
                    type : record.Type.EMPLOYEE,
                    id : empId
                });

                employee.setValue('comments',notes);
                employee.save();

                redirect.toRecord({
                    type : record.Type.EMPLOYEE,
                    id : empId
                });
            }


        }

        return { onRequest }

    });
