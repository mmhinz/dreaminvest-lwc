import { LightningElement } from 'lwc';
import mortgageUtils from 'c/mortgageUtils';

export default class MortgageCalculator extends LightningElement {
    _principal = 200000;
    _years = 30;
    _rate = 5;
    _fund = 30;
    _perfil_fundo = 'Moderado';
    _perfil_consumidor = 'Varejo';
    _ytd = 3.3;

    monthlyPayment = 0.0;

    constructor() {
        super();
        this.calculateMonthlyPayment();
    }

    get fundOptions() {
        return [
            {
                label: 'Predictive Trust 2025             ',
                value:
                    'PT2       ++++       4    ****      Multi-Asset     %%%%     33   $$$$    3.3     ))))     1.1     ((((     9.9     @@@@    9.0     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'General 2025 Global               ',
                value:
                    'G2G       ++++       1    ****      Volatility      %%%%     33   $$$$    12.3    ))))     -12.5   ((((     16.0    @@@@    -6.2    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Madison 300 2025                  ',
                value:
                    'M32       ++++       5    ****      Fixed Income    %%%%     5    $$$$    -6.5    ))))     -0.2    ((((     16.7    @@@@    -4.5    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '3000 Fund First                   ',
                value:
                    '3FF       ++++       1    ****      Volatility      %%%%     8    $$$$    16.6    ))))     -2.2    ((((     5.7     @@@@    4.5     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Cash 2025 Century                 ',
                value:
                    'C2C       ++++       1    ****      Equity          %%%%     29   $$$$    -16.2   ))))     -1.8    ((((     9.6     @@@@    -2.2    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'American 2030 Revenue             ',
                value:
                    'A2R       ++++       4    ****      Commodity       %%%%     26   $$$$    -3.2    ))))     13.5    ((((     -15.6   @@@@    -16.8   {{{{    Agressivo     }}}}     Varejo        '
            }
        ];
    }

    get defaultPrincipal() {
        return this._principal;
    }

    get defaultPerfilFundo() {
        return this._perfil_fundo;
    }

    get defaultPerfilConsumidor() {
        return this._perfil_consumidor;
    }

    get defaultFundDetail() {
        return this._fund_detail;
    }

    get defaultYTD() {
        return this._ytd;
    }

    get defaultRate() {
        return this._rate;
    }

    handleYearChange(event) {
        this._years = event.target.value;
        this.calculateMonthlyPayment();
    }

    handleFundChange(event) {
        this._fund = event.target.value.trim();
        this._rate = event.target.value.substring(21, 22);
        this._perfil_fundo = event.target.value.substring(140, 151).trim();
        this._perfil_consumidor = event.target.value.substring(163, 175).trim();
        this._ytd = event.target.value.substring(74, 81).trim();
        this.calculateMonthlyPayment();
    }

    handlePrincipalChange(event) {
        this._principal = event.target.value;
        this.calculateMonthlyPayment();
    }

    handleRateChange(event) {
        this._rate = event.target.value;
        this.calculateMonthlyPayment();
    }

    handlePerfilFundo() {
        this.calculateMonthlyPayment();
    }

    handlePerfilConsumidor() {
        this.calculateMonthlyPayment();
    }

    handleYTD() {
        this.calculateMonthlyPayment();
    }

    calculateMonthlyPayment() {
        this.monthlyPayment = mortgageUtils.calculateMonthlyPayment(
            this._principal,
            this._years,
            this._rate,
            this._ytd
        );
    }

    get yearOptions() {
        return [
            { label: '20', value: '20' },
            { label: '25', value: '25' },
            { label: '30', value: '30' },
            { label: '35', value: '35' }
        ];
    }
}
