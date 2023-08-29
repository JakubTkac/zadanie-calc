import { Controller, Get } from '@nestjs/common';
import * as xml2js from 'xml2js';

@Controller('EU')
export class ExchangeRatesController {
  private parseXml(xml: string): Promise<any> {
    const parser = new xml2js.Parser({ explicitArray: false });
    return new Promise((resolve, reject) => {
      parser.parseString(xml, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  @Get()
  async getExchangeRates(): Promise<any> {
    // Replace this with the actual XML data you receive
    const xmlData = `
      <gesmes:Envelope>
<gesmes:subject>Reference rates</gesmes:subject>
<gesmes:Sender>
<gesmes:name>European Central Bank</gesmes:name>
</gesmes:Sender>
<Cube>
<Cube time="2023-08-28">
<Cube currency="USD" rate="1.0808"/>
<Cube currency="JPY" rate="158.35"/>
<Cube currency="BGN" rate="1.9558"/>
<Cube currency="CZK" rate="24.138"/>
<Cube currency="DKK" rate="7.4530"/>
<Cube currency="GBP" rate="0.85815"/>
<Cube currency="HUF" rate="382.63"/>
<Cube currency="PLN" rate="4.4735"/>
<Cube currency="RON" rate="4.9360"/>
<Cube currency="SEK" rate="11.9000"/>
<Cube currency="CHF" rate="0.9559"/>
<Cube currency="ISK" rate="142.30"/>
<Cube currency="NOK" rate="11.5705"/>
<Cube currency="TRY" rate="28.7045"/>
<Cube currency="AUD" rate="1.6839"/>
<Cube currency="BRL" rate="5.2633"/>
<Cube currency="CAD" rate="1.4693"/>
<Cube currency="CNY" rate="7.8822"/>
<Cube currency="HKD" rate="8.4789"/>
<Cube currency="IDR" rate="16523.27"/>
<Cube currency="ILS" rate="4.1080"/>
<Cube currency="INR" rate="89.3040"/>
<Cube currency="KRW" rate="1433.73"/>
<Cube currency="MXN" rate="18.0507"/>
<Cube currency="MYR" rate="5.0306"/>
<Cube currency="NZD" rate="1.8283"/>
<Cube currency="PHP" rate="61.281"/>
<Cube currency="SGD" rate="1.4659"/>
<Cube currency="THB" rate="38.125"/>
<Cube currency="ZAR" rate="20.1598"/>
</Cube>
</Cube>
</gesmes:Envelope>
    `;

    const parsedXml = await this.parseXml(xmlData);
    const cubeArr = parsedXml['gesmes:Envelope'].Cube.Cube.Cube;
    const rates = cubeArr.map((cube) => {
      return {
        name: cube['$'].currency,
        rate: cube['$'].rate,
      };
    });
    const rateArr = cubeArr.map((cube) => {
      return {
        [cube['$'].currency]: cube['$'].rate,
      };
    });

    return {
      date: parsedXml['gesmes:Envelope'].Cube.Cube.$.time,
      rate: rateArr,
      rates: rates,
    };
  }
}
