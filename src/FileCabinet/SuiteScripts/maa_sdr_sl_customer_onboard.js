/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/email', 'N/record', 'N/redirect', 'N/ui/serverWidget'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{redirect} redirect
 * @param{serverWidget} serverWidget
 */
    (email, record, redirect, serverWidget) => {
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
                var customerId = request.parameters.sdr_empid;
                var phone = request.parameters.sdr_phone;
                var email = request.parameters.sdr_email;
                var supervisor = request.parameters.sdr_supervisor;

                var form = serverWidget.createForm({
                    title: 'Customer Onboarding',
                    hideNavBar: false
                });
                // Customer Info Field And Group

                var customerInfoGrp = form.addFieldGroup({
                    id: 'custpage_grp_customer',
                    label: 'Customer Information',
                });

                var nameFld = form.addField({
                    id: 'custpage_nfo_name',
                    type: serverWidget.FieldType.SELECT,
                    source: 'employee',
                    label: 'Customer Name',
                    container: 'custpage_grp_customer'
                });
                var salesRepFld = form.addField({
                    id: 'custpage_nfo_sales_rep',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Supervisor',
                    source: 'employee',
                    container: 'custpage_grp_customer'
                });
                var phoneFld = form.addField({
                    id: 'custpage_nfo_phone',
                    type: serverWidget.FieldType.PHONE,
                    label: 'Phone',
                    container: 'custpage_grp_customer'
                });

                //Task Field && Task Field GROUP

                var taskGrp = form.addFieldGroup({
                    id: 'custpage_grp_task',
                    label: 'Onboarding Task',
                });

                var taskTitleFld = form.addField({
                    id: 'custpage_nfo_task_title',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Task Title',
                    container: 'custpage_grp_task'
                });
                var taskFld = form.addField({
                    id: 'custpage_nfo_task',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Task Notes',
                    container: 'custpage_grp_task'
                });

                // E-Mail Field && E-mail Field GROUP

                var emailGrp = form.addFieldGroup({
                    id: 'custpage_grp_email',
                    label: 'Welcome Email',
                });

                var emailSubjFld = form.addField({
                    id: 'custpage_nfo_email_subj',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Subject',
                    container: 'custpage_grp_email'
                });
                var emailBodyFld = form.addField({
                    id: 'custpage_nfo_email_body',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Body',
                    container: 'custpage_grp_email'
                });
                var noteFld = form.addField({
                    id: 'custpage_nfo_email_note',
                    type: serverWidget.FieldType.HELP,
                    label: 'NOTE : These task are important customer onboarding tasks. Please make sure these are not skipped.',
                    container: 'custpage_grp_email'
                });

                form.addSubmitButton('Complete Proccess');

                nameFld.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.INLINE
                });
                salesRepFld.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.INLINE
                });
                phoneFld.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.INLINE
                });

                emailBodyFld.updateDisplaySize({
                    height: 20,
                    width: 80
                });

                noteFld.updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.OUTSIDEABOVE
                });

                taskTitleFld.isMandatory = true;
                noteFld.isMandatory = true;
                emailSubjFld.isMandatory = true;
                emailBodyFld.isMandatory = true;

                nameFld.defaultValue = customerId;
                phoneFld.defaultValue = phone;
                salesRepFld.defaultValue = supervisor;
                //emailSubjFld.defaultValue = email;

                response.writePage(form);
            } else {//POST Request 
                var customerId = request.parameters.custpage_nfo_name;
                var tskTitle = request.parameters.custpage_nfo_task_title;
                var tskNotes = request.parameters.custpage_nfo_task;

                var task = record.create({
                    type: record.Type.TASK,
                    isDynamic: true
                });

                /*task.setValue({
                    fieldId: 'company',
                    value: 'sdr_empid'
                });*/

                task.setValue({
                    fieldId: 'title',
                    value: tskTitle
                });

                task.setValue({
                    fieldId: 'message',
                    value: tskNotes
                });

                task.save();

                redirect.toRecord({
                    id: customerId,
                    type: record.Type.EMPLOYEE,
                    isEditMode: true
                });

                //response.writePage(form);

            }

        }
        return { onRequest }
    });

    