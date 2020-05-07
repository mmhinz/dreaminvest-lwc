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
            },
            {
                label: 'Cash 2030 Commodities             ',
                value:
                    'C2C       ++++       4    ****      Fixed Income    %%%%     4    $$$$    2.7     ))))     15.0    ((((     -12.6   @@@@    -18.7   {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '2025 Global Cash                  ',
                value:
                    '2GC       ++++       4    ****      Currency        %%%%     36   $$$$    -14.9   ))))     -6.9    ((((     -7.2    @@@@    13.6    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Cash Millenium Hamilton           ',
                value:
                    'CMH       ++++       2    ****      Equity          %%%%     13   $$$$    -11.3   ))))     13.6    ((((     -6.3    @@@@    -2.4    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Assets 2030 3000                  ',
                value:
                    'A23       ++++       2    ****      Fixed Income    %%%%     3    $$$$    -2.6    ))))     9.2     ((((     -18.9   @@@@    1.0     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Principal 3000 First              ',
                value:
                    'P3F       ++++       4    ****      Volatility      %%%%     32   $$$$    -15.6   ))))     1.4     ((((     17.6    @@@@    12.4    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Financials 100 Capital            ',
                value:
                    'F1C       ++++       2    ****      Bond            %%%%     5    $$$$    15.9    ))))     7.3     ((((     -14.4   @@@@    3.1     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: '3000 Index Hamilton               ',
                value:
                    '3IH       ++++       1    ****      Multi-Asset     %%%%     11   $$$$    -3.1    ))))     10.3    ((((     -2.9    @@@@    8.9     {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: '2025 Global Predictive            ',
                value:
                    '2GP       ++++       5    ****      Volatility      %%%%     7    $$$$    -18.1   ))))     16.6    ((((     1.6     @@@@    -12.9   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Principal 2025 Washington         ',
                value:
                    'P2W       ++++       1    ****      Volatility      %%%%     8    $$$$    8.1     ))))     -8.2    ((((     19.9    @@@@    0.8     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Index 2030 Madison                ',
                value:
                    'I2M       ++++       1    ****      Bond            %%%%     27   $$$$    -8.2    ))))     -16.2   ((((     3.0     @@@@    -13.3   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Fund Franklin Management          ',
                value:
                    'FFM       ++++       2    ****      Equity          %%%%     13   $$$$    10.1    ))))     13.2    ((((     -9.7    @@@@    1.4     {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Retirement 500 Capital            ',
                value:
                    'R5C       ++++       3    ****      Fixed Income    %%%%     34   $$$$    -10.1   ))))     -10.7   ((((     7.1     @@@@    -5.6    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Investments Predictive Holding    ',
                value:
                    'IPH       ++++       1    ****      Equity          %%%%     1    $$$$    1.2     ))))     5.2     ((((     5.1     @@@@    7.3     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Commodities First 300             ',
                value:
                    'CF3       ++++       2    ****      Equity          %%%%     9    $$$$    10.1    ))))     7.6     ((((     19.7    @@@@    -12.4   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2025 Holding 3000                 ',
                value:
                    '2H3       ++++       3    ****      Volatility      %%%%     38   $$$$    19.9    ))))     10.4    ((((     19.5    @@@@    -0.3    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: '3000 Global Century               ',
                value:
                    '3GC       ++++       3    ****      Equity          %%%%     13   $$$$    -17.1   ))))     1.7     ((((     7.0     @@@@    -6.4    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Millenium 2025 Retirement         ',
                value:
                    'M2R       ++++       3    ****      Commodity       %%%%     5    $$$$    14.3    ))))     16.1    ((((     15.3    @@@@    -19.8   {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Franklin Treasury Millenium       ',
                value:
                    'FTM       ++++       5    ****      Bond            %%%%     7    $$$$    -10.4   ))))     -12.8   ((((     -10.4   @@@@    -5.3    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Financials 2040 Jefferson         ',
                value:
                    'F2J       ++++       2    ****      Currency        %%%%     23   $$$$    -19.4   ))))     2.9     ((((     -15.7   @@@@    5.6     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Investments Lincoln 300           ',
                value:
                    'IL3       ++++       2    ****      Volatility      %%%%     34   $$$$    -0.7    ))))     12.9    ((((     5.7     @@@@    3.1     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Jefferson Cash 2025               ',
                value:
                    'JC2       ++++       4    ****      Commodity       %%%%     31   $$$$    -17.4   ))))     -18.9   ((((     -9.6    @@@@    9.6     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Lincoln Management Assets         ',
                value:
                    'LMA       ++++       2    ****      Currency        %%%%     31   $$$$    -1.4    ))))     -0.9    ((((     -10.3   @@@@    -4.2    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2040 3000 First                   ',
                value:
                    '23F       ++++       5    ****      Equity          %%%%     22   $$$$    -2.4    ))))     -6.1    ((((     8.0     @@@@    2.1     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: '2025 General Adams                ',
                value:
                    '2GA       ++++       4    ****      Currency        %%%%     39   $$$$    -0.9    ))))     7.6     ((((     -16.7   @@@@    -16.2   {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Assets Cash Trust                 ',
                value:
                    'ACT       ++++       2    ****      Bond            %%%%     5    $$$$    12.3    ))))     10.3    ((((     -8.8    @@@@    -3.9    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Market 3000 General               ',
                value:
                    'M3G       ++++       4    ****      Volatility      %%%%     39   $$$$    -0.4    ))))     0.2     ((((     0.6     @@@@    -3.2    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Jefferson Diversified First       ',
                value:
                    'JDF       ++++       3    ****      Equity          %%%%     15   $$$$    16.2    ))))     -3.1    ((((     -1.4    @@@@    -17.7   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Commodities 2040 2020             ',
                value:
                    'C22       ++++       4    ****      Commodity       %%%%     3    $$$$    8.1     ))))     -6.0    ((((     -6.9    @@@@    -12.8   {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Capital Adams 300                 ',
                value:
                    'CA3       ++++       3    ****      Currency        %%%%     35   $$$$    -12.6   ))))     -1.8    ((((     18.7    @@@@    -1.6    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: '3000 2025 100                     ',
                value:
                    '321       ++++       4    ****      Fixed Income    %%%%     27   $$$$    -18.7   ))))     1.1     ((((     -15.7   @@@@    13.5    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Treasury 2025 3000                ',
                value:
                    'T23       ++++       4    ****      Multi-Asset     %%%%     4    $$$$    -11.9   ))))     4.9     ((((     -2.0    @@@@    10.1    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2025 Franklin 2025                ',
                value:
                    '2F2       ++++       1    ****      Equity          %%%%     33   $$$$    -3.5    ))))     -17.3   ((((     18.5    @@@@    -1.5    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'American Global Millenium         ',
                value:
                    'AGM       ++++       4    ****      Fixed Income    %%%%     26   $$$$    -10.9   ))))     17.9    ((((     -3.2    @@@@    -8.1    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Revenue Washington 500            ',
                value:
                    'RW5       ++++       3    ****      Equity          %%%%     37   $$$$    -6.4    ))))     2.3     ((((     9.2     @@@@    -2.9    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Index Trust Century               ',
                value:
                    'ITC       ++++       4    ****      Volatility      %%%%     11   $$$$    6.5     ))))     6.5     ((((     -14.6   @@@@    -18.4   {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Cash Franklin Adams               ',
                value:
                    'CFA       ++++       2    ****      Volatility      %%%%     29   $$$$    -9.8    ))))     -3.0    ((((     12.2    @@@@    -18.9   {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Retirement 2025 Treasury          ',
                value:
                    'R2T       ++++       5    ****      Commodity       %%%%     24   $$$$    7.5     ))))     -5.4    ((((     1.6     @@@@    3.8     {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Revenue General Jefferson         ',
                value:
                    'RGJ       ++++       3    ****      Currency        %%%%     36   $$$$    -14.6   ))))     -3.6    ((((     -7.3    @@@@    18.4    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Assets 2030 Treasury              ',
                value:
                    'A2T       ++++       1    ****      Volatility      %%%%     32   $$$$    7.8     ))))     -9.7    ((((     -10.3   @@@@    13.7    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Century Investments 2030          ',
                value:
                    'CI2       ++++       5    ****      Equity          %%%%     39   $$$$    -0.9    ))))     -6.8    ((((     -0.1    @@@@    -6.2    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: '500 American Century              ',
                value:
                    '5AC       ++++       5    ****      Volatility      %%%%     38   $$$$    -8.6    ))))     -7.0    ((((     3.8     @@@@    -16.4   {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Hamilton International 100        ',
                value:
                    'HI1       ++++       3    ****      Fixed Income    %%%%     35   $$$$    -18.8   ))))     6.8     ((((     -14.9   @@@@    4.8     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Cash 2025 Index                   ',
                value:
                    'C2I       ++++       3    ****      Multi-Asset     %%%%     11   $$$$    18.4    ))))     -15.7   ((((     -15.3   @@@@    -9.6    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Commodities Diversified Capital   ',
                value:
                    'CDC       ++++       3    ****      Currency        %%%%     24   $$$$    -13.5   ))))     10.0    ((((     -4.8    @@@@    18.2    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Lincoln Investments 2030          ',
                value:
                    'LI2       ++++       1    ****      Commodity       %%%%     27   $$$$    -16.4   ))))     16.9    ((((     8.1     @@@@    5.7     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Target Adams Principal            ',
                value:
                    'TAP       ++++       5    ****      Equity          %%%%     18   $$$$    0.2     ))))     -13.6   ((((     -8.0    @@@@    -12.0   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Revenue Global Trust              ',
                value:
                    'RGT       ++++       3    ****      Bond            %%%%     11   $$$$    14.7    ))))     -9.4    ((((     -0.1    @@@@    1.7     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Treasury Lincoln Holding          ',
                value:
                    'TLH       ++++       4    ****      Bond            %%%%     22   $$$$    -11.0   ))))     -6.0    ((((     4.6     @@@@    -11.4   {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Madison 2025 Commodities          ',
                value:
                    'M2C       ++++       5    ****      Bond            %%%%     27   $$$$    -9.8    ))))     -19.5   ((((     13.0    @@@@    -16.4   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Cash Management Predictive        ',
                value:
                    'CMP       ++++       3    ****      Fixed Income    %%%%     32   $$$$    -7.2    ))))     -11.5   ((((     -16.9   @@@@    6.8     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: '2040 Holding Revenue              ',
                value:
                    '2HR       ++++       1    ****      Equity          %%%%     3    $$$$    -19.2   ))))     8.9     ((((     13.3    @@@@    6.2     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: '2040 Millenium 300                ',
                value:
                    '2M3       ++++       2    ****      Equity          %%%%     15   $$$$    -5.6    ))))     -0.5    ((((     -10.8   @@@@    17.6    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Global Madison Financials         ',
                value:
                    'GMF       ++++       2    ****      Volatility      %%%%     29   $$$$    18.1    ))))     7.2     ((((     8.2     @@@@    5.7     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '100 Capital 2020                  ',
                value:
                    '1C2       ++++       5    ****      Fixed Income    %%%%     32   $$$$    14.7    ))))     10.8    ((((     5.6     @@@@    19.4    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Trust Global Treasury             ',
                value:
                    'TGT       ++++       3    ****      Volatility      %%%%     12   $$$$    -7.2    ))))     -8.5    ((((     19.3    @@@@    -18.6   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Assets Predictive Cash            ',
                value:
                    'APC       ++++       5    ****      Bond            %%%%     16   $$$$    12.5    ))))     9.7     ((((     17.8    @@@@    15.7    {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Management Index Lincoln          ',
                value:
                    'MIL       ++++       5    ****      Bond            %%%%     14   $$$$    -19.9   ))))     -7.4    ((((     7.3     @@@@    -0.4    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Diversified 500 Market            ',
                value:
                    'D5M       ++++       2    ****      Volatility      %%%%     37   $$$$    8.0     ))))     7.6     ((((     6.5     @@@@    19.4    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Fund Market Diversified           ',
                value:
                    'FMD       ++++       3    ****      Multi-Asset     %%%%     26   $$$$    -6.1    ))))     -19.2   ((((     16.9    @@@@    0.7     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'International Financials Assets   ',
                value:
                    'IFA       ++++       5    ****      Multi-Asset     %%%%     29   $$$$    18.3    ))))     -11.6   ((((     9.9     @@@@    19.2    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'International 2040 Holding        ',
                value:
                    'I2H       ++++       4    ****      Volatility      %%%%     14   $$$$    0.2     ))))     -3.1    ((((     -2.0    @@@@    -16.9   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Investments Madison 2020          ',
                value:
                    'IM2       ++++       2    ****      Currency        %%%%     4    $$$$    -4.9    ))))     17.3    ((((     -14.4   @@@@    -10.0   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Capital Washington Retirement     ',
                value:
                    'CWR       ++++       2    ****      Commodity       %%%%     33   $$$$    9.3     ))))     -6.2    ((((     -18.4   @@@@    2.5     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Century Cash Capital              ',
                value:
                    'CCC       ++++       3    ****      Currency        %%%%     27   $$$$    -7.0    ))))     -12.9   ((((     -10.1   @@@@    -5.4    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Principal Index Target            ',
                value:
                    'PIT       ++++       2    ****      Commodity       %%%%     40   $$$$    -15.7   ))))     16.7    ((((     -17.1   @@@@    -15.1   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Hamilton 300 Holding              ',
                value:
                    'H3H       ++++       5    ****      Bond            %%%%     14   $$$$    -2.6    ))))     -12.4   ((((     -4.9    @@@@    -0.2    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Adams Target Millenium            ',
                value:
                    'ATM       ++++       4    ****      Volatility      %%%%     18   $$$$    17.5    ))))     -19.2   ((((     -0.5    @@@@    4.5     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '2025 International 2020           ',
                value:
                    '2I2       ++++       4    ****      Fixed Income    %%%%     32   $$$$    12.6    ))))     6.6     ((((     10.9    @@@@    -18.4   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Commodities Millenium Revenue     ',
                value:
                    'CMR       ++++       5    ****      Bond            %%%%     24   $$$$    2.2     ))))     1.4     ((((     -15.9   @@@@    10.8    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Treasury 100 Madison              ',
                value:
                    'T1M       ++++       3    ****      Multi-Asset     %%%%     36   $$$$    -0.6    ))))     16.1    ((((     13.6    @@@@    13.6    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Target Diversified Commodities    ',
                value:
                    'TDC       ++++       5    ****      Bond            %%%%     36   $$$$    -16.1   ))))     19.7    ((((     5.8     @@@@    -19.4   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'First Lincoln 2025                ',
                value:
                    'FL2       ++++       2    ****      Fixed Income    %%%%     27   $$$$    3.4     ))))     18.4    ((((     12.4    @@@@    -11.9   {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Capital 2040 Revenue              ',
                value:
                    'C2R       ++++       5    ****      Commodity       %%%%     6    $$$$    9.8     ))))     -6.3    ((((     -14.9   @@@@    12.0    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2030 Century Millenium            ',
                value:
                    '2CM       ++++       2    ****      Volatility      %%%%     18   $$$$    -6.0    ))))     11.7    ((((     18.8    @@@@    8.3     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'International 100 Market          ',
                value:
                    'I1M       ++++       5    ****      Bond            %%%%     32   $$$$    1.7     ))))     1.8     ((((     -4.0    @@@@    -2.4    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Century Jefferson Financials      ',
                value:
                    'CJF       ++++       3    ****      Currency        %%%%     11   $$$$    -10.9   ))))     18.3    ((((     19.1    @@@@    19.4    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Adams Washington Target           ',
                value:
                    'AWT       ++++       3    ****      Commodity       %%%%     6    $$$$    5.8     ))))     -2.7    ((((     16.3    @@@@    -16.6   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Retirement Washington Treasury    ',
                value:
                    'RWT       ++++       3    ****      Fixed Income    %%%%     35   $$$$    3.1     ))))     17.8    ((((     1.9     @@@@    -13.7   {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '2040 Adams American               ',
                value:
                    '2AA       ++++       3    ****      Volatility      %%%%     19   $$$$    -10.2   ))))     -12.9   ((((     12.7    @@@@    5.4     {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'General American 2030             ',
                value:
                    'GA2       ++++       3    ****      Multi-Asset     %%%%     17   $$$$    -14.2   ))))     -18.1   ((((     11.4    @@@@    6.3     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'American Retirement Revenue       ',
                value:
                    'ARR       ++++       3    ****      Volatility      %%%%     1    $$$$    11.8    ))))     2.8     ((((     13.8    @@@@    15.0    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Financials Century Madison        ',
                value:
                    'FCM       ++++       2    ****      Commodity       %%%%     1    $$$$    -18.2   ))))     1.6     ((((     14.4    @@@@    -5.3    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Management Franklin Capital       ',
                value:
                    'MFC       ++++       3    ****      Fixed Income    %%%%     15   $$$$    -18.3   ))))     4.7     ((((     -16.0   @@@@    -5.5    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: '2025 2020 Principal               ',
                value:
                    '22P       ++++       2    ****      Volatility      %%%%     24   $$$$    -9.9    ))))     10.4    ((((     11.3    @@@@    10.4    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Investments International 2020    ',
                value:
                    'II2       ++++       2    ****      Volatility      %%%%     22   $$$$    10.7    ))))     1.4     ((((     13.9    @@@@    7.3     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: '100 Capital Trust                 ',
                value:
                    '1CT       ++++       5    ****      Equity          %%%%     15   $$$$    5.9     ))))     -20.0   ((((     -18.5   @@@@    15.7    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Principal 2025 General            ',
                value:
                    'P2G       ++++       1    ****      Commodity       %%%%     3    $$$$    -0.9    ))))     6.5     ((((     11.3    @@@@    -6.9    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '3000 Global Assets                ',
                value:
                    '3GA       ++++       5    ****      Volatility      %%%%     17   $$$$    -15.9   ))))     -19.6   ((((     -6.7    @@@@    12.2    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Treasury 3000 Millenium           ',
                value:
                    'T3M       ++++       4    ****      Multi-Asset     %%%%     16   $$$$    -11.8   ))))     8.9     ((((     -17.2   @@@@    -2.7    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '100 Revenue 2040                  ',
                value:
                    '1R2       ++++       1    ****      Commodity       %%%%     3    $$$$    11.7    ))))     -13.9   ((((     6.6     @@@@    4.2     {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Cash Adams Fund                   ',
                value:
                    'CAF       ++++       1    ****      Fixed Income    %%%%     21   $$$$    19.2    ))))     -7.6    ((((     1.4     @@@@    -0.8    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Jefferson Lincoln First           ',
                value:
                    'JLF       ++++       2    ****      Multi-Asset     %%%%     36   $$$$    3.7     ))))     -0.3    ((((     4.7     @@@@    -18.9   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Retirement Diversified American   ',
                value:
                    'RDA       ++++       3    ****      Currency        %%%%     0    $$$$    5.1     ))))     -11.1   ((((     -18.3   @@@@    -7.0    {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Predictive 2040 2025              ',
                value:
                    'P22       ++++       5    ****      Volatility      %%%%     0    $$$$    -10.5   ))))     6.5     ((((     -2.7    @@@@    -3.8    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '2020 First Management             ',
                value:
                    '2FM       ++++       2    ****      Fixed Income    %%%%     18   $$$$    6.0     ))))     -1.5    ((((     -7.9    @@@@    -7.8    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'First Predictive Diversified      ',
                value:
                    'FPD       ++++       1    ****      Commodity       %%%%     4    $$$$    16.5    ))))     -13.8   ((((     -5.7    @@@@    -14.9   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Jefferson Washington Century      ',
                value:
                    'JWC       ++++       2    ****      Volatility      %%%%     33   $$$$    -0.7    ))))     6.7     ((((     15.4    @@@@    -9.6    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'First 2025 Investments            ',
                value:
                    'F2I       ++++       3    ****      Bond            %%%%     23   $$$$    -9.3    ))))     10.9    ((((     -2.4    @@@@    1.9     {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Market Index Adams                ',
                value:
                    'MIA       ++++       3    ****      Fixed Income    %%%%     18   $$$$    -3.1    ))))     1.4     ((((     -18.3   @@@@    -18.4   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2025 Market Principal             ',
                value:
                    '2MP       ++++       5    ****      Equity          %%%%     29   $$$$    9.8     ))))     -15.0   ((((     0.1     @@@@    12.0    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '2025 International Madison        ',
                value:
                    '2IM       ++++       3    ****      Multi-Asset     %%%%     11   $$$$    12.7    ))))     18.6    ((((     9.1     @@@@    -0.3    {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'First American 2040               ',
                value:
                    'FA2       ++++       3    ****      Multi-Asset     %%%%     39   $$$$    18.7    ))))     1.4     ((((     -3.5    @@@@    -3.3    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'First 300 Century                 ',
                value:
                    'F3C       ++++       3    ****      Fixed Income    %%%%     1    $$$$    -15.2   ))))     16.3    ((((     7.6     @@@@    -16.1   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Revenue 100 2025                  ',
                value:
                    'R12       ++++       3    ****      Volatility      %%%%     32   $$$$    -6.7    ))))     18.6    ((((     -7.5    @@@@    7.1     {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: '100 International Franklin        ',
                value:
                    '1IF       ++++       2    ****      Fixed Income    %%%%     35   $$$$    -6.7    ))))     -12.2   ((((     13.1    @@@@    -0.6    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '100 Global Capital                ',
                value:
                    '1GC       ++++       4    ****      Equity          %%%%     26   $$$$    -11.6   ))))     -4.6    ((((     5.1     @@@@    -20.0   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Principal 2030 Retirement         ',
                value:
                    'P2R       ++++       4    ****      Volatility      %%%%     31   $$$$    -14.1   ))))     -12.5   ((((     6.3     @@@@    -17.1   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Treasury Madison General          ',
                value:
                    'TMG       ++++       3    ****      Bond            %%%%     23   $$$$    4.8     ))))     2.9     ((((     0.8     @@@@    9.9     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Predictive 2030 International     ',
                value:
                    'P2I       ++++       1    ****      Fixed Income    %%%%     34   $$$$    11.7    ))))     -4.7    ((((     1.1     @@@@    18.8    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Washington First Treasury         ',
                value:
                    'WFT       ++++       1    ****      Bond            %%%%     16   $$$$    -11.5   ))))     3.7     ((((     3.6     @@@@    -11.3   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Capital American 3000             ',
                value:
                    'CA3       ++++       2    ****      Currency        %%%%     37   $$$$    10.6    ))))     -1.4    ((((     -15.3   @@@@    -9.7    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Index International Adams         ',
                value:
                    'IIA       ++++       2    ****      Equity          %%%%     2    $$$$    -7.1    ))))     16.9    ((((     6.1     @@@@    -14.0   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Madison First Adams               ',
                value:
                    'MFA       ++++       3    ****      Commodity       %%%%     36   $$$$    -18.3   ))))     -17.1   ((((     -4.3    @@@@    -17.0   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Lincoln Management Trust          ',
                value:
                    'LMT       ++++       3    ****      Equity          %%%%     25   $$$$    10.5    ))))     9.0     ((((     -12.9   @@@@    9.5     {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Treasury Target Market            ',
                value:
                    'TTM       ++++       2    ****      Equity          %%%%     16   $$$$    4.9     ))))     2.1     ((((     1.3     @@@@    1.3     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '3000 Treasury 2025                ',
                value:
                    '3T2       ++++       5    ****      Currency        %%%%     33   $$$$    -10.4   ))))     -12.8   ((((     18.3    @@@@    -6.7    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Trust Revenue Commodities         ',
                value:
                    'TRC       ++++       3    ****      Bond            %%%%     26   $$$$    5.5     ))))     -3.8    ((((     -14.3   @@@@    7.5     {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Lincoln 2020 American             ',
                value:
                    'L2A       ++++       3    ****      Currency        %%%%     16   $$$$    -16.7   ))))     2.2     ((((     15.8    @@@@    -19.1   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'International Jefferson Washington',
                value:
                    'IJW       ++++       2    ****      Volatility      %%%%     6    $$$$    14.9    ))))     -10.0   ((((     -19.7   @@@@    -15.1   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Financials 2030 American          ',
                value:
                    'F2A       ++++       1    ****      Bond            %%%%     35   $$$$    2.4     ))))     -0.9    ((((     4.9     @@@@    17.5    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'General Franklin International    ',
                value:
                    'GFI       ++++       4    ****      Commodity       %%%%     16   $$$$    -14.1   ))))     18.1    ((((     -8.2    @@@@    3.1     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Trust Century Jefferson           ',
                value:
                    'TCJ       ++++       5    ****      Equity          %%%%     32   $$$$    19.8    ))))     -9.4    ((((     -10.6   @@@@    -5.4    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Trust Index Hamilton              ',
                value:
                    'TIH       ++++       2    ****      Commodity       %%%%     31   $$$$    -5.9    ))))     -2.9    ((((     -2.2    @@@@    -9.3    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Jefferson Principal Index         ',
                value:
                    'JPI       ++++       1    ****      Currency        %%%%     35   $$$$    4.4     ))))     4.3     ((((     -12.9   @@@@    -19.4   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'American 2040 Principal           ',
                value:
                    'A2P       ++++       2    ****      Commodity       %%%%     31   $$$$    -16.7   ))))     -14.7   ((((     -8.6    @@@@    -0.4    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Commodities First Century         ',
                value:
                    'CFC       ++++       3    ****      Volatility      %%%%     10   $$$$    -11.8   ))))     -19.6   ((((     -6.0    @@@@    -10.9   {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Revenue Hamilton 2030             ',
                value:
                    'RH2       ++++       4    ****      Bond            %%%%     22   $$$$    -3.5    ))))     14.2    ((((     -4.7    @@@@    -12.4   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2030 Lincoln Global               ',
                value:
                    '2LG       ++++       2    ****      Bond            %%%%     9    $$$$    -8.0    ))))     -7.4    ((((     16.1    @@@@    13.1    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Lincoln Century Trust             ',
                value:
                    'LCT       ++++       2    ****      Equity          %%%%     34   $$$$    -17.4   ))))     2.2     ((((     -18.9   @@@@    -19.5   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Diversified 3000 2020             ',
                value:
                    'D32       ++++       2    ****      Volatility      %%%%     31   $$$$    -6.0    ))))     -10.8   ((((     -2.9    @@@@    -12.5   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Jefferson Global Index            ',
                value:
                    'JGI       ++++       3    ****      Bond            %%%%     26   $$$$    3.8     ))))     2.2     ((((     15.4    @@@@    -17.8   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Century Diversified Management    ',
                value:
                    'CDM       ++++       1    ****      Commodity       %%%%     35   $$$$    1.4     ))))     -4.7    ((((     6.3     @@@@    5.0     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Index Century Commodities         ',
                value:
                    'ICC       ++++       4    ****      Commodity       %%%%     24   $$$$    9.2     ))))     18.1    ((((     0.5     @@@@    1.2     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Diversified Capital Market        ',
                value:
                    'DCM       ++++       2    ****      Fixed Income    %%%%     37   $$$$    -18.8   ))))     2.6     ((((     -3.3    @@@@    9.6     {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Index Revenue Principal           ',
                value:
                    'IRP       ++++       4    ****      Commodity       %%%%     16   $$$$    -0.4    ))))     9.8     ((((     18.4    @@@@    -14.7   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Adams Retirement 100              ',
                value:
                    'AR1       ++++       5    ****      Commodity       %%%%     35   $$$$    -8.0    ))))     13.1    ((((     8.9     @@@@    -15.8   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '100 Cash Lincoln                  ',
                value:
                    '1CL       ++++       2    ****      Volatility      %%%%     10   $$$$    6.3     ))))     0.6     ((((     -12.4   @@@@    5.4     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Treasury General 2020             ',
                value:
                    'TG2       ++++       5    ****      Fixed Income    %%%%     31   $$$$    18.1    ))))     -3.2    ((((     -3.4    @@@@    10.7    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Commodities Target Hamilton       ',
                value:
                    'CTH       ++++       4    ****      Volatility      %%%%     31   $$$$    2.3     ))))     -15.4   ((((     -2.3    @@@@    -16.4   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: '2040 Fund Millenium               ',
                value:
                    '2FM       ++++       3    ****      Commodity       %%%%     12   $$$$    3.6     ))))     12.9    ((((     -15.4   @@@@    -11.9   {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'First Madison Market              ',
                value:
                    'FMM       ++++       4    ****      Volatility      %%%%     4    $$$$    3.1     ))))     -7.2    ((((     -9.7    @@@@    17.1    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Target Lincoln First              ',
                value:
                    'TLF       ++++       1    ****      Bond            %%%%     12   $$$$    -14.5   ))))     10.5    ((((     10.8    @@@@    17.6    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '100 2030 Investments              ',
                value:
                    '12I       ++++       1    ****      Volatility      %%%%     1    $$$$    -10.6   ))))     -16.6   ((((     16.7    @@@@    9.7     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Global 300 Treasury               ',
                value:
                    'G3T       ++++       4    ****      Multi-Asset     %%%%     33   $$$$    13.8    ))))     14.1    ((((     -19.0   @@@@    -7.5    {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Index 2020 Retirement             ',
                value:
                    'I2R       ++++       3    ****      Volatility      %%%%     12   $$$$    19.0    ))))     18.5    ((((     7.1     @@@@    -10.7   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2025 Market International         ',
                value:
                    '2MI       ++++       1    ****      Fixed Income    %%%%     21   $$$$    3.7     ))))     3.7     ((((     9.9     @@@@    1.1     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '3000 2025 General                 ',
                value:
                    '32G       ++++       2    ****      Bond            %%%%     35   $$$$    11.7    ))))     17.0    ((((     9.3     @@@@    -2.8    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '2040 2025 Century                 ',
                value:
                    '22C       ++++       3    ****      Volatility      %%%%     25   $$$$    6.6     ))))     16.4    ((((     0.3     @@@@    -17.0   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2040 Investments Commodities      ',
                value:
                    '2IC       ++++       3    ****      Equity          %%%%     12   $$$$    16.4    ))))     18.6    ((((     -20.0   @@@@    -16.7   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Predictive Madison Management     ',
                value:
                    'PMM       ++++       3    ****      Equity          %%%%     32   $$$$    -18.7   ))))     2.6     ((((     -10.5   @@@@    -16.7   {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'American 2040 Financials          ',
                value:
                    'A2F       ++++       5    ****      Volatility      %%%%     22   $$$$    1.9     ))))     11.7    ((((     -9.1    @@@@    17.9    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Jefferson Predictive Market       ',
                value:
                    'JPM       ++++       2    ****      Currency        %%%%     23   $$$$    9.9     ))))     17.1    ((((     10.3    @@@@    19.9    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: '2020 Management Madison           ',
                value:
                    '2MM       ++++       4    ****      Currency        %%%%     28   $$$$    12.4    ))))     -6.1    ((((     9.0     @@@@    9.4     {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Predictive 300 Millenium          ',
                value:
                    'P3M       ++++       3    ****      Volatility      %%%%     6    $$$$    8.5     ))))     -16.3   ((((     -13.3   @@@@    -12.0   {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Target Cash Revenue               ',
                value:
                    'TCR       ++++       3    ****      Bond            %%%%     14   $$$$    -2.4    ))))     -3.3    ((((     -19.9   @@@@    -18.6   {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'General Retirement Jefferson      ',
                value:
                    'GRJ       ++++       4    ****      Equity          %%%%     13   $$$$    17.8    ))))     -15.2   ((((     17.6    @@@@    12.6    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Holding 300 500                   ',
                value:
                    'H35       ++++       3    ****      Multi-Asset     %%%%     31   $$$$    7.8     ))))     1.2     ((((     7.3     @@@@    13.7    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Management International Market   ',
                value:
                    'MIM       ++++       3    ****      Fixed Income    %%%%     4    $$$$    -14.8   ))))     -6.4    ((((     -0.7    @@@@    17.0    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Jefferson Lincoln Index           ',
                value:
                    'JLI       ++++       3    ****      Commodity       %%%%     40   $$$$    11.4    ))))     12.9    ((((     2.6     @@@@    -16.3   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2030 Madison International        ',
                value:
                    '2MI       ++++       3    ****      Multi-Asset     %%%%     14   $$$$    18.0    ))))     -11.9   ((((     -16.7   @@@@    -10.9   {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Adams Fund Investments            ',
                value:
                    'AFI       ++++       3    ****      Commodity       %%%%     34   $$$$    15.8    ))))     13.6    ((((     19.1    @@@@    10.0    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Madison Cash Franklin             ',
                value:
                    'MCF       ++++       1    ****      Bond            %%%%     5    $$$$    -8.4    ))))     -19.1   ((((     -8.8    @@@@    14.8    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Holding Target Lincoln            ',
                value:
                    'HTL       ++++       5    ****      Currency        %%%%     36   $$$$    -15.8   ))))     -18.7   ((((     14.9    @@@@    4.4     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Millenium 300 500                 ',
                value:
                    'M35       ++++       3    ****      Fixed Income    %%%%     38   $$$$    -0.7    ))))     -4.6    ((((     9.3     @@@@    -10.3   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Revenue Retirement International  ',
                value:
                    'RRI       ++++       5    ****      Currency        %%%%     9    $$$$    -17.8   ))))     -3.5    ((((     0.1     @@@@    17.0    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Jefferson Washington Franklin     ',
                value:
                    'JWF       ++++       2    ****      Fixed Income    %%%%     19   $$$$    -6.1    ))))     -4.4    ((((     -3.8    @@@@    -15.5   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Cash Millenium 2040               ',
                value:
                    'CM2       ++++       1    ****      Multi-Asset     %%%%     2    $$$$    13.2    ))))     -9.1    ((((     -0.1    @@@@    -9.7    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Trust First Global                ',
                value:
                    'TFG       ++++       3    ****      Commodity       %%%%     39   $$$$    16.1    ))))     -4.4    ((((     -12.6   @@@@    18.5    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Madison Financials Target         ',
                value:
                    'MFT       ++++       3    ****      Equity          %%%%     4    $$$$    -18.4   ))))     -11.9   ((((     -13.7   @@@@    5.3     {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Commodities Treasury Washington   ',
                value:
                    'CTW       ++++       3    ****      Fixed Income    %%%%     4    $$$$    5.6     ))))     -6.8    ((((     11.7    @@@@    18.5    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Hamilton Index American           ',
                value:
                    'HIA       ++++       2    ****      Bond            %%%%     13   $$$$    -18.7   ))))     -9.0    ((((     -0.9    @@@@    -19.9   {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Cash 3000 Predictive              ',
                value:
                    'C3P       ++++       2    ****      Bond            %%%%     11   $$$$    14.3    ))))     7.5     ((((     -18.4   @@@@    -15.8   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Trust Diversified 100             ',
                value:
                    'TD1       ++++       4    ****      Multi-Asset     %%%%     31   $$$$    -12.9   ))))     -0.9    ((((     8.3     @@@@    -19.7   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Fund Target Management            ',
                value:
                    'FTM       ++++       2    ****      Currency        %%%%     35   $$$$    11.7    ))))     -0.9    ((((     2.2     @@@@    -10.8   {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '2030 300 Management               ',
                value:
                    '23M       ++++       1    ****      Equity          %%%%     11   $$$$    -0.8    ))))     -6.1    ((((     -17.6   @@@@    -15.7   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Principal Revenue Diversified     ',
                value:
                    'PRD       ++++       1    ****      Volatility      %%%%     12   $$$$    19.5    ))))     -13.6   ((((     12.8    @@@@    -10.2   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'General Diversified American      ',
                value:
                    'GDA       ++++       5    ****      Equity          %%%%     22   $$$$    -2.5    ))))     18.7    ((((     7.4     @@@@    -2.4    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '2020 2025 Market                  ',
                value:
                    '22M       ++++       1    ****      Commodity       %%%%     14   $$$$    1.5     ))))     -12.6   ((((     12.3    @@@@    16.8    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Treasury Franklin Adams           ',
                value:
                    'TFA       ++++       3    ****      Currency        %%%%     39   $$$$    9.7     ))))     -6.9    ((((     -5.4    @@@@    11.2    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Lincoln Treasury Financials       ',
                value:
                    'LTF       ++++       4    ****      Commodity       %%%%     26   $$$$    17.4    ))))     11.9    ((((     -10.9   @@@@    6.2     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Lincoln Principal 2030            ',
                value:
                    'LP2       ++++       5    ****      Bond            %%%%     9    $$$$    3.9     ))))     -16.9   ((((     9.7     @@@@    5.8     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Washington Hamilton 2020          ',
                value:
                    'WH2       ++++       5    ****      Currency        %%%%     31   $$$$    -14.8   ))))     -2.9    ((((     -5.3    @@@@    16.7    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Target Diversified 100            ',
                value:
                    'TD1       ++++       1    ****      Fixed Income    %%%%     22   $$$$    14.4    ))))     -7.4    ((((     12.3    @@@@    -10.0   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Investments Lincoln Century       ',
                value:
                    'ILC       ++++       2    ****      Currency        %%%%     22   $$$$    -18.0   ))))     17.4    ((((     -6.2    @@@@    3.0     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Predictive Cash Management        ',
                value:
                    'PCM       ++++       1    ****      Bond            %%%%     39   $$$$    -1.3    ))))     10.7    ((((     -17.8   @@@@    15.0    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Century Assets Trust              ',
                value:
                    'CAT       ++++       1    ****      Commodity       %%%%     21   $$$$    3.3     ))))     -13.3   ((((     4.2     @@@@    -4.4    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Capital Trust Cash                ',
                value:
                    'CTC       ++++       2    ****      Bond            %%%%     40   $$$$    -6.5    ))))     -7.7    ((((     17.6    @@@@    11.5    {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Predictive Financials 100         ',
                value:
                    'PF1       ++++       5    ****      Multi-Asset     %%%%     18   $$$$    -1.2    ))))     -11.1   ((((     10.7    @@@@    7.8     {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Predictive 2040 General           ',
                value:
                    'P2G       ++++       3    ****      Volatility      %%%%     17   $$$$    -16.0   ))))     -14.7   ((((     -2.9    @@@@    -5.2    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Revenue Assets Predictive         ',
                value:
                    'RAP       ++++       4    ****      Equity          %%%%     30   $$$$    4.4     ))))     -13.9   ((((     -7.1    @@@@    1.9     {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Financials Retirement 2020        ',
                value:
                    'FR2       ++++       3    ****      Volatility      %%%%     0    $$$$    1.9     ))))     5.0     ((((     14.6    @@@@    -14.9   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Principal 2030 Holding            ',
                value:
                    'P2H       ++++       3    ****      Multi-Asset     %%%%     32   $$$$    -7.2    ))))     19.6    ((((     -16.4   @@@@    -6.4    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'First Capital Management          ',
                value:
                    'FCM       ++++       5    ****      Volatility      %%%%     24   $$$$    -19.6   ))))     0.3     ((((     10.5    @@@@    -14.1   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Millenium Holding 2040            ',
                value:
                    'MH2       ++++       2    ****      Bond            %%%%     19   $$$$    17.0    ))))     8.8     ((((     16.9    @@@@    -11.4   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Principal 3000 Revenue            ',
                value:
                    'P3R       ++++       5    ****      Equity          %%%%     15   $$$$    11.5    ))))     -7.4    ((((     8.1     @@@@    -15.9   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Adams Management Century          ',
                value:
                    'AMC       ++++       2    ****      Multi-Asset     %%%%     16   $$$$    1.0     ))))     5.0     ((((     -4.6    @@@@    7.6     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Franklin 100 3000                 ',
                value:
                    'F13       ++++       3    ****      Equity          %%%%     20   $$$$    15.3    ))))     -1.8    ((((     -11.3   @@@@    8.6     {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Jefferson Madison Adams           ',
                value:
                    'JMA       ++++       4    ****      Commodity       %%%%     34   $$$$    -17.5   ))))     -5.7    ((((     3.6     @@@@    14.7    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Holding Index Trust               ',
                value:
                    'HIT       ++++       5    ****      Equity          %%%%     22   $$$$    -17.1   ))))     -8.3    ((((     19.8    @@@@    -12.2   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Market Predictive Holding         ',
                value:
                    'MPH       ++++       1    ****      Bond            %%%%     39   $$$$    1.5     ))))     3.0     ((((     0.0     @@@@    10.5    {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Capital 100 Retirement            ',
                value:
                    'C1R       ++++       5    ****      Commodity       %%%%     5    $$$$    -18.2   ))))     18.1    ((((     3.0     @@@@    -16.1   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: '500 Retirement Cash               ',
                value:
                    '5RC       ++++       5    ****      Volatility      %%%%     21   $$$$    -11.8   ))))     0.4     ((((     -9.8    @@@@    -0.1    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Retirement 2040 Washington        ',
                value:
                    'R2W       ++++       3    ****      Fixed Income    %%%%     29   $$$$    6.1     ))))     -16.2   ((((     4.4     @@@@    19.7    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Holding International Principal   ',
                value:
                    'HIP       ++++       4    ****      Fixed Income    %%%%     5    $$$$    -6.4    ))))     -14.6   ((((     -0.5    @@@@    -12.2   {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Franklin American Predictive      ',
                value:
                    'FAP       ++++       2    ****      Currency        %%%%     30   $$$$    10.6    ))))     -10.7   ((((     -19.0   @@@@    0.8     {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Madison Treasury Diversified      ',
                value:
                    'MTD       ++++       4    ****      Equity          %%%%     27   $$$$    17.5    ))))     -6.1    ((((     17.3    @@@@    -7.7    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Lincoln 2025 2040                 ',
                value:
                    'L22       ++++       2    ****      Equity          %%%%     35   $$$$    15.9    ))))     17.0    ((((     -10.3   @@@@    2.9     {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Global Investments Retirement     ',
                value:
                    'GIR       ++++       5    ****      Bond            %%%%     2    $$$$    -11.7   ))))     12.4    ((((     -17.7   @@@@    14.8    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'First 500 Madison                 ',
                value:
                    'F5M       ++++       1    ****      Currency        %%%%     40   $$$$    12.8    ))))     16.8    ((((     -6.2    @@@@    -20.0   {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Diversified Century 2025          ',
                value:
                    'DC2       ++++       2    ****      Currency        %%%%     36   $$$$    -18.6   ))))     -11.7   ((((     5.5     @@@@    -19.0   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'American Financials Revenue       ',
                value:
                    'AFR       ++++       3    ****      Currency        %%%%     24   $$$$    11.7    ))))     5.8     ((((     19.6    @@@@    10.9    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Holding Diversified 2020          ',
                value:
                    'HD2       ++++       1    ****      Fixed Income    %%%%     19   $$$$    9.1     ))))     19.4    ((((     -1.5    @@@@    11.6    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Commodities Principal Index       ',
                value:
                    'CPI       ++++       4    ****      Fixed Income    %%%%     23   $$$$    -10.1   ))))     17.7    ((((     19.3    @@@@    -3.7    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Index 500 Assets                  ',
                value:
                    'I5A       ++++       1    ****      Multi-Asset     %%%%     37   $$$$    12.8    ))))     -12.6   ((((     -14.6   @@@@    -11.3   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Holding First Market              ',
                value:
                    'HFM       ++++       4    ****      Currency        %%%%     8    $$$$    18.2    ))))     -6.4    ((((     12.7    @@@@    2.2     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '300 Assets Holding                ',
                value:
                    '3AH       ++++       1    ****      Equity          %%%%     25   $$$$    -8.0    ))))     -7.0    ((((     6.9     @@@@    -15.3   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Retirement Franklin Adams         ',
                value:
                    'RFA       ++++       1    ****      Bond            %%%%     23   $$$$    10.5    ))))     -7.0    ((((     -16.6   @@@@    2.7     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '2020 Capital Market               ',
                value:
                    '2CM       ++++       1    ****      Currency        %%%%     27   $$$$    4.3     ))))     6.0     ((((     -12.4   @@@@    -4.0    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '500 2020 Principal                ',
                value:
                    '52P       ++++       4    ****      Multi-Asset     %%%%     12   $$$$    11.2    ))))     -3.3    ((((     -8.7    @@@@    6.1     {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Target Jefferson Franklin         ',
                value:
                    'TJF       ++++       4    ****      Bond            %%%%     24   $$$$    -4.9    ))))     -1.2    ((((     17.3    @@@@    -0.1    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Madison Commodities Index         ',
                value:
                    'MCI       ++++       5    ****      Currency        %%%%     20   $$$$    -18.5   ))))     14.1    ((((     -15.0   @@@@    3.3     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Franklin Washington Global        ',
                value:
                    'FWG       ++++       2    ****      Equity          %%%%     13   $$$$    14.0    ))))     -12.8   ((((     -10.9   @@@@    -11.1   {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: '2020 International General        ',
                value:
                    '2IG       ++++       3    ****      Volatility      %%%%     30   $$$$    -4.2    ))))     -14.2   ((((     -14.7   @@@@    -8.3    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'International 2025 Jefferson      ',
                value:
                    'I2J       ++++       3    ****      Volatility      %%%%     28   $$$$    8.4     ))))     1.8     ((((     -9.8    @@@@    -4.9    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Management Predictive Treasury    ',
                value:
                    'MPT       ++++       4    ****      Currency        %%%%     39   $$$$    -8.3    ))))     -13.8   ((((     2.6     @@@@    -3.5    {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Madison Investments 3000          ',
                value:
                    'MI3       ++++       5    ****      Fixed Income    %%%%     10   $$$$    0.0     ))))     4.6     ((((     6.9     @@@@    -12.3   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2030 500 Market                   ',
                value:
                    '25M       ++++       2    ****      Multi-Asset     %%%%     2    $$$$    8.6     ))))     9.4     ((((     -0.2    @@@@    16.9    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '2025 International Predictive     ',
                value:
                    '2IP       ++++       1    ****      Currency        %%%%     9    $$$$    2.9     ))))     17.6    ((((     18.2    @@@@    5.1     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Commodities American 3000         ',
                value:
                    'CA3       ++++       4    ****      Fixed Income    %%%%     21   $$$$    -8.7    ))))     6.0     ((((     -1.8    @@@@    10.6    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Principal Jefferson 2040          ',
                value:
                    'PJ2       ++++       5    ****      Volatility      %%%%     4    $$$$    -5.2    ))))     8.0     ((((     -6.6    @@@@    -6.3    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '2020 Treasury Assets              ',
                value:
                    '2TA       ++++       2    ****      Fixed Income    %%%%     38   $$$$    8.9     ))))     -7.8    ((((     18.7    @@@@    -2.2    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Treasury 100 Diversified          ',
                value:
                    'T1D       ++++       4    ****      Bond            %%%%     8    $$$$    5.8     ))))     -10.0   ((((     11.3    @@@@    17.4    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Investments 2025 Hamilton         ',
                value:
                    'I2H       ++++       4    ****      Bond            %%%%     26   $$$$    11.5    ))))     17.2    ((((     16.6    @@@@    7.3     {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'General Market International      ',
                value:
                    'GMI       ++++       3    ****      Fixed Income    %%%%     19   $$$$    7.2     ))))     -9.7    ((((     -11.7   @@@@    0.5     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '300 Commodities Washington        ',
                value:
                    '3CW       ++++       1    ****      Currency        %%%%     15   $$$$    -6.8    ))))     16.4    ((((     -6.5    @@@@    17.2    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Washington Hamilton Adams         ',
                value:
                    'WHA       ++++       3    ****      Fixed Income    %%%%     4    $$$$    0.0     ))))     -15.1   ((((     -14.2   @@@@    16.1    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Predictive Treasury 2030          ',
                value:
                    'PT2       ++++       4    ****      Currency        %%%%     0    $$$$    -0.4    ))))     0.9     ((((     -16.9   @@@@    10.8    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Lincoln Management 500            ',
                value:
                    'LM5       ++++       4    ****      Fixed Income    %%%%     19   $$$$    -7.0    ))))     15.8    ((((     18.0    @@@@    9.0     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '100 2030 2040                     ',
                value:
                    '122       ++++       2    ****      Currency        %%%%     27   $$$$    5.9     ))))     -2.9    ((((     2.1     @@@@    10.6    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Market Cash Management            ',
                value:
                    'MCM       ++++       1    ****      Bond            %%%%     3    $$$$    -6.9    ))))     5.2     ((((     9.8     @@@@    -2.8    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Madison General Adams             ',
                value:
                    'MGA       ++++       1    ****      Multi-Asset     %%%%     37   $$$$    -4.5    ))))     12.5    ((((     12.9    @@@@    0.7     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Global 300 2025                   ',
                value:
                    'G32       ++++       5    ****      Fixed Income    %%%%     39   $$$$    -6.0    ))))     2.9     ((((     -0.9    @@@@    14.4    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'American 100 International        ',
                value:
                    'A1I       ++++       3    ****      Commodity       %%%%     2    $$$$    7.5     ))))     4.0     ((((     -4.6    @@@@    1.6     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Millenium Hamilton Washington     ',
                value:
                    'MHW       ++++       2    ****      Commodity       %%%%     3    $$$$    3.7     ))))     6.7     ((((     12.0    @@@@    16.1    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'International Cash Century        ',
                value:
                    'ICC       ++++       1    ****      Currency        %%%%     19   $$$$    15.7    ))))     10.9    ((((     17.2    @@@@    -11.1   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Predictive Fund Madison           ',
                value:
                    'PFM       ++++       5    ****      Multi-Asset     %%%%     1    $$$$    -4.7    ))))     -15.2   ((((     2.4     @@@@    -7.4    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Trust 2040 Management             ',
                value:
                    'T2M       ++++       1    ****      Currency        %%%%     31   $$$$    -2.2    ))))     18.8    ((((     14.5    @@@@    4.7     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Adams Diversified Principal       ',
                value:
                    'ADP       ++++       1    ****      Currency        %%%%     23   $$$$    6.4     ))))     -6.6    ((((     -11.8   @@@@    3.3     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'General 100 Hamilton              ',
                value:
                    'G1H       ++++       3    ****      Multi-Asset     %%%%     27   $$$$    -0.2    ))))     -5.1    ((((     10.5    @@@@    5.1     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Global Revenue Principal          ',
                value:
                    'GRP       ++++       3    ****      Bond            %%%%     32   $$$$    10.1    ))))     17.2    ((((     18.5    @@@@    -14.4   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Madison Commodities American      ',
                value:
                    'MCA       ++++       1    ****      Commodity       %%%%     11   $$$$    18.2    ))))     11.4    ((((     6.6     @@@@    12.4    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Commodities 2020 Cash             ',
                value:
                    'C2C       ++++       2    ****      Bond            %%%%     11   $$$$    -2.1    ))))     -7.5    ((((     -9.9    @@@@    -16.3   {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Target 3000 Commodities           ',
                value:
                    'T3C       ++++       2    ****      Commodity       %%%%     15   $$$$    15.3    ))))     -3.9    ((((     -5.9    @@@@    1.7     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Trust 2025 American               ',
                value:
                    'T2A       ++++       3    ****      Bond            %%%%     27   $$$$    -19.4   ))))     -4.6    ((((     4.4     @@@@    14.4    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Market Holding Lincoln            ',
                value:
                    'MHL       ++++       2    ****      Volatility      %%%%     6    $$$$    11.4    ))))     19.6    ((((     -0.4    @@@@    -18.1   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Hamilton American Predictive      ',
                value:
                    'HAP       ++++       2    ****      Bond            %%%%     3    $$$$    6.7     ))))     2.5     ((((     2.1     @@@@    16.8    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Holding Lincoln Century           ',
                value:
                    'HLC       ++++       4    ****      Commodity       %%%%     9    $$$$    -13.1   ))))     3.7     ((((     -3.8    @@@@    -2.5    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Adams Assets Financials           ',
                value:
                    'AAF       ++++       3    ****      Equity          %%%%     37   $$$$    -18.4   ))))     19.0    ((((     -14.6   @@@@    3.2     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'International 300 Retirement      ',
                value:
                    'I3R       ++++       2    ****      Bond            %%%%     5    $$$$    -8.0    ))))     -5.9    ((((     -17.7   @@@@    9.2     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'American Financials Lincoln       ',
                value:
                    'AFL       ++++       5    ****      Currency        %%%%     29   $$$$    -5.0    ))))     1.0     ((((     11.3    @@@@    -14.6   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Assets Century Commodities        ',
                value:
                    'ACC       ++++       3    ****      Volatility      %%%%     11   $$$$    -0.8    ))))     1.9     ((((     12.1    @@@@    -18.9   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Global 3000 American              ',
                value:
                    'G3A       ++++       4    ****      Multi-Asset     %%%%     2    $$$$    -5.8    ))))     -2.7    ((((     -17.6   @@@@    12.8    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Jefferson Financials 2025         ',
                value:
                    'JF2       ++++       4    ****      Commodity       %%%%     11   $$$$    -12.7   ))))     -4.6    ((((     5.5     @@@@    -7.1    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Revenue 500 Assets                ',
                value:
                    'R5A       ++++       3    ****      Bond            %%%%     4    $$$$    2.1     ))))     -12.7   ((((     -3.2    @@@@    -7.9    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'General Madison Holding           ',
                value:
                    'GMH       ++++       4    ****      Bond            %%%%     5    $$$$    -1.8    ))))     8.7     ((((     17.4    @@@@    -19.0   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Retirement Cash Assets            ',
                value:
                    'RCA       ++++       1    ****      Multi-Asset     %%%%     25   $$$$    14.4    ))))     -10.3   ((((     -6.2    @@@@    7.6     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '3000 Treasury Assets              ',
                value:
                    '3TA       ++++       4    ****      Fixed Income    %%%%     24   $$$$    8.2     ))))     1.2     ((((     -18.7   @@@@    -18.4   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'First Hamilton Lincoln            ',
                value:
                    'FHL       ++++       4    ****      Bond            %%%%     10   $$$$    12.2    ))))     15.4    ((((     15.9    @@@@    2.5     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Financials Adams Diversified      ',
                value:
                    'FAD       ++++       5    ****      Fixed Income    %%%%     22   $$$$    6.4     ))))     -15.7   ((((     18.8    @@@@    19.1    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Target American Investments       ',
                value:
                    'TAI       ++++       2    ****      Equity          %%%%     23   $$$$    12.2    ))))     -10.3   ((((     -12.8   @@@@    11.7    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: '2025 Franklin 300                 ',
                value:
                    '2F3       ++++       4    ****      Fixed Income    %%%%     30   $$$$    -13.4   ))))     -7.8    ((((     -2.9    @@@@    10.0    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Jefferson Global Treasury         ',
                value:
                    'JGT       ++++       5    ****      Commodity       %%%%     32   $$$$    17.6    ))))     3.6     ((((     12.9    @@@@    9.7     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '100 2020 Target                   ',
                value:
                    '12T       ++++       4    ****      Commodity       %%%%     18   $$$$    3.5     ))))     16.9    ((((     -12.9   @@@@    11.2    {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: '2040 Treasury Madison             ',
                value:
                    '2TM       ++++       3    ****      Bond            %%%%     23   $$$$    7.1     ))))     6.3     ((((     11.8    @@@@    0.5     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Predictive 2030 Investments       ',
                value:
                    'P2I       ++++       5    ****      Multi-Asset     %%%%     11   $$$$    -3.7    ))))     14.5    ((((     -9.0    @@@@    -7.7    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'International Capital Century     ',
                value:
                    'ICC       ++++       3    ****      Currency        %%%%     36   $$$$    17.6    ))))     19.2    ((((     2.5     @@@@    -18.7   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: '300 Revenue Assets                ',
                value:
                    '3RA       ++++       2    ****      Bond            %%%%     9    $$$$    8.0     ))))     3.0     ((((     19.5    @@@@    -2.8    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Lincoln 2025 Jefferson            ',
                value:
                    'L2J       ++++       4    ****      Currency        %%%%     20   $$$$    -6.6    ))))     -19.7   ((((     -2.0    @@@@    4.9     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Retirement 100 Washington         ',
                value:
                    'R1W       ++++       3    ****      Equity          %%%%     28   $$$$    -5.5    ))))     8.2     ((((     -13.5   @@@@    0.5     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Index Millenium Assets            ',
                value:
                    'IMA       ++++       1    ****      Multi-Asset     %%%%     35   $$$$    0.4     ))))     2.2     ((((     16.0    @@@@    14.6    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Adams General Retirement          ',
                value:
                    'AGR       ++++       4    ****      Volatility      %%%%     13   $$$$    -18.3   ))))     -7.5    ((((     5.1     @@@@    -12.6   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: '300 Century Investments           ',
                value:
                    '3CI       ++++       4    ****      Multi-Asset     %%%%     39   $$$$    -5.2    ))))     17.4    ((((     15.4    @@@@    13.8    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: '2025 Assets Lincoln               ',
                value:
                    '2AL       ++++       1    ****      Volatility      %%%%     37   $$$$    13.2    ))))     -3.4    ((((     10.2    @@@@    11.9    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Holding Franklin Global           ',
                value:
                    'HFG       ++++       4    ****      Multi-Asset     %%%%     21   $$$$    14.4    ))))     -16.0   ((((     -16.1   @@@@    -10.7   {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Franklin Capital Cash             ',
                value:
                    'FCC       ++++       4    ****      Currency        %%%%     26   $$$$    3.7     ))))     -15.8   ((((     -17.2   @@@@    -16.8   {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '2020 Predictive Diversified       ',
                value:
                    '2PD       ++++       3    ****      Bond            %%%%     23   $$$$    9.8     ))))     -4.5    ((((     5.6     @@@@    10.5    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Hamilton Diversified Trust        ',
                value:
                    'HDT       ++++       4    ****      Currency        %%%%     19   $$$$    8.8     ))))     -2.1    ((((     2.2     @@@@    11.4    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Predictive Index 300              ',
                value:
                    'PI3       ++++       5    ****      Equity          %%%%     13   $$$$    13.8    ))))     -10.6   ((((     16.2    @@@@    11.1    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '2025 Fund Market                  ',
                value:
                    '2FM       ++++       5    ****      Currency        %%%%     30   $$$$    -6.0    ))))     -6.3    ((((     7.8     @@@@    -10.9   {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Index 3000 Predictive             ',
                value:
                    'I3P       ++++       5    ****      Currency        %%%%     36   $$$$    2.7     ))))     8.3     ((((     15.5    @@@@    15.1    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'American Adams 2025               ',
                value:
                    'AA2       ++++       2    ****      Volatility      %%%%     30   $$$$    -2.0    ))))     -13.7   ((((     17.0    @@@@    12.7    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Principal Cash 100                ',
                value:
                    'PC1       ++++       3    ****      Fixed Income    %%%%     4    $$$$    5.7     ))))     -18.8   ((((     -10.5   @@@@    -17.4   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Century Financials Cash           ',
                value:
                    'CFC       ++++       2    ****      Bond            %%%%     16   $$$$    -12.6   ))))     10.8    ((((     7.8     @@@@    -13.0   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Global Treasury Adams             ',
                value:
                    'GTA       ++++       1    ****      Commodity       %%%%     28   $$$$    -1.6    ))))     10.7    ((((     3.6     @@@@    -8.9    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '2025 Jefferson Revenue            ',
                value:
                    '2JR       ++++       4    ****      Equity          %%%%     19   $$$$    12.3    ))))     4.0     ((((     16.4    @@@@    5.2     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '2020 Jefferson Target             ',
                value:
                    '2JT       ++++       4    ****      Multi-Asset     %%%%     10   $$$$    8.8     ))))     7.2     ((((     2.3     @@@@    0.7     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Madison Millenium 500             ',
                value:
                    'MM5       ++++       3    ****      Fixed Income    %%%%     27   $$$$    18.7    ))))     -17.2   ((((     -14.7   @@@@    -0.1    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Trust Lincoln First               ',
                value:
                    'TLF       ++++       2    ****      Volatility      %%%%     31   $$$$    16.1    ))))     -3.7    ((((     -2.9    @@@@    -13.9   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'American Predictive Principal     ',
                value:
                    'APP       ++++       3    ****      Multi-Asset     %%%%     1    $$$$    -15.7   ))))     19.8    ((((     19.5    @@@@    -8.3    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Diversified 2025 Assets           ',
                value:
                    'D2A       ++++       5    ****      Multi-Asset     %%%%     8    $$$$    -11.1   ))))     10.2    ((((     2.4     @@@@    6.5     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Hamilton Lincoln Diversified      ',
                value:
                    'HLD       ++++       3    ****      Multi-Asset     %%%%     31   $$$$    19.6    ))))     8.9     ((((     0.5     @@@@    16.1    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Holding 3000 Target               ',
                value:
                    'H3T       ++++       1    ****      Multi-Asset     %%%%     23   $$$$    -10.1   ))))     14.8    ((((     11.7    @@@@    -13.7   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: '2030 Management Commodities       ',
                value:
                    '2MC       ++++       5    ****      Equity          %%%%     2    $$$$    8.9     ))))     7.3     ((((     -2.7    @@@@    8.3     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Franklin Index Revenue            ',
                value:
                    'FIR       ++++       1    ****      Commodity       %%%%     33   $$$$    -8.8    ))))     18.5    ((((     -18.2   @@@@    -19.3   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Century Investments Madison       ',
                value:
                    'CIM       ++++       2    ****      Multi-Asset     %%%%     4    $$$$    -12.0   ))))     12.4    ((((     12.9    @@@@    -9.5    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Washington Treasury Madison       ',
                value:
                    'WTM       ++++       2    ****      Multi-Asset     %%%%     20   $$$$    3.2     ))))     -19.4   ((((     14.5    @@@@    1.5     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Millenium 2030 500                ',
                value:
                    'M25       ++++       4    ****      Multi-Asset     %%%%     21   $$$$    3.0     ))))     -17.8   ((((     -1.5    @@@@    -2.9    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Principal Retirement Assets       ',
                value:
                    'PRA       ++++       5    ****      Fixed Income    %%%%     9    $$$$    -1.4    ))))     -10.1   ((((     9.9     @@@@    17.7    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Millenium Lincoln Market          ',
                value:
                    'MLM       ++++       4    ****      Currency        %%%%     13   $$$$    -6.2    ))))     -16.6   ((((     0.0     @@@@    -1.1    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Management Global Century         ',
                value:
                    'MGC       ++++       4    ****      Commodity       %%%%     17   $$$$    -17.4   ))))     12.5    ((((     17.4    @@@@    2.2     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Millenium Predictive Diversified  ',
                value:
                    'MPD       ++++       1    ****      Multi-Asset     %%%%     34   $$$$    -16.0   ))))     15.4    ((((     14.4    @@@@    -4.2    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Predictive Adams International    ',
                value:
                    'PAI       ++++       4    ****      Bond            %%%%     6    $$$$    -7.6    ))))     -14.9   ((((     -6.6    @@@@    19.9    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'American Investments Adams        ',
                value:
                    'AIA       ++++       5    ****      Volatility      %%%%     38   $$$$    15.7    ))))     -0.2    ((((     16.3    @@@@    12.0    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: '300 2025 Management               ',
                value:
                    '32M       ++++       5    ****      Commodity       %%%%     19   $$$$    -6.6    ))))     2.9     ((((     2.9     @@@@    -11.0   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: '2025 2025 500                     ',
                value:
                    '225       ++++       2    ****      Bond            %%%%     39   $$$$    18.1    ))))     2.1     ((((     1.9     @@@@    -3.9    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'General Franklin Treasury         ',
                value:
                    'GFT       ++++       2    ****      Multi-Asset     %%%%     39   $$$$    13.9    ))))     6.7     ((((     -16.6   @@@@    -3.6    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Hamilton First Trust              ',
                value:
                    'HFT       ++++       2    ****      Equity          %%%%     12   $$$$    6.0     ))))     -14.7   ((((     10.0    @@@@    5.1     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Commodities Jefferson 100         ',
                value:
                    'CJ1       ++++       5    ****      Commodity       %%%%     40   $$$$    -18.9   ))))     5.8     ((((     9.3     @@@@    15.1    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: '2020 Retirement Century           ',
                value:
                    '2RC       ++++       4    ****      Equity          %%%%     35   $$$$    13.7    ))))     8.8     ((((     2.3     @@@@    11.2    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Diversified Franklin Fund         ',
                value:
                    'DFF       ++++       5    ****      Bond            %%%%     13   $$$$    1.5     ))))     0.8     ((((     7.0     @@@@    -16.9   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'American First Retirement         ',
                value:
                    'AFR       ++++       4    ****      Volatility      %%%%     14   $$$$    -10.4   ))))     -3.3    ((((     18.7    @@@@    -16.7   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Century Index American            ',
                value:
                    'CIA       ++++       3    ****      Commodity       %%%%     34   $$$$    19.5    ))))     12.2    ((((     4.8     @@@@    -5.4    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Lincoln International 500         ',
                value:
                    'LI5       ++++       3    ****      Currency        %%%%     21   $$$$    -4.9    ))))     12.6    ((((     -10.3   @@@@    8.5     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Retirement 2040 Predictive        ',
                value:
                    'R2P       ++++       4    ****      Currency        %%%%     16   $$$$    -8.5    ))))     -16.7   ((((     2.7     @@@@    -7.8    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Trust First Cash                  ',
                value:
                    'TFC       ++++       2    ****      Currency        %%%%     32   $$$$    2.9     ))))     18.0    ((((     0.0     @@@@    -11.1   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: '300 2030 Jefferson                ',
                value:
                    '32J       ++++       3    ****      Volatility      %%%%     29   $$$$    18.3    ))))     -18.3   ((((     -1.0    @@@@    -10.4   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'International 2025 Principal      ',
                value:
                    'I2P       ++++       2    ****      Volatility      %%%%     21   $$$$    -1.7    ))))     6.0     ((((     11.1    @@@@    12.5    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Predictive Index Madison          ',
                value:
                    'PIM       ++++       2    ****      Equity          %%%%     29   $$$$    7.9     ))))     -19.7   ((((     -6.0    @@@@    -16.4   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Lincoln Target Global             ',
                value:
                    'LTG       ++++       1    ****      Fixed Income    %%%%     9    $$$$    11.2    ))))     -9.9    ((((     -7.9    @@@@    4.4     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Cash Index Assets                 ',
                value:
                    'CIA       ++++       1    ****      Equity          %%%%     16   $$$$    -18.0   ))))     18.8    ((((     -19.3   @@@@    5.0     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Lincoln Millenium Index           ',
                value:
                    'LMI       ++++       5    ****      Multi-Asset     %%%%     38   $$$$    19.7    ))))     18.8    ((((     -15.1   @@@@    15.1    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2025 Management Assets            ',
                value:
                    '2MA       ++++       5    ****      Fixed Income    %%%%     17   $$$$    -9.3    ))))     -15.7   ((((     -19.3   @@@@    -8.8    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'American Lincoln Washington       ',
                value:
                    'ALW       ++++       1    ****      Multi-Asset     %%%%     26   $$$$    4.3     ))))     13.3    ((((     -14.5   @@@@    -8.2    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '2030 International Revenue        ',
                value:
                    '2IR       ++++       1    ****      Volatility      %%%%     32   $$$$    5.1     ))))     6.9     ((((     -3.2    @@@@    3.2     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Fund Trust Predictive             ',
                value:
                    'FTP       ++++       3    ****      Fixed Income    %%%%     21   $$$$    -19.1   ))))     4.2     ((((     -11.7   @@@@    0.7     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '2025 Market Index                 ',
                value:
                    '2MI       ++++       3    ****      Currency        %%%%     7    $$$$    -5.6    ))))     -3.4    ((((     -2.5    @@@@    -8.1    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Hamilton 500 Adams                ',
                value:
                    'H5A       ++++       1    ****      Bond            %%%%     24   $$$$    -2.7    ))))     -17.6   ((((     -1.1    @@@@    -8.1    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Capital Lincoln Adams             ',
                value:
                    'CLA       ++++       5    ****      Currency        %%%%     22   $$$$    -6.7    ))))     6.6     ((((     11.4    @@@@    -19.1   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: '3000 Lincoln Investments          ',
                value:
                    '3LI       ++++       5    ****      Multi-Asset     %%%%     5    $$$$    -6.4    ))))     -19.9   ((((     8.2     @@@@    -15.6   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Washington Retirement Revenue     ',
                value:
                    'WRR       ++++       4    ****      Multi-Asset     %%%%     26   $$$$    10.6    ))))     11.8    ((((     -17.2   @@@@    -8.9    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Fund 3000 Holding                 ',
                value:
                    'F3H       ++++       1    ****      Bond            %%%%     26   $$$$    10.9    ))))     -11.9   ((((     16.2    @@@@    -11.9   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Millenium Diversified 3000        ',
                value:
                    'MD3       ++++       4    ****      Fixed Income    %%%%     40   $$$$    15.5    ))))     -9.4    ((((     -9.0    @@@@    -17.1   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Cash Index 3000                   ',
                value:
                    'CI3       ++++       4    ****      Currency        %%%%     26   $$$$    17.5    ))))     4.6     ((((     10.9    @@@@    -7.9    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Trust Retirement Washington       ',
                value:
                    'TRW       ++++       4    ****      Currency        %%%%     2    $$$$    -19.9   ))))     -15.2   ((((     -19.4   @@@@    -3.5    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Trust Washington 2040             ',
                value:
                    'TW2       ++++       3    ****      Currency        %%%%     4    $$$$    5.6     ))))     -12.3   ((((     -6.1    @@@@    12.2    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Franklin Trust Principal          ',
                value:
                    'FTP       ++++       1    ****      Bond            %%%%     39   $$$$    -19.0   ))))     11.9    ((((     1.3     @@@@    -1.4    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'First Washington Diversified      ',
                value:
                    'FWD       ++++       1    ****      Volatility      %%%%     14   $$$$    -14.1   ))))     -19.7   ((((     -14.7   @@@@    18.0    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: '500 First Fund                    ',
                value:
                    '5FF       ++++       5    ****      Currency        %%%%     6    $$$$    9.1     ))))     -3.4    ((((     -3.9    @@@@    -0.1    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'International Franklin Management ',
                value:
                    'IFM       ++++       2    ****      Equity          %%%%     34   $$$$    5.8     ))))     5.6     ((((     -3.3    @@@@    10.1    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: '2030 2040 Holding                 ',
                value:
                    '22H       ++++       3    ****      Commodity       %%%%     7    $$$$    -1.1    ))))     -3.8    ((((     -19.3   @@@@    4.4     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Management Treasury Capital       ',
                value:
                    'MTC       ++++       1    ****      Fixed Income    %%%%     19   $$$$    3.1     ))))     -13.3   ((((     7.6     @@@@    17.6    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Financials Global 2040            ',
                value:
                    'FG2       ++++       4    ****      Currency        %%%%     4    $$$$    -3.8    ))))     -3.6    ((((     -7.0    @@@@    16.0    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Treasury Jefferson Hamilton       ',
                value:
                    'TJH       ++++       3    ****      Fixed Income    %%%%     36   $$$$    3.3     ))))     -0.8    ((((     -15.9   @@@@    -16.9   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'American International General    ',
                value:
                    'AIG       ++++       1    ****      Volatility      %%%%     5    $$$$    -0.1    ))))     -18.9   ((((     3.3     @@@@    -12.4   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: '2020 500 Financials               ',
                value:
                    '25F       ++++       4    ****      Fixed Income    %%%%     24   $$$$    -9.6    ))))     -1.9    ((((     2.8     @@@@    17.7    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Trust Global 2025                 ',
                value:
                    'TG2       ++++       5    ****      Multi-Asset     %%%%     9    $$$$    -8.8    ))))     -5.4    ((((     13.8    @@@@    11.9    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: '300 2030 Trust                    ',
                value:
                    '32T       ++++       4    ****      Multi-Asset     %%%%     0    $$$$    -18.4   ))))     -5.8    ((((     19.1    @@@@    1.3     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Millenium Principal Treasury      ',
                value:
                    'MPT       ++++       1    ****      Currency        %%%%     4    $$$$    17.6    ))))     15.4    ((((     -4.1    @@@@    11.9    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Madison Index 2025                ',
                value:
                    'MI2       ++++       2    ****      Fixed Income    %%%%     3    $$$$    19.1    ))))     -3.9    ((((     19.1    @@@@    16.4    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Capital Diversified Market        ',
                value:
                    'CDM       ++++       1    ****      Bond            %%%%     37   $$$$    -16.1   ))))     12.9    ((((     -14.7   @@@@    19.7    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'General 2025 Fund                 ',
                value:
                    'G2F       ++++       1    ****      Bond            %%%%     30   $$$$    -15.5   ))))     -7.9    ((((     4.4     @@@@    -0.2    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Holding Trust Millenium           ',
                value:
                    'HTM       ++++       2    ****      Currency        %%%%     37   $$$$    18.6    ))))     -5.9    ((((     12.7    @@@@    -0.9    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Diversified Lincoln Treasury      ',
                value:
                    'DLT       ++++       2    ****      Commodity       %%%%     4    $$$$    15.3    ))))     1.7     ((((     -3.3    @@@@    0.7     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '300 Madison Global                ',
                value:
                    '3MG       ++++       5    ****      Commodity       %%%%     34   $$$$    -14.6   ))))     4.9     ((((     18.4    @@@@    19.9    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Century 300 General               ',
                value:
                    'C3G       ++++       5    ****      Currency        %%%%     33   $$$$    10.0    ))))     18.1    ((((     4.3     @@@@    17.0    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Holding Market General            ',
                value:
                    'HMG       ++++       4    ****      Fixed Income    %%%%     10   $$$$    14.2    ))))     -0.4    ((((     -6.0    @@@@    17.1    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Market 100 3000                   ',
                value:
                    'M13       ++++       3    ****      Fixed Income    %%%%     4    $$$$    -0.2    ))))     -3.3    ((((     6.1     @@@@    -15.1   {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: '2040 Assets Retirement            ',
                value:
                    '2AR       ++++       5    ****      Bond            %%%%     37   $$$$    -11.5   ))))     -13.4   ((((     5.8     @@@@    -11.3   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Index Commodities Capital         ',
                value:
                    'ICC       ++++       3    ****      Multi-Asset     %%%%     33   $$$$    10.1    ))))     -12.4   ((((     9.8     @@@@    17.6    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'American Predictive Revenue       ',
                value:
                    'APR       ++++       4    ****      Fixed Income    %%%%     39   $$$$    16.4    ))))     10.9    ((((     2.1     @@@@    15.8    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Management Adams 2025             ',
                value:
                    'MA2       ++++       5    ****      Volatility      %%%%     25   $$$$    19.2    ))))     -6.2    ((((     6.6     @@@@    -14.2   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Millenium Financials Franklin     ',
                value:
                    'MFF       ++++       4    ****      Volatility      %%%%     40   $$$$    -15.3   ))))     16.2    ((((     15.0    @@@@    1.1     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'American Franklin 500             ',
                value:
                    'AF5       ++++       4    ****      Multi-Asset     %%%%     40   $$$$    1.4     ))))     9.8     ((((     -18.5   @@@@    9.2     {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Financials Management Global      ',
                value:
                    'FMG       ++++       4    ****      Bond            %%%%     12   $$$$    2.5     ))))     -8.2    ((((     -12.8   @@@@    0.3     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Fund American 3000                ',
                value:
                    'FA3       ++++       2    ****      Currency        %%%%     26   $$$$    -17.4   ))))     -12.8   ((((     1.9     @@@@    8.4     {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Commodities Investments Assets    ',
                value:
                    'CIA       ++++       5    ****      Equity          %%%%     7    $$$$    15.4    ))))     -16.1   ((((     11.2    @@@@    2.9     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Target American International     ',
                value:
                    'TAI       ++++       3    ****      Bond            %%%%     16   $$$$    1.8     ))))     -13.2   ((((     -4.4    @@@@    4.1     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Revenue Principal Investments     ',
                value:
                    'RPI       ++++       1    ****      Volatility      %%%%     22   $$$$    -2.4    ))))     3.6     ((((     -10.8   @@@@    -15.2   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '500 Predictive Assets             ',
                value:
                    '5PA       ++++       1    ****      Volatility      %%%%     34   $$$$    -6.8    ))))     -7.8    ((((     19.5    @@@@    8.8     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'International 3000 2025           ',
                value:
                    'I32       ++++       3    ****      Currency        %%%%     1    $$$$    4.3     ))))     -10.2   ((((     -1.9    @@@@    15.2    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: '3000 Trust Market                 ',
                value:
                    '3TM       ++++       5    ****      Commodity       %%%%     38   $$$$    8.9     ))))     -5.3    ((((     11.0    @@@@    -14.3   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Franklin Lincoln General          ',
                value:
                    'FLG       ++++       5    ****      Equity          %%%%     34   $$$$    -3.9    ))))     -14.0   ((((     18.0    @@@@    6.2     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Holding Jefferson Management      ',
                value:
                    'HJM       ++++       3    ****      Equity          %%%%     37   $$$$    -4.4    ))))     -17.5   ((((     -16.3   @@@@    -9.4    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Hamilton Madison Market           ',
                value:
                    'HMM       ++++       1    ****      Currency        %%%%     17   $$$$    -7.1    ))))     -17.4   ((((     -5.0    @@@@    -18.0   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Principal 300 Holding             ',
                value:
                    'P3H       ++++       1    ****      Commodity       %%%%     23   $$$$    18.5    ))))     13.0    ((((     -0.5    @@@@    -1.9    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Financials Trust Market           ',
                value:
                    'FTM       ++++       4    ****      Fixed Income    %%%%     21   $$$$    -9.2    ))))     12.9    ((((     13.3    @@@@    -2.4    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Washington Diversified Century    ',
                value:
                    'WDC       ++++       1    ****      Fixed Income    %%%%     14   $$$$    -8.3    ))))     -7.8    ((((     -3.8    @@@@    10.2    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: '500 Principal Holding             ',
                value:
                    '5PH       ++++       4    ****      Fixed Income    %%%%     22   $$$$    17.0    ))))     1.0     ((((     10.4    @@@@    2.8     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Trust Retirement Management       ',
                value:
                    'TRM       ++++       5    ****      Currency        %%%%     12   $$$$    4.7     ))))     -19.2   ((((     14.4    @@@@    -16.5   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '100 Retirement Diversified        ',
                value:
                    '1RD       ++++       5    ****      Currency        %%%%     17   $$$$    16.0    ))))     18.5    ((((     12.5    @@@@    -2.8    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Predictive Washington Global      ',
                value:
                    'PWG       ++++       4    ****      Commodity       %%%%     16   $$$$    14.7    ))))     11.1    ((((     2.0     @@@@    8.4     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Millenium Principal 2040          ',
                value:
                    'MP2       ++++       4    ****      Equity          %%%%     13   $$$$    -9.3    ))))     -16.4   ((((     13.0    @@@@    10.9    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Millenium Investments 3000        ',
                value:
                    'MI3       ++++       1    ****      Fixed Income    %%%%     22   $$$$    -11.2   ))))     7.3     ((((     -7.5    @@@@    -9.5    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'General Predictive 2030           ',
                value:
                    'GP2       ++++       4    ****      Fixed Income    %%%%     19   $$$$    18.7    ))))     -1.3    ((((     -3.2    @@@@    15.1    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'International Target Market       ',
                value:
                    'ITM       ++++       5    ****      Bond            %%%%     23   $$$$    4.8     ))))     9.5     ((((     -8.3    @@@@    11.6    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Retirement Predictive Holding     ',
                value:
                    'RPH       ++++       4    ****      Multi-Asset     %%%%     17   $$$$    -11.5   ))))     10.7    ((((     -8.9    @@@@    -15.6   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Millenium 3000 American           ',
                value:
                    'M3A       ++++       4    ****      Currency        %%%%     39   $$$$    -5.8    ))))     -13.0   ((((     -8.3    @@@@    -11.4   {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '2030 Trust Global                 ',
                value:
                    '2TG       ++++       3    ****      Multi-Asset     %%%%     3    $$$$    -19.4   ))))     -6.6    ((((     -7.9    @@@@    14.7    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'International Predictive First    ',
                value:
                    'IPF       ++++       1    ****      Volatility      %%%%     20   $$$$    -8.5    ))))     1.0     ((((     -16.6   @@@@    17.0    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Treasury Financials Cash          ',
                value:
                    'TFC       ++++       1    ****      Multi-Asset     %%%%     40   $$$$    -4.2    ))))     17.5    ((((     -2.1    @@@@    1.2     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Hamilton Revenue Holding          ',
                value:
                    'HRH       ++++       4    ****      Commodity       %%%%     28   $$$$    -9.9    ))))     17.1    ((((     17.3    @@@@    -19.1   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: '2025 2020 Treasury                ',
                value:
                    '22T       ++++       2    ****      Equity          %%%%     29   $$$$    15.5    ))))     -5.8    ((((     -10.6   @@@@    -11.8   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: '100 Predictive 2020               ',
                value:
                    '1P2       ++++       4    ****      Volatility      %%%%     40   $$$$    -19.9   ))))     -16.4   ((((     -7.1    @@@@    13.9    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Index Century 300                 ',
                value:
                    'IC3       ++++       3    ****      Bond            %%%%     18   $$$$    -18.5   ))))     17.8    ((((     -13.3   @@@@    19.2    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Treasury Washington 300           ',
                value:
                    'TW3       ++++       2    ****      Volatility      %%%%     9    $$$$    -13.3   ))))     10.3    ((((     15.0    @@@@    -11.3   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: '2030 Retirement Management        ',
                value:
                    '2RM       ++++       3    ****      Fixed Income    %%%%     21   $$$$    10.4    ))))     11.1    ((((     15.3    @@@@    -17.7   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Trust Assets Index                ',
                value:
                    'TAI       ++++       3    ****      Bond            %%%%     9    $$$$    9.4     ))))     -13.1   ((((     3.1     @@@@    2.1     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Diversified Predictive Jefferson  ',
                value:
                    'DPJ       ++++       2    ****      Bond            %%%%     18   $$$$    -6.0    ))))     3.1     ((((     -4.6    @@@@    -2.9    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Franklin Fund 500                 ',
                value:
                    'FF5       ++++       2    ****      Fixed Income    %%%%     14   $$$$    7.1     ))))     -12.7   ((((     13.0    @@@@    -18.2   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Century Millenium Revenue         ',
                value:
                    'CMR       ++++       3    ****      Equity          %%%%     31   $$$$    -7.2    ))))     -15.8   ((((     4.6     @@@@    -16.9   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Predictive Lincoln General        ',
                value:
                    'PLG       ++++       2    ****      Equity          %%%%     40   $$$$    -0.5    ))))     12.4    ((((     -2.9    @@@@    -3.3    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'First Principal Global            ',
                value:
                    'FPG       ++++       5    ****      Fixed Income    %%%%     40   $$$$    15.3    ))))     8.4     ((((     -2.8    @@@@    3.0     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Madison 2030 Hamilton             ',
                value:
                    'M2H       ++++       2    ****      Volatility      %%%%     0    $$$$    3.2     ))))     8.7     ((((     1.4     @@@@    -17.0   {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Cash Commodities Capital          ',
                value:
                    'CCC       ++++       3    ****      Fixed Income    %%%%     20   $$$$    12.2    ))))     -4.2    ((((     -19.4   @@@@    9.3     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Cash Hamilton Lincoln             ',
                value:
                    'CHL       ++++       4    ****      Commodity       %%%%     15   $$$$    -9.6    ))))     -17.2   ((((     8.2     @@@@    -1.5    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Franklin Predictive Investments   ',
                value:
                    'FPI       ++++       4    ****      Fixed Income    %%%%     36   $$$$    1.8     ))))     10.4    ((((     -12.4   @@@@    11.8    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Fund International Investments    ',
                value:
                    'FII       ++++       3    ****      Volatility      %%%%     11   $$$$    -11.8   ))))     17.1    ((((     8.0     @@@@    12.2    {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: '2030 Management Jefferson         ',
                value:
                    '2MJ       ++++       1    ****      Volatility      %%%%     13   $$$$    -0.4    ))))     15.0    ((((     6.6     @@@@    15.5    {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Madison 2025 Trust                ',
                value:
                    'M2T       ++++       4    ****      Equity          %%%%     19   $$$$    6.9     ))))     -5.8    ((((     -1.8    @@@@    -19.4   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Franklin 2040 100                 ',
                value:
                    'F21       ++++       4    ****      Commodity       %%%%     0    $$$$    -4.1    ))))     -14.2   ((((     -7.5    @@@@    -8.0    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Index Global General              ',
                value:
                    'IGG       ++++       5    ****      Multi-Asset     %%%%     24   $$$$    -1.8    ))))     8.8     ((((     15.4    @@@@    -6.3    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'First General Principal           ',
                value:
                    'FGP       ++++       2    ****      Equity          %%%%     7    $$$$    -9.2    ))))     19.5    ((((     3.8     @@@@    1.1     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Trust Jefferson Lincoln           ',
                value:
                    'TJL       ++++       5    ****      Fixed Income    %%%%     28   $$$$    -4.5    ))))     13.1    ((((     -8.0    @@@@    -11.1   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: '100 Retirement Management         ',
                value:
                    '1RM       ++++       3    ****      Multi-Asset     %%%%     35   $$$$    19.5    ))))     12.9    ((((     -7.7    @@@@    -18.9   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Hamilton Adams Diversified        ',
                value:
                    'HAD       ++++       4    ****      Commodity       %%%%     29   $$$$    19.4    ))))     -18.7   ((((     17.2    @@@@    12.3    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Capital Washington 2040           ',
                value:
                    'CW2       ++++       5    ****      Currency        %%%%     2    $$$$    -7.6    ))))     4.4     ((((     -8.4    @@@@    15.3    {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Diversified Fund Index            ',
                value:
                    'DFI       ++++       3    ****      Multi-Asset     %%%%     34   $$$$    -19.7   ))))     -10.2   ((((     6.3     @@@@    4.0     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '100 Washington Holding            ',
                value:
                    '1WH       ++++       4    ****      Currency        %%%%     8    $$$$    -15.6   ))))     -16.6   ((((     13.4    @@@@    -12.4   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Trust 2025 Diversified            ',
                value:
                    'T2D       ++++       3    ****      Fixed Income    %%%%     3    $$$$    -5.6    ))))     -12.3   ((((     -19.6   @@@@    16.1    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Adams Global Retirement           ',
                value:
                    'AGR       ++++       2    ****      Multi-Asset     %%%%     22   $$$$    -6.3    ))))     -19.1   ((((     3.2     @@@@    -3.9    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Global Predictive Hamilton        ',
                value:
                    'GPH       ++++       5    ****      Fixed Income    %%%%     6    $$$$    13.5    ))))     13.5    ((((     9.3     @@@@    2.6     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '2025 Retirement Cash              ',
                value:
                    '2RC       ++++       4    ****      Commodity       %%%%     24   $$$$    15.5    ))))     17.0    ((((     2.8     @@@@    -18.7   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Cash Market Global                ',
                value:
                    'CMG       ++++       3    ****      Equity          %%%%     40   $$$$    18.0    ))))     -13.3   ((((     -17.5   @@@@    2.9     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'First Financials Fund             ',
                value:
                    'FFF       ++++       5    ****      Fixed Income    %%%%     13   $$$$    1.9     ))))     -9.7    ((((     -11.5   @@@@    16.9    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Lincoln Millenium Assets          ',
                value:
                    'LMA       ++++       4    ****      Multi-Asset     %%%%     11   $$$$    -0.4    ))))     14.7    ((((     9.7     @@@@    -1.2    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Fund First Predictive             ',
                value:
                    'FFP       ++++       3    ****      Equity          %%%%     38   $$$$    -3.8    ))))     19.0    ((((     11.4    @@@@    -6.8    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Revenue Assets Retirement         ',
                value:
                    'RAR       ++++       1    ****      Volatility      %%%%     10   $$$$    -14.3   ))))     -7.7    ((((     -8.2    @@@@    11.7    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Lincoln First Investments         ',
                value:
                    'LFI       ++++       4    ****      Multi-Asset     %%%%     32   $$$$    15.4    ))))     0.0     ((((     1.4     @@@@    -3.4    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: '300 100 Diversified               ',
                value:
                    '31D       ++++       1    ****      Fixed Income    %%%%     29   $$$$    12.5    ))))     5.4     ((((     -10.3   @@@@    3.4     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Management Predictive 3000        ',
                value:
                    'MP3       ++++       3    ****      Commodity       %%%%     22   $$$$    -2.9    ))))     -18.9   ((((     -11.6   @@@@    7.3     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '2025 300 Predictive               ',
                value:
                    '23P       ++++       4    ****      Bond            %%%%     14   $$$$    -6.4    ))))     5.3     ((((     16.2    @@@@    -14.4   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Century Diversified 300           ',
                value:
                    'CD3       ++++       4    ****      Currency        %%%%     22   $$$$    14.6    ))))     8.3     ((((     -0.2    @@@@    10.9    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Madison Holding Target            ',
                value:
                    'MHT       ++++       1    ****      Commodity       %%%%     6    $$$$    14.9    ))))     0.7     ((((     -1.7    @@@@    -13.4   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Management 300 Franklin           ',
                value:
                    'M3F       ++++       4    ****      Commodity       %%%%     21   $$$$    -18.3   ))))     0.1     ((((     12.1    @@@@    5.6     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Jefferson Madison Lincoln         ',
                value:
                    'JML       ++++       4    ****      Commodity       %%%%     21   $$$$    2.7     ))))     3.5     ((((     13.3    @@@@    15.8    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Washington Trust Treasury         ',
                value:
                    'WTT       ++++       5    ****      Multi-Asset     %%%%     25   $$$$    14.9    ))))     -13.5   ((((     11.7    @@@@    0.6     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '500 Lincoln Hamilton              ',
                value:
                    '5LH       ++++       2    ****      Multi-Asset     %%%%     36   $$$$    -3.4    ))))     -4.4    ((((     13.8    @@@@    17.7    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Trust General 300                 ',
                value:
                    'TG3       ++++       2    ****      Equity          %%%%     18   $$$$    -4.6    ))))     13.6    ((((     -6.1    @@@@    -13.5   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'First Financials Treasury         ',
                value:
                    'FFT       ++++       4    ****      Equity          %%%%     24   $$$$    -1.6    ))))     1.4     ((((     -18.9   @@@@    -16.0   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Target Management Market          ',
                value:
                    'TMM       ++++       3    ****      Commodity       %%%%     37   $$$$    -11.4   ))))     -6.8    ((((     10.4    @@@@    -2.0    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'Investments Jefferson 2040        ',
                value:
                    'IJ2       ++++       3    ****      Currency        %%%%     25   $$$$    11.4    ))))     -0.5    ((((     9.6     @@@@    -14.8   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Investments Management American   ',
                value:
                    'IMA       ++++       1    ****      Bond            %%%%     31   $$$$    -7.6    ))))     -3.4    ((((     17.9    @@@@    -8.5    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Adams Investments Target          ',
                value:
                    'AIT       ++++       1    ****      Bond            %%%%     15   $$$$    5.4     ))))     -6.4    ((((     -6.4    @@@@    -7.0    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Commodities Millenium Lincoln     ',
                value:
                    'CML       ++++       1    ****      Multi-Asset     %%%%     30   $$$$    -13.3   ))))     -13.2   ((((     9.3     @@@@    -9.6    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'American Diversified Global       ',
                value:
                    'ADG       ++++       2    ****      Currency        %%%%     16   $$$$    -5.5    ))))     7.0     ((((     5.4     @@@@    -11.9   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Hamilton Lincoln Commodities      ',
                value:
                    'HLC       ++++       3    ****      Currency        %%%%     33   $$$$    9.5     ))))     15.0    ((((     10.6    @@@@    -14.6   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Financials Treasury Target        ',
                value:
                    'FTT       ++++       3    ****      Equity          %%%%     1    $$$$    7.1     ))))     -8.3    ((((     11.7    @@@@    -17.1   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Commodities Predictive Market     ',
                value:
                    'CPM       ++++       1    ****      Multi-Asset     %%%%     2    $$$$    10.0    ))))     7.0     ((((     14.4    @@@@    -10.1   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: '2025 Revenue Financials           ',
                value:
                    '2RF       ++++       2    ****      Multi-Asset     %%%%     25   $$$$    6.3     ))))     -6.7    ((((     3.7     @@@@    8.2     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Century Lincoln Madison           ',
                value:
                    'CLM       ++++       3    ****      Commodity       %%%%     25   $$$$    13.6    ))))     14.0    ((((     -3.8    @@@@    -19.5   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Assets Financials Lincoln         ',
                value:
                    'AFL       ++++       4    ****      Equity          %%%%     6    $$$$    -15.2   ))))     -4.5    ((((     3.7     @@@@    -12.5   {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'American Washington First         ',
                value:
                    'AWF       ++++       1    ****      Fixed Income    %%%%     22   $$$$    8.3     ))))     14.8    ((((     15.2    @@@@    -17.1   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Adams Century 3000                ',
                value:
                    'AC3       ++++       5    ****      Bond            %%%%     12   $$$$    -18.8   ))))     1.1     ((((     -11.8   @@@@    2.1     {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Index 300 2020                    ',
                value:
                    'I32       ++++       2    ****      Currency        %%%%     15   $$$$    -14.4   ))))     -0.1    ((((     -6.1    @@@@    10.1    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Cash International Management     ',
                value:
                    'CIM       ++++       1    ****      Fixed Income    %%%%     0    $$$$    -13.1   ))))     4.4     ((((     -8.5    @@@@    4.9     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Financials Adams 2040             ',
                value:
                    'FA2       ++++       1    ****      Equity          %%%%     20   $$$$    10.0    ))))     1.3     ((((     -5.4    @@@@    -17.0   {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Treasury Financials Franklin      ',
                value:
                    'TFF       ++++       3    ****      Volatility      %%%%     9    $$$$    17.9    ))))     17.7    ((((     1.2     @@@@    -5.3    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '2020 2025 Commodities             ',
                value:
                    '22C       ++++       2    ****      Bond            %%%%     5    $$$$    -10.7   ))))     -4.8    ((((     6.4     @@@@    14.2    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Holding Index 3000                ',
                value:
                    'HI3       ++++       5    ****      Volatility      %%%%     1    $$$$    5.5     ))))     19.0    ((((     -13.1   @@@@    -11.2   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Global Capital Financials         ',
                value:
                    'GCF       ++++       4    ****      Currency        %%%%     23   $$$$    -19.6   ))))     -11.0   ((((     -18.5   @@@@    -15.3   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Franklin Revenue 2025             ',
                value:
                    'FR2       ++++       5    ****      Equity          %%%%     3    $$$$    4.3     ))))     -17.4   ((((     -0.6    @@@@    -7.8    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '2025 Financials 300               ',
                value:
                    '2F3       ++++       3    ****      Equity          %%%%     8    $$$$    -15.3   ))))     13.4    ((((     -9.3    @@@@    -4.1    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Capital Hamilton Revenue          ',
                value:
                    'CHR       ++++       2    ****      Currency        %%%%     23   $$$$    0.7     ))))     15.9    ((((     -17.9   @@@@    12.0    {{{{    Conservador   }}}}     Profissional  '
            },
            {
                label: 'Treasury Cash Commodities         ',
                value:
                    'TCC       ++++       1    ****      Currency        %%%%     35   $$$$    -3.5    ))))     -14.6   ((((     18.4    @@@@    -20.0   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Washington Commodities Fund       ',
                value:
                    'WCF       ++++       1    ****      Bond            %%%%     39   $$$$    5.9     ))))     12.1    ((((     12.8    @@@@    15.7    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Investments Lincoln Diversified   ',
                value:
                    'ILD       ++++       4    ****      Commodity       %%%%     29   $$$$    -12.0   ))))     -3.8    ((((     13.5    @@@@    19.4    {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Franklin Century Principal        ',
                value:
                    'FCP       ++++       4    ****      Commodity       %%%%     40   $$$$    17.6    ))))     -8.9    ((((     5.7     @@@@    -9.2    {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: 'First Global 3000                 ',
                value:
                    'FG3       ++++       4    ****      Volatility      %%%%     14   $$$$    12.7    ))))     7.2     ((((     9.0     @@@@    -16.0   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Century General International     ',
                value:
                    'CGI       ++++       4    ****      Multi-Asset     %%%%     13   $$$$    16.4    ))))     0.0     ((((     11.0    @@@@    11.7    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Treasury 2025 Market              ',
                value:
                    'T2M       ++++       2    ****      Volatility      %%%%     6    $$$$    16.5    ))))     15.8    ((((     -7.9    @@@@    15.2    {{{{    Agressivo     }}}}     Qualificado   '
            },
            {
                label: 'Trust Franklin Retirement         ',
                value:
                    'TFR       ++++       1    ****      Volatility      %%%%     27   $$$$    -13.1   ))))     -14.1   ((((     10.7    @@@@    -10.8   {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Adams 2040 Predictive             ',
                value:
                    'A2P       ++++       2    ****      Multi-Asset     %%%%     28   $$$$    10.4    ))))     16.2    ((((     16.2    @@@@    10.8    {{{{    Moderado      }}}}     Profissional  '
            },
            {
                label: 'Madison Principal Retirement      ',
                value:
                    'MPR       ++++       3    ****      Equity          %%%%     22   $$$$    -15.9   ))))     16.5    ((((     -9.0    @@@@    18.3    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: '2025 Management Retirement        ',
                value:
                    '2MR       ++++       3    ****      Commodity       %%%%     14   $$$$    0.0     ))))     12.0    ((((     4.2     @@@@    10.2    {{{{    Conservador   }}}}     Qualificado   '
            },
            {
                label: 'Commodities Century Assets        ',
                value:
                    'CCA       ++++       2    ****      Bond            %%%%     14   $$$$    -8.5    ))))     -7.3    ((((     16.0    @@@@    -18.2   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'American Index Assets             ',
                value:
                    'AIA       ++++       2    ****      Commodity       %%%%     32   $$$$    -16.3   ))))     -13.4   ((((     -12.2   @@@@    -9.6    {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: '2020 Cash 100                     ',
                value:
                    '2C1       ++++       5    ****      Multi-Asset     %%%%     18   $$$$    8.3     ))))     4.4     ((((     -12.0   @@@@    -13.9   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Fund Century Adams                ',
                value:
                    'FCA       ++++       1    ****      Bond            %%%%     28   $$$$    17.4    ))))     9.0     ((((     -0.1    @@@@    -7.0    {{{{    Agressivo     }}}}     Varejo        '
            },
            {
                label: 'Millenium Washington Trust        ',
                value:
                    'MWT       ++++       4    ****      Multi-Asset     %%%%     33   $$$$    -12.7   ))))     -7.5    ((((     16.2    @@@@    1.1     {{{{    Moderado      }}}}     Varejo        '
            },
            {
                label: '300 Global 100                    ',
                value:
                    '3G1       ++++       2    ****      Fixed Income    %%%%     25   $$$$    5.1     ))))     -18.7   ((((     -10.3   @@@@    -19.3   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Predictive First 300              ',
                value:
                    'PF3       ++++       5    ****      Fixed Income    %%%%     28   $$$$    4.9     ))))     3.0     ((((     15.3    @@@@    -16.3   {{{{    Agressivo     }}}}     Profissional  '
            },
            {
                label: 'Century Management Retirement     ',
                value:
                    'CMR       ++++       3    ****      Fixed Income    %%%%     40   $$$$    -16.2   ))))     -2.9    ((((     -4.5    @@@@    -16.3   {{{{    Moderado      }}}}     Qualificado   '
            },
            {
                label: 'Cash Target 2025                  ',
                value:
                    'CT2       ++++       4    ****      Currency        %%%%     10   $$$$    -0.3    ))))     -0.9    ((((     -8.4    @@@@    1.6     {{{{    Conservador   }}}}     Varejo        '
            },
            {
                label: 'Madison Principal Century         ',
                value:
                    'MPC       ++++       2    ****      Multi-Asset     %%%%     32   $$$$    9.6     ))))     6.2     ((((     -11.6   @@@@    -8.6    {{{{    Agressivo     }}}}     Varejo        '
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
