require(['N/query'],
	function (query) {


		var myLoadedQuery = query.load({
			id: 'custworkbook_maa_sdr_wb_employee_cases' //workbook or dataset id
		});

		//executing the query
		var resultSet = myLoadedQuery.run();
		var results = resultSet.results;


		//displaying the query
		log.debug({
			title: 'Query Length: ',
			details: results.length
		});
		/*
						log.debug({
							title: 'Query: ',
							details: myLoadedQuery
						});*/

		for (var i = 0; i < results.length; i++) {
			log.debug({
				title: results[i].values
			});
		}
	});
