import {
  createStore, combineReducers
} from "redux";

const initState = {
  "accounts": [
    {
    "accountNumber": "7799",
    "externalTaxCode": null,
    "externalRevenueClass": null,
    "name": "Annen kostnad, ikke fradragsberettiget",
    "comment": null,
    "currentVatPercentage": 0.00,
    "vatCategoryCode": "0",
    "financialAccountCategory": "purchases",
    "id": 169437,
    "companyId": 1,
    "version": null,
    "links": [{
      "rel": "self",
      "href": "https://demo.moment.team/api/1.0/companies/demo/financialAccounts/169437"
    }]
  }, {
    "accountNumber": "7799",
    "externalTaxCode": null,
    "externalRevenueClass": null,
    "name": "Øreavrunding avgiftsfritt",
    "comment": null,
    "currentVatPercentage": 0.00,
    "vatCategoryCode": "Z",
    "financialAccountCategory": "sales",
    "id": 113553,
    "companyId": 1,
    "version": null,
    "links": [{
      "rel": "self",
      "href": "https://demo.moment.team/api/1.0/companies/demo/financialAccounts/113553"
    }]
  }]
};

function AccountsStoreReduces(state=initState, action) {
  switch(action.type) {
    case 'PAGE_LOADED':
      return {
        ...state,
        accounts: action.data.accounts,
      };
    case 'SUBMIT_ACCOUNT':
      return {
        ...state,
        accounts: ([action.data.account]).concat(state.accounts),
      };
    case 'DELETE_ACCOUNT':
      return {
        ...state,
        accounts: state.accounts.filter((account) => account.id !== action.id),
      };
    case 'SET_EDIT':
      return {
        ...state,
        accountToEdit: action.account,
      };
    case 'EDIT_ACCOUNT':
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if(account._id === action.data.account.id) {
            return {
              ...action.data.account,
            }
          }
          return account;
        }),
        accountToEdit: undefined,
      }
    default:
      return state;
  }
};

const reducers = combineReducers({
  AccountsStoreReduces,
});

const store =  createStore(reducers);

export default store;