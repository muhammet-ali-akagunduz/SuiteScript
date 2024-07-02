/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
require(['N/query', 'N/log'], function (query, log) {

    try {
        // SuiteQL sorgusu
        var sql = `SELECT emp.id as employee_id, firstname, email 
        FROM employee as emp
        WHERE email IS NOT NULL AND firstname IS NOT NULL`;

        // Sorguyu çalıştır
        var resultSet = query.runSuiteQL({
            query: sql
        });

        // Sonuçları al
        var results = resultSet.asMappedResults();

        // Sonuçları logla
        log.debug({
            title: 'Employee Records',
            details: results
        });

        // Yanıtı döndür
        for (var i = 0; i < results.length; i++) {
            log.debug({
                title: results[i].employee_id.value
            });
        }
    } catch (e) {
        log.error({
            title: 'Error executing SuiteQL query',
            details: e
        });
    }


});

/*

require(['N/query'],
	function (query) {

		var myLoadedQuery = query.load({
			id: 'custworkbook_maa_sdr_wb_employee_cases'	//workbook or dataset id	
		});

		var sql = `SELECT employee.id, employee.firstname, employee.email 
        FROM employee 
        WHERE email IS NOT NULL AND firstname IS NOT NULL`;

		//convert to suiteql
		var mySuiteQLQuery = myLoadedQuery.toSuiteQL();

		//executing the query
		var resultSet = mySuiteQLQuery.run({
			query: sql
		});
		var results = resultSet.results;


		//displaying the query
		log.debug({
			title: 'Query Length: ',
			details: results.length
		});

		for (var i = 0; i < results.length; i++) {
			log.debug({
				title: results[i].values
			});
		}

	});

*/