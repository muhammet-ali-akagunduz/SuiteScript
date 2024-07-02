

/**
*@NApiVersion 2.1
*@NScriptType ScheduledScript
*/
define(['N/search'],
    function (search) {



        return {
            execute: function (context) {
                let obj = []
                try {
                    var caseSearch = search.create({
                        type: 'salesorder',
                        filters: [
                            ['internalid', 'is', '18'],
                            'and',
                            ['mainline', 'is', true],
                        ],
                        columns: [
                            'entity'
                        ]
                    }).run().getRange({
                        start: 0,
                        end: 9
                    });
                    // .run().each(function(item){
                    //     obj.push(item.toJSON())
                    //     return true
                    // })

                    // var searchResults = caseSearch.run().getRange({
                    //     start: 0,
                    //     end: 9
                    // });
                    log.debug('caseSearch', caseSearch);
                    log.debug('caseSearch length', caseSearch.lenght);


                    try {
                        for (var i = 0; i < caseSearch.length; i++) {
                            var entity = caseSearch[i].getValue('entity');
                            log.debug('entity', entity);
                            // var assignedTo = searchResults[i].getText('assigned');
                            // var status = searchResults[i].getValue('status');
                            // var department = searchResults[i].getValue({
                            //     name : 'department',
                            //     join : 'employee'
                            // });
                            // var jobTitle = searchResults[i].getValue({
                            //     name : 'title',
                            //     join : 'employee'
                            // });

                            // log.debug('Case Info', 'Subject :' + subject +'\n'+
                            // 'Status :' + status +'\n'+
                            // 'Job Title :' + jobTitle +'\n');
                        }
                    } catch (e) {
                        log.debug('hata alindi', e.message)
                    }
                } catch (error) {
                    log.debug('genel hata', error)
                }
            }
        }



    });
