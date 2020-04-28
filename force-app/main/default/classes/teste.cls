public class teste {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        List<Contact> contactList = new List<Contact>();
        contactList.add(
            new Contact(
                FirstName = 'Carlos',
                LastName = 'Hinz',
                Title = 'Teste',
                Phone = 'Teste',
                Email = 'teste@teste.com.br'
            )
        );
        contactList.add(
            new Contact(
                FirstName = 'Carlos',
                LastName = 'Hinz',
                Title = 'Teste',
                Phone = 'Teste',
                Email = 'teste@teste.com.br'
            )
        );

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String data = '';
        request.setEndpoint(
            'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=IBM&apikey=Q05AY76DQCFENFST'
        );
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(
                response.getBody()
            );
            // Cast the values in the 'animals' key as a list
            List<Object> animals = (List<Object>) results.get('bestMatches');
            for (Object animal : animals) {
                contactList.add(
                    new Contact(
                        FirstName = animal.toString(),
                        LastName = 'Hinz',
                        Title = 'Teste',
                        Phone = 'Teste',
                        Email = 'teste@teste.com.br'
                    )
                );
            }
            contactList.add(
                new Contact(
                    FirstName = 'Carlos',
                    LastName = 'Hinz',
                    Title = 'Teste',
                    Phone = 'Teste',
                    Email = 'teste@teste.com.br'
                )
            );
            contactList.add(
                new Contact(
                    FirstName = 'Carlos',
                    LastName = 'Hinz',
                    Title = 'Teste',
                    Phone = 'Teste',
                    Email = 'teste@teste.com.br'
                )
            );
        }

        System.debug(JSON.serializePretty(contactList));

        return contactList;
    }
}
