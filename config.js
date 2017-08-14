[
/*{
    name: "SENSEX",
    group: "India,Index",
    url: "http://www.bseindia.com/mktlive/mktwatch.asp",
    title: "Time\t\tIndex\t\tChange\t\tPercent\t\tLow\t\tHigh",
    attrs: ["open", "high","low","index","yesterday", "change", "percent"],
    getStockData: function(str)
                 {
						var re=minMatch(str, /<tr>.*SENSEX.*><\/tr>/i);
						re = re[0].match(/.*>(.+)<\/font>.*>(.+)<\/font>.*>(.+)<\/font>.*>(.+)<\/font>.*>(.+)<\/font>.*>(.+)<\/font>.*>(.+)<\/font>/i)
						return re;
			      },
    priceBoard: function(curObj, lastObj)
                {
                     var last = lastObj? lastObj.index:"-";
                     var re = ["SENSEX"];
    		     var tmp = String.format("%s/%s", curObj.index, last);
    		     re.push(tmp);
    		     re.push("");
    		     re.push(curObj.change);
    		     re.push((new Date()).format("HH:MM:ss"));
    		     return re;
    		 },
    logStr: function(obj){return String.format("[%s] \t%s  \t%s\t\t%s\t\t%s  \t%s", (new Date()).format("HH:MM:ss"), obj.index, obj.change,
                                                obj.percent, obj.low, obj.high);},
    yahooSymbol: "^BSESN",
    compareAttr: "index"
    //upPriceAlert: "3.08",
    //downPriceAlert: "3.05"
},
*/
{
    name: "STI",
    group: "Index",
    //url: "http://www.sgx.com/wps/portal/marketplace/mp-en/home",
    //pattern: /<tr>[\s\S]*ST Index[\s\S]*>(.+)&nbsp;(.+)<\/div>[\s\S]*<\/tr>/i,
    //pattern: /ST Index<[\s\S]*>(.+)&nbsp;\s*(.+)</i,
    //url: "http://esite.sgx.com/live/st/IBM_ETF_include.asp?incfile=rev_stmktsum.inc",
    //pattern: /STIValue[\s\S]*>(.+)<[\s\S]*STIValue2[\s\S]*>(.+)</i,
    url: "http://www.sgx.com/JsonRead/JsonData?qryId=NTP.StkIn&timeout=60",
    pattern: /PN:'STI',PY:'FTSE ST_STI_FUTURES_ASEANIndices',PID:'.FTSTI',LP:(.+),NC:(.+),GP/i,
    title: "Time\t\tIndex\t\tChange",
    attrs: ["index", "change"],
    priceBoard: function(curObj, lastObj)
                {
                     var last = lastObj? lastObj.index:"-";
                     var re = ["STI"];
    		     var tmp = String.format("%s/%s", curObj.index, last);
    		     re.push(tmp);
    		     re.push("");
    		     re.push(curObj.change);
    		     re.push((new Date()).format("HH:MM:ss"));
    		     return re;
    		 },
    logStr: function(obj){return String.format("[%s] \t%s\t\t%s", (new Date()).format("HH:MM:ss"), obj.index, obj.change);},

    compareAttr: "index",
    upPriceAlert: "3200",
    downPriceAlert: "2850",
    yahooSymbol: "^STI"
},

{
    name: "Lyxor China",
    sticode: "P58",
    group: "China,ETF",
	yahooSymbol: "P58.SI",
    upPriceAlert: "17.5",
    downPriceAlert: "14.55"
},
{
    name: "Lyxor Cmdty",
    sticode: "A0W",
    group: "Commodities,ETF,Portfolio",
	yahooSymbol: "A0W.SI",
    upPriceAlert: "4.8",
    downPriceAlert: "2.65"
},
{
    name: "DBS",
	yahooSymbol: "D05.SI",
    group: "Finance",
    upPriceAlert: "18.0",
    downPriceAlert: "14.2"
},
{
    name: "KepLand",
	yahooSymbol: "K17.SI",
    upPriceAlert: "4.95",
    downPriceAlert: "3.01",
    group: "Estate"
},

{
    name: "STI ETF",
    sticode: "G3B",
    yahooSymbol: "ES3.SI",
    upPriceAlert: "3.25",
    downPriceAlert: "3.00",
    group: "Portfolio,ETF"
},
{
    name: "QianHu",
    upPriceAlert: "0.175",
    downPriceAlert: "0.12",
    yahooSymbol: "552.SI",
   	group: "Portfolio"
},
{
    name: "Kep Corp"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},

{
    name: "SHI",
    group: "China,Index",
    url: "http://www.sse.com.cn/sseportal/ps/zhs/hqjt/zs.jsp",
    pattern: new RegExp("<tr[\\s\\S]*>"+String.fromCharCode(19978,35777,25351, 25968)+"<[\\s\\S]*>(.*)<\\/td[\\s\\S]*>(.*)<\\/td[\\s\\S]*\\/tr", "i"),
    title: "Time\t\tIndex\t\tChange",
    attrs: ["index", "change"],
    priceBoard: function(curObj, lastObj)
                {
                     var last = lastObj? lastObj.index:"-";
                     var re = ["SHI"];
    		     var tmp = String.format("%s/%s", curObj.index, last);
    		     re.push(tmp);
    		     re.push("");
    		     re.push(curObj.change);
    		     re.push((new Date()).format("HH:MM:ss"));
    		     return re;
    		 },
    logStr: function(obj){return String.format("[%s] \t%s\t\t%s", (new Date()).format("HH:MM:ss"), obj.index, obj.change);},
    compareAttr: "index",
    upPriceAlert: "3700",
    downPriceAlert: "2050",
    yahooSymbol: "000001.SS"
},

{
    name: "Lyxor India",
    sticode: "FC6",
    group: "ETF,India",
    upPriceAlert: "16.2",
    downPriceAlert: "11.0",
    yahooSymbol: "FC6.SI"
},

{
    name: "Singtel",
    group: "Telco",
    upPriceAlert: "3.85",
    downPriceAlert: "2.45",
    yahooSymbol: "Z74.SI"
},

{
    name: "Gold",
    group: "Commodities",
    //url: "http://www.sgx.com/wps/portal/marketplace/mp-en/home",
    //pattern: />Gold Spot Price.*>(.*)<\/div>/i,
    //pattern: /Gold Spot Price[\s\S]*>(.*)<\/div/i,
    url: "http://esite.sgx.com/live/st/IBM_ETF_include.asp?incfile=rev_Cmdysum.inc",
    pattern: /GoldValue[\s\S]*>(.*)</i,
    title: "Time\t\tPrice",
    attrs: ["price"],
    priceBoard: function(curObj, lastObj)
                {
                     var last = lastObj? lastObj.price:"-";
                     var re = ["Gold"];
    		     var tmp = String.format("%s/%s", curObj.price, last);
    		     re.push(tmp);
    		     re.push("");
    		     re.push("");
    		     re.push((new Date()).format("HH:MM:ss"));
    		     return re;
    		 },
    logStr: function(obj){return String.format("[%s] \t%s", (new Date()).format("HH:MM:ss"), obj.price);},
    compareAttr: "price",
    upPriceAlert: "1300",
    downPriceAlert: "800"
},/**/
{
    name: "Capitaland",
    yahooSymbol: "C31.SI",
    group: "Estate",
    upPriceAlert: "5.5",
    downPriceAlert: "2.85"
},
{
    name: "CapitaMall",
    yahooSymbol: "C38U.SI",
    group: "Estate",
    upPriceAlert: "3",
    downPriceAlert: "1.25"
},
{
    name: "ChinaEnergy",
    yahooSymbol: "A0G.SI",
    group: "China,Commodities"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},
{
    name: "China Fish",
    yahooSymbol: "B0Z.SI",
    group: "China"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},
{
    name: "ChinaMilk",
    yahooSymbol: "G86.SI",
    group: "China"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},
{
    name: "ChinaOilFld",
    yahooSymbol: "DT2.SI",
    group: "China,Commodities"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},
{
    name: "CITYDEV",
    yahooSymbol: "C09.SI",
    group: "Estate",
    //upPriceAlert: "12",
    downPriceAlert: "7"
},
{
    name: "GreatEast",
    yahooSymbol: "G07.SI",
    group: "Finance"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},
{
    name: "SuntecReit",
    yahooSymbol: "T82U.SI",
    group: "Estate"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},

{
    name: "M1",
	yahooSymbol: "B2F.SI",
    group: "Telco"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},
{
    name: "Starhub",
	yahooSymbol: "CC3.SI",
    group: "Telco"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},
{
    name: "UOB",
	yahooSymbol: "U11.SI",
    group: "Finance",
    upPriceAlert: "21.5",
    downPriceAlert: "16.0"
},

{
    name: "OCBC Bk",
	yahooSymbol: "O39.SI",
    group: "Finance"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},

{
    name: "Starhill Gbl",
	yahooSymbol: "E1:P40U.SI",
    group: "Estate"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},

{

    name: "ChinaKunda",
	yahooSymbol: "E1:GU5.SI",
    group: "Cars"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
},


{
    name: "SPH"
    //upPriceAlert: "1",
    //downPriceAlert: "0.8"
}

]