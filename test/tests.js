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
	test('converts raw domain data into JS', function(){
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
		const correct = [ {
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
		} ];
		assert.deepEqual(cleaned, correct)
	})

	test('converts raw ip data into JS', function(){
		const rawData = dedent(`
			% IANA WHOIS server
			% for more information on IANA, visit http://www.iana.org
			% This query returned 1 object

			refer:        whois.arin.net

			inetnum:      104.0.0.0 - 104.255.255.255
			organisation: ARIN
			status:       ALLOCATED

			whois:        whois.arin.net

			changed:      2011-02
			source:       IANA


			#
			# ARIN WHOIS data and services are subject to the Terms of Use
			# available at: https://www.arin.net/whois_tou.html
			#
			# If you see inaccuracies in the results, please report at
			# https://www.arin.net/resources/whois_reporting/index.html
			#
			# Copyright 1997-2018, American Registry for Internet Numbers, Ltd.
			#


			#
			# Query terms are ambiguous.  The query is assumed to be:
			#     "n + 104.144.194.0"
			#
			# Use "?" to get help.
			#


			# start

			NetRange:       104.144.0.0 - 104.144.255.255
			CIDR:           104.144.0.0/16
			NetName:        SERVERMANIA
			NetHandle:      NET-104-144-0-0-2
			Parent:         B2NETSOLUTIONS (NET-104-144-0-0-1)
			NetType:        Reallocated
			OriginAS:       AS55286
			Organization:   B2 Net Solutions Inc. (BNS-34)
			RegDate:        2014-07-22
			Updated:        2014-07-22
			Ref:            https://rdap.arin.net/registry/ip/104.144.0.0


			OrgName:        B2 Net Solutions Inc.
			OrgId:          BNS-34
			Address:        2B-560 Arvin Avenue
			City:           Stoney Creek
			StateProv:      ON
			PostalCode:     L8E 5P1
			Country:        CA
			RegDate:        2011-10-24
			Updated:        2018-07-19
			Comment:        https://servermania.com
			Ref:            https://rdap.arin.net/registry/entity/BNS-34


			OrgAbuseHandle: NOC13339-ARIN
			OrgAbuseName:   Network Operations Center
			OrgAbusePhone:  +1-716-745-4678
			OrgAbuseEmail:  support@servermania.com
			OrgAbuseRef:    https://rdap.arin.net/registry/entity/NOC13339-ARIN

			OrgTechHandle: NOC13339-ARIN
			OrgTechName:   Network Operations Center
			OrgTechPhone:  +1-716-745-4678
			OrgTechEmail:  support@servermania.com
			OrgTechRef:    https://rdap.arin.net/registry/entity/NOC13339-ARIN

			OrgNOCHandle: NOC13339-ARIN
			OrgNOCName:   Network Operations Center
			OrgNOCPhone:  +1-716-745-4678
			OrgNOCEmail:  support@servermania.com
			OrgNOCRef:    https://rdap.arin.net/registry/entity/NOC13339-ARIN

			# end


			# start

			NetRange:       104.144.0.0 - 104.144.255.255
			CIDR:           104.144.0.0/16
			NetName:        B2NETSOLUTIONS
			NetHandle:      NET-104-144-0-0-1
			Parent:         NET104 (NET-104-0-0-0-0)
			NetType:        Direct Allocation
			OriginAS:
			Organization:   B2 Net Solutions Inc. (BNS-34)
			RegDate:        2014-07-22
			Updated:        2014-07-22
			Ref:            https://rdap.arin.net/registry/ip/104.144.0.0



			OrgName:        B2 Net Solutions Inc.
			OrgId:          BNS-34
			Address:        2B-560 Arvin Avenue
			City:           Stoney Creek
			StateProv:      ON
			PostalCode:     L8E 5P1
			Country:        CA
			RegDate:        2011-10-24
			Updated:        2018-07-19
			Comment:        https://servermania.com
			Ref:            https://rdap.arin.net/registry/entity/BNS-34


			OrgAbuseHandle: NOC13339-ARIN
			OrgAbuseName:   Network Operations Center
			OrgAbusePhone:  +1-716-745-4678
			OrgAbuseEmail:  support@servermania.com
			OrgAbuseRef:    https://rdap.arin.net/registry/entity/NOC13339-ARIN

			OrgTechHandle: NOC13339-ARIN
			OrgTechName:   Network Operations Center
			OrgTechPhone:  +1-716-745-4678
			OrgTechEmail:  support@servermania.com
			OrgTechRef:    https://rdap.arin.net/registry/entity/NOC13339-ARIN

			OrgNOCHandle: NOC13339-ARIN
			OrgNOCName:   Network Operations Center
			OrgNOCPhone:  +1-716-745-4678
			OrgNOCEmail:  support@servermania.com
			OrgNOCRef:    https://rdap.arin.net/registry/entity/NOC13339-ARIN

			# end


			# start

			NetRange:       104.144.194.0 - 104.144.195.255
			CIDR:           104.144.194.0/23
			NetName:        NET-104-144-194-0-1
			NetHandle:      NET-104-144-194-0-1
			Parent:         SERVERMANIA (NET-104-144-0-0-2)
			NetType:        Reassigned
			OriginAS:
			Customer:       ProxynVPN (C07015515)
			RegDate:        2018-07-03
			Updated:        2018-07-03
			Ref:            https://rdap.arin.net/registry/ip/104.144.194.0


			CustName:       ProxynVPN
			Address:        746 Delaware Avenue
			City:           Buffalo
			StateProv:      NY
			PostalCode:     14202
			Country:        US
			RegDate:        2018-07-03
			Updated:        2018-07-03
			Ref:            https://rdap.arin.net/registry/entity/C07015515

			OrgAbuseHandle: NOC13339-ARIN
			OrgAbuseName:   Network Operations Center
			OrgAbusePhone:  +1-716-745-4678
			OrgAbuseEmail:  support@servermania.com
			OrgAbuseRef:    https://rdap.arin.net/registry/entity/NOC13339-ARIN

			OrgTechHandle: NOC13339-ARIN
			OrgTechName:   Network Operations Center
			OrgTechPhone:  +1-716-745-4678
			OrgTechEmail:  support@servermania.com
			OrgTechRef:    https://rdap.arin.net/registry/entity/NOC13339-ARIN

			OrgNOCHandle: NOC13339-ARIN
			OrgNOCName:   Network Operations Center
			OrgNOCPhone:  +1-716-745-4678
			OrgNOCEmail:  support@servermania.com
			OrgNOCRef:    https://rdap.arin.net/registry/entity/NOC13339-ARIN

			# end



			#
			# ARIN WHOIS data and services are subject to the Terms of Use
			# available at: https://www.arin.net/whois_tou.html
			#
			# If you see inaccuracies in the results, please report at
			# https://www.arin.net/resources/whois_reporting/index.html
			#
			# Copyright 1997-2018, American Registry for Internet Numbers, Ltd.
			#`);
		const cleaned = parseRawData(rawData);
		const correct = [ {
 			"address": "746 Delaware Avenue",
 			"cidr": "104.144.194.0/23",
 			"city": "Buffalo",
 			"country": "US",
 			"custName": "ProxynVPN",
 			"customer": "ProxynVPN (C07015515)",
 			"netHandle": "NET-104-144-194-0-1",
 			"netName": "NET-104-144-194-0-1",
 			"netRange": "104.144.194.0 - 104.144.195.255",
 			"netType": "Reassigned",
 			"orgAbuseEmail": "support@servermania.com",
 			"orgAbuseHandle": "NOC13339-ARIN",
 			"orgAbuseName": "Network Operations Center",
 			"orgAbusePhone": "+1-716-745-4678",
 			"orgAbuseRef": "https://rdap.arin.net/registry/entity/NOC13339-ARIN",
 			"orgNocEmail": "support@servermania.com",
 			"orgNocHandle": "NOC13339-ARIN",
 			"orgNocName": "Network Operations Center",
 			"orgNocPhone": "+1-716-745-4678",
 			"orgNocRef": "https://rdap.arin.net/registry/entity/NOC13339-ARIN",
 			"orgTechEmail": "support@servermania.com",
 			"orgTechHandle": "NOC13339-ARIN",
 			"orgTechName": "Network Operations Center",
 			"orgTechPhone": "+1-716-745-4678",
 			"orgTechRef": "https://rdap.arin.net/registry/entity/NOC13339-ARIN",
 			"parent": "SERVERMANIA (NET-104-144-0-0-2)",
 			"postalCode": "14202",
 			"ref": "https://rdap.arin.net/registry/ip/104.144.194.0 https://rdap.arin.net/registry/entity/C07015515",
 			"regDate": "2018-07-03 2018-07-03",
 			"stateProv": "NY",
 			"updated": "2018-07-03 2018-07-03"
 		}, {
 			"address": "2B-560 Arvin Avenue",
 			"availableAt": "https://www.arin.net/whois_tou.html",
 			"changed": "2011-02",
 			"cidr": "104.144.0.0/16",
 			"city": "Stoney Creek",
 			"comment": "https://servermania.com",
 			"country": "CA",
 			"inetnum": "104.0.0.0 - 104.255.255.255",
 			"netHandle": "NET-104-144-0-0-2",
 			"netName": "SERVERMANIA",
 			"netRange": "104.144.0.0 - 104.144.255.255",
 			"netType": "Reallocated",
 			"orgAbuseEmail": "support@servermania.com",
 			"orgAbuseHandle": "NOC13339-ARIN",
 			"orgAbuseName": "Network Operations Center",
 			"orgAbusePhone": "+1-716-745-4678",
 			"orgAbuseRef": "https://rdap.arin.net/registry/entity/NOC13339-ARIN",
 			"orgId": "BNS-34",
 			"orgName": "B2 Net Solutions Inc.",
 			"orgNocEmail": "support@servermania.com",
 			"orgNocHandle": "NOC13339-ARIN",
 			"orgNocName": "Network Operations Center",
 			"orgNocPhone": "+1-716-745-4678",
 			"orgNocRef": "https://rdap.arin.net/registry/entity/NOC13339-ARIN",
 			"orgTechEmail": "support@servermania.com",
 			"orgTechHandle": "NOC13339-ARIN",
 			"orgTechName": "Network Operations Center",
 			"orgTechPhone": "+1-716-745-4678",
 			"orgTechRef": "https://rdap.arin.net/registry/entity/NOC13339-ARIN",
 			"organisation": "ARIN",
 			"organization": "B2 Net Solutions Inc. (BNS-34)",
 			"originAs": "AS55286",
 			"parent": "B2NETSOLUTIONS (NET-104-144-0-0-1)",
 			"postalCode": "L8E 5P1",
 			"ref": "https://rdap.arin.net/registry/ip/104.144.0.0 https://rdap.arin.net/registry/entity/BNS-34",
 			"refer": "whois.arin.net",
 			"regDate": "2014-07-22 2011-10-24",
 			"source": "IANA",
 			"stateProv": "ON",
 			"status": "ALLOCATED",
 			"updated": "2014-07-22 2018-07-19",
 			"whois": "whois.arin.net"
 		}, {
			"address": "2B-560 Arvin Avenue",
 			"cidr": "104.144.0.0/16",
 			"city": "Stoney Creek",
 			"comment": "https://servermania.com",
 			"country": "CA",
 			"netHandle": "NET-104-144-0-0-1",
 			"netName": "B2NETSOLUTIONS",
 			"netRange": "104.144.0.0 - 104.144.255.255",
 			"netType": "Direct Allocation",
 			"orgAbuseEmail": "support@servermania.com",
 			"orgAbuseHandle": "NOC13339-ARIN",
 			"orgAbuseName": "Network Operations Center",
 			"orgAbusePhone": "+1-716-745-4678",
 			"orgAbuseRef": "https://rdap.arin.net/registry/entity/NOC13339-ARIN",
 			"orgId": "BNS-34",
 			"orgName": "B2 Net Solutions Inc.",
 			"orgNocEmail": "support@servermania.com",
 			"orgNocHandle": "NOC13339-ARIN",
 			"orgNocName": "Network Operations Center",
 			"orgNocPhone": "+1-716-745-4678",
 			"orgNocRef": "https://rdap.arin.net/registry/entity/NOC13339-ARIN",
 			"orgTechEmail": "support@servermania.com",
 			"orgTechHandle": "NOC13339-ARIN",
 			"orgTechName": "Network Operations Center",
 			"orgTechPhone": "+1-716-745-4678",
 			"orgTechRef": "https://rdap.arin.net/registry/entity/NOC13339-ARIN",
 			"organization": "B2 Net Solutions Inc. (BNS-34)",
 			"parent": "NET104 (NET-104-0-0-0-0)",
 			"postalCode": "L8E 5P1",
 			"ref": "https://rdap.arin.net/registry/ip/104.144.0.0 https://rdap.arin.net/registry/entity/BNS-34",
 			"regDate": "2014-07-22 2011-10-24",
 			"stateProv": "ON",
 			"updated": "2014-07-22 2018-07-19"
		} ];
		assert.deepEqual(cleaned, correct);
	});

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
		const correct = [ {
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
		} ];
		assert.deepEqual(cleaned, correct)
	})

	test('real domain lookups', async function(){
		this.timeout(3 * 1000)
		const actual = await lookup('google.com')
		// Since results will change, just check some relevant fields.
		assert.equal(actual[0].domainName, "google.com")
		assert.equal(actual[0].registrarIanaId, 292)
	});

	test('real ip lookups', async function(){
		this.timeout(3 * 1000)
		const actual = await lookup('8.8.8.8')
		// there's a good chance that these will not be reallocated in the lifetime of nodejs
		assert.equal(actual[0].orgId, "GOGL");
		assert.equal(actual[1].orgId, "LPL-141");
	});

	test('verbose real domain lookups', async function(){
		this.timeout(3 * 1000)
		const actual = await lookup('google.com', {verbose: true});
		// Since results will change, just check some relevant fields.
		console.log(actual);
		assert.equal(actual[0].data[0].domainName, "GOOGLE.COM");
		assert.equal(actual[0].data[0].registrarIanaId, 292);
	});

	test('verbose real ip lookups', async function(){
		this.timeout(3 * 1000)
		const actual = await lookup('8.8.8.8', {verbose: true})
		// there's a good chance that these will not be reallocated in the lifetime of nodejs
		assert.equal(actual[0].data[0].orgId, "GOGL");
		assert.equal(actual[0].data[1].orgId, "LPL-141");
	});

	test('Geektools output with indented values and HTML entities', async function(){
		// Geektools is slow.
		this.timeout(6 * 1000)
		const actual = await lookup('google.co.uk', {server:'geektools.com'})
		console.log(actual);
		assert(actual[0].nameServers.includes("ns1.google.com"))
	});

})
