public with sharing class carController {
    //wrapper class
    public class filters{
        @AuraEnabled
        public string searchKey{get;set;}
        @AuraEnabled
        public decimal maxPrice{get;set;}
        @AuraEnabled
        public string[] categories{get;set;}
        @AuraEnabled
        public string[] makeType{get;set;}
    }
    @AuraEnabled(Cacheable=True)
    public static list<Car__C> getCars(filters filters) {
        string key, whereClause='';
        decimal maxPrice;
        string[] categories ;
        string[] makeType ;
        list<string> criteria = new list<string>{};
        if(filters !=null){
            maxPrice = filters.maxPrice;
            categories = filters.categories;
            makeType = filters.makeType;
            if(!string.isEmpty(filters.searchKey)){
                key = '%' + filters.searchKey + '%';
                criteria.add('Name LIKE: key');
            }
            if(filters.maxPrice >0){
                criteria.add('MSRP__C <= :maxPrice');
            }
            if(filters.categories !=null){
                criteria.add('Category__C IN :categories');
            }
            if(filters.makeType !=null){
                criteria.add('Make__c IN :makeType');
            }

            if(criteria.size()>0){
                whereClause = ' WHERE ' + String.join(criteria, ' AND ');
            }
        }
        string query = 'SELECT Id, Name, MSRP__C, Description__C, Category__C, Picture_URL__C FROM Car__C' + whereClause + ' WITH SECURITY_ENFORCED' + ' ORDER BY Name';
        return database.query(query);
    }
}