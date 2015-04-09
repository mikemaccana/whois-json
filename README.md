A wrapper for the excellent `node-whois`, that returns results in actual, structured, camelCase-keyed JavaScript.

# Installation

    npm install whois-json

# Usage

    var whois = require('./index.js');

    whois('google.com', function(err, result){
        console.log(JSON.stringify(result, null, 2))
    })

Returns the following results:

    {
      "domainName": "google.com",
      "registryDomainId": "2138514_DOMAIN_COM-VRSN",
      "registrarWhoisServer": "whois.markmonitor.com",
      "registrarUrl": "http://www.markmonitor.com",
      "updatedDate": "2014-10-28T12:38:28-0700",
      "creationDate": "1997-09-15T00:00:00-0700",
      "registrarRegistrationExpirationDate": "2020-09-13T21:00:00-0700",
      "registrar": "MarkMonitor, Inc.",
      "registrarIanaId": "292",
      "registrarAbuseContactEmail": "abusecomplaints@markmonitor.com",
      "registrarAbuseContactPhone": "+1.2083895740",
      "domainStatus": "clientDeleteProhibited (https://www.icann.org/epp#clientDeleteProhibited)",
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
      "nameServer": "ns3.google.com",
      "dnssec": "unsigned",
      "urlOfTheIcannWhoisDataProblemReportingSystem": "http://wdprs.internic.net/",
      "lastUpdateOfWhoisDatabase": "2015-04-09T03:41:53-0700 <<<"
    }
