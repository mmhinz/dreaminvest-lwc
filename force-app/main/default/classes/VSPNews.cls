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
            leadList.add(
                '1-Ações da PETR4 em alta pela manhã, porem a comodide perde valor no mercado'
            );
            leadList.add(
                '2-IBOVEPA tem dia positivo após queda de 2 dias, é hora de comprar ou vender?'
            );
            leadList.add(
                '3-VVAR3 não para de cresce na pandemia do COVID-19, compras on-line aumenta 5%'
            );
        }
        if (Account.Perfil__c == 'Moderado') {
            leadList.add(
                '1-SICREDI apresenta fundo com maior rentabilidade do mercado.'
            );
            leadList.add(
                '2-TESOURO DIRETO tenta captar após crise 4 bilhões de reais.'
            );
        }
        if (Account.Perfil__c == 'Conservador') {
            leadList.add('1-Poupança possui 30 bilhoes');
            leadList.add('2-CAIXA libera poca de ajuda a população');
            leadList.add('3-Fundo de garantia rende menos que poupança');
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

