/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],
    /**
 * @param{serverWidget} serverWidget
 */
    (serverWidget) => {
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
            var assistant = serverWidget.createAssistant({
                title: 'Customer Onboarding Assistant'
            });

            var customerStp = assistant.addStep({
                id: 'custpage_sdr_customer_step',
                label: 'Customer Information'
            });
            var taskStep = assistant.addStep({
                id: 'custpage_sdr_task',
                label: 'Task Details'
            });
            var emailStp = assistant.addStep({
                id: 'custpage_sdr_email',
                label: 'Welcome Email'
            });
            var finalizeStp = assistant.addStep({
                id: 'custpage_sdr_finalize',
                label: 'Review and Finalize'
            });







            if (assistant.getLastAction() == serverWidget.AssistantSubmitAction.NEXT || assistant.getLastAction() == serverWidget.AssistantSubmitAction.BACK) {
                assistant.currentStep = assistant.getNextStep();

            } else if (assistant.getLastAction() == serverWidget.AssistantSubmitAction.CANCEL) {
                assistant.currentStep = assistant.getStep({ id: 'custpage_sdr_customer_step' });

            } else if (assistant.getLastAction() == serverWidget.AssistantSubmitAction.FINISH) {
                //Finalize Process Here
                //Create task record
                //Send Email

                assistant.finishedHtml = 'You have completed the Customer Onboarding Process'; 
            }
            var currentStepId = assistant.currentStep == null ? 'custpage_sdr_customer_step' : assistant.currentStep.id;



            /*var currentStepId;
            if(assistant.currentStep==null){
                currentStepId = 'custpage_sdr_customer_step';
            }else{
                currentStepId = assistant.currentStep.id;
            }*/


                switch (currentStepId) {
                    case 'custpage_sdr_customer_step':
                        var nameFld = assistant.addField({
                            id: 'custpage_nfo_name',
                            type: serverWidget.FieldType.SELECT,
                            source: 'customer',
                            label: 'Customer Name',

                        });
                        var salesRepFld = assistant.addField({
                            id: 'custpage_nfo_sales_rep',
                            type: serverWidget.FieldType.SELECT,
                            label: 'Supervisor',
                            source: 'employee',
                            //container: 'custpage_grp_customer'
                        });
                        var phoneFld = assistant.addField({
                            id: 'custpage_nfo_phone',
                            type: serverWidget.FieldType.PHONE,
                            label: 'Phone',
                            //container: 'custpage_grp_customer'
                        });
                        break;
                    case 'custpage_sdr_task':
                        var taskTitleFld = assistant.addField({
                            id: 'custpage_nfo_task_title',
                            type: serverWidget.FieldType.TEXT,
                            label: 'Task Title',
                            //container: 'custpage_grp_task'
                        });
                        var taskFld = assistant.addField({
                            id: 'custpage_nfo_task',
                            type: serverWidget.FieldType.TEXTAREA,
                            label: 'Task Notes',
                            //container: 'custpage_grp_task'
                        });

                        break;
                    case 'custpage_sdr_email':
                        var emailSubjFld = assistant.addField({
                            id: 'custpage_nfo_email_subj',
                            type: serverWidget.FieldType.TEXT,
                            label: 'Subject',
                            //container: 'custpage_grp_email'
                        });
                        var emailBodyFld = assistant.addField({
                            id: 'custpage_nfo_email_body',
                            type: serverWidget.FieldType.TEXTAREA,
                            label: 'Body',
                            //container: 'custpage_grp_email'
                        });
                        break;
                    case 'custpage_sdr_finalize':
                        var nameFld = assistant.addField({
                            id: 'custpage_nfo_name',
                            type: serverWidget.FieldType.SELECT,
                            source: 'customer',
                            label: 'Customer Name',
                            //container: 'custpage_grp_customer'
                        });
                        var salesRepFld = assistant.addField({
                            id: 'custpage_nfo_sales_rep',
                            type: serverWidget.FieldType.SELECT,
                            label: 'Supervisor',
                            source: 'employee',
                            //container: 'custpage_grp_customer'
                        });
                        var phoneFld = assistant.addField({
                            id: 'custpage_nfo_phone',
                            type: serverWidget.FieldType.PHONE,
                            label: 'Phone',
                            //container: 'custpage_grp_customer'
                        });
                        var taskTitleFld = assistant.addField({
                            id: 'custpage_nfo_task_title',
                            type: serverWidget.FieldType.TEXT,
                            label: 'Task Title',
                            //container: 'custpage_grp_task'
                        });
                        var taskFld = assistant.addField({
                            id: 'custpage_nfo_task',
                            type: serverWidget.FieldType.TEXTAREA,
                            label: 'Task Notes',
                            //container: 'custpage_grp_task'
                        });
                        var emailSubjFld = assistant.addField({
                            id: 'custpage_nfo_email_subj',
                            type: serverWidget.FieldType.TEXT,
                            label: 'Subject',
                            //container: 'custpage_grp_email'
                        });
                        var emailBodyFld = assistant.addField({
                            id: 'custpage_nfo_email_body',
                            type: serverWidget.FieldType.TEXTAREA,
                            label: 'Body',
                            //container: 'custpage_grp_email'
                        });

                        nameFld.updateDisplayType({
                            displayType: serverWidget.FieldDisplayType.INLINE
                        });
                        salesRepFld.updateDisplayType({
                            displayType: serverWidget.FieldDisplayType.INLINE
                        });
                        phoneFld.updateDisplayType({
                            displayType: serverWidget.FieldDisplayType.INLINE
                        });
                        emailSubjFld.updateDisplayType({
                            displayType: serverWidget.FieldDisplayType.INLINE
                        });
                        emailBodyFld.updateDisplayType({
                            displayType: serverWidget.FieldDisplayType.INLINE
                        });
                        taskTitleFld.updateDisplayType({
                            displayType: serverWidget.FieldDisplayType.INLINE
                        });
                        taskFld.updateDisplayType({
                            displayType: serverWidget.FieldDisplayType.INLINE
                        });

                        customerStp = assistant.getStep({
                            id: 'custpage_sdr_customer_step'

                        });
                        taskStep = assistant.getStep({
                            id: 'custpage_sdr_task'

                        });
                        emailStp = assistant.getStep({
                            id: 'custpage_sdr_email'

                        });

                        nameFld.defaultValue = customerStp.getValue({
                            id: 'custpage_nfo_name'
                        });
                        salesRepFld.defaultValue = customerStp.getValue({
                            id: 'custpage_nfo_sales_rep'
                        });
                        phoneFld.defaultValue = customerStp.getValue({
                            id: 'custpage_nfo_phone'
                        });
                        taskTitleFld.defaultValue = taskStep.getValue({
                            id: 'custpage_nfo_task_title'
                        });
                        taskFld.defaultValue = taskStep.getValue({
                            id: 'custpage_nfo_task'
                        });
                        emailSubjFld.defaultValue = emailStp.getValue({
                            id: 'custpage_nfo_email_subj'
                        });
                        emailBodyFld.defaultValue = emailStp.getValue({
                            id: 'custpage_nfo_email_body'
                        });

                        break;
                }
            response.writePage(assistant);

        }

        return { onRequest }

    });
