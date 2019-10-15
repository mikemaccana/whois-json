A wrapper for the excellent [`whois` module](https://www.npmjs.com/package/whois), that returns results in actual, structured, camelCased JavaScript!

[![Build Status](https://travis-ci.org/mikemaccana/whois-json.svg?branch=master)](https://travis-ci.org/mikemaccana/whois-json)

# Changelog

## Breaking Changes in version 3

An IP Lookup can return MULTIPLE entries (when domains are reallocated or
reassigned). This version returns all the IP ranges in reverse order
so the smallest/most accurately allocated range is returned as .[0], the
largest range or owner will return as .[length-1].

### Version 3

Lookups will always return an array from most significant data to least
significant data.

	[
	  {
		"domainName": "google.com",
		...
	  }
	]

### Version 2

Lookups were always an object with a single entry.  Occasionally, the result
was not the most correct it could have been due to reallocations or range
reassignments.

	{
	  "domainName": "google.com",
	  ...
	}

## Breaking Changes in version 2

Callbacks are no longer supported by this module - the module returns Promises and should be used with `await`.

# Demo

	(async function(){
		const whois = require('whois-json');

		var results = await whois('google.com');
		console.log(JSON.stringify(results, null, 2));
	})()

## Domain Lookups

Or to specify some options to the underlying [`whois` module](https://www.npmjs.com/package/whois), use:

	(async function(){
		const whois = require('whois-json');

		var results = await whois('google.com', {follow: 3, verbose: true});
		console.log(JSON.stringify(results, null, 2));
	})()

Returns the following results. Note duplicate keys in whois results (like `nameServer`) are combined into a single result, seperated by space:

	[
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
	  }
	]

## IP Address Lookups

This module can also perform IP address lookups.

	(async function(){
		const whois = require('whois-json');

		var results = await whois('8.8.8.8', {follow: 3, verbose: true});
		console.log(JSON.stringify(results, null, 2));
	})()

And returns all information about the owners of the address space in ascending order (from smallest subnet size to largest subnet size).

	[
      {
        "netRange": "8.8.8.0 - 8.8.8.255",
        "cidr": "8.8.8.0/24",
        "netName": "LVLT-GOGL-8-8-8",
        "netHandle": "NET-8-8-8-0-1",
        "parent": "LVLT-ORG-8-8 (NET-8-0-0-0-1)",
        "netType": "Reallocated",
        "organization": "Google LLC (GOGL)",
        "regDate": "2014-03-14 2000-03-30",
        "updated": "2014-03-14 2017-12-21",
        "ref": "https://rdap.arin.net/registry/ip/8.8.8.0 https://rdap.arin.net/registry/entity/GOGL",
        "orgName": "Google LLC",
        "orgId": "GOGL",
        "address": "1600 Amphitheatre Parkway",
        "city": "Mountain View",
        "stateProv": "CA",
        "postalCode": "94043",
        "country": "US",
        "orgTechHandle": "ZG39-ARIN",
        "orgTechName": "Google LLC",
        "orgTechPhone": "+1-650-253-0000",
        "orgTechEmail": "arin-contact@google.com",
        "orgTechRef": "https://rdap.arin.net/registry/entity/ZG39-ARIN",
        "orgAbuseHandle": "ABUSE5250-ARIN",
        "orgAbuseName": "Abuse",
        "orgAbusePhone": "+1-650-253-0000",
        "orgAbuseEmail": "network-abuse@google.com",
        "orgAbuseRef": "https://rdap.arin.net/registry/entity/ABUSE5250-ARIN"
      },
      {
        "availableAt": "https://www.arin.net/whois_tou.html",
        "netRange": "8.0.0.0 - 8.127.255.255",
        "cidr": "8.0.0.0/9",
        "netName": "LVLT-ORG-8-8",
        "netHandle": "NET-8-0-0-0-1",
        "parent": "NET8 (NET-8-0-0-0-0)",
        "netType": "Direct Allocation",
        "organization": "Level 3 Parent, LLC (LPL-141)",
        "regDate": "1992-12-01 2018-02-06",
        "updated": "2018-04-23 2018-02-22",
        "ref": "https://rdap.arin.net/registry/ip/8.0.0.0 https://rdap.arin.net/registry/entity/LPL-141",
        "orgName": "Level 3 Parent, LLC",
        "orgId": "LPL-141",
        "address": "100 CenturyLink Drive",
        "city": "Monroe",
        "stateProv": "LA",
        "postalCode": "71203",
        "country": "US",
        "orgAbuseHandle": "IPADD5-ARIN",
        "orgAbuseName": "ipaddressing",
        "orgAbusePhone": "+1-877-453-8353",
        "orgAbuseEmail": "ipaddressing@level3.com",
        "orgAbuseRef": "https://rdap.arin.net/registry/entity/IPADD5-ARIN",
        "orgTechHandle": "IPADD5-ARIN",
        "orgTechName": "ipaddressing",
        "orgTechPhone": "+1-877-453-8353",
        "orgTechEmail": "ipaddressing@level3.com",
        "orgTechRef": "https://rdap.arin.net/registry/entity/IPADD5-ARIN"
      }
    ]

# Send pull requests

Issues are cool, but PRs are better.

If you add features, add tests. Don't break the tests.
