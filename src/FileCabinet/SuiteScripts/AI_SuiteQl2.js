/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
require(['N/query', 'N/log'], function (query, log) {

    // Entityid, firstname ve lastname alan değerlerini tüm çalışan kayıtlarından sorgula
    var myQuery = query.create({
        type: query.Type.EMPLOYEE
    });

    myQuery.createColumn = ({
        fieldId:'entityid',
        fieldId:'firstname',
        fieldId:'lastname'

    });


    var myResultSet = myQuery.run();
    var results = myResultSet.getRange({
        start: 0,
        end: 10 // İlk 10 sonuç
    });

    for (var i = 0; i < results.length; i++) {
        var entityid = results[i].getValue({
            name: 'entityid'
        });
        var firstname = results[i].getValue({
            name: 'firstname'
        });
        var lastname = results[i].getValue({
            name: 'lastname'
        });

        log.debug({
            title: 'Employee Info',
            details: 'Entity ID: ' + entityid + ', First Name: ' + firstname + ', Last Name: ' + lastname
        });
    }
}
)