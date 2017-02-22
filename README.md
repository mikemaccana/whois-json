A wrapper for the excellent `node-whois`, that returns results in actual, structured, camelCase-keyed JavaScript.

[![CircleCI](https://circleci.com/gh/mikemaccana/whois-json.svg?style=shield)](https://circleci.com/gh/mikemaccana/whois-json)

# Demo

	var whois = require('./index.js');

	whois('google.com', function(err, result){
		console.log(JSON.stringify(result, null, 2))
	})

Returns the following results. Note duplicate keys in whois results (like `nameServer`) are combined into a single result, seperated by space:

	{
		"domainName": "google.com",
		"registryDomainId": "2138514_DOMAIN_COM-VRSN",
		"registrarWhoisServer": "whois.markmonitor.com",
		"registrarUrl": "http://www.markmonitor.com",
		"updatedDate": "2015-06-12T10:38:52-0700",
		"creationDate": "1997-09-15T00:00:00-0700",
		"registrarRegistrationExpirationDate": "2020-09-13T21:00:00-0700",
		"registrar": "MarkMonitor, Inc.",
		"registrarIanaId": "292",
		"registrarAbuseContactEmail": "abusecomplaints@markmonitor.com",
		"registrarAbuseContactPhone": "+1.2083895740",
		"domainStatus": "clientUpdateProhibited (https://www.icann.org/epp#clientUpdateProhibited) clientTransferProhibited (https://www.icann.org/epp#clientTransferProhibited) clientDeleteProhibited (https://www.icann.org/epp#clientDeleteProhibited) serverUpdateProhibited (https://www.icann.org/epp#serverUpdateProhibited) serverTransferProhibited (https://www.icann.org/epp#serverTransferProhibited) serverDeleteProhibited (https://www.icann.org/epp#serverDeleteProhibited)",
		"registrantName": "Dns Admin",
		"registrantOrganization": "Google Inc.",
		"registrantStreet": "Please contact contact-admin@google.com, 1600 Amphitheatre Parkway",
		"registrantCity": "Mountain View",
		"registrantStateProvince": "CA",
		"registrantPostalCode": "94043",
		"registrantCountry": "US",
		"registrantPhone": "+1.6502530000",
		"registrantFax": "+1.6506188571",
		"registrantEmail": "dns-admin@google.com",
		"adminName": "DNS Admin",
		"adminOrganization": "Google Inc.",
		"adminStreet": "1600 Amphitheatre Parkway",
		"adminCity": "Mountain View",
		"adminStateProvince": "CA",
		"adminPostalCode": "94043",
		"adminCountry": "US",
		"adminPhone": "+1.6506234000",
		"adminFax": "+1.6506188571",
		"adminEmail": "dns-admin@google.com",
		"techName": "DNS Admin",
		"techOrganization": "Google Inc.",
		"techStreet": "2400 E. Bayshore Pkwy",
		"techCity": "Mountain View",
		"techStateProvince": "CA",
		"techPostalCode": "94043",
		"techCountry": "US",
		"techPhone": "+1.6503300100",
		"techFax": "+1.6506181499",
		"techEmail": "dns-admin@google.com",
		"nameServer": "ns4.google.com ns2.google.com ns1.google.com ns3.google.com",
		"dnssec": "unsigned",
		"urlOfTheIcannWhoisDataProblemReportingSystem": "http://wdprs.internic.net/",
		"lastUpdateOfWhoisDatabase": "2017-02-22T03:53:14-0800 <<<"
	};

To pass options to the underlying `node-whois` module, use:

	var whois = require('./index.js');

	whois('google.com', {follow: 3, verbose: true}, function(err, result){
		console.log(JSON.stringify(result, null, 2))
	})

# Send pull requests

Issues are cool, but PRs are better. Don't break the tests.