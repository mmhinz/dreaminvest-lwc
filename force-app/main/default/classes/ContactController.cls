public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Fundos__c> getContactList() {
        List<Fundos__c> todosFundosList = new List<Fundos__c>();
        List<Fundos__c> fundoList = new List<Fundos__c>();

        String fundo;
        String url;

        fundo = 'IBM';
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=Q05AY76DQCFENFST';
        fundoList = getFundo(fundo, url);
        todosFundosList.addAll(fundoList);

        fundo = 'PETRO 4';
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=PETR4.SA&interval=1min&apikey=Q05AY76DQCFENFST';
        fundoList = getFundo(fundo, url);
        todosFundosList.addAll(fundoList);

        fundo = 'IBOVESPA';
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=^BVSP&interval=1min&apikey=Q05AY76DQCFENFST';
        fundoList = getFundo(fundo, url);
        todosFundosList.addAll(fundoList);

        fundo = 'VIA VAREJO';
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=VVAR3.SAO&interval=1min&apikey=Q05AY76DQCFENFST';
        fundoList = getFundo(fundo, url);
        todosFundosList.addAll(fundoList);

        fundo = 'EMBR3.SAO';
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=EMBR3.SAO&interval=1min&apikey=Q05AY76DQCFENFST';
        fundoList = getFundo(fundo, url);
        todosFundosList.addAll(fundoList);

        fundo = 'AZUL4';
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AZUL4.SAO&interval=1min&apikey=Q05AY76DQCFENFST';
        fundoList = getFundo(fundo, url);
        todosFundosList.addAll(fundoList);

        fundo = 'MGLU3.SAO';
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MGLU3.SAO&interval=1min&apikey=Q05AY76DQCFENFST';
        fundoList = getFundo(fundo, url);
        todosFundosList.addAll(fundoList);

        fundo = 'SICREDI LONGO PRAZO';
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=0P0000U2H8.SAO&interval=1min&apikey=Q05AY76DQCFENFST';
        fundoList = getFundo(fundo, url);
        todosFundosList.addAll(fundoList);

        fundo = 'SICREDI RENDA FIXA';
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=0P0000U2HA.SAO&interval=1min&apikey=Q05AY76DQCFENFST';
        fundoList = getFundo(fundo, url);
        todosFundosList.addAll(fundoList);

        fundo = 'SICREDI PREVIDENCIA';
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=0P0000U2H5.SAO&interval=1min&apikey=Q05AY76DQCFENFST';
        fundoList = getFundo(fundo, url);
        todosFundosList.addAll(fundoList);

        return todosFundosList;
    }

    public static List<Fundos__c> getFundo(String fundo, String url) {
        List<Fundos__c> contactList = new List<Fundos__c>();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(url);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            Map<String, Object> resMap = (Map<String, Object>) JSON.deserializeUntyped(
                response.getBody()
            );
            Object signature = resMap.get('Time Series (1min)');
            String payLoad = signature.toString();
            String open = payLoad.substringAfter('1. open')
                .substringBefore('2. high');
            open = open.substring(1, open.length() - 2);
            String high = payLoad.substringAfter('2. high')
                .substringBefore('3. low');
            high = high.substring(1, high.length() - 2);
            String low = payLoad.substringAfter('3. low')
                .substringBefore('4. close');
            low = low.substring(1, low.length() - 2);
            String close = payLoad.substringAfter('4. close')
                .substringBefore('5. volume');
            close = close.substring(1, close.length() - 2);
            String volume = payLoad.substringAfter('5. volume')
                .substringBefore('}');
            volume = volume.substring(1, volume.length());
            contactList.add(
                new Fundos__c(
                    Chave__c = fundo,
                    Abertura__c = open,
                    Fechamento__c = close,
                    Volume__c = volume,
                    Alta__c = high,
                    Baixa__c = low
                )
            );
        }
        return contactList;
    }
}
