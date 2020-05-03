public class VSPNews {
    public Account account { get; private set; }
    public List<String> leadList { get; set; }
    public VSPNews() {
        leadList = new List<String>();

        Id id = ApexPages.currentPage().getParameters().get('id');
        account = (id == null)
            ? new Account()
            : [SELECT Name, Perfil__c FROM Account WHERE Id = :id];

        if (Account.Perfil__c == 'Agressivo') {
            leadList.add('Noticia 1 - Paulo não gosta de Francisco');
            leadList.add('Noticia 2 - Francisco não gosta de Paulo');
            leadList.add('Noticia 3 - Carlos não gosta de Jose');
        }
        if (Account.Perfil__c == 'Moderado') {
            leadList.add('Noticia 1 - Paulo não concorda com Jose');
            leadList.add('Noticia 2 - Jose não concorda com Paulo');
        }
        if (Account.Perfil__c == 'Conservador') {
            leadList.add(
                'Noticia 1 - Carlos nem sempre aprova opiniões de Jose'
            );
            leadList.add(
                'Noticia 2 - Jose nem sempre aprova opiniões de Carlos'
            );
            leadList.add(
                'Noticia 3 - Telma nem sempre aprova opiniões de Francisco'
            );
        }
    }
}

/**
public class NewAndExistingController {

    public Account account { get; private set; }

    public NewAndExistingController() {
        Id id = ApexPages.currentPage().getParameters().get('id');
        account = (id == null) ? new Account() : 
            [SELECT Name, Phone, Industry FROM Account WHERE Id = :id];
    }

    public PageReference save() {
        try {
            upsert(account);
        } catch(System.DMLException e) {
            ApexPages.addMessages(e);
            return null;
        }
        //  After successful Save, navigate to the default view page
        PageReference redirectSuccess = new ApexPages.StandardController(Account).view();
        return (redirectSuccess);
    }
}
**/

