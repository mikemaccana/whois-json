// Tests. Mocha TDD/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html

const assert = require('assert'),
	lookup = require('../index.js'),
	parseRawData = require('../parse-raw-data.js'),
	dedent = require('dedent-js'),
	log = console.log.bind(console)

const print = function(object){
	return JSON.stringify.apply(JSON, [object, null, 2])
}

suite('parseRawData', function(){
	test('converts raw data into JS', function(){
		const rawData = dedent(`
			Domain Name: google.com
			Registry Domain ID: 2138514_DOMAIN_COM-VRSN
			Registrar WHOIS Server: whois.markmonitor.com
			Registrar URL: http://www.markmonitor.com
			Updated Date: 2015-06-12T10:38:52-0700
			Creation Date: 1997-09-15T00:00:00-0700
			Registrar Registration Expiration Date: 2020-09-13T21:00:00-0700
			Registrar: MarkMonitor, Inc.
			Registrar IANA ID: 292
			Registrar Abuse Contact Email: abusecomplaints@markmonitor.com
			Registrar Abuse Contact Phone: +1.2083895740
			Domain Status: clientUpdateProhibited (https://www.icann.org/epp#clientUpdateProhibited)
			Domain Status: clientTransferProhibited (https://www.icann.org/epp#clientTransferProhibited)
			Domain Status: clientDeleteProhibited (https://www.icann.org/epp#clientDeleteProhibited)
			Domain Status: serverUpdateProhibited (https://www.icann.org/epp#serverUpdateProhibited)
			Domain Status: serverTransferProhibited (https://www.icann.org/epp#serverTransferProhibited)
			Domain Status: serverDeleteProhibited (https://www.icann.org/epp#serverDeleteProhibited)
			Registry Registrant ID:
			Registrant Name: Dns Admin
			Registrant Organization: Google Inc.
			Registrant Street: Please contact contact-admin@google.com, 1600 Amphitheatre Parkway
			Registrant City: Mountain View
			Registrant State/Province: CA
			Registrant Postal Code: 94043
			Registrant Country: US
			Registrant Phone: +1.6502530000
			Registrant Phone Ext:
			Registrant Fax: +1.6506188571
			Registrant Fax Ext:
			Registrant Email: dns-admin@google.com
			Registry Admin ID:
			Admin Name: DNS Admin
			Admin Organization: Google Inc.
			Admin Street: 1600 Amphitheatre Parkway
			Admin City: Mountain View
			Admin State/Province: CA
			Admin Postal Code: 94043
			Admin Country: US
			Admin Phone: +1.6506234000
			Admin Phone Ext:
			Admin Fax: +1.6506188571
			Admin Fax Ext:
			Admin Email: dns-admin@google.com
			Registry Tech ID:
			Tech Name: DNS Admin
			Tech Organization: Google Inc.
			Tech Street: 2400 E. Bayshore Pkwy
			Tech City: Mountain View
			Tech State/Province: CA
			Tech Postal Code: 94043
			Tech Country: US
			Tech Phone: +1.6503300100
			Tech Phone Ext:
			Tech Fax: +1.6506181499
			Tech Fax Ext:
			Tech Email: dns-admin@google.com
			Name Server: ns4.google.com
			Name Server: ns2.google.com
			Name Server: ns1.google.com
			Name Server: ns3.google.com
			DNSSEC: unsigned
			URL of the ICANN WHOIS Data Problem Reporting System: http://wdprs.internic.net/
			>>> Last update of WHOIS database: 2017-02-22T03:53:14-0800 <<<

			The Data in MarkMonitor.com's WHOIS database is provided by MarkMonitor.com forconst
			information purposes, and to assist persons in obtaining information about or
			related to a domain name registration record.  MarkMonitor.com does not guarantee
			its accuracy.  By submitting a WHOIS query, you agree that you will use this Data
			only for lawful purposes and that, under no circumstances will you use this Data to:
			(1) allow, enable, or otherwise support the transmission of mass unsolicited,
					commercial advertising or solicitations via e-mail (spam); or
			(2) enable high volume, automated, electronic processes that apply to
					MarkMonitor.com (or its systems).
			MarkMonitor.com reserves the right to modify these terms at any time.
			By submitting this query, you agree to abide by this policy.

			MarkMonitor is the Global Leader in Online Brand Protection.const

			MarkMonitor Domain Management(TM)const
			MarkMonitor Brand Protection(TM)
			MarkMonitor AntiPiracy(TM)
			MarkMonitor AntiFraud(TM)
			Professional and Managed Services

			Visit MarkMonitor at http://www.markmonitor.comconst
			Contact us at +1.8007459229
			In Europe, at +44.02032062220

			For more information on Whois status codes, please visitconst
			https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en
			--`)
		const cleaned = parseRawData(rawData)
		const correct = {
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
		assert.deepEqual(cleaned, correct)
	})

	test('converts raw data (case with no spaces after delimiters) into JS', function(){
		const rawData = dedent(`
			Domain Name:addlvr.com
			Registry Domain ID:2323887016_DOMAIN_COM-VRSN
			Registrar WHOIS Server:whois.paycenter.com.cn
			Registrar URL:http://www.xinnet.com
			Updated Date:2018-10-22T04:51:08.00Z
			Creation Date:2018-10-21T02:11:14.00Z
			Registrar Registration Expiration Date:2019-10-21T02:11:14.00Z
			Registrar:XINNET TECHNOLOGY CORPORATION
			Registrar IANA ID:120
			Registrar Abuse Contact Email:supervision@xinnet.com
			Registrar Abuse Contact Phone:+86.1087128064
			Reseller:hefeixunyunwangluokejiyouxiangongsi
			Domain Status:ok https://www.icann.org/epp#ok
			Registry Registrant ID:
			Registrant Name:
			Registrant Organization:
			Registrant Street:
			Registrant City:
			Registrant State/Province:
			Registrant Postal Code:
			Registrant Country:
			Registrant Phone:
			Registrant Phone Ext:
			Registrant Fax:
			Registrant Fax Ext:
			Registrant Email:
			Registry Admin ID:
			Admin Name:
			Admin Organization:
			Admin Street:
			Admin City:
			Admin State/Province:
			Admin PostalCode:
			Admin Country:
			Admin Phone:
			Admin Phone Ext:
			Admin Fax:
			Admin Fax Ext:
			Admin Email:
			Registry Tech ID:
			Tech Name:
			Tech Organization:
			Tech Street:
			Tech City:
			Tech State/Province:
			Tech PostalCode:
			Tech Country:
			Tech Phone:
			Tech Phone Ext:
			Tech Fax:
			Tech Fax Ext:
			Tech Email:
			Name Server:jm1.dns.com
			Name Server:jm2.dns.com
			DNSSEC:unsigned
			URL of the ICANN WHOIS Data Problem Reporting System: http://wdprs.internic.net/
			>>> Last update of WHOIS database: 2018-12-23T14:08:06.00Z <<<: 
			
			For more information on Whois status codes, please visit https://icann.org/epp
			
			The Data in Paycenter's WHOIS database is provided by Paycenter
			for information purposes, and to assist persons in obtaining
			information about or related to a domain name registration record.
			Paycenter does not guarantee its accuracy.  By submitting
			a WHOIS query, you agree that you will use this Data only
			for lawful purposes and that, 
			under no circumstances will you use this Data to:
			(1) allow, enable, or otherwise support the transmission
			of mass unsolicited, commercial advertising or solicitations
			via e-mail (spam); or
			(2) enable high volume, automated, electronic processes that
			apply to Paycenter or its systems.
			Paycenter reserves the right to modify these terms at any time.
			By submitting this query, you agree to abide by this policy.!!
		`)
		const cleaned = parseRawData(rawData)
		const correct = {
			"domainName": "addlvr.com",
			"registryDomainId": "2323887016_DOMAIN_COM-VRSN",
			"registrarWhoisServer": "whois.paycenter.com.cn",
			"registrarUrl": "http://www.xinnet.com",
			"updatedDate": "2018-10-22T04:51:08.00Z",
			"creationDate": "2018-10-21T02:11:14.00Z",
			"registrarRegistrationExpirationDate": "2019-10-21T02:11:14.00Z",
			"registrar": "XINNET TECHNOLOGY CORPORATION",
			"registrarIanaId": "120",
			"registrarAbuseContactEmail": "supervision@xinnet.com",
			"registrarAbuseContactPhone": "+86.1087128064",
			"reseller": "hefeixunyunwangluokejiyouxiangongsi",
			"domainStatus": "ok https://www.icann.org/epp#ok",
			"registryRegistrantId": "",
			"registrantName": "",
			"registrantOrganization": "",
			"registrantStreet": "",
			"registrantCity": "",
			"registrantStateProvince": "",
			"registrantPostalCode": "",
			"registrantCountry": "",
			"registrantPhone": "",
			"registrantPhoneExt": "",
			"registrantFax": "",
			"registrantFaxExt": "",
			"registrantEmail": "",
			"registryAdminId": "",
			"adminName": "",
			"adminOrganization": "",
			"adminStreet": "",
			"adminCity": "",
			"adminStateProvince": "",
			"adminPostalCode": "",
			"adminCountry": "",
			"adminPhone": "",
			"adminPhoneExt": "",
			"adminFax": "",
			"adminFaxExt": "",
			"adminEmail": "",
			"registryTechId": "",
			"techName": "",
			"techOrganization": "",
			"techStreet": "",
			"techCity": "",
			"techStateProvince": "",
			"techPostalCode": "",
			"techCountry": "",
			"techPhone": "",
			"techPhoneExt": "",
			"techFax": "",
			"techFaxExt": "",
			"techEmail": "",
			"nameServer": "jm1.dns.com jm2.dns.com",
			"dnssec": "unsigned",
			"urlOfTheIcannWhoisDataProblemReportingSystem": "http://wdprs.internic.net/",
			"lastUpdateOfWhoisDatabase": "2018-12-23T14:08:06.00Z <<<:",
			"forMoreInformationOnWhoisStatusCodesPleaseVisitHttps": "//icann.org/epp",
			"underNoCircumstancesWillYouUseThisDataTo": ""
		};
		assert.deepEqual(cleaned, correct)
	})

	test('real lookups', async function(){
		this.timeout(3 * 1000)
		const actual = await lookup('google.com')
		// Since results will change, just check some relevant fields.
		assert.equal(actual.domainName, "google.com")
		assert.equal(actual.registrarIanaId, 292)
	})	

	test('Geektools output with indented values and HTML entities', async function(){
		// Geektools is slow.
		this.timeout(6 * 1000)
		const actual = await lookup('google.co.uk', {server:'geektools.com'})
		assert(actual.nameServers.includes("ns1.google.com"))
	})


})
