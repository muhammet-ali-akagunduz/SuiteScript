/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/ui/dialog', 'N/url'],
/**
 * @param{https} https
 * @param{dialog} dialog
 * @param{url} url
 */
function(https, dialog, url) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(context) {
        if(context.mode == 'edit' ){
            var expRep = context.currentRecord;
            var tranId = expRep.getValue('tranid');

            dialog.alert({
                title : 'Edit log reminder',
                message : 'Please note that use information is logged when an expense report is edited.'
            });

            var suiteletUrl = url.resolveScript({
                scriptId : 'customscript_sdr_sl_log_user',
                deployementId : 'customdeploy_sdr_sl_log_user',
                returnExternalUrl:false
            });

            console.log("Suitelet URL : "+suiteletUrl);

            https.post({
                url:suiteletUrl,
                body:{
                    sdr_tranId :tranId  
                }
            });
        }
    }

    return {
        pageInit: pageInit
    };
    
});
